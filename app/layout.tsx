import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Full Stack Developer Portfolio',
  description: 'Portfolio of a skilled Full Stack JavaScript Developer with expertise in modern web technologies',
  keywords: 'full stack developer, javascript, typescript, react, nextjs, nodejs, web development',
  authors: [{ name: 'Full Stack Developer' }],
  creator: 'Full Stack Developer',
  openGraph: {
    title: 'Full Stack Developer Portfolio',
    description: 'Portfolio of a skilled Full Stack JavaScript Developer with expertise in modern web technologies',
    url: 'https://portfolio.example.com',
    siteName: 'Full Stack Developer Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Full Stack Developer Portfolio',
    description: 'Portfolio of a skilled Full Stack JavaScript Developer with expertise in modern web technologies',
    creator: '@fullstackdev',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
