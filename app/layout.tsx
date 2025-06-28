import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StructuredData from "./components/StructuredData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Bahaa El Moqayad - Lead Full-Stack Engineer",
    template: "%s | Bahaa El Moqayad",
  },
  description:
    "Experienced Lead Full-Stack Engineer specializing in React, Next.js, React Native, and Node.js. 5+ years building scalable web and mobile applications. Based in Gaza, Palestine. Available for freelance projects and full-time opportunities.",
  keywords: [
    // Personal & Location
    "Bahaa El Moqayad",
    "Gaza Palestine Developer",
    "Palestine Software Engineer",
    "Middle East Developer",
    "Remote Developer",
    "Freelance Developer",

    // Professional Titles
    "Lead Full-Stack Engineer",
    "Full Stack Developer",
    "Software Engineer",
    "Computer Science Graduate",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Mobile App Developer",
    "Desktop Application Developer",

    // Core Technologies
    "JavaScript Developer",
    "TypeScript Developer",
    "React Developer",
    "React.js",
    "Next.js Developer",
    "Next.js",
    "Node.js Developer",
    "Node.js",
    "React Native Developer",
    "React Native",

    // Frontend Frameworks & Libraries
    "React Hooks",
    "React Context",
    "React Router",
    "Material UI",
    "MUI",
    "Tailwind CSS",
    "CSS-in-JS",
    "Styled Components",
    "Framer Motion",
    "Animation Libraries",

    // Backend Technologies
    "Fastify",
    "Express.js",
    "REST API",
    "GraphQL",
    "API Development",
    "Server-side Development",
    "Microservices",

    // Mobile Development
    "Expo",
    "React Native Paper",
    "NativeWind",
    "Cross-platform Mobile",
    "iOS Development",
    "Android Development",
    "Mobile UI/UX",

    // Desktop Development
    "Electron.js",
    "Tauri",
    "Desktop Applications",
    "Cross-platform Desktop",

    // Databases & Tools
    "MongoDB",
    "Database Design",
    "NoSQL",
    "Git",
    "Version Control",
    "npm",
    "Yarn",
    "Package Management",

    // Development Practices
    "Clean Code",
    "Scalable Applications",
    "Performance Optimization",
    "Responsive Design",
    "Mobile-first Design",
    "Accessibility",
    "User Experience",
    "UI/UX Design",

    // Computer Science Concepts
    "Data Structures",
    "Algorithms",
    "Software Architecture",
    "Design Patterns",
    "Object-oriented Programming",
    "Functional Programming",
    "Computer Science",
    "Software Engineering Principles",

    // Industry Terms
    "SaaS Development",
    "MVP Development",
    "Startup Technology",
    "E-commerce Development",
    "Portfolio Website",
    "Custom Software Solutions",
    "Technology Consulting",

    // Soft Skills & Services
    "Problem Solving",
    "Technical Leadership",
    "Code Review",
    "Mentoring",
    "Project Management",
    "Client Communication",
    "Requirement Analysis",
    "Technical Documentation",
  ].join(", "),
  authors: [{ name: "Bahaa El Moqayad", url: "https://bahaamoqayad17.com" }],
  creator: "Bahaa El Moqayad",
  publisher: "Bahaa El Moqayad",
  category: "Technology",
  classification: "Portfolio Website",
  metadataBase: new URL("https://bahaamoqayad17.com"),
  alternates: {
    canonical: "https://bahaamoqayad17.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bahaamoqayad17.com",
    siteName: "Bahaa El Moqayad - Lead Full-Stack Engineer Portfolio",
    title: "Bahaa El Moqayad - Lead Full-Stack Engineer",
    description:
      "Experienced Lead Full-Stack Engineer specializing in React, Next.js, React Native, and Node.js. 5+ years building scalable web and mobile applications. Based in Gaza, Palestine.",
    images: [
      {
        url: "/bahaa.jpg",
        width: 1200,
        height: 630,
        alt: "Bahaa El Moqayad - Lead Full-Stack Engineer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@fullstackdev",
    creator: "@fullstackdev",
    title: "Bahaa El Moqayad - Lead Full-Stack Engineer",
    description:
      "Experienced Lead Full-Stack Engineer specializing in React, Next.js, React Native, and Node.js. 5+ years building scalable applications.",
    images: ["/bahaa.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these when you set up Google Search Console and Bing Webmaster Tools
    // google: "your-google-verification-code",
    // bing: "your-bing-verification-code",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "theme-color": "#000000",
    "color-scheme": "dark light",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
        <StructuredData />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
