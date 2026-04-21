import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Truck, X } from "lucide-react";
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
          <div className="aspect-[4/5] bg-muted overflow-hidden">
            <img src={product.images[img]} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="mt-3 flex gap-2">
            {product.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setImg(i)}
                className={`h-20 w-16 overflow-hidden border-2 ${i === img ? "border-primary" : "border-transparent"}`}
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
