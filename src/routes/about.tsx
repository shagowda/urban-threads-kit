import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Sparkles, MapPin } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AXURO" },
      { name: "description", content: "AXURO was built on one belief — Indian men deserve world-class streetwear without the world-class price tag." },
      { property: "og:title", content: "About — AXURO" },
      { property: "og:description", content: "Our story. Streetwear, on our terms." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1920&q=80" alt="AXURO brand" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="container-x relative h-full flex flex-col justify-end pb-10 text-white">
          <p className="font-condensed uppercase tracking-[0.3em] text-sm text-white/70">AXURO</p>
          <h1 className="font-display text-5xl md:text-7xl">OUR STORY</h1>
        </div>
      </section>

      <section className="container-x py-14 max-w-3xl">
        <p className="text-lg leading-relaxed text-foreground/85">
          AXURO was founded with one belief — that Indian men deserve world-class streetwear without the
          world-class price tag. We design clothes that move with you, whether you're hitting the streets
          of Mumbai or the lanes of Delhi. Every stitch is intentional. Every drop is curated. This is AXURO.
        </p>
      </section>

      <section className="container-x grid md:grid-cols-3 gap-6 pb-14">
        {[
          { icon: ShieldCheck, title: "Quality First", body: "Premium fabrics, honest construction, built to last beyond a season." },
          { icon: Sparkles, title: "Street-Ready Style", body: "Modern silhouettes inspired by the global streetwear scene, made for Indian summers and winters alike." },
          { icon: MapPin, title: "Made for Indian Men", body: "Sized, fit and priced for India. Local pride, global aesthetic." },
        ].map((v) => (
          <div key={v.title} className="border border-border p-6 bg-card">
            <v.icon className="h-7 w-7 text-accent" />
            <h3 className="font-display text-2xl mt-3">{v.title.toUpperCase()}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.body}</p>
          </div>
        ))}
      </section>

      <section className="container-x pb-20 text-center">
        <Link to="/shop" className="btn-accent">Shop the Collection</Link>
      </section>
    </div>
  );
}
