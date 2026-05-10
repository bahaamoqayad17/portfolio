import { ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
}

export function MagneticButton({
  children,
  className = "",
}: MagneticButtonProps) {
  return (
    <div className={`inline-block transition-transform hover:-translate-y-0.5 ${className}`}>
      {children}
    </div>
  );
}
