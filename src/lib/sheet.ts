import type { Product } from "@/data/products";

/** Minimal RFC-4180 CSV parser (handles quoted fields, escaped quotes, newlines inside quotes). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        row.push(cell);
        cell = "";
      } else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++;
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
      } else {
        cell += ch;
      }
    }
  }
  // Trailing cell / row
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0].trim() !== ""));
}

const truthy = (v: string) => /^(true|yes|1|y)$/i.test(v.trim());
const splitList = (v: string) =>
  v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const slugify = (name: string, id: string) =>
  (name || id)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || id.toLowerCase();

const ALLOWED_CATEGORIES = new Set([
  "t-shirts",
  "shirts",
  "jeans",
  "jackets",
  "ethnic",
  "accessories",
]);

const ALLOWED_BADGES = new Set(["NEW", "HOT", "SALE"]);

/** Map header name -> column index, case-insensitive, trimmed. */
function headerIndex(headers: string[]): Record<string, number> {
  const map: Record<string, number> = {};
  headers.forEach((h, i) => {
    map[h.trim().toLowerCase()] = i;
  });
  return map;
}

/** Try multiple header aliases for the same logical field. */
function pick(row: string[], idx: Record<string, number>, ...keys: string[]): string {
  for (const k of keys) {
    const i = idx[k.toLowerCase()];
    if (i !== undefined) {
      const v = (row[i] ?? "").trim();
      if (v) return v;
    }
  }
  return "";
}

export function rowsToProducts(rows: string[][]): Product[] {
  if (rows.length < 2) return [];
  const [headerRow, ...dataRows] = rows;
  const idx = headerIndex(headerRow);

  const products: Product[] = [];

  for (const row of dataRows) {
    const id = pick(row, idx, "id", "product id");
    const name = pick(row, idx, "name", "product name");
    if (!id || !name) continue;

    const priceRaw = pick(row, idx, "price", "price ₹", "price (₹)");
    const priceNum = Number(priceRaw.replace(/[^\d.]/g, ""));
    if (!Number.isFinite(priceNum) || priceNum <= 0) continue;

    const originalPriceRaw = pick(row, idx, "originalPrice", "originalprice", "original price", "original price ₹");
    const originalPriceNum = originalPriceRaw
      ? Number(originalPriceRaw.replace(/[^\d.]/g, ""))
      : undefined;

    const categoryRaw = pick(row, idx, "category").toLowerCase();
    const category = (ALLOWED_CATEGORIES.has(categoryRaw) ? categoryRaw : "t-shirts") as Product["category"];

    const badgeRaw = pick(row, idx, "badge").toUpperCase();
    const badge = ALLOWED_BADGES.has(badgeRaw) ? (badgeRaw as Product["badge"]) : undefined;

    const images = splitList(pick(row, idx, "images", "image url", "image urls", "image"));
    if (images.length === 0) continue;

    // Allow explicit isNewArrival/isBestSeller columns; otherwise derive from badge.
    const newArrivalRaw = pick(row, idx, "isNewArrival", "isnewarrival", "new arrival");
    const bestSellerRaw = pick(row, idx, "isBestSeller", "isbestseller", "best seller");
    const isNewArrival = newArrivalRaw ? truthy(newArrivalRaw) : badge === "NEW";
    const isBestSeller = bestSellerRaw ? truthy(bestSellerRaw) : badge === "HOT";

    products.push({
      id,
      slug: slugify(name, id),
      name,
      category,
      price: Math.round(priceNum),
      originalPrice:
        originalPriceNum && Number.isFinite(originalPriceNum) && originalPriceNum > priceNum
          ? Math.round(originalPriceNum)
          : undefined,
      sizes: splitList(pick(row, idx, "sizes", "sizes available")),
      colors: splitList(pick(row, idx, "colors", "colors available", "colours", "colours available")),
      images,
      badge,
      description: pick(row, idx, "description"),
      material: pick(row, idx, "material"),
      fit: pick(row, idx, "fit", "fit type"),
      isNewArrival,
      isBestSeller,
      inStock: truthy(pick(row, idx, "inStock", "instock", "in stock") || "true"),
    });
  }

  return products;
}

export async function fetchProductsFromSheet(url: string): Promise<Product[]> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
  const text = await res.text();
  const rows = parseCsv(text);
  return rowsToProducts(rows);
}
