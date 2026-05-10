import { ReactNode } from "react";

interface BorderBeamProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  children,
  className = "",
  duration = 8,
  colorFrom = "hsl(var(--primary))",
  colorTo = "hsl(var(--accent))",
}: BorderBeamProps) {
  return (
    <div className={`relative rounded-2xl ${className}`}>
      {/* Animated border */}
      <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, ${colorFrom}, ${colorTo}, ${colorFrom})`,
            animation: `spin ${duration}s linear infinite`,
          }}
        />
      </div>

      {/* Inner content with background */}
      <div className="relative bg-card rounded-2xl">{children}</div>
    </div>
  );
}
