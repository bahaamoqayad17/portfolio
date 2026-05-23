import Link from "next/link";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/seo";

const socialLinks = [
  { icon: Github, href: siteConfig.social.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
];

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "MVP Build", href: "/services" },
      { label: "AI Engineering", href: "/services" },
      { label: "Technical Advisory", href: "/services" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold gradient-text">
                {siteConfig.name}
              </span>
              <span
                className="mt-1 block text-sm text-muted-foreground"
                lang="ar"
                dir="rtl"
              >
                {siteConfig.arabicName}
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-sm">
              AI Product Builder. I build AI & SaaS MVPs for founders - from
              validated idea to first paying users. Based in Gaza.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Bahaa El Moqayad. All rights
            reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built from Gaza. Shipped for founders worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
