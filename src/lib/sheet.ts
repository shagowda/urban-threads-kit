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

export function rowsToProducts(rows: string[][]): Product[] {
  if (rows.length < 2) return [];
  const [headerRow, ...dataRows] = rows;
  const idx = headerIndex(headerRow);

  const get = (row: string[], key: string) => {
    const i = idx[key.toLowerCase()];
    return i === undefined ? "" : (row[i] ?? "").trim();
  };

  const products: Product[] = [];

  for (const row of dataRows) {
    const id = get(row, "id");
    const name = get(row, "name");
    if (!id || !name) continue;

    const priceNum = Number(get(row, "price").replace(/[^\d.]/g, ""));
    if (!Number.isFinite(priceNum) || priceNum <= 0) continue;

    const originalPriceRaw = get(row, "originalPrice") || get(row, "originalprice");
    const originalPriceNum = originalPriceRaw
      ? Number(originalPriceRaw.replace(/[^\d.]/g, ""))
      : undefined;

    const categoryRaw = get(row, "category").toLowerCase();
    const category = (ALLOWED_CATEGORIES.has(categoryRaw) ? categoryRaw : "t-shirts") as Product["category"];

    const badgeRaw = get(row, "badge").toUpperCase();
    const badge = ALLOWED_BADGES.has(badgeRaw) ? (badgeRaw as Product["badge"]) : undefined;

    const images = splitList(get(row, "images"));
    if (images.length === 0) continue;

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
      sizes: splitList(get(row, "sizes")),
      colors: splitList(get(row, "colors")),
      images,
      badge,
      description: get(row, "description"),
      material: get(row, "material"),
      fit: get(row, "fit"),
      isNewArrival: truthy(get(row, "isNewArrival") || get(row, "isnewarrival")),
      isBestSeller: truthy(get(row, "isBestSeller") || get(row, "isbestseller")),
      inStock: truthy(get(row, "inStock") || get(row, "instock")),
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
