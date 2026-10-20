import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BatteryCharging, Cable, Cog } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/lib/business";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { EnquiryBanner } from "@/components/enquiry-banner";

export const metadata = pageMetadata(
  "About Autolex",
  "Meet Autolex Auto Electrical Supplies, your Polokwane-based supplier of automotive electrical parts for cars, commercial vehicles and heavy machinery.",
  "/about",
);

export default function About() {
  return (
    <>
      <PageHero label="About us" title="A connection you can build on.">
        Auto-electrical parts for the vehicles that keep your day moving.
      </PageHero>
      <section className="section">
        <div className="container about-grid">
          <div>
            <SectionHeading
              eyebrow="LOCAL BUSINESS. ELECTRICAL FOCUS."
              title="We’re Autolex. Let’s talk parts."
            />
            <p className="lead-copy">
              Autolex Auto Electrical Supplies is a Polokwane-based supplier of
              automotive electrical parts and components.
            </p>
            <p>
              From our premises at {business.address.street} in{" "}
              {business.address.suburb}, we supply parts for cars, bakkies,
              trucks, buses and heavy machinery. Our range covers starting and
              charging systems, lighting, wiring and the electrical accessories
              that connect it all.
            </p>
            <p>
              We’re committed to supplying quality automotive electrical
              components. When you enquire, share your vehicle details, a part
              number or a photo so we can discuss your specific requirement.
            </p>
            <Link href="/contact" className="button button-navy">
              Get in touch
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="about-photo">
            <Image
              src="/images/engine-workshop.jpg"
              alt="Close view of an automotive engine and its belt-driven components"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
            <div>
              <span>BASED IN LADANNA</span>
              <strong>
                Connected to
                <br />
                your journey.
              </strong>
            </div>
          </div>
        </div>
      </section>
      <section className="section soft-section">
        <div className="container">
          <SectionHeading
            eyebrow="WHAT WE SPECIALISE IN"
            title="From the first spark to the final connection."
          />
          <div className="speciality-grid">
            {[
              {
                icon: Cog,
                title: "Starting & charging",
                text: "New and reconditioned starter motors and alternators, plus automotive batteries.",
              },
              {
                icon: BatteryCharging,
                title: "Vehicle electrical",
                text: "Lighting, relays, fuses, switches, gauges and sensors for vehicle applications.",
              },
              {
                icon: Cable,
                title: "Connections & accessories",
                text: "Wiring, cables, horns, buzzers and other auto-electrical accessories.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <Icon size={31} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <Link className="text-link" href="/products">
            Explore all product categories
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <EnquiryBanner />
    </>
  );
}
