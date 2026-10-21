import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { products } from "@/lib/products";
import { whatsappUrl } from "@/lib/business";

export function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[number];
  index: number;
}) {
  return (
    <article className="product-card" id={product.slug}>
      <div className="product-visual">
        <span className="product-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Image
          src={product.image.src}
          alt={product.image.alt}
          className="product-photo"
          fill
          sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 1100px) 45vw, 400px"
        />
        {/* <span className="product-visual-label">COMPONENT EXAMPLE</span> */}
      </div>
      <div className="product-content">
        <p className="card-eyebrow">{product.eyebrow}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <a
          href={whatsappUrl(product.name)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Enquire about {product.name.toLowerCase()}
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
