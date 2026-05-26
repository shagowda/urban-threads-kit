import { Link } from "@tanstack/react-router";
import { Instagram, Menu, X } from "lucide-react";
import { useState } from "react";

type NavLink =
  | { to: "/shop" | "/about" | "/contact"; label: string; params?: undefined }
  | { to: "/shop/$category"; label: string; params: { category: string } };

const navLinks: NavLink[] = [
  { to: "/shop", label: "Shop" },
  { to: "/shop/$category", params: { category: "t-shirts" }, label: "T-Shirts" },
  { to: "/shop/$category", params: { category: "jackets" }, label: "Jackets" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/85 border-b border-border">
      <div className="container-x flex items-center justify-between h-16">
        <Link to="/" className="font-display text-3xl tracking-wider text-primary">
          AXURO
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              params={l.params as any}
              className="font-condensed uppercase text-sm tracking-widest text-foreground/80 hover:text-accent transition-colors"
              activeProps={{ className: "text-accent" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com/axuro.in"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex p-2 hover:text-accent transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <button
            className="md:hidden p-2"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-primary text-primary-foreground md:hidden flex flex-col">
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
            <span className="font-display text-3xl tracking-wider">SEPOCT</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-8 gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                params={l.params as any}
                onClick={() => setOpen(false)}
                className="font-display text-4xl tracking-wide hover:text-accent"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://instagram.com/axuro.in"
              target="_blank"
              rel="noreferrer"
              className="font-condensed uppercase tracking-widest mt-6 inline-flex items-center gap-2"
            >
              <Instagram className="h-5 w-5" /> Instagram
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
