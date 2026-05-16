import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { FloatingActions } from "@/components/ui/FloatingActions";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { siteConfig } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  category: "Technology",
  title: {
    default: siteConfig.title,
    template: "%s",
  },
  description: siteConfig.description,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  keywords: siteConfig.seoKeywords,
  icons: {
    icon: [
      {
        url: siteConfig.icon,
        type: "image/svg+xml",
      },
    ],
    shortcut: siteConfig.icon,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
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
    creator: "@bahaamoqayad17",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="antialiased">
        <SpeedInsights />
        <Analytics />

        <Providers>
          <div className="min-h-screen flex flex-col relative">
            <AnimatedBackground />
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
            <FloatingActions />
          </div>
        </Providers>
      </body>
    </html>
  );
}
