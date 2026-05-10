import { Hero } from "@/components/sections/Hero";
import { Authority } from "@/components/sections/Authority";
import { Services } from "@/components/sections/Services";
import { MyWork } from "@/components/sections/MyWork";
import { TechStack } from "@/components/sections/TechStack";
import { Difference } from "@/components/sections/Difference";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { StructuredData } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/");

const Index = () => {
  return (
    <>
      <StructuredData page="home" />
      <Hero />
      <Authority />
      <TechStack />
      <MyWork />
      <Services />
      <Difference />
      <Testimonials />
      <CTA />
    </>
  );
};

export default Index;
