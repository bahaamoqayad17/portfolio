import type { Metadata } from "next";

export const siteConfig = {
  name: "Bahaa El Moqayad",
  title: "Bahaa El Moqayad | AI & SaaS MVP Builder",
  description:
    "AI Product Builder helping founders ship AI and SaaS MVPs from validated idea to working product in 3 to 6 weeks.",
  url: "https://bahaamoqayad17.com",
  icon: "/site-icon.svg",
  ogImage: "/opengraph-image",
  email: "bahaamoqayad17@gmail.com",
  calendly: "https://calendly.com/bahaamoqayad17/30min",
  author: "Bahaa El Moqayad",
  social: {
    github: "https://github.com/bahaamoqayad17",
    linkedin: "https://linkedin.com/in/bahaamoqayad17",
    instagram: "https://instagram.com/bahaamoqayad17",
  },
};

export const routes = [
  {
    path: "/",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  {
    path: "/about",
    title: "About Bahaa El Moqayad | AI Product Builder from Gaza",
    description:
      "Meet Bahaa El Moqayad, an AI Product Builder and full-stack engineer building SaaS MVPs, AI products, and technical advisory systems for founders worldwide.",
  },
  {
    path: "/services",
    title: "AI & SaaS MVP Development Services | Bahaa El Moqayad",
    description:
      "MVP builds, AI engineering, and technical advisory for founders who need a focused technical partner from validation to launch.",
  },
  {
    path: "/case-studies",
    title: "AI & SaaS MVP Case Studies | Bahaa El Moqayad",
    description:
      "Explore real AI, SaaS, and advisory projects built under startup constraints with measurable launch and business outcomes.",
  },
  {
    path: "/contact",
    title: "Contact Bahaa El Moqayad | Book a Free Strategy Call",
    description:
      "Contact Bahaa El Moqayad to discuss your validated idea, AI product, SaaS MVP, or technical advisory needs.",
  },
] as const;

export type SitePath = (typeof routes)[number]["path"];

export function absoluteUrl(path: string = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function getRoute(path: SitePath) {
  return routes.find((route) => route.path === path) ?? routes[0];
}

export function createPageMetadata(path: SitePath): Metadata {
  const route = getRoute(path);

  return {
    title: route.title,
    description: route.description,
    alternates: {
      canonical: route.path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: route.path,
      siteName: siteConfig.name,
      title: route.title,
      description: route.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - AI and SaaS MVP Builder`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
      images: [siteConfig.ogImage],
    },
  };
}
