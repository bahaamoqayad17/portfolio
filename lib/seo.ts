import type { Metadata } from "next";

export const siteConfig = {
  name: "Bahaa El Moqayad",
  arabicName: "بهاء المقيد",
  title: "Bahaa El Moqayad | AI & SaaS MVP Builder",
  description:
    "AI Product Builder helping founders ship AI and SaaS MVPs from validated idea to working product in 3 to 6 weeks.",

  seoKeywords: [
    "AI Product Builder",
    "SaaS MVP Development",
    "Startup Technical Advisor",
    "Startup Technical Partner",
    "Technical Co-Founder",
    "Startup MVP Builder",
    "AI MVP Development",
    "Build startup MVP",
    "Next.js Developer",
    "React Developer",
    "React Native Developer",
    "Node.js Developer",
    "Full Stack Engineer",
    "Software Engineer",
    "AI Engineer",
    "Custom AI Solutions",
    "AI SaaS Development",
    "Bahaa El Moqayad",
    "Bahaa Gaza",
    "Software Engineer Gaza",
    "AI Engineer Palestine",

    // Arabic supporting layer. These are metadata/schema hints, not hidden page text.
    "بهاء المقيد",
    "مطور تطبيقات",
    "مطور مواقع",
    "برمجة مواقع",
    "برمجة تطبيقات",
    "مطور ذكاء اصطناعي",
    "مهندس برمجيات",
    "مطور React Native",
    "مطور Next.js",
    "تطوير SaaS",
    "تطوير MVP",
    "تطوير منتجات رقمية",
    "مطور ويب",
    "مطور برمجيات",
    "خدمات تطوير التطبيقات",
    "استشارات تقنية للشركات الناشئة",
    "شريك تقني للمؤسسين",
  ],

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
  const shouldIndex = route.path === "/";

  return {
    metadataBase: new URL(siteConfig.url),
    title: route.title,
    description: route.description,
    keywords: siteConfig.seoKeywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    alternates: {
      canonical: absoluteUrl(route.path),
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: absoluteUrl(route.path),
      siteName: siteConfig.name,
      title: route.title,
      description: route.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} | AI Product Builder | ${siteConfig.arabicName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: shouldIndex,
      follow: true,
      googleBot: {
        index: shouldIndex,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
