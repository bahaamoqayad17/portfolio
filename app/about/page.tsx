import { motion } from "@/components/motion/server-motion";
import Link from "next/link";
import { ArrowRight, Bot, Compass, Lightbulb, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AboutScene } from "@/components/3d/SceneIslands";
import { GlowingCard } from "@/components/ui/GlowingCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { TextReveal, WordReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StructuredData } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/about");

const roles = [
  {
    icon: Bot,
    title: "AI Product Builder",
    description:
      "I build AI-native products end-to-end - from architecture to production. Not demos. Real systems used by real people daily.",
    color: "hsl(var(--primary))",
  },
  {
    icon: Rocket,
    title: "SaaS MVP Architect",
    description:
      "I scope, design, and build SaaS MVPs in 3-6 weeks. Fixed timeline, fixed scope, real users on launch day.",
    color: "hsl(var(--accent))",
  },
  {
    icon: Compass,
    title: "Technical Co-Builder",
    description:
      "For non-technical founders, I am the technical partner they never had - making decisions, vetting developers, and shipping without drama.",
    color: "hsl(var(--primary))",
  },
  {
    icon: Lightbulb,
    title: "Validation Advisor",
    description:
      "Before we write a line of code, I help founders validate that someone will actually pay for what they are building. Most skip this. It costs them everything.",
    color: "hsl(var(--accent))",
  },
];

const stats = [
  { value: 7, suffix: "+", label: "Years Building" },
  { value: 15, suffix: "+", label: "Products Shipped" },
  { value: 3, suffix: "-6 wks", label: "Average MVP Timeline" },
  { value: 0, suffix: "->1", label: "Every Engagement" },
];

export default function About() {
  return (
    <>
      <StructuredData page="about" />

      <section className="pt-32 pb-24 relative overflow-hidden min-h-[70vh] flex items-center">
        <AboutScene />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <TextReveal>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Built from Gaza.{" "}
                <span className="gradient-text">
                  Shipped for founders worldwide.
                </span>
              </h1>
            </TextReveal>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 text-xl text-muted-foreground"
            >
              I am Bahaa El Moqayad - an AI Product Builder who has been
              shipping products from Gaza for 7+ years. Failed first. Figured
              it out. Now I help founders compress that journey.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-y border-border bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold gradient-text">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                <WordReveal text="How I Got Here" />
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  I did not get here in a straight line. My first product nearly
                  broke me. I spent months building something I was certain the
                  market needed. I never asked. When I finally showed it to a
                  potential user, they told me they already solved the problem
                  with a spreadsheet. That was the day everything changed.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  I rebuilt my entire approach. Validation first. Ship before it
                  is perfect. Build what users pay for - not what founders
                  assume they need. Since then I have helped founders build and
                  launch AI products, SaaS MVPs, and mobile applications that
                  reach real users - not just inboxes.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  I build from Gaza. That means power cuts, limited resources,
                  and no excuses. Building under real constraints taught me
                  something most developers never learn: every line of code has
                  to earn its place. Constraints are not obstacles - they are
                  filters. They cut everything that does not serve the user.
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <BorderBeam duration={6}>
                <div className="aspect-square p-8 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold mb-4">
                      &quot;The market does not care how good your product is.&quot;
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold gradient-text">
                      &quot;It cares how painful its current situation is.&quot;
                    </p>
                  </div>
                </div>
              </BorderBeam>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">
              What I <span className="gradient-text">Do</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Not a generalist. A specialist in one thing: taking founders from
              validated idea to working product.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlowingCard glowColor={role.color} className="h-full">
                  <div className="p-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-6">
                      <role.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {role.title}
                    </h3>
                    <p className="text-muted-foreground">{role.description}</p>
                  </div>
                </GlowingCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-glow-pulse" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Why I <span className="gradient-text">Do This</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              I have made the expensive mistakes. I built things nobody wanted.
              I hired wrong. I over-engineered. I missed the market. That
              experience is the only reason I am useful to founders now. Every
              mistake I made is a detour you do not have to take.
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
