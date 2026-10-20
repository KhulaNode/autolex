import { products } from "@/lib/products";

export function ImageCredits() {
  return (
    <details className="image-credits" id="image-credits">
      <summary>Product photography credits</summary>
      <p>
        Photos show examples of each component category. Brands and models
        pictured do not confirm Autolex stock or availability.
      </p>
      <ul>
        {products.map(({ slug, name, image }) => (
          <li key={slug}>
            <strong>{name}:</strong>{" "}
            <a href={image.source} target="_blank" rel="noopener noreferrer">
              Photo by {image.author}
            </a>
            {" · "}
            <a
              href={image.licenseUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {image.license}
            </a>
          </li>
        ))}
      </ul>
      <p>
        Images are hosted locally using Wikimedia Commons thumbnails,
        responsively sized with no content retouching.
      </p>
    </details>
  );
}
