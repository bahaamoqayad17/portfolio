import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bahaa El Moqayad",
  description:
    "Portfolio of a skilled Full Stack JavaScript Developer with expertise in modern web technologies",
  keywords:
    "full stack developer, javascript, typescript, react, nextjs, nodejs, web development",
  authors: [{ name: "Bahaa El Moqayad" }],
  creator: "Bahaa El Moqayad",
  openGraph: {
    title: "Bahaa El Moqayad Portfolio",
    description:
      "Portfolio of a skilled Full Stack JavaScript Developer with expertise in modern web technologies",
    url: "https://bahaamoqayad17.com",
    siteName: "Bahaa El Moqayad Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bahaa El Moqayad",
    description:
      "Portfolio of a skilled Full Stack JavaScript Developer with expertise in modern web technologies",
    creator: "@fullstackdev",
  },
  robots: {
    index: true,
    follow: true,
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
