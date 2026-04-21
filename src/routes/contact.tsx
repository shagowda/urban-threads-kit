import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SECOCT" },
      { name: "description", content: "Get in touch with SECOCT — WhatsApp, Instagram or email. We reply fast." },
      { property: "og:title", content: "Contact — SECOCT" },
      { property: "og:description", content: "Talk to the SECOCT team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`;
    window.open(generateWhatsAppLink({ custom: text }), "_blank");
    setSent(true);
  };

  return (
    <div className="container-x py-12">
      <p className="section-label">Talk to us</p>
      <h1 className="font-display text-4xl md:text-5xl mt-2">CONTACT</h1>

      <div className="grid lg:grid-cols-2 gap-10 mt-10">
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="font-condensed uppercase tracking-widest text-xs">Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full border border-input bg-card px-3 py-2.5" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="font-condensed uppercase tracking-widest text-xs">Email</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full border border-input bg-card px-3 py-2.5" />
            </div>
            <div>
              <label className="font-condensed uppercase tracking-widest text-xs">Phone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1 w-full border border-input bg-card px-3 py-2.5" />
            </div>
          </div>
          <div>
            <label className="font-condensed uppercase tracking-widest text-xs">Message</label>
            <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1 w-full border border-input bg-card px-3 py-2.5" />
          </div>
          <button type="submit" className="btn-primary w-full sm:w-auto">Send Message</button>
          {sent && <p className="text-sm text-whatsapp">Opening WhatsApp with your message…</p>}
        </form>

        <aside className="space-y-5">
          <a href={generateWhatsAppLink({ custom: "Hi SECOCT!" })} target="_blank" rel="noreferrer"
            className="flex items-center gap-4 border border-border bg-card p-5 hover:border-accent transition-colors">
            <MessageCircle className="h-6 w-6 text-whatsapp" />
            <div>
              <p className="font-condensed uppercase tracking-widest text-xs text-muted-foreground">WhatsApp</p>
              <p className="font-medium">+91 73380 87711</p>
            </div>
          </a>
          <a href="https://instagram.com/secoct" target="_blank" rel="noreferrer"
            className="flex items-center gap-4 border border-border bg-card p-5 hover:border-accent transition-colors">
            <Instagram className="h-6 w-6 text-accent" />
            <div>
              <p className="font-condensed uppercase tracking-widest text-xs text-muted-foreground">Instagram</p>
              <p className="font-medium">@SECOCT</p>
            </div>
          </a>
          <a href="mailto:mrabhiyadav1330@gmail.com"
            className="flex items-center gap-4 border border-border bg-card p-5 hover:border-accent transition-colors">
            <Mail className="h-6 w-6 text-primary" />
            <div>
              <p className="font-condensed uppercase tracking-widest text-xs text-muted-foreground">Email</p>
              <p className="font-medium">mrabhiyadav1330@gmail.com</p>
            </div>
          </a>
          <div className="border border-border bg-card p-5">
            <p className="font-condensed uppercase tracking-widest text-xs text-muted-foreground">Business Hours</p>
            <p className="mt-1 text-sm">Mon — Sat · 10:00 AM — 8:00 PM IST</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
