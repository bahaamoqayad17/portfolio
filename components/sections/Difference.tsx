import { motion } from "@/components/motion/server-motion";
import { Shield, Target, TrendingUp, Zap } from "lucide-react";

const differences = [
  {
    icon: Zap,
    title: "Builder Mindset, Not Freelancer Mindset",
    description:
      "I think like a founder because I am one. Every decision I make is a business decision first, a technical decision second.",
  },
  {
    icon: Target,
    title: "Validation Before a Single Line of Code",
    description:
      "I will tell you not to build before I tell you how to build. That conversation has saved founders months and real money.",
  },
  {
    icon: TrendingUp,
    title: "Shipped Under Real Constraints",
    description:
      "Gaza taught me to do more with less. That shows up in every product I build - lean, focused, and launched on time.",
  },
  {
    icon: Shield,
    title: "No Over-Engineering",
    description:
      "I build what your users need in V1. Not what sounds impressive in a pitch deck. The architecture scales when the users demand it.",
  },
];

export function Difference() {
  const isInView = true;

  return (
    <section className="py-24 bg-card/30 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold">
              What Makes This <span className="gradient-text">Different</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              I am not a freelancer who takes a spec and disappears. I am a
              builder who has failed, rebuilt, and shipped - and I bring that
              entire history to every product I touch.
            </p>
            <p className="mt-4 text-muted-foreground">
              Building from Gaza means I ship under real constraints. Power
              cuts. Limited resources. No co-founder. No office. Still shipped.
              If you want someone who knows how to do more with less - that is
              exactly what I offer.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {differences.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="p-6 rounded-xl bg-background border border-border"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
