import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { business, directionsUrl, formatHours } from "@/lib/business";
import { SocialLinks } from "./social-links";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link
            className="footer-logo"
            href="/"
            aria-label={`${business.name} home`}
          >
            <Image
              src="/branding/AutoLex Lightning Logo.png"
              alt={business.name}
              width={2048}
              height={688}
              sizes="240px"
            />
          </Link>
          <p>
            Auto-electrical parts.
            <br />
            For the journey ahead.
          </p>
          <SocialLinks />
        </div>
        <div>
          <h2>Explore</h2>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/about">About Autolex</Link>
            <Link href="/products">Our products</Link>
            <Link href="/contact">Contact us</Link>
          </div>
        </div>
        <div>
          <h2>Let’s talk parts</h2>
          <div className="footer-links">
            {business.phones.map((phone) => (
              <a key={phone.international} href={`tel:${phone.international}`}>
                <Phone size={15} aria-hidden="true" />
                {phone.display}
              </a>
            ))}
            <a href={`mailto:${business.email}`}>
              <Mail size={15} aria-hidden="true" />
              {business.email}
            </a>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
              <MapPin size={15} aria-hidden="true" />
              <span>
                {business.address.street}
                <br />
                {business.address.suburb}, {business.address.city}
              </span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div>
          <h2>Trading hours</h2>
          <dl className="footer-hours">
            {business.tradingHours.map((entry) => (
              <div key={entry.label}>
                <dt>{entry.label}</dt>
                <dd>{formatHours(entry)}</dd>
              </div>
            ))}
          </dl>
          <p className="holiday-note">
            Please confirm public holiday hours before visiting.
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {business.name}</span>
        <span>
          Developed &amp; maintained by{" "}
          <a
            href="https://khulanode.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            KhulaNode
          </a>
        </span>
      </div>
    </footer>
  );
}
