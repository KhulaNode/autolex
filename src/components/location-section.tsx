import { ArrowUpRight, Clock3, MapPin, Navigation } from "lucide-react";
import { business, directionsUrl, formatHours } from "@/lib/business";
import { SectionHeading } from "./section-heading";

export function LocationSection() {
  return (
    <section className="section location-section" id="visit">
      <div className="container location-grid">
        <div>
          <SectionHeading
            eyebrow="YOUR LOCAL PARTS CONNECTION"
            title="Find us in Ladanna."
          >
            Visit Autolex in Polokwane to discuss your auto-electrical parts
            requirements.
          </SectionHeading>
          <address className="location-address">
            <MapPin aria-hidden="true" />
            <span>
              <strong>{business.address.street}</strong>
              {business.address.suburb}, {business.address.city}
            </span>
          </address>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-navy"
          >
            <Navigation size={17} aria-hidden="true" />
            Get directions
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="hours-panel">
          <div className="hours-title">
            <Clock3 size={23} aria-hidden="true" />
            <h3>Plan your visit</h3>
          </div>
          <dl>
            {business.tradingHours.map((entry) => (
              <div key={entry.label}>
                <dt>{entry.label}</dt>
                <dd>{formatHours(entry)}</dd>
              </div>
            ))}
          </dl>
          {/* <p>
            Public holidays may affect trading hours. Give us a call before
            travelling.
          </p> */}
        </div>
      </div>
    </section>
  );
}
