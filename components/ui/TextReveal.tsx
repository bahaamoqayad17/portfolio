import { ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
}

export function TextReveal({ children, delay = 0 }: TextRevealProps) {
  return (
    <div className="overflow-hidden">
      <div
        className="motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:fade-in-0"
        style={{ animationDelay: `${delay}s`, animationDuration: "800ms" }}
      >
        {children}
      </div>
    </div>
  );
}

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function WordReveal({
  text,
  className = "",
  delay = 0,
}: WordRevealProps) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <span
            className="inline-block motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:fade-in-0"
            style={{
              animationDelay: `${delay + index * 0.1}s`,
              animationDuration: "500ms",
            }}
          >
            {word}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
}
