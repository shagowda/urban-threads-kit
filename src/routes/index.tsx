import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton, ProductsErrorState } from "@/components/ProductCardSkeleton";
import { categories } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SEPOCT — Wear the Streets. Own the Look." },
      { name: "description", content: "Premium streetwear for the modern Indian man. Shop new drops, best sellers and accessories." },
      { property: "og:title", content: "SEPOCT — Wear the Streets. Own the Look." },
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
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1920&q=80"
          alt="Stylish streetwear model on Indian streets"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/30" />
        <div className="relative container-x h-full flex flex-col justify-end pb-16 md:pb-24 text-white">
          <span className="font-condensed uppercase tracking-[0.3em] text-sm text-white/80">SEPOCT — DROP 01</span>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.95] mt-4 max-w-3xl">
            WEAR THE STREETS.<br />OWN THE LOOK.
          </h1>
          <p className="mt-4 max-w-xl text-white/85 text-base md:text-lg">
            Premium streetwear for the modern Indian man. Heavyweight tees, statement jackets, honest denim.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" className="btn-accent">Shop New Arrivals</Link>
            <Link to="/shop" className="btn-outline" style={{ borderColor: "white", color: "white" }}>
              View Best Sellers
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
              SEPOCT was built on one belief — Indian men deserve world-class streetwear without the world-class price tag.
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
          <h2 className="font-display text-4xl md:text-5xl mt-2">@sepoct.in</h2>
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
            <a key={id} href="https://www.instagram.com/sepoct.in" target="_blank" rel="noreferrer" className="block aspect-square overflow-hidden bg-muted">
              <img src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`} alt="Instagram post" className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" />
            </a>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="https://www.instagram.com/sepoct.in" target="_blank" rel="noreferrer" className="btn-outline">Follow on Instagram</a>
        </div>
      </section>
    </div>
  );
}
