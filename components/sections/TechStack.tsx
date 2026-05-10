"use client";

import { Suspense, useRef } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { motion, useInView } from "framer-motion";

type TechLogo = {
  src: string;
  alt: string;
};

const techLogos = {
  nextjs: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    alt: "Next.js logo",
  },
  nodejs: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    alt: "Node.js logo",
  },
  react: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    alt: "React logo",
  },
  postgresql: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    alt: "PostgreSQL logo",
  },
  supabase: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
    alt: "Supabase logo",
  },
  openai: {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    alt: "OpenAI logo",
  },
  claude: {
    src: "https://cdn.simpleicons.org/claude/D97757",
    alt: "Claude logo",
  },
  graphql: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
    alt: "GraphQL logo",
  },
} satisfies Record<string, TechLogo>;

const technologies = [
  {
    name: "Next.js",
    level: 95,
    color: "hsl(var(--primary))",
    logo: techLogos.nextjs,
  },
  {
    name: "Node.js + Fastify",
    level: 92,
    color: "hsl(var(--accent))",
    logo: techLogos.nodejs,
  },
  {
    name: "React Native (Expo)",
    level: 88,
    color: "hsl(var(--primary))",
    logo: techLogos.react,
  },
  {
    name: "PostgreSQL + Supabase",
    level: 90,
    color: "hsl(var(--accent))",
    logo: techLogos.postgresql,
  },
  {
    name: "OpenAI + Claude API",
    level: 88,
    color: "hsl(var(--primary))",
    logo: techLogos.openai,
  },
  {
    name: "GraphQL",
    level: 85,
    color: "hsl(var(--accent))",
    logo: techLogos.graphql,
  },
];

const featuredTechnologies = [
  {
    logo: techLogos.nextjs,
    name: "Next.js",
    desc: "Frontend + Full-Stack",
  },
  {
    logo: techLogos.nodejs,
    name: "Node.js",
    desc: "Backend Runtime",
  },
  {
    logo: techLogos.react,
    name: "React Native",
    desc: "Mobile - iOS + Android",
  },
  {
    logo: techLogos.supabase,
    name: "Supabase",
    desc: "Database + Auth",
  },
  {
    logo: techLogos.openai,
    name: "OpenAI API",
    desc: "AI Layer",
  },
  {
    logo: techLogos.claude,
    name: "Claude API",
    desc: "AI Reasoning",
  },
];

const techIcons = [
  { name: "Next.js", x: -2, y: 1 },
  { name: "Node", x: 2, y: 0.5 },
  { name: "AI", x: 0, y: -1 },
  { name: "API", x: -1.5, y: -0.5 },
  { name: "DB", x: 1.5, y: 1.5 },
];

function FloatingIcon({ x, y }: { x: number; y: number }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={[x, y, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.3}
          emissive="#8b5cf6"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

function TechScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        {techIcons.map((icon) => (
          <FloatingIcon key={icon.name} x={icon.x} y={icon.y} />
        ))}
      </Suspense>
    </Canvas>
  );
}

function SkillBar({
  name,
  level,
  color,
  logo,
  delay,
  isInView,
}: {
  name: string;
  level: number;
  color: string;
  logo: TechLogo;
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="flex min-w-0 items-center gap-2 font-medium">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white p-1 shadow-sm">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={20}
              height={20}
              unoptimized
              className="h-5 w-5 object-contain"
            />
          </span>
          <span className="truncate">{name}</span>
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5, duration: 0.3 }}
          className="text-muted-foreground"
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, hsl(var(--accent)))`,
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            delay: delay + 0.2,
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </div>
    </motion.div>
  );
}

export function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <TechScene />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            The stack I reach for when a founder needs to move fast without
            breaking things.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            {technologies.map((tech, index) => (
              <SkillBar
                key={tech.name}
                name={tech.name}
                level={tech.level}
                color={tech.color}
                logo={tech.logo}
                delay={index * 0.1}
                isInView={isInView}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {featuredTechnologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  delay: 0.3 + index * 0.1,
                  duration: 0.5,
                  type: "spring",
                }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="rounded-lg border border-border bg-background/50 p-4 text-center backdrop-blur-sm"
              >
                <motion.div
                  className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-lg bg-white p-3 shadow-sm"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  <Image
                    src={tech.logo.src}
                    alt={tech.logo.alt}
                    width={32}
                    height={32}
                    unoptimized
                    className="h-8 w-8 object-contain"
                  />
                </motion.div>
                <p className="font-medium text-sm">{tech.name}</p>
                <p className="text-xs text-muted-foreground">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
