import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { business, directionsUrl, formatHours } from "@/lib/business";
import { Navigation } from "./navigation";
import { SocialLinks } from "./social-links";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="top-bar">
        <div className="container top-bar-inner">
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin size={13} aria-hidden="true" />
            {business.address.display}
          </a>
          <div className="top-bar-right">
            <span>Saturday: {formatHours(business.tradingHours[1])}</span>
            <SocialLinks />
          </div>
        </div>
      </div>
      <div className="container header-main">
        <Link href="/" className="brand" aria-label={`${business.name} home`}>
          <Image
            src="/branding/AutoLex Lightning Logo.png"
            alt={business.name}
            width={2048}
            height={688}
            sizes="(max-width: 600px) 190px, 248px"
            preload
          />
        </Link>
        <Navigation />
        <a
          className="header-call"
          href={`tel:${business.phones[0].international}`}
        >
          <Phone size={18} aria-hidden="true" />
          <span>{business.phones[0].display}</span>
        </a>
      </div>
    </header>
  );
}
