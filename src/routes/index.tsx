import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton, ProductsErrorState } from "@/components/ProductCardSkeleton";
import { categories } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AXURO — Wear the Streets. Own the Look." },
      { name: "description", content: "Premium streetwear for the modern Indian man. Shop new drops, best sellers and accessories." },
      { property: "og:title", content: "AXURO — Wear the Streets. Own the Look." },
      { property: "og:description", content: "Premium streetwear for the modern Indian man." },
    ],
  }),
  component: Index,
});

function Index() {
  const { products, loading, error } = useProducts();
  const inStock = products.filter((p) => p.inStock);
  const newArrivals = inStock.filter((p) => p.isNewArrival).slice(0, 8);
  const bestSellers = inStock.filter((p) => p.isBestSeller).slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A1F44] bg-gradient-to-br from-[#0A1F44] via-[#071630] to-black text-white">
        <div className="container-x mx-auto px-4 py-10 md:py-14">
          <div className="grid min-h-[250px] md:min-h-[400px] grid-cols-1 gap-6 md:grid-cols-[1.15fr_0.85fr] items-center">
            <div className="relative flex flex-col justify-center overflow-hidden rounded-[24px] bg-[rgba(255,255,255,0.04)] p-6 shadow-[0_20px_80px_-42px_rgba(0,0,0,0.6)] backdrop-blur-sm md:p-12">
              <div className="animate-fade-up">
                <span className="font-condensed uppercase tracking-[0.35em] text-sm text-white/70">AXURO — STREETWEAR DROP</span>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight mt-4 text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                  WEAR THE STREETS.
                </h1>
                <p className="mt-4 max-w-xl text-base sm:text-lg text-white/85 leading-relaxed drop-shadow-[0_5px_20px_rgba(0,0,0,0.25)]">
                  New collection just dropped — oversized tees, street jackets & more.
                </p>
                <div className="mt-8">
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#0A1F44] shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
                  >
                    Shop New Arrivals →
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[24px] bg-black/10 shadow-[0_24px_90px_-54px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.1),_transparent_45%)]" />
              <img
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800"
                alt="Stylish man in streetwear"
                className="relative h-[320px] w-full object-cover md:h-full"
              />
            </div>
          </div>
        </div>

        <div className="container-x mx-auto px-4 pb-10">
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              to="/shop"
              className="group flex h-full flex-col overflow-hidden rounded-[12px] bg-[#0D2150] p-6 text-white transition duration-300 hover:scale-[1.02]"
            >
              <div className="flex flex-1 flex-col justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]">New Arrivals</h2>
                  <p className="mt-3 text-sm text-white/80">Fresh drops every Friday</p>
                </div>
                <div className="mt-4 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-white group-hover:text-[#0A1F44]">
                  Shop Now
                </div>
              </div>
              <div className="mt-6 flex items-end justify-end">
                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
                  alt="New arrivals t-shirt"
                  className="h-32 w-32 rounded-[12px] object-cover"
                />
              </div>
            </Link>

            <Link
              to="/shop"
              className="group flex h-full flex-col overflow-hidden rounded-[12px] bg-[#12131A] p-6 text-white transition duration-300 hover:scale-[1.02]"
            >
              <div className="flex flex-1 flex-col justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]">Best Sellers</h2>
                  <p className="mt-3 text-sm text-white/80">Most loved styles this season</p>
                </div>
                <div className="mt-4 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-white group-hover:text-[#0A1F44]">
                  Shop Now
                </div>
              </div>
              <div className="mt-6 flex items-end justify-end">
                <img
                  src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=400"
                  alt="Best sellers jeans"
                  className="h-32 w-32 rounded-[12px] object-cover"
                />
              </div>
            </Link>

            <Link
              to="/shop"
              className="group flex h-full flex-col overflow-hidden rounded-[12px] bg-[#5B1222] p-6 text-white transition duration-300 hover:scale-[1.02]"
            >
              <div className="flex flex-1 flex-col justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]">Limited Stock</h2>
                  <p className="mt-3 text-sm text-white/80">Grab before it sells out</p>
                </div>
                <div className="mt-4 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-white group-hover:text-[#0A1F44]">
                  Shop Now
                </div>
              </div>
              <div className="mt-6 flex items-end justify-end">
                <img
                  src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400"
                  alt="Accessories on display"
                  className="h-32 w-32 rounded-[12px] object-cover"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container-x py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-label">Just Dropped</p>
            <h2 className="font-display text-4xl md:text-5xl mt-2">NEW ARRIVALS</h2>
          </div>
          <Link to="/shop" className="hidden sm:inline-flex font-condensed uppercase text-sm tracking-widest hover:text-accent">
            View all →
          </Link>
        </div>
        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : error && products.length === 0 ? (
          <ProductsErrorState />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      <div className="hr-rule container-x" />

      {/* Categories */}
      <section className="container-x py-16">
        <p className="section-label">Shop by</p>
        <h2 className="font-display text-4xl md:text-5xl mt-2 mb-8">CATEGORIES</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/shop/$category"
              params={{ category: c.slug }}
              className="group relative aspect-square overflow-hidden bg-muted"
            >
              <img src={c.image} alt={c.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              <span className="absolute bottom-3 left-3 font-display text-xl text-white tracking-wider">
                {c.name.toUpperCase()}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="hr-rule container-x" />

      {/* Best Sellers */}
      <section className="container-x py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-label">Crowd Favourites</p>
            <h2 className="font-display text-4xl md:text-5xl mt-2">BEST SELLERS</h2>
          </div>
          <Link to="/shop" className="hidden sm:inline-flex font-condensed uppercase text-sm tracking-widest hover:text-accent">
            View all →
          </Link>
        </div>
        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : error && products.length === 0 ? (
          <ProductsErrorState />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      {/* Brand strip */}
      <section className="bg-primary text-primary-foreground py-20 mt-8">
        <div className="container-x grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-condensed uppercase tracking-[0.3em] text-sm text-white/60">Our Story</p>
            <h2 className="font-display text-4xl md:text-6xl mt-3 leading-tight">BORN ON THE STREETS OF INDIA.</h2>
          </div>
          <div className="text-white/80 text-base md:text-lg leading-relaxed">
            <p>
              AXURO was built on one belief — Indian men deserve world-class streetwear without the world-class price tag.
              Every drop is curated. Every stitch is intentional. This is streetwear, on our terms.
            </p>
            <Link to="/about" className="btn-accent mt-6">About Us</Link>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="container-x py-16">
        <div className="text-center mb-8">
          <p className="section-label">Follow</p>
          <h2 className="font-display text-4xl md:text-5xl mt-2">@AXURO</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {[
            "photo-1503341504253-dff4815485f1",
            "photo-1521572163474-6864f9cf17ab",
            "photo-1542272604-787c3835535d",
            "photo-1591047139829-d91aecb6caea",
            "photo-1551028719-00167b16eac5",
            "photo-1602810318383-e386cc2a3ccf",
          ].map((id) => (
            <a key={id} href="https://instagram.com/axuro" target="_blank" rel="noreferrer" className="block aspect-square overflow-hidden bg-muted">
              <img src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`} alt="Instagram post" className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" />
            </a>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="https://instagram.com/axuro" target="_blank" rel="noreferrer" className="btn-outline">Follow on Instagram</a>
        </div>
      </section>
    </div>
  );
}
