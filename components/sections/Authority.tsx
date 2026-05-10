import { motion } from "@/components/motion/server-motion";
import { Code2, Users, Briefcase, Lightbulb } from "lucide-react";
import { GlowingCard } from "@/components/ui/GlowingCard";

const credentials = [
  {
    icon: Code2,
    title: "AI Product Builder",
    description:
      "I build AI-native products and SaaS MVPs end-to-end - from architecture to launch. No handoffs. No gaps.",
    color: "hsl(var(--primary))",
  },
  {
    icon: Users,
    title: "Validation Before Code",
    description:
      "Every build starts with a validated idea. I have seen what happens when it does not. It cost me months and real money to learn that lesson.",
    color: "hsl(var(--accent))",
  },
  {
    icon: Briefcase,
    title: "15+ Products Shipped",
    description:
      "Real products. Real users. Real constraints. Built from Gaza - which means shipping with less and delivering more.",
    color: "hsl(var(--primary))",
  },
  {
    icon: Lightbulb,
    title: "Founder-First Thinking",
    description:
      "I think about your business, not just your codebase. Every technical decision is a business decision first.",
    color: "hsl(var(--accent))",
  },
];

export function Authority() {
  const isInView = true;

  return (
    <section className="py-24 bg-card/30 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]"
        animate={{
          x: [0, -30, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Why Founders <span className="gradient-text">Work With Me</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            I build like a founder, not a freelancer. Technical execution
            backed by real product thinking.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
            >
              <GlowingCard glowColor={item.color} className="h-full">
                <div className="p-6">
                  <motion.div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <item.icon className="h-6 w-6" />
                  </motion.div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
