import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BusFront,
  CarFront,
  Check,
  MapPin,
  MessageCircle,
  Tractor,
  Truck,
  Van,
  Wrench,
  Zap,
} from "lucide-react";
import { business } from "@/lib/business";
import { pageMetadata } from "@/lib/seo";
import { products } from "@/lib/products";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";
import { EnquiryBanner } from "@/components/enquiry-banner";
import { LocationSection } from "@/components/location-section";

export const metadata = pageMetadata(
  "Auto-electrical parts in Polokwane",
  "Powering your journey with starter motors, alternators, batteries and auto-electrical components. Contact Autolex in Ladanna, Polokwane.",
  "/",
);

const vehicles = [
  { label: "Cars", icon: CarFront },
  { label: "Bakkies", icon: Van },
  { label: "Trucks", icon: Truck },
  { label: "Buses", icon: BusFront },
  { label: "Heavy machinery", icon: Tractor },
];

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <Image
          className="hero-image"
          src="/images/engine-workshop.jpg"
          alt="Close-up of an automotive engine with drive belts, pulleys and electrical components"
          fill
          sizes="100vw"
          preload
        />
        <div className="hero-shade" />
        <div className="hero-angle" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">
              <span />
              AUTO ELECTRICAL SUPPLIES · POLOKWANE
            </p>
            <h1>
              Powering
              <br />
              Your <em>Journey.</em>
            </h1>
            <p>
              From the first turn of the key
              <br className="desktop-break" /> to the road ahead.
            </p>
            <p className="hero-description">
              Starter motors, alternators, batteries and electrical components
              for the vehicles you depend on.
            </p>
            <div className="hero-actions">
              <WhatsAppButton />
              <Link href="/products" className="button button-outline">
                Explore our products
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="hero-photo-caption">
            <span className="caption-line" />
            <span>
              THE POWER BEHIND
              <br />
              <strong>EVERY JOURNEY</strong>
            </span>
            <Zap size={31} strokeWidth={1.5} aria-hidden="true" />
          </div>
        </div>
        <div className="hero-bottom">
          <div className="container">
            <span>
              <MapPin size={15} aria-hidden="true" />
              {business.address.suburb}, {business.address.city}
            </span>
            {/* <span>
              NEW & RECONDITIONED STARTERS AND ALTERNATORS
              <ArrowUpRight size={16} aria-hidden="true" />
            </span> */}
          </div>
        </div>
      </section>
      <div className="vehicle-strip">
        <div className="container vehicle-inner">
          <span className="vehicle-intro">
            BUILT FOR
            <br />
            <strong>YOUR APPLICATION</strong>
          </span>
          {vehicles.map(({ label, icon: Icon }) => (
            <div className="vehicle-item" key={label}>
              <Icon strokeWidth={1.5} aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <section className="section products-section">
        <div className="container">
          <div className="section-top">
            <SectionHeading
              eyebrow="THE PARTS THAT KEEP YOU MOVING"
              title="Big on electrical. Down to the details."
            >
              From starting and charging to the smallest connection, explore our
              range of auto-electrical product categories.
            </SectionHeading>
            <Link href="/products" className="text-link">
              All product categories
              <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
          </div>
          <div className="product-grid featured-grid">
            {products.slice(0, 4).map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </div>
          <p className="availability-note">
            Looking for a specific part? Contact us to confirm suitability and
            current availability.
          </p>
        </div>
      </section>
      <section className="section intro-section">
        <div className="container intro-grid">
          <div className="intro-image">
            <Image
              src="/images/Automotive_Diagnostics_Under_the_Hood.png"
              alt="Engine belt and pulley assembly, showing the detail of an automotive power system"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
            <div className="intro-image-label">
              <Zap size={24} aria-hidden="true" />
              <span>
                YOUR JOURNEY.
                <br />
                <strong>OUR ELECTRICAL FOCUS.</strong>
              </span>
            </div>
          </div>
          <div className="intro-copy">
            <SectionHeading
              eyebrow="MEET AUTOLEX"
              title="Your local connection to auto-electrical parts."
            >
              Based in Ladanna, Polokwane, Autolex Auto Electrical Supplies
              supplies components for everyday vehicles, commercial transport
              and heavy machinery.
            </SectionHeading>
            <p>
              Our focus is straightforward: quality automotive electrical
              components, with a range covering new and reconditioned starter
              motors and alternators, batteries, lighting, wiring and
              accessories.
            </p>
            <ul className="check-list">
              <li>
                <Check size={17} aria-hidden="true" />
                Parts for cars, bakkies and heavy vehicles
              </li>
              <li>
                <Check size={17} aria-hidden="true" />
                New and reconditioned starter motors and alternators
              </li>
              <li>
                <Check size={17} aria-hidden="true" />
                Direct enquiries with your local supplier
              </li>
            </ul>
            <Link href="/about" className="text-link">
              Get to know Autolex
              <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className="section why-section">
        <div className="container">
          <SectionHeading
            eyebrow="WHY CHOOSE AUTOLEX"
            title="Electrical parts. A focused approach."
            light
          >
            Tell us what you drive, what you need and where the connection
            matters.
          </SectionHeading>
          <div className="why-grid">
            {[
              {
                icon: Wrench,
                title: "A specialist range",
                text: "Starting, charging, lighting and electrical accessories, all with an automotive focus.",
              },
              {
                icon: Truck,
                title: "Across vehicle types",
                text: "Components for cars and bakkies through to trucks, buses and heavy machinery.",
              },
              {
                icon: MessageCircle,
                title: "A direct conversation",
                text: "Call, WhatsApp or visit us. Share a part number or photo to explain exactly what you need.",
              },
            ].map(({ icon: Icon, title, text }, index) => (
              <article key={title}>
                <div className="why-card-top">
                  <Icon size={30} strokeWidth={1.4} aria-hidden="true" />
                  <span>0{index + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <LocationSection />
      <EnquiryBanner />
    </>
  );
}
