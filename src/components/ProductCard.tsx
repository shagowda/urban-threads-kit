import { Link } from "@tanstack/react-router";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/products";
import { generateWhatsAppLink, inr } from "@/lib/whatsapp";

export function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  const handleShare = async () => {
    const url = `${window.location.origin}/product/${product.slug}`;
    const shareData = {
      title: product.name,
      text: `${product.name} - ${product.description}`,
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Fallback to copy link
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    } else {
      // Fallback to copy link
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="group bg-card border border-border hover:shadow-card-hover transition-shadow flex flex-col">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-[4/5] overflow-hidden bg-muted"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alt`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge === "NEW" && (
            <span className="font-condensed text-[11px] tracking-widest bg-primary text-primary-foreground px-2 py-1">NEW</span>
          )}
          {product.badge === "HOT" && (
            <span className="font-condensed text-[11px] tracking-widest bg-accent text-accent-foreground px-2 py-1">🔥 HOT</span>
          )}
          {discount > 0 && (
            <span className="font-condensed text-[11px] tracking-widest bg-accent text-accent-foreground px-2 py-1">-{discount}%</span>
          )}
        </div>
        <button
          onClick={(e) => { e.preventDefault(); setWished((w) => !w); }}
          aria-label="Wishlist"
          className="absolute top-2 right-2 h-8 w-8 grid place-items-center bg-card/90 hover:bg-card"
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-accent text-accent" : "text-foreground"}`} />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); handleShare(); }}
          aria-label="Share"
          className="absolute top-12 right-2 h-8 w-8 grid place-items-center bg-card/90 hover:bg-card"
        >
          <Share2 className="h-4 w-4 text-foreground" />
        </button>
      </Link>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <Link to="/product/$slug" params={{ slug: product.slug }} className="font-display text-lg leading-tight tracking-wide hover:text-accent">
          {product.name}
        </Link>
        <div className="flex items-baseline gap-2">
          <span className="font-semibold">{inr(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">{inr(product.originalPrice)}</span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-1">
          {product.sizes.slice(0, 5).map((s) => (
            <span key={s} className="text-[10px] font-condensed tracking-wider text-muted-foreground border border-border px-1.5 py-0.5">
              {s}
            </span>
          ))}
        </div>
        <a
          href={generateWhatsAppLink({ productName: product.name, qty: 1 })}
          target="_blank"
          rel="noreferrer"
          className="mt-2 btn-primary text-xs py-2"
        >
          <MessageCircle className="h-4 w-4" /> Order on WhatsApp
        </a>
      </div>
    </div>
  );
}
