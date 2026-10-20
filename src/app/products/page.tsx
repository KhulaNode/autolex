import { Check, MessageCircle } from "lucide-react";
import { products } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { EnquiryBanner } from "@/components/enquiry-banner";
import { ImageCredits } from "@/components/image-credits";

export const metadata = pageMetadata(
  "Auto-electrical product categories",
  "Explore starter motors, alternators, batteries, vehicle lighting, wiring, relays, switches, sensors and more. Enquire directly with Autolex Polokwane.",
  "/products",
);

export default function Products() {
  return (
    <>
      <PageHero
        label="Our products"
        title="The power. The parts. The possibilities."
      >
        Explore our auto-electrical range. Send us your requirements and we’ll
        discuss the part you need.
      </PageHero>
      <section className="section">
        <div className="container">
          <div className="product-page-intro">
            <p>For cars, bakkies, trucks, buses and heavy machinery.</p>
            <span>
              <MessageCircle size={17} aria-hidden="true" />
              Enquire for suitability & availability
            </span>
          </div>
          <div className="product-grid full-product-grid">
            {products.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </div>
          <p className="availability-note">
            Photos show component examples. Contact us to confirm brands,
            suitability and current availability.
          </p>
          <ImageCredits />
        </div>
      </section>
      <section className="parts-help">
        <div className="container parts-help-grid">
          <div>
            <p className="eyebrow">MAKE YOUR ENQUIRY COUNT</p>
            <h2>
              Help us identify
              <br />
              your part.
            </h2>
          </div>
          <div>
            <p>
              A few details make it easier to discuss the right component for
              your application.
            </p>
            <ul className="check-list">
              <li>
                <Check size={18} aria-hidden="true" />
                Vehicle make, model and year
              </li>
              <li>
                <Check size={18} aria-hidden="true" />
                Engine details or equipment application
              </li>
              <li>
                <Check size={18} aria-hidden="true" />A part number or clear
                photo, if you have one
              </li>
            </ul>
          </div>
        </div>
      </section>
      <EnquiryBanner />
    </>
  );
}
