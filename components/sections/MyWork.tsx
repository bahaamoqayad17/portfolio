"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "AI Appointment Setter",
    category: "AI SaaS MVP",
    description:
      "AI-powered appointment system for a service business. Built with a human-touch tone layer so customers could not tell they were talking to automation.",
    tech: ["Next.js", "Node.js", "OpenAI API", "Supabase"],
    metrics: [
      { label: "Bookings automated", value: "80%" },
      { label: "To Launch", value: "3 weeks" },
      { label: "Launch Signal", value: "10K+ impressions" },
    ],
    color: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    title: "SaaS MVP for Marketplace Founder",
    category: "SaaS MVP",
    description:
      "Marketplace platform built from a validated idea to first paying users. Scoped, designed, and shipped in a fixed timeline with fixed scope.",
    tech: ["Next.js", "Fastify", "GraphQL", "PostgreSQL"],
    metrics: [
      { label: "Weeks to first user", value: "5" },
      { label: "To Launch", value: "6 weeks" },
      { label: "Outcome", value: "3 paying users" },
    ],
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    id: 3,
    title: "Mobile App MVP",
    category: "Mobile MVP",
    description:
      "React Native app for an early-stage startup - iOS and Android from a single codebase. Shipped the V1 the founder had been told would take 6 months in under 4.",
    tech: ["React Native (Expo)", "Node.js", "Supabase", "Stripe"],
    metrics: [
      { label: "Timeline Saved", value: "2 months" },
      { label: "To Launch", value: "4 weeks" },
      { label: "Outcome", value: "Day 28 waitlist" },
    ],
    color: "from-orange-500/20 to-amber-500/20",
  },
  {
    id: 4,
    title: "AI Document Intelligence Tool",
    category: "AI Engineering",
    description:
      "RAG-based document intelligence system for a legal-adjacent workflow. Reduced the time to extract key information from hours to minutes per document.",
    tech: ["Next.js", "Claude API", "Supabase pgvector", "LangGraph"],
    metrics: [
      { label: "Time per task", value: "94% faster" },
      { label: "To Launch", value: "5 weeks" },
      { label: "Outcome", value: "Production" },
    ],
    color: "from-blue-500/20 to-indigo-500/20",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div
        className={`relative p-8 rounded-3xl bg-gradient-to-br ${project.color} border border-border/50 overflow-hidden transition-all duration-500 hover:border-primary/30`}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5"
          animate={{
            backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
          }}
          transition={{ duration: 2, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        />

        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.3 : 0.1,
          }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                {project.category}
              </span>
              <h3 className="mt-4 text-2xl font-bold">{project.title}</h3>
            </div>
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-full"
              >
                <Github className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-full"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          <p className="text-muted-foreground mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-full bg-background/50 border border-border/50"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <p className="text-xl font-bold gradient-text">
                  {metric.value}
                </p>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function MyWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-accent">
              Selected Builds
            </span>
          </motion.span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Products I Have <span className="gradient-text">Shipped</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            These are not prototypes. These are real products with real users -
            built from validated ideas in weeks, not months.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-8 group"
          >
            <Link href="/case-studies">
              View Case Studies
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
