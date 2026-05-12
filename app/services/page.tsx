import { motion } from "@/components/motion/server-motion";
import Link from "next/link";
import { ArrowRight, Bot, Check, Compass, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServicesScene } from "@/components/3d/SceneIslands";
import { GlowingCard } from "@/components/ui/GlowingCard";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StructuredData } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/services");

const services = [
  {
    icon: Rocket,
    title: "MVP Build",
    tagline: "From validated idea to first paying users",
    description:
      "I take founders from a validated idea to a working product - in 3 to 6 weeks. Fixed scope. Fixed timeline. Real users on launch day. No scope creep. No disappearing. No hand-holding required.",
    whoFor: [
      "Non-technical founders with a validated idea",
      "Founders who have been burned by developers and need a trusted partner",
      "Startups that need to launch before their runway runs out",
    ],
    whatYouGet: [
      "Product scoping and validation check",
      "Full-stack AI or SaaS development",
      "Database, API, and auth architecture",
      "Deployment and launch support",
      "First-user iteration sprint",
    ],
    outcome: "A working product in your users' hands. Not a prototype. A product.",
    cta: "Start Building",
    color: "hsl(var(--primary))",
  },
  {
    icon: Bot,
    title: "AI Engineering",
    tagline: "AI that works in production, not just demos",
    description:
      "I build AI systems that handle real users, real edge cases, and real failure modes. RAG pipelines, LLM integrations, AI-native architectures. The gap between a demo and a production system is where most AI projects die. I close that gap.",
    whoFor: [
      "Founders building AI-native products",
      "Startups adding a real AI layer to an existing product",
      "Companies with an AI demo that needs to become a product",
    ],
    whatYouGet: [
      "AI product architecture and framework selection",
      "OpenAI, Claude, and custom LLM pipeline integration",
      "RAG system design and implementation",
      "Prompt engineering for production",
      "Observability, logging, and cost controls",
    ],
    outcome:
      "An AI feature or product that works reliably with real users - not just in your test environment.",
    cta: "Build With AI",
    color: "hsl(var(--accent))",
  },
  {
    icon: Compass,
    title: "Technical Advisory",
    tagline: "Strategic clarity for non-technical founders",
    description:
      "You do not need to become technical. You need to make better technical decisions. I help non-technical founders scope ideas, evaluate developers, choose stacks, and avoid the expensive mistakes I made so they do not have to.",
    whoFor: [
      "Non-technical founders before their first technical hire",
      "Founders evaluating a developer or an agency",
      "Startups that launched but are stuck between product and growth",
    ],
    whatYouGet: [
      "MVP scoping and validation check before you spend a dollar on development",
      "Developer evaluation and hiring checklist",
      "Tech stack recommendation for your specific situation",
      "Architecture review of existing products",
      "Monthly advisory retainer option",
    ],
    outcome: "Confidence in your technical direction. A clear path forward. No more guessing.",
    cta: "Get Clarity",
    color: "hsl(var(--primary))",
  },
];

export default function ServicesPage() {
  return (
    <>
      <StructuredData page="services" />

      <section className="pt-32 pb-24 relative overflow-hidden min-h-[60vh] flex items-center">
        <ServicesScene />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <TextReveal>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Three ways to{" "}
                <span className="gradient-text">build with me</span>
              </h1>
            </TextReveal>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 text-xl text-muted-foreground"
            >
              Every engagement starts with a free 30-minute call. I will tell
              you which option fits your stage - and if none of them do, I will
              tell you that too.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="grid lg:grid-cols-2 gap-12 items-start"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                    <service.icon className="h-8 w-8" />
                  </div>

                  <h2 className="text-3xl font-bold mb-2">{service.title}</h2>
                  <p className="text-primary font-medium mb-4">
                    {service.tagline}
                  </p>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Who it is for:</h4>
                    <ul className="space-y-2">
                      {service.whoFor.map((item) => (
                        <li
                          key={item}
                          className="flex items-center text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mr-3" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <MagneticButton>
                    <Button asChild className="rounded-full px-6 group">
                      <Link href="/contact">
                        {service.cta}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </MagneticButton>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <GlowingCard glowColor={service.color}>
                    <div className="p-8">
                      <h4 className="font-semibold mb-4">What you get:</h4>
                      <ul className="space-y-3 mb-8">
                        {service.whatYouGet.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <BorderBeam duration={8}>
                        <div className="p-4 bg-primary/5">
                          <p className="text-sm font-medium text-primary">
                            Expected Outcome
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {service.outcome}
                          </p>
                        </div>
                      </BorderBeam>
                    </div>
                  </GlowingCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card/30 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-glow-pulse" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Not sure which is{" "}
              <span className="gradient-text">right for you?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Book a free 30-minute call. I will listen to where you are, tell
              you exactly what I would do next, and propose the right engagement
              - or tell you honestly if none of them fit.
            </p>
            <MagneticButton>
              <Button asChild size="lg" className="rounded-full px-8 group">
                <Link href="/contact">
                  Book a Free Call
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
