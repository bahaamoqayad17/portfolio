import { motion } from "@/components/motion/server-motion";
import Link from "next/link";
import { ArrowRight, Bot, Compass, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Rocket,
    title: "MVP Build",
    description:
      "From validated idea to working product. Fixed scope, fixed timeline, real users on the other side.",
    features: [
      "Idea scoping and validation",
      "Full-stack AI and SaaS development",
      "Launch and first-user support",
    ],
    cta: "Start Building",
  },
  {
    icon: Bot,
    title: "AI Engineering",
    description:
      "AI that works in production - not just demos. RAG systems, LLM pipelines, AI-native product architecture.",
    features: [
      "AI product architecture",
      "OpenAI and Claude API integration",
      "Production-ready AI systems",
    ],
    cta: "Build With AI",
  },
  {
    icon: Compass,
    title: "Technical Advisory",
    description:
      "Strategic guidance for non-technical founders making product and hiring decisions. No code required.",
    features: [
      "MVP scoping and validation",
      "Developer hiring and vetting",
      "Tech stack decisions",
    ],
    cta: "Get Clarity",
  },
];

export function Services() {
  const isInView = true;

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            How I Build <span className="gradient-text">With Founders</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Three ways to work together depending on where you are and what you
            need to build.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative p-8 rounded-2xl bg-card border border-border card-hover gradient-border"
            >
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full group/btn"
                >
                  <Link href="/contact">
                    {service.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
