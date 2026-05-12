"use client";

import dynamic from "next/dynamic";

function SceneFallback() {
  return <div className="absolute inset-0 -z-10 hero-gradient" />;
}

export const HeroScene = dynamic(
  () => import("./HeroScene").then((mod) => mod.HeroScene),
  { ssr: false, loading: SceneFallback },
);

export const AboutScene = dynamic(
  () => import("./AboutScene").then((mod) => mod.AboutScene),
  { ssr: false, loading: SceneFallback },
);

export const ServicesScene = dynamic(
  () => import("./ServicesScene").then((mod) => mod.ServicesScene),
  { ssr: false, loading: SceneFallback },
);

export const CaseStudiesScene = dynamic(
  () => import("./CaseStudiesScene").then((mod) => mod.CaseStudiesScene),
  { ssr: false, loading: SceneFallback },
);

export const ContactScene = dynamic(
  () => import("./ContactScene").then((mod) => mod.ContactScene),
  { ssr: false, loading: SceneFallback },
);

export const FloatingShapes = dynamic(
  () => import("./FloatingShapes").then((mod) => mod.FloatingShapes),
  { ssr: false, loading: SceneFallback },
);
