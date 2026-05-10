"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote:
      "Bahaa told me not to build something before we had even talked about the product. That conversation saved me from wasting three months.",
    author: "[Founder Name]",
    role: "Founder, [Industry] Startup",
    rating: 5,
  },
  {
    quote:
      "I had been burned by two developers before working with Bahaa. He scoped the project in a way I actually understood and shipped on the timeline he promised.",
    author: "[Founder Name]",
    role: "Non-Technical Founder",
    rating: 5,
  },
  {
    quote:
      "What I did not expect was how much he thought about the business, not just the code. Every decision came with a reason that made sense for where we were.",
    author: "[Founder Name]",
    role: "CEO, SaaS Startup",
    rating: 5,
  },
  {
    quote:
      "He built the AI layer I had been told was too complex for an MVP. It was not. It was in production in 5 weeks.",
    author: "[Founder Name]",
    role: "Founder, AI Product",
    rating: 5,
  },
];

function FlipCard({
  testimonial,
  isActive,
  direction,
}: {
  testimonial: (typeof testimonials)[0];
  isActive: boolean;
  direction: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full h-[300px] perspective-1000"
      initial={{
        opacity: 0,
        rotateY: direction > 0 ? 90 : -90,
        scale: 0.8,
      }}
      animate={{
        opacity: isActive ? 1 : 0,
        rotateY: 0,
        scale: isActive ? 1 : 0.8,
      }}
      exit={{
        opacity: 0,
        rotateY: direction > 0 ? -90 : 90,
        scale: 0.8,
      }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="absolute inset-0 p-8 rounded-2xl bg-card border border-border backface-hidden"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <Quote className="h-10 w-10 text-primary/30 mb-4" />
        <p className="text-lg leading-relaxed mb-6">
          &quot;{testimonial.quote}&quot;
        </p>
        <div className="flex items-center gap-4">
          <motion.div
            className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-lg font-bold text-white">
              {testimonial.author.charAt(1) || "F"}
            </span>
          </motion.div>
          <div>
            <p className="font-semibold">{testimonial.author}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 p-8 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 backface-hidden flex flex-col items-center justify-center"
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.6 }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="flex gap-1 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-2xl"
            >
              *
            </motion.span>
          ))}
        </div>
        <p className="text-center text-lg font-semibold gradient-text">
          {testimonial.rating}/5 Rating
        </p>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Replace with real client testimonial before launch
        </p>
      </motion.div>
    </motion.div>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            What Founders <span className="gradient-text">Say</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            From the people who trusted me with their ideas.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <FlipCard
                key={currentIndex}
                testimonial={testimonials[currentIndex]}
                isActive={true}
                direction={direction}
              />
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={goToPrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-primary" : "bg-muted"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={goToNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                i === currentIndex
                  ? "bg-primary/10 border-primary/30"
                  : "bg-card border-border hover:border-primary/20"
              }`}
              whileHover={{ y: -2 }}
              onClick={() => {
                setIsAutoPlaying(false);
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                  {t.author.charAt(1) || "F"}
                </div>
                <span className="text-xs font-medium truncate">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
