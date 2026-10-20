import type { Metadata, Viewport } from "next";
import { business } from "@/lib/business";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "./globals.css";

// Public business settings are read from the running container's environment.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} | ${business.tagline}`,
    template: `%s | ${business.shortName}`,
  },
  description: business.description,
  applicationName: business.shortName,
  icons: { icon: "/icon" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#081c38",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name: business.name,
    description: business.description,
    slogan: business.tagline,
    url: business.siteUrl,
    logo: `${business.siteUrl}/branding/AutoLex%20Lightning%20Logo.png`,
    image: `${business.siteUrl}/opengraph-image`,
    telephone: business.phones.map((phone) => phone.international),
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.address.street}, ${business.address.suburb}`,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      addressCountry: business.address.country,
    },
    sameAs: Object.values(business.socials).filter(Boolean),
    openingHoursSpecification: business.tradingHours
      .filter((entry) => entry.closed || (entry.opens && entry.closes))
      .map((entry) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: entry.days.map((day) => `https://schema.org/${day}`),
        opens: entry.closed ? "00:00" : entry.opens,
        closes: entry.closed ? "00:00" : entry.closes,
      })),
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address.display)}`,
  };
  return (
    <html lang="en-ZA">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <div className="mobile-contact">
          <WhatsAppButton>WhatsApp Autolex</WhatsAppButton>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
