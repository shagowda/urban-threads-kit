import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-display text-4xl tracking-wider">SECOCT</div>
          <p className="mt-3 text-sm text-white/70 max-w-xs">
            Wear the streets. Own the look. Premium streetwear for the modern Indian man.
          </p>
        </div>
        <div>
          <h4 className="font-condensed uppercase tracking-widest text-sm text-white/60">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-accent">All Products</Link></li>
            <li><Link to="/shop/$category" params={{ category: "t-shirts" }} className="hover:text-accent">T-Shirts</Link></li>
            <li><Link to="/shop/$category" params={{ category: "jackets" }} className="hover:text-accent">Jackets</Link></li>
            <li><Link to="/shop/$category" params={{ category: "jeans" }} className="hover:text-accent">Jeans</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-condensed uppercase tracking-widest text-sm text-white/60">Help</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/size-guide" className="hover:text-accent">Size Guide</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            <li><span className="text-white/60">Returns Policy</span></li>
          </ul>
        </div>
        <div>
          <h4 className="font-condensed uppercase tracking-widest text-sm text-white/60">Connect</h4>
          <div className="mt-4 flex items-center gap-3">
            <a href="https://instagram.com/secoct" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 border border-white/20 hover:border-accent hover:text-accent">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://wa.me/917338087711" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="p-2 border border-white/20 hover:border-accent hover:text-accent">
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-6 text-sm text-white/70">Made in India 🇮🇳</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs text-white/60 text-center">
          © 2025 SECOCT. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
