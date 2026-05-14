export const WHATSAPP_NUMBER = "916364628003";

export function generateWhatsAppLink(opts: {
  productName?: string;
  size?: string;
  color?: string;
  qty?: number;
  price?: number;
  custom?: string;
}) {
  if (opts.custom) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(opts.custom)}`;
  }
  const lines = [
    "Hi AXURO! I want to order this item.",
    `Product: ${opts.productName ?? ""}`,
    `Size: ${opts.size ?? "-"}`,
    `Color: ${opts.color ?? "-"}`,
    `Qty: ${opts.qty ?? 1}`,
    ...(opts.price ? [`Price: ${inr(opts.price)}`] : []),
    "Please confirm availability and payment details.",
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function inr(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}
