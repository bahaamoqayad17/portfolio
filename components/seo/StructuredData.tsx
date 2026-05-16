import { absoluteUrl, getRoute, siteConfig } from "@/lib/seo";

interface StructuredDataProps {
  page?: "home" | "about" | "services" | "contact" | "case-studies";
}

const pagePaths = {
  home: "/",
  about: "/about",
  services: "/services",
  contact: "/contact",
  "case-studies": "/case-studies",
} as const;

const pageNames = {
  home: "Home",
  about: "About",
  services: "Services",
  contact: "Contact",
  "case-studies": "Case Studies",
} as const;

export function StructuredData({ page = "home" }: StructuredDataProps) {
  const path = pagePaths[page];
  const route = getRoute(path);

  const personSchema = {
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: siteConfig.name,
    alternateName: siteConfig.arabicName,
    url: siteConfig.url,
    email: siteConfig.email,
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.instagram,
    ],
    jobTitle: "AI Product Builder",
    worksFor: {
      "@id": absoluteUrl("/#professional-service"),
    },
    description:
      "AI Product Builder and full-stack engineer helping founders turn validated ideas into AI and SaaS MVPs.",
    knowsAbout: [
      "AI Product Development",
      "SaaS MVP Development",
      "Full Stack Development",
      "Technical Advisory",
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Startup Validation",
      "تطوير MVP",
      "تطوير SaaS",
      "تطوير منتجات الذكاء الاصطناعي",
      "استشارات تقنية للشركات الناشئة",
      "شريك تقني للمؤسسين",
    ],
  };

  const professionalServiceSchema = {
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#professional-service"),
    name: `${siteConfig.name} - AI & SaaS MVP Development`,
    alternateName: `${siteConfig.arabicName} - تطوير MVP و SaaS`,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.icon),
    image: absoluteUrl(siteConfig.ogImage),
    description: siteConfig.description,
    founder: {
      "@id": absoluteUrl("/#person"),
    },
    areaServed: "Worldwide",
    email: siteConfig.email,
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI and SaaS Product Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "MVP Build",
            alternateName: "تطوير MVP",
            description:
              "Product scoping, full-stack development, deployment, and launch support for validated SaaS ideas.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Engineering",
            alternateName: "هندسة منتجات الذكاء الاصطناعي",
            description:
              "Production AI systems, LLM integrations, RAG pipelines, and AI-native product architecture.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Technical Advisory",
            alternateName: "استشارات تقنية للشركات الناشئة",
            description:
              "Architecture review, tech stack guidance, developer evaluation, and strategic technical support for founders.",
          },
        },
      ],
    },
  };

  const websiteSchema = {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    alternateName: siteConfig.arabicName,
    url: siteConfig.url,
    publisher: {
      "@id": absoluteUrl("/#person"),
    },
    inLanguage: "en-US",
  };

  const webPageSchema = {
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: route.title,
    description: route.description,
    inLanguage: "en-US",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.ogImage),
      width: 1200,
      height: 630,
    },
    isPartOf: {
      "@id": absoluteUrl("/#website"),
    },
    about: {
      "@id": absoluteUrl("/#person"),
    },
  };

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: absoluteUrl("/"),
    },
  ];

  if (page !== "home") {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: pageNames[page],
      item: absoluteUrl(path),
    });
  }

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumbs`,
    itemListElement: breadcrumbItems,
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      personSchema,
      professionalServiceSchema,
      websiteSchema,
      webPageSchema,
      breadcrumbSchema,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
