import { motion } from "@/components/motion/server-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaseStudiesScene } from "@/components/3d/SceneIslands";
import { GlowingCard } from "@/components/ui/GlowingCard";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { StructuredData } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/case-studies");

const caseStudies = [
  {
    title: "AI Appointment Setter",
    category: "AI SaaS MVP",
    problem:
      "A service business founder needed to automate appointment booking without losing the human feel. Their clients expected a real person on the other end.",
    constraints:
      "3-week launch deadline, no technical team, limited budget, product had to feel human or clients would reject it.",
    approach:
      "Built a tone layer on top of the AI logic that matched the founder's natural communication style. Tested with real clients before launch. Iterated the dialogue flow twice before going live.",
    outcome:
      "Launched in 18 days. 80% of bookings now handled without human involvement. The founder's first post about it hit 10K+ impressions.",
    metrics: [
      { value: 18, suffix: " days", label: "Days to Launch" },
      { value: 80, suffix: "%", label: "Bookings Automated" },
      { value: 10, suffix: "K+", label: "Launch Post Impressions" },
    ],
    color: "hsl(var(--primary))",
  },
  {
    title: "SaaS MVP for Marketplace Founder",
    category: "SaaS MVP Build",
    problem:
      "A non-technical founder had a validated marketplace idea and had been quoted 6-9 months by two different agencies.",
    constraints:
      "The founder had a limited runway and needed to show traction to investors. Every week counted.",
    approach:
      "Scoped the V1 down to the single core flow that would prove the idea - and cut everything else. Built the backend, frontend, and payments in parallel. Deployed incrementally, testing core flows weekly.",
    outcome:
      "Shipped in 6 weeks. First 3 paying users before the public launch. Founder used the traction to open investor conversations.",
    metrics: [
      { value: 6, suffix: " weeks", label: "Time to Launch" },
      { value: 3, suffix: "", label: "Paying Users Before Launch" },
      { value: 0, suffix: "", label: "Unneeded V1 Features" },
    ],
    color: "hsl(var(--accent))",
  },
  {
    title: "Non-Technical Founder Advisory",
    category: "Technical Advisory",
    problem:
      "A first-time founder was about to sign a $40,000 contract with a development agency. They had no technical co-founder, no scope document, and no way to evaluate what they were buying.",
    constraints:
      "The founder had already invested 3 months in the agency relationship and felt pressure to commit. They needed a clear-eyed external view fast.",
    approach:
      "Ran a full scope review of the agency's proposal. Found 4 major gaps: no validation step, over-engineered V1, no IP protection clause, and no milestone-based payment structure. Rebuilt the brief into a one-page V1 scope and negotiated a revised contract.",
    outcome:
      "Founder renegotiated the engagement to a milestone structure, saved $15,000 in scope reduction, and launched a smaller product that actually validated the idea first.",
    metrics: [
      { value: 15, suffix: "K", label: "Saved in Scope Reduction" },
      { value: 4, suffix: "", label: "Contract Gaps Identified" },
      { value: 6, suffix: " weeks", label: "V1 Timeline After Rescoping" },
    ],
    color: "hsl(var(--primary))",
  },
];

export default function CaseStudies() {
  return (
    <>
      <StructuredData page="case-studies" />

      <section className="pt-32 pb-24 relative overflow-hidden min-h-[60vh] flex items-center">
        <CaseStudiesScene />
        <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-accent/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <TextReveal>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Products built.{" "}
                <span className="gradient-text">Problems solved.</span>
              </h1>
            </TextReveal>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 text-xl text-muted-foreground"
            >
              Every case study here is a real product - with a real founder,
              real constraints, and a real result. Not prototypes. Not course
              projects.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {caseStudies.map((study) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <GlowingCard glowColor={study.color}>
                  <article className="p-8 md:p-12">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                      <span className="px-4 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary">
                        {study.category}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold">
                        {study.title}
                      </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        {[
                          { title: "The Problem", content: study.problem },
                          { title: "Constraints", content: study.constraints },
                          { title: "Approach", content: study.approach },
                        ].map((section) => (
                          <div key={section.title}>
                            <h3 className="font-semibold text-primary mb-2">
                              {section.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {section.content}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div>
                        <div className="mb-8">
                          <h3 className="font-semibold text-primary mb-2">
                            Outcome
                          </h3>
                          <p className="text-muted-foreground">
                            {study.outcome}
                          </p>
                        </div>

                        <BorderBeam duration={8}>
                          <div className="grid grid-cols-3 gap-4 p-4">
                            {study.metrics.map((metric) => (
                              <div key={metric.label} className="text-center">
                                <div className="text-xl font-bold gradient-text">
                                  <AnimatedCounter
                                    end={metric.value}
                                    suffix={metric.suffix}
                                    duration={2}
                                  />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {metric.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        </BorderBeam>
                      </div>
                    </div>
                  </article>
                </GlowingCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card/30 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-glow-pulse" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Have an idea that is{" "}
              <span className="gradient-text">ready to build?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Every product I have built started with a 30-minute conversation.
              That conversation is free, there is no pitch, and you leave with
              a clear view of what to do next - whether that is working with me
              or not.
            </p>
            <MagneticButton>
              <Button asChild size="lg" className="rounded-full px-8 group">
                <Link href="/contact">
                  Book a Free Strategy Call
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
