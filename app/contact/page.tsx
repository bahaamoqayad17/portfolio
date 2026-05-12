import { Calendar, Linkedin, Mail, MessageSquare } from "lucide-react";
import { ContactScene } from "@/components/3d/SceneIslands";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { GlowingCard } from "@/components/ui/GlowingCard";
import { TextReveal } from "@/components/ui/TextReveal";
import { StructuredData } from "@/components/seo/StructuredData";
import { ContactForm } from "./_components/ContactForm";
import { createPageMetadata, siteConfig } from "@/lib/seo";

export const metadata = createPageMetadata("/contact");

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "Fastest way to reach me",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    description: "Where I am most active",
    value: "linkedin.com/in/bahaamoqayad17",
    href: siteConfig.social.linkedin,
  },
  {
    icon: Calendar,
    title: "Free Strategy Call",
    description: "30 minutes, no pitch",
    value: "Book on Calendly",
    href: siteConfig.calendly,
  },
];

const expectations = [
  "I respond within 24 hours - usually faster",
  "The first call is free. 30 minutes. No pitch, no pressure.",
  "I will tell you honestly if I am the right fit - or point you toward someone who is",
  "If we move forward, you get a clear scope document before anything is signed",
];

export default function Contact() {
  return (
    <>
      <StructuredData page="contact" />

      <section className="pt-32 pb-24 relative overflow-hidden min-h-[50vh] flex items-center">
        <ContactScene />
        <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <TextReveal>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Let&apos;s talk about{" "}
                <span className="gradient-text">your product</span>
              </h1>
            </TextReveal>
            <p className="mt-6 text-xl text-muted-foreground">
              If you have a validated idea and you need a technical partner to
              build it - or if you need help figuring out what to build first -
              this is where that starts.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <ContactForm />

            <div className="lg:pl-8">
              <h2 className="text-2xl font-bold mb-6">Other ways to connect</h2>
              <div className="space-y-6">
                {contactMethods.map((method) => (
                  <GlowingCard key={method.title}>
                    <a
                      href={method.href}
                      target={
                        method.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        method.href.startsWith("http")
                          ? "noreferrer"
                          : undefined
                      }
                      className="flex items-start gap-4 p-6"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-transform hover:scale-105">
                        <method.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{method.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          {method.description}
                        </p>
                        <p className="text-sm text-primary">{method.value}</p>
                      </div>
                    </a>
                  </GlowingCard>
                ))}
              </div>

              <div className="mt-12">
                <BorderBeam duration={10}>
                  <div className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
                    <MessageSquare className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      What happens next
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {expectations.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </BorderBeam>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
