export const WHATSAPP_NUMBER = "917338087711";

export function generateWhatsAppLink(opts: {
  productName?: string;
  size?: string;
  color?: string;
  qty?: number;
  custom?: string;
}) {
  if (opts.custom) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(opts.custom)}`;
  }
  const lines = [
    "Hi SECOCT! I want to order:",
    `Product: ${opts.productName ?? ""}`,
    `Size: ${opts.size ?? "-"}`,
    `Color: ${opts.color ?? "-"}`,
    `Qty: ${opts.qty ?? 1}`,
    "Please confirm availability and payment details.",
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function inr(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}
