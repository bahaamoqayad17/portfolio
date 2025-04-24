"use client";

import { Box, Container, useTheme } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";

const CompanyLogo = ({ src, alt }) => {
  const theme = useTheme();
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        height: { xs: 40, sm: 50, md: 60 },
        width: "auto",
        filter:
          "grayscale(100%) brightness(0.5) sepia(1) hue-rotate(180deg) saturate(200%)",
        opacity: 0.7,
        transition: "all 0.3s ease",
        "&:hover": {
          filter: "grayscale(0%) brightness(1)",
          opacity: 1,
        },
      }}
    />
  );
};

const CompaniesSection = () => {
  const theme = useTheme();
  const controls = useAnimation();
  const containerRef = useRef(null);
  const animationConfig = useRef(null);

  // Sample company logos - replace with your actual company logos
  const companies = [
    { src: "/3lbazaar.png", alt: "Company 1" },
    { src: "/altariq.png", alt: "Company 2" },
    { src: "/Elite.png", alt: "Company 3" },
    { src: "/MAKANI.png", alt: "Company 4" },
    { src: "/domino.jpg", alt: "Company 4" },
    { src: "/TipsTrips.png", alt: "Company 5" },
    { src: "/unrwa.png", alt: "Company 6" },
    { src: "/offerwall.svg", alt: "Company 7" },
    { src: "/Rakaez.png", alt: "Company 8" },
    { src: "/EWave.svg", alt: "Company 9" },
    { src: "/Booklet.png", alt: "Company 10" },
    { src: "/OVerse.png", alt: "Company 11" },
    { src: "/Aghati.png", alt: "Company 12" },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const duration = 20; // seconds for one complete scroll

    // Store the animation configuration
    animationConfig.current = {
      x: [0, -(scrollWidth - clientWidth)],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          ease: "linear",
        },
      },
    };

    controls.start(animationConfig.current);
  }, [controls]);

  const handleHoverStart = () => {
    controls.stop();
  };

  const handleHoverEnd = () => {
    if (animationConfig.current) {
      controls.start(animationConfig.current);
    }
  };

  return (
    <Box
      id="companies"
      sx={{
        py: { xs: 8, md: 12 },
        background: `linear-gradient(180deg, ${theme.palette.background.paper}30, ${theme.palette.background.default})`,
      }}
    >
      <Container>
        <AnimatedTitle
          text="Trusted By"
          subtitle="Companies I've had the pleasure to work with"
        />
        <Box
          ref={containerRef}
          sx={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            mt: 6,
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              top: 0,
              width: "100px",
              height: "100%",
              zIndex: 1,
            },
          }}
        >
          <motion.div
            animate={controls}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            style={{
              display: "flex",
              gap: "4rem",
              padding: "2rem 0",
            }}
          >
            {[...companies, ...companies].map((company, index) => (
              <CompanyLogo
                key={`${company.alt}-${index}`}
                src={company.src}
                alt={company.alt}
              />
            ))}
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default CompaniesSection;
