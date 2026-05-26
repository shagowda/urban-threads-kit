import React, { useEffect, useRef, useState } from "react";
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

const slides = [
  {
    id: 1,
    badge: "NEW DROP 🔥",
    headline: "WEAR THE STREETS.",
    sub: "New oversized tees & street jackets just landed",
    img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1400",
    accent: "#3AB7FF",
    cta: "/shop",
  },
  {
    id: 2,
    badge: "BEST SELLERS ⭐",
    headline: "MOST LOVED STYLES.",
    sub: "Our top-selling pieces — grab yours before stock runs out",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1400",
    accent: "#c9a84c",
    cta: "/shop",
  },
  {
    id: 3,
    badge: "TRENDING NOW 📈",
    headline: "OWN THE LOOK.",
    sub: "Varsity bombers, denim truckers & tech windbreakers",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1400",
    accent: "#E63946",
    cta: "/shop",
  },
  {
    id: 4,
    badge: "LIMITED TIME 🏷️",
    headline: "UP TO 40% OFF.",
    sub: "Selected styles on sale — today only. Don't miss out.",
    img: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1400",
    accent: "#2d6a4f",
    cta: "/shop",
  },
];

function Carousel() {
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const touchStartX = useRef<number | null>(null);
  const DURATION = 5000;

  const next = (by = 1) => {
    setIndex((i) => (i + by + total) % total);
    elapsedRef.current = 0;
    startRef.current = null;
  };
  const prev = () => next(-1);

  // animation loop to track elapsed time for progress bar & auto-advance
  useEffect(() => {
    function step(ts: number) {
      if (paused) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      if (!startRef.current) startRef.current = ts;
      const dt = ts - startRef.current;
      elapsedRef.current = dt;
      if (dt >= DURATION) {
        next(1);
        startRef.current = ts;
        elapsedRef.current = 0;
      }
      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  // reset timer when index changes (manual nav)
  useEffect(() => {
    startRef.current = null;
    elapsedRef.current = 0;
  }, [index]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    // noop for now - could implement visual drag
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 60) prev();
    else if (dx < -60) next(1);
    touchStartX.current = null;
  };

  const progress = Math.min(1, (elapsedRef.current || 0) / DURATION);

  return (
    <div
      ref={containerRef}
      className="carousel relative w-full select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="carousel-viewport overflow-hidden w-full">
        <div
          className="carousel-track flex w-full will-change-transform"
          style={{
            width: `${total * 100}%`,
            transform: `translateX(-${(index * 100) / total}%)`,
            transition: `transform 600ms ease`,
            height: "550px",
          }}
        >
          {slides.map((s, i) => (
            <div key={s.id} className="carousel-slide relative w-[100%] flex-shrink-0">
              <img
                key={s.id + "img-" + index}
                loading="lazy"
                src={s.img}
                alt={s.headline}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ transformOrigin: "center", height: "100%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

              <div className="container-x relative z-10 h-full flex items-center">
                <div className="max-w-[720px] py-8 md:py-0">
                  <div key={index} className="animate-fade-up">
                    <span style={{ background: s.accent }} className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white">
                      {s.badge}
                    </span>
                    <h2 className="font-display mt-4 text-4xl md:text-[56px] leading-tight text-white uppercase">{s.headline}</h2>
                    <p className="mt-4 text-white text-base max-w-[500px]">{s.sub}</p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <Link to={s.cta} className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold text-white" style={{ background: s.accent }}>
                        {i === 0 ? "Shop New Arrivals →" : i === 1 ? "Shop Best Sellers →" : i === 2 ? "Shop Jackets →" : "Shop Sale →"}
                      </Link>
                      <Link to="/shop" className="inline-flex items-center justify-center rounded-md border border-white/60 px-6 py-3 text-sm text-white">
                        View All
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button aria-label="Previous" onClick={prev} className="carousel-arrow left hidden md:flex">
        ←
      </button>
      <button aria-label="Next" onClick={() => next(1)} className="carousel-arrow right hidden md:flex">
        →
      </button>

      {/* Dots */}
      <div className="absolute left-1/2 bottom-14 z-20 -translate-x-1/2 flex items-center gap-3">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            className={`dot transition-all duration-300 ${i === index ? "dot-active" : ""}`}
            style={{ background: i === index ? s.accent : "white" }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute left-0 bottom-0 w-full z-20">
        <div className="h-1 w-full bg-white/10">
          <div className="h-1" style={{ width: `${progress * 100}%`, background: slides[index].accent, transition: paused ? "none" : "width 120ms linear" }} />
        </div>
      </div>
    </div>
  );
}

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
            <a key={id} href="https://instagram.com/axuro.in" target="_blank" rel="noreferrer" className="block aspect-square overflow-hidden bg-muted">
              <img src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`} alt="Instagram post" className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" />
            </a>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="https://instagram.com/axuro.in" target="_blank" rel="noreferrer" className="btn-outline">Follow on Instagram</a>
        </div>
      </section>
    </div>
  );
}
