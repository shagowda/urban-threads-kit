import { useEffect, useState } from "react";
import { X } from "lucide-react";

const messages = [
  "FREE SHIPPING on orders above ₹999 🔥",
  "NEW DROPS EVERY FRIDAY",
  "100% ORIGINAL PRODUCTS — MADE IN INDIA",
];

export function PromoBanner() {
  const [i, setI] = useState(0);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % messages.length), 4000);
    return () => clearInterval(t);
  }, []);
  if (hidden) return null;
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container-x flex items-center justify-center relative h-9">
        <p className="font-condensed uppercase text-xs sm:text-sm tracking-widest text-center">
          {messages[i]}
        </p>
        <button
          onClick={() => setHidden(true)}
          className="absolute right-2 sm:right-4 p-1 opacity-70 hover:opacity-100"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
