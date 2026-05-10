"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  MotionValue,
} from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { useTheme } from "@/hooks/use-theme";

interface FloatingOrbProps {
  size: number;
  x: string;
  y: string;
  delay?: number;
  duration?: number;
  colorClass?: string;
  intensity?: number;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  scrollY: MotionValue<number>;
  depth?: number;
}

function FloatingOrb({
  size,
  x,
  y,
  delay = 0,
  duration = 20,
  colorClass = "bg-primary/20",
  intensity = 100,
  parallaxX,
  parallaxY,
  scrollY,
  depth = 1,
}: FloatingOrbProps) {
  const tx = useTransform(parallaxX, (v) => v * depth);
  const ty = useTransform(parallaxY, (v) => v * depth);
  const sy = useTransform(scrollY, (v) => v * depth * 0.3);

  return (
    <motion.div
      className={`absolute rounded-full ${colorClass} will-change-transform`}
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        filter: `blur(${intensity}px)`,
        x: tx,
        y: useTransform([ty, sy], ([a, b]: number[]) => a + b),
      }}
    >
      <motion.div
        className="w-full h-full rounded-full"
        style={{ background: "inherit" }}
        animate={{
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.4, 0.7, 0.4, 0.4],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

function Particles({
  count,
  isDark,
  parallaxX,
  parallaxY,
  scrollY,
}: {
  count: number;
  isDark: boolean;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  scrollY: MotionValue<number>;
}) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 10,
        depth: Math.random() * 0.6 + 0.2,
        color: i % 3 === 0 ? "primary" : i % 3 === 1 ? "accent" : "primary",
      })),
    [count],
  );

  return (
    <>
      {particles.map((p) => (
        <ParticleDot
          key={p.id}
          p={p}
          isDark={isDark}
          parallaxX={parallaxX}
          parallaxY={parallaxY}
          scrollY={scrollY}
        />
      ))}
    </>
  );
}

function ParticleDot({
  p,
  isDark,
  parallaxX,
  parallaxY,
  scrollY,
}: {
  p: {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    depth: number;
    color: string;
  };
  isDark: boolean;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  scrollY: MotionValue<number>;
}) {
  const tx = useTransform(parallaxX, (v) => v * p.depth * 1.5);
  const ty = useTransform(
    [parallaxY, scrollY] as MotionValue<number>[],
    ([a, b]: number[]) => a * p.depth * 1.5 + b * p.depth * 0.5,
  );

  return (
    <motion.div
      className={`absolute rounded-full will-change-transform ${
        p.color === "accent" ? "bg-accent" : "bg-primary"
      }`}
      style={{
        width: p.size,
        height: p.size,
        left: `${p.x}%`,
        top: `${p.y}%`,
        x: tx,
        y: ty,
        boxShadow: isDark
          ? `0 0 ${p.size * 6}px hsl(var(--${p.color})), 0 0 ${p.size * 12}px hsl(var(--${p.color}) / 0.6)`
          : `0 0 ${p.size * 3}px hsl(var(--${p.color}) / 0.5)`,
      }}
    >
      <motion.div
        className="w-full h-full rounded-full"
        style={{ background: "inherit" }}
        animate={{
          opacity: isDark ? [0.4, 1, 0.4] : [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: p.duration,
          delay: p.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

export function AnimatedBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);

  // Mouse parallax (smoothed via spring)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, {
    stiffness: 40,
    damping: 20,
    mass: 0.8,
  });
  const parallaxY = useSpring(mouseY, {
    stiffness: 40,
    damping: 20,
    mass: 0.8,
  });

  // Scroll parallax
  const { scrollY: rawScrollY } = useScroll();
  const scrollY = useSpring(rawScrollY, {
    stiffness: 60,
    damping: 25,
    mass: 0.5,
  });

  useEffect(() => {
    setMounted(true);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    let frame = 0;
    let pending = false;
    let lastX = 0;
    let lastY = 0;

    const handleMouse = (e: MouseEvent) => {
      lastX = (e.clientX / window.innerWidth - 0.5) * 60;
      lastY = (e.clientY / window.innerHeight - 0.5) * 60;
      if (!pending) {
        pending = true;
        frame = requestAnimationFrame(() => {
          mouseX.set(lastX);
          mouseY.set(lastY);
          pending = false;
        });
      }
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(frame);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient mesh */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-gradient-to-br from-background via-background to-primary/10"
            : "bg-gradient-to-br from-background via-background to-primary/5"
        }`}
      />

      {/* Floating orbs - more intense in dark mode */}
      <FloatingOrb
        size={isDark ? 700 : 600}
        x="-10%"
        y="-20%"
        delay={0}
        duration={25}
        colorClass={isDark ? "bg-primary/40" : "bg-primary/20"}
        intensity={isDark ? 130 : 100}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        scrollY={scrollY}
        depth={1.2}
      />
      <FloatingOrb
        size={isDark ? 500 : 400}
        x="70%"
        y="60%"
        delay={5}
        duration={20}
        colorClass={isDark ? "bg-accent/35" : "bg-primary/20"}
        intensity={isDark ? 130 : 100}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        scrollY={scrollY}
        depth={0.8}
      />
      <FloatingOrb
        size={isDark ? 400 : 300}
        x="40%"
        y="10%"
        delay={10}
        duration={22}
        colorClass={isDark ? "bg-primary/30" : "bg-primary/20"}
        intensity={isDark ? 120 : 100}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        scrollY={scrollY}
        depth={1.5}
      />

      {/* Accent orb */}
      <FloatingOrb
        size={isDark ? 600 : 500}
        x="80%"
        y="50%"
        delay={2}
        duration={18}
        colorClass={isDark ? "bg-accent/25" : "bg-accent/10"}
        intensity={isDark ? 140 : 120}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        scrollY={scrollY}
        depth={0.6}
      />

      {/* Glowing particles - many more in dark mode */}
      {mounted && (
        <Particles
          count={isDark ? 60 : 20}
          isDark={isDark}
          parallaxX={parallaxX}
          parallaxY={parallaxY}
          scrollY={scrollY}
        />
      )}

      {/* Grid overlay */}
      <div
        className={`absolute inset-0 ${isDark ? "opacity-[0.04]" : "opacity-[0.02]"}`}
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </div>
  );
}
