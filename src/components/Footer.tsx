import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && contactRef.current && !contactRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-display text-4xl tracking-wider">AXURO</div>
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
          </ul>
        </div>
        <div>
          <h4 className="font-condensed uppercase tracking-widest text-sm text-white/60">Connect</h4>
          <div className="mt-4 flex items-center gap-3">
            <a href="https://instagram.com/axuro" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 border border-white/20 hover:border-accent hover:text-accent">
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
          © 2025 AXURO. All rights reserved.
        </div>
      </div>
      <div ref={contactRef} className="container-x py-6 flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex items-center gap-2 text-[12px] text-white/70 hover:text-white transition"
        >
          <Plus className={`h-4 w-4 transition-transform ${isOpen ? "rotate-45" : "rotate-0"}`} />
          Designed & Developed by Shashank KC
        </button>
        <div
          className={`w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0A1F44] text-white shadow-2xl shadow-black/20 transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[420px] p-6 opacity-100" : "max-h-0 p-0 opacity-0"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-white/80 uppercase tracking-[0.18em]"> Developer & Designer</p>
              <span className="text-xs text-white/50">Available for freelance website projects</span>
            </div>
            <div className="space-y-1 text-sm">
              <p className="font-medium">Shashank KC</p>
              <p className="text-white/70"> +91 7022917031</p>
              <p className="text-white/70"> sg276278@gmail.com</p>
            </div>
            <p className="text-sm text-white/70 leading-6">
              "Available for freelance website projects"
            </p>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a
                href="tel:+917022917031"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-white/40 hover:bg-white/10"
              >
                 Call
              </a>
              <a
                href="mailto:sg276278@gmail.com"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-white/40 hover:bg-white/10"
              >
                 Email
              </a>
              <a
                href="https://wa.me/917022917031?text=Hi%20Shashank!%20I%20saw%20your%20work%20on%20AXURO%20website.%20I%27m%20interested%20in%20getting%20a%20website%20built.%20Can%20we%20connect?"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-white/40 hover:bg-white/10"
              >
                 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
