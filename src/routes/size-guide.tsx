import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/size-guide")({
  head: () => ({
    meta: [
      { title: "Size Guide — SECOCT" },
      { name: "description", content: "SECOCT size chart and fit guide. Find your perfect fit." },
      { property: "og:title", content: "Size Guide — SECOCT" },
      { property: "og:description", content: "Find your perfect SECOCT fit with our complete size chart." },
    ],
  }),
  component: SizeGuide,
});

const rows = [
  ["S","36–38","30–32","27","17"],
  ["M","38–40","32–34","28","18"],
  ["L","40–42","34–36","29","18.5"],
  ["XL","42–44","36–38","30","19"],
  ["XXL","44–46","38–40","31","19.5"],
];

function SizeGuide() {
  return (
    <div className="container-x py-12">
      <p className="section-label">Find your fit</p>
      <h1 className="font-display text-4xl md:text-5xl mt-2">SIZE GUIDE</h1>

      <section className="grid md:grid-cols-2 gap-10 mt-10">
        <div>
          <h2 className="font-display text-2xl mb-3">HOW TO MEASURE</h2>
          <ul className="space-y-3 text-sm leading-relaxed text-foreground/85">
            <li><strong>Chest:</strong> Measure around the fullest part of your chest, under the arms.</li>
            <li><strong>Waist:</strong> Measure around your natural waistline.</li>
            <li><strong>Length:</strong> Measure from the highest shoulder seam to the bottom hem.</li>
            <li><strong>Shoulder:</strong> Measure across the back from shoulder seam to shoulder seam.</li>
          </ul>
        </div>
        <div className="border border-border bg-card p-6">
          <h2 className="font-display text-2xl mb-3">PRO TIP</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Between two sizes? Size up for an oversized streetwear look, size down for a slim modern fit.
            All measurements are in inches.
          </p>
        </div>
      </section>

      <section className="mt-10 overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[520px]">
          <thead>
            <tr className="bg-primary text-primary-foreground font-condensed uppercase tracking-widest text-xs">
              <th className="p-3 text-left">Size</th>
              <th className="p-3 text-left">Chest</th>
              <th className="p-3 text-left">Waist</th>
              <th className="p-3 text-left">Length</th>
              <th className="p-3 text-left">Shoulder</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-t border-border odd:bg-card">
                {r.map((c, i) => <td key={i} className="p-3">{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="grid md:grid-cols-3 gap-4 mt-12">
        {[
          { t: "Slim Fit", d: "Tailored close to the body. Choose your true size or one down." },
          { t: "Regular Fit", d: "Classic, neither tight nor loose. Choose your true size." },
          { t: "Oversized", d: "Drops off the shoulder for that streetwear silhouette. Size up if unsure." },
        ].map((f) => (
          <div key={f.t} className="border border-border bg-card p-5">
            <h3 className="font-display text-2xl">{f.t.toUpperCase()}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
