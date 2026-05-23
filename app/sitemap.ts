import type { MetadataRoute } from "next";
import { absoluteUrl, routes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: "weekly",
    priority: route.path === "/" ? 1 : 0.8,
  }));
}
