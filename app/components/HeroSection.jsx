"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import GradientText from "./GradientText";
import Link from "next/link";

export default function HeroSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const canvasRef = useRef(null);

  // Wave animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.3; // 30% of viewport height
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Create base gradient for the entire canvas
    const baseGradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
    baseGradient.addColorStop(0, "#1a1a1a"); // Dark gray
    baseGradient.addColorStop(0.3, "#0a0a0a"); // Very dark gray
    baseGradient.addColorStop(0.6, "#000000"); // Black
    baseGradient.addColorStop(0.8, "#0a0a0a"); // Very dark gray
    baseGradient.addColorStop(1, "#1a1a1aff"); // Dark gray

    // Fill the entire canvas with the base gradient
    ctx.fillStyle = baseGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add a subtle overlay gradient
    const overlayGradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    overlayGradient.addColorStop(0, "rgba(20, 20, 40, 0.3)"); // Dark blue
    overlayGradient.addColorStop(0.5, "rgba(40, 20, 40, 0.2)"); // Dark purple
    overlayGradient.addColorStop(1, "rgba(20, 40, 40, 0.3)"); // Dark teal

    ctx.fillStyle = overlayGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [theme]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <Box
      id="hero"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "30vh",
          pointerEvents: "none",
          zIndex: 0,
        }}
      /> */}

      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box
            sx={{
              textAlign: "center",
              maxWidth: "800px",
              mx: "auto",
              px: { xs: 2, sm: 4 },
            }}
          >
            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                  fontSize: { xs: 32, md: 48 },
                  color: "#2196F3",
                  paddingTop: { xs: "70px", md: "0px" },
                }}
              >
                Software Developer
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  mb: 3,
                  fontWeight: 900,
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                  lineHeight: 1.2,
                  color: "#fff",
                }}
              >
                Building{" "}
                <GradientText
                  sx={{
                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                  }}
                  variant="h1"
                  animationDuration={12}
                >
                  Modern Web & Mobile Experiences
                </GradientText>{" "}
                With Passion
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                component="p"
                color="white"
                sx={{
                  mb: 5,
                  maxWidth: "600px",
                  mx: "auto",
                }}
              >
                I create performant, responsive, and beautiful web and mobile
                applications with modern JavaScript technologies.
              </Typography>
            </motion.div>

            <motion.div
              variants={itemVariants}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: isMobile ? 16 : 20,
                flexWrap: "wrap",
              }}
            >
              <Button
                component={Link}
                href="#projects"
                variant="contained"
                size="large"
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: "1rem",
                  width: 220,
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  backgroundSize: "200% 200%",
                  animation: "gradient 3s ease infinite",
                  "@keyframes gradient": {
                    "0%": {
                      backgroundPosition: "0% 50%",
                    },
                    "50%": {
                      backgroundPosition: "100% 50%",
                    },
                    "100%": {
                      backgroundPosition: "0% 50%",
                    },
                  },
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)",
                    backgroundSize: "200% 200%",
                    animation: "gradient 3s ease infinite",
                  },
                }}
              >
                View My Work
              </Button>
              <Button
                component={Link}
                href="#contact"
                variant="outlined"
                size="large"
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: "1rem",
                  borderWidth: 2,
                  position: "relative",
                  background: "transparent",
                  width: 220,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    border: "2px solid transparent",
                    background:
                      "linear-gradient(45deg, #2196F3, #21CBF3) border-box",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    animation: "gradient 3s ease infinite",
                    "@keyframes gradient": {
                      "0%": {
                        backgroundPosition: "0% 50%",
                      },
                      "50%": {
                        backgroundPosition: "100% 50%",
                      },
                      "100%": {
                        backgroundPosition: "0% 50%",
                      },
                    },
                  },
                  "&:hover": {
                    "&::before": {
                      background: "linear-gradient(45deg, #1976D2, #1E88E5)",
                    },
                  },
                }}
              >
                Contact
              </Button>
            </motion.div>
          </Box>

          {/* <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{
              position: "absolute",
              bottom: "80px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Box
              component="a"
              href="#about"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "text.secondary",
                textDecoration: "none",
                cursor: "pointer",
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              <Typography variant="body2" sx={{ mb: 1 }}>
                Scroll Down
              </Typography>
              <Box
                component="div"
                sx={{
                  width: "30px",
                  height: "50px",
                  border: "2px solid",
                  borderColor: "currentcolor",
                  borderRadius: "20px",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    width: "8px",
                    height: "8px",
                    top: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "currentcolor",
                    borderRadius: "50%",
                    animation: "scrollDown 2s infinite",
                  },
                  "@keyframes scrollDown": {
                    "0%": {
                      opacity: 1,
                      top: "10px",
                    },
                    "100%": {
                      opacity: 0,
                      top: "30px",
                    },
                  },
                }}
              />
            </Box>
          </motion.div> */}
        </motion.div>
      </Container>
    </Box>
  );
}
