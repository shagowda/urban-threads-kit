import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { categories, categoryDescriptions, getByCategory } from "@/data/products";

export const Route = createFileRoute("/shop/$category")({
  loader: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.category);
    if (!cat) throw notFound();
    return { cat, items: getByCategory(params.category) };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.cat.name ?? "Shop";
    return {
      meta: [
        { title: `${name} — SECOCT` },
        { name: "description", content: categoryDescriptions[loaderData?.cat.slug ?? ""] ?? "Shop SECOCT." },
        { property: "og:title", content: `${name} — SECOCT` },
        { property: "og:description", content: categoryDescriptions[loaderData?.cat.slug ?? ""] ?? "Shop SECOCT." },
        { property: "og:image", content: loaderData?.cat.image ?? "" },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="container-x py-20 text-center">
      <h1 className="font-display text-5xl">CATEGORY NOT FOUND</h1>
      <Link to="/shop" className="btn-primary mt-6 inline-flex">Back to Shop</Link>
    </div>
  ),
});

function CategoryPage() {
  const { cat, items } = Route.useLoaderData();
  return (
    <div>
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img src={cat.image} alt={cat.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="container-x relative h-full flex flex-col justify-end pb-8 text-white">
          <p className="font-condensed uppercase tracking-[0.3em] text-sm text-white/70">SECOCT</p>
          <h1 className="font-display text-5xl md:text-7xl">{cat.name.toUpperCase()}</h1>
          <p className="mt-2 max-w-2xl text-white/85">{categoryDescriptions[cat.slug]}</p>
        </div>
      </section>
      <section className="container-x py-12">
        <p className="text-sm text-muted-foreground mb-6">{items.length} products</p>
        {items.length === 0 ? (
          <p className="text-muted-foreground">Nothing here yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}
