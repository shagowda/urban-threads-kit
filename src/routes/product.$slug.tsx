import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MessageCircle, Truck, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, products } from "@/data/products";
import { generateWhatsAppLink, inr } from "@/lib/whatsapp";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.name} — SECOCT` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — SECOCT` },
        { property: "og:description", content: p.description },
        { property: "og:image", content: p.images[0] },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container-x py-20 text-center">
      <h1 className="font-display text-5xl">PRODUCT NOT FOUND</h1>
      <Link to="/shop" className="btn-primary mt-6 inline-flex">Back to Shop</Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const [showSize, setShowSize] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setImg(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi && emblaApi.selectedScrollSnap() !== img) {
      emblaApi.scrollTo(img);
    }
  }, [img, emblaApi]);

  useEffect(() => {
    if (!zoomOpen) setZoomScale(1);
  }, [zoomOpen]);

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div>
      <div className="container-x pt-6 text-xs font-condensed uppercase tracking-widest text-muted-foreground">
        <Link to="/" className="hover:text-accent">Home</Link> /{" "}
        <Link to="/shop" className="hover:text-accent">Shop</Link> /{" "}
        <Link to="/shop/$category" params={{ category: product.category }} className="hover:text-accent capitalize">
          {product.category.replace("-", " ")}
        </Link> /{" "}
        <span className="text-foreground">{product.name}</span>
      </div>

      <section className="container-x py-8 grid lg:grid-cols-2 gap-10">
        <div>
          {/* Mobile: swipeable carousel */}
          <div className="lg:hidden relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {product.images.map((src, i) => (
                  <div key={src} className="min-w-0 shrink-0 grow-0 basis-full">
                    <button
                      type="button"
                      onClick={() => setZoomOpen(true)}
                      className="block w-full aspect-[4/5] bg-muted overflow-hidden"
                      aria-label="Zoom image"
                    >
                      <img src={src} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`h-1.5 rounded-full transition-all ${i === img ? "w-6 bg-primary" : "w-1.5 bg-primary/40"}`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: static main image with tap-to-zoom */}
          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            className="hidden lg:block relative aspect-[4/5] bg-muted overflow-hidden w-full group cursor-zoom-in"
            aria-label="Zoom image"
          >
            <img src={product.images[img]} alt={product.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <span className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="h-4 w-4" />
            </span>
          </button>

          <div className="mt-3 flex gap-2 overflow-x-auto">
            {product.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setImg(i)}
                className={`h-20 w-16 shrink-0 overflow-hidden border-2 ${i === img ? "border-primary" : "border-transparent"}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="section-label">{product.category.replace("-", " ")}</p>
          <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">{product.name}</h1>

          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-3xl font-bold">{inr(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">{inr(product.originalPrice)}</span>
            )}
            {product.originalPrice && (
              <span className="text-xs font-condensed bg-accent text-accent-foreground px-2 py-1 tracking-widest">
                SAVE {inr(product.originalPrice - product.price)}
              </span>
            )}
          </div>

          <div className="mt-3 inline-flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-whatsapp" />
            <span className="font-condensed uppercase tracking-widest text-xs">
              {product.inStock ? "In Stock" : "Sold Out"}
            </span>
          </div>

          <div className="mt-6">
            <p className="font-condensed uppercase tracking-widest text-xs mb-2">Color: <span className="text-foreground">{color}</span></p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-3 py-1.5 text-xs font-condensed tracking-widest border ${color === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <p className="font-condensed uppercase tracking-widest text-xs">Size: <span className="text-foreground">{size}</span></p>
              <button onClick={() => setShowSize(true)} className="text-xs font-condensed uppercase tracking-widest underline hover:text-accent">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-12 px-3 py-2 text-sm font-condensed tracking-widest border ${size === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="font-condensed uppercase tracking-widest text-xs mb-2">Quantity</p>
            <div className="inline-flex border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2 hover:bg-muted">−</button>
              <span className="px-6 py-2 border-x border-border min-w-14 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-4 py-2 hover:bg-muted">+</button>
            </div>
          </div>

          <a
            href={generateWhatsAppLink({ productName: product.name, size, color, qty })}
            target="_blank"
            rel="noreferrer"
            className="btn-primary w-full mt-6 text-base py-4"
          >
            <MessageCircle className="h-5 w-5" /> Order on WhatsApp
          </a>

          <p className="mt-6 text-foreground/80 leading-relaxed">{product.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="border border-border p-3">
              <p className="font-condensed uppercase tracking-widest text-xs text-muted-foreground">Material</p>
              <p className="mt-1">{product.material}</p>
            </div>
            <div className="border border-border p-3">
              <p className="font-condensed uppercase tracking-widest text-xs text-muted-foreground">Fit</p>
              <p className="mt-1">{product.fit}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="h-4 w-4" />
            Ships within 3–5 business days across India.
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-x py-14">
          <h2 className="font-display text-3xl md:text-4xl mb-6">YOU MAY ALSO LIKE</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {zoomOpen && (
        <div
          className="fixed inset-0 z-[60] bg-primary/95 backdrop-blur-sm grid place-items-center"
          onClick={() => setZoomOpen(false)}
        >
          <button
            onClick={() => setZoomOpen(false)}
            className="absolute top-4 right-4 p-3 text-primary-foreground bg-background/10 rounded-full"
            aria-label="Close zoom"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="w-full h-full overflow-auto grid place-items-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={product.images[img]}
              alt={product.name}
              onClick={() => setZoomScale((s) => (s === 1 ? 2.2 : 1))}
              style={{ transform: `scale(${zoomScale})`, transformOrigin: "center center" }}
              className={`max-w-full max-h-full object-contain transition-transform duration-200 ${zoomScale === 1 ? "cursor-zoom-in" : "cursor-zoom-out"}`}
            />
          </div>
          {product.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" onClick={(e) => e.stopPropagation()}>
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImg(i)}
                  className={`h-2 rounded-full transition-all ${i === img ? "w-8 bg-primary-foreground" : "w-2 bg-primary-foreground/40"}`}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {showSize && (
        <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm grid place-items-center p-4" onClick={() => setShowSize(false)}>
          <div className="bg-card max-w-2xl w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowSize(false)} className="absolute top-3 right-3 p-2" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            <h3 className="font-display text-3xl mb-4">SIZE GUIDE</h3>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted font-condensed uppercase tracking-widest text-xs">
                  <th className="p-2 text-left">Size</th><th className="p-2 text-left">Chest (in)</th>
                  <th className="p-2 text-left">Waist</th><th className="p-2 text-left">Length</th>
                </tr>
              </thead>
              <tbody>
                {[["S","36–38","30–32","27"],["M","38–40","32–34","28"],["L","40–42","34–36","29"],["XL","42–44","36–38","30"],["XXL","44–46","38–40","31"]].map((r) => (
                  <tr key={r[0]} className="border-t border-border">
                    {r.map((c, i) => <td key={i} className="p-2">{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/size-guide" className="btn-outline mt-5 inline-flex">Full size guide</Link>
          </div>
        </div>
      )}
    </div>
  );
}
