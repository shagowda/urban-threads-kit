import { MessageCircle } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  const href = generateWhatsAppLink({
    custom: "Hi AXURO! I have a question about your products.",
  });
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Order via WhatsApp"
      title="Order via WhatsApp"
      className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-whatsapp text-white grid place-items-center shadow-lg animate-wa-pulse"
    >
      <MessageCircle className="h-7 w-7 fill-white" />
    </a>
  );
}
