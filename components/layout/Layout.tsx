import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingActions } from "@/components/ui/FloatingActions";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
