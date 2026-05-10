import { type CSSProperties, ReactNode } from "react";

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowingCard({
  children,
  className = "",
  glowColor = "hsl(var(--primary))",
}: GlowingCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] ${className}`}
      style={{ "--glow-color": glowColor } as CSSProperties}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at 50% 0%, ${glowColor} / 0.12, transparent 45%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
