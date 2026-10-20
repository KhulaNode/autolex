import type { MetadataRoute } from "next";
import { business } from "@/lib/business";
export const dynamic = "force-dynamic";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/products", "/contact"].map((path) => ({
    url: `${business.siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
