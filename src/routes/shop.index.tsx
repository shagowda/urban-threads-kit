import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop All — SECOCT" },
      { name: "description", content: "Browse the full SECOCT catalogue — tees, shirts, jeans, jackets, ethnic and accessories." },
      { property: "og:title", content: "Shop All — SECOCT" },
      { property: "og:description", content: "Full SECOCT catalogue: streetwear for the modern Indian man." },
    ],
  }),
  component: ShopPage,
});

const SORTS = [
  { id: "new", label: "Newest" },
  { id: "asc", label: "Price: Low to High" },
  { id: "desc", label: "Price: High to Low" },
  { id: "pop", label: "Popular" },
] as const;

function ShopPage() {
  const [cats, setCats] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("new");
  const [maxPrice, setMaxPrice] = useState(4999);

  const allCats = ["t-shirts","shirts","jeans","jackets","ethnic","accessories"];
  const allSizes = ["XS","S","M","L","XL","XXL"];

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (cats.length) list = list.filter((p) => cats.includes(p.category));
    if (sizes.length) list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));
    if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "pop") list = [...list].sort((a, b) => Number(!!b.isBestSeller) - Number(!!a.isBestSeller));
    return list;
  }, [cats, sizes, sort, maxPrice]);

  const toggle = (arr: string[], v: string, set: (a: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <div className="container-x py-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="section-label">Catalogue</p>
          <h1 className="font-display text-4xl md:text-5xl mt-2">ALL PRODUCTS</h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} products</p>
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="border border-border bg-card px-3 py-2 text-sm font-condensed uppercase tracking-wider"
        >
          {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="space-y-6">
          <div>
            <h3 className="font-condensed uppercase tracking-widest text-sm mb-3">Category</h3>
            <div className="space-y-2">
              {allCats.map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm capitalize cursor-pointer">
                  <input type="checkbox" checked={cats.includes(c)} onChange={() => toggle(cats, c, setCats)} />
                  {c.replace("-", " ")}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-condensed uppercase tracking-widest text-sm mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {allSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => toggle(sizes, s, setSizes)}
                  className={`px-3 py-1.5 text-xs font-condensed tracking-widest border ${sizes.includes(s) ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-condensed uppercase tracking-widest text-sm mb-3">Max price: ₹{maxPrice}</h3>
            <input
              type="range" min={499} max={4999} step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
          </div>
        </aside>

        <section>
          {filtered.length === 0 ? (
            <p className="text-muted-foreground">No products match your filters.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
