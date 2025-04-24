"use client";

import {
  Box,
  Typography,
  useTheme,
  Container,
  Avatar,
  Rating,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";
import { createGradientBackground } from "../theme";

const TestimonialCard = ({ testimonial }) => {
  return (
    <Box
      id="testimonials"
      sx={{
        background: createGradientBackground(135),
        borderRadius: 4,
        p: 4,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        maxWidth: 600,
        mx: "auto",
        textAlign: "center",
      }}
    >
      <Avatar
        src={testimonial.image}
        alt={testimonial.name}
        sx={{
          width: 80,
          height: 80,
          mx: "auto",
          mb: 2,
          objectFit: "contain",
        }}
      />
      <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
      <Typography
        variant="body1"
        sx={{
          mb: 3,
          fontStyle: "italic",
          color: "#fff",
        }}
      >
        "{testimonial.text}"
      </Typography>
      <Typography variant="h6" sx={{ mb: 0.5, color: "#fff" }}>
        {testimonial.name}
      </Typography>
      <Typography variant="body2" sx={{ color: "#fff" }}>
        {testimonial.role}
      </Typography>
    </Box>
  );
};

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  const testimonials = [
    {
      name: "Abd ELWahab Mohanna",
      role: "CTO, Project Manager at Domino ICT",
      image: "/domino.jpg",
      rating: 5,
      text: "I've worked with many developers, but few demonstrate the same level of ownership and attention to detail as Bahaa. Whether frontend or backend, he always delivers with precision and creativity. His ability to lead initiatives and solve complex problems made him indispensable to our team.",
    },
    {
      name: "Norin Abu Baker",
      role: "CEO, Founder of Makani Homes",
      rating: 5,
      image: "/makani_homes_logo.jpeg",
      text: "Bahaa played a vital role in launching our platform from the ground up. His ability to move fast without compromising quality was key to our early success. I've never seen someone take minimal requirements and turn them into a fully functional product with such polish and clarity. Highly recommended.",
    },
    {
      name: "Salem",
      role: "Investor, EWave Project",
      rating: 5,
      image: "/EWave.svg",
      text: "Bahaa is more than a developer—he's a visionary who turns ideas into scalable tech. As an investor, I've seen many projects stall due to lack of technical leadership, but Bahaa always brought clarity, structure, and execution. His reliability is unmatched.",
    },
    {
      name: "Abu Jad",
      role: "Product Manager at 3lbazaar",
      rating: 5,
      image: "/icon.png",
      text: "Bahaa transformed our chaotic development workflow into a well-oiled machine. He didn't just code—he helped shape the product, aligned technical decisions with our vision, and ensured we hit tight deadlines without compromise. A rare talent in today's market.",
    },
    {
      name: "Yousef Sobiah",
      role: "CTO, Techno Elite",
      rating: 5,
      image: "/Elite.png",
      text: "Bahaa took full ownership of our most critical projects and delivered beyond expectations. From complex wallet systems to social platforms, he built fast, communicated clearly, and always delivered clean, maintainable code. I'd work with him again without hesitation.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: `linear-gradient(180deg, ${theme.palette.background.default}, ${theme.palette.background.paper}30)`,
      }}
    >
      <Container>
        <AnimatedTitle
          text="Testimonials"
          subtitle="What people say about working with me"
        />
        <Box sx={{ mt: 6, minHeight: 300 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
