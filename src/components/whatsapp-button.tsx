import { ArrowUpRight, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/business";

export function WhatsAppButton({
  category,
  children = "Enquire on WhatsApp",
  className = "",
}: {
  category?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={whatsappUrl(category)}
      target="_blank"
      rel="noopener noreferrer"
      className={`button button-gold ${className}`}
    >
      <MessageCircle size={19} aria-hidden="true" />
      <span>{children}</span>
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}
