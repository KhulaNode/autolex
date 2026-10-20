import { ArrowUpRight, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { business, directionsUrl, formatHours } from "@/lib/business";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { SocialLinks } from "@/components/social-links";
import { SectionHeading } from "@/components/section-heading";

export const metadata = pageMetadata(
  "Contact Autolex in Polokwane",
  `Call or WhatsApp Autolex for auto-electrical parts. Visit ${business.address.display}. Saturday hours: ${formatHours(business.tradingHours[1])}.`,
  "/contact",
);

export default function Contact() {
  const hasSocials = Object.values(business.socials).some(Boolean);
  return (
    <>
      <PageHero label="Contact" title="Let’s get you connected.">
        A question about a part? Call, send a message or visit us in Ladanna.
      </PageHero>
      <section className="section">
        <div className="container contact-grid">
          <div>
            <SectionHeading
              eyebrow="TALK TO AUTOLEX"
              title="Your next part starts with a conversation."
            />
            <p>
              Share your vehicle details or a photo of the component you need.
              Contact us to confirm suitability, pricing and current
              availability.
            </p>
            <div className="contact-method">
              <Phone size={23} aria-hidden="true" />
              <div>
                <h2>Give us a call</h2>
                {business.phones.map((phone) => (
                  <a
                    key={phone.international}
                    href={`tel:${phone.international}`}
                  >
                    {phone.display}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <div className="contact-method">
              <Mail size={23} aria-hidden="true" />
              <div>
                <h2>Send an email</h2>
                <a href={`mailto:${business.email}`}>
                  {business.email}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="whatsapp-contact">
              <h2>Have a photo or part number?</h2>
              <p>
                Send it to us on WhatsApp with your vehicle make, model and
                year.
              </p>
              <WhatsAppButton />
            </div>
            {hasSocials && (
              <div className="contact-social">
                <h2>Find us on social</h2>
                <SocialLinks />
              </div>
            )}
          </div>
          <aside className="visit-card">
            <div className="visit-card-top">
              <MapPin size={29} aria-hidden="true" />
              <p className="eyebrow">COME SAY HELLO</p>
              <h2>{business.address.street}</h2>
              <p>
                {business.address.suburb}, {business.address.city}
              </p>
              <a
                className="button button-gold"
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation size={17} aria-hidden="true" />
                Get Google Maps directions
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="visit-card-bottom">
              <h3>Trading hours</h3>
              <dl>
                {business.tradingHours.map((entry) => (
                  <div key={entry.label}>
                    <dt>{entry.label}</dt>
                    <dd>{formatHours(entry)}</dd>
                  </div>
                ))}
              </dl>
              <p>
                Times are shown in South African Standard Time. Please call to
                confirm public holiday hours.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
