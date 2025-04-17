"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Avatar,
  Chip,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import AnimatedTitle from "./AnimatedTitle";
import AnimatedCard from "./AnimatedCard";
import { useTheme } from "@mui/material/styles";
import CodeIcon from "@mui/icons-material/Code";
import WebIcon from "@mui/icons-material/Web";
import StorageIcon from "@mui/icons-material/Storage";
import { createGradientBackground } from "../theme";

export default function AboutSection() {
  const theme = useTheme();
  const [about, setAbout] = useState({
    name: "Bahaa El Moqayad",
    avatar: "/bahaa.jpg",
    title: "Full Stack JavaScript Developer",
    bio: "I'm a passionate Full Stack JavaScript Developer with over 5 years of experience building modern web applications. I specialize in React, Next.js, Node.js and TypeScript, focusing on creating performant and scalable solutions that solve real-world problems.",
    experience: "5+ years",
    location: "San Francisco, CA",
    education: "Bachelor's in Computer Science",
    categories: [
      {
        title: "Frontend Development",
        description:
          "I create responsive, accessible, and performant user interfaces using modern JavaScript frameworks.",
        icon: "web",
      },
      {
        title: "Backend Development",
        description:
          "I build robust and scalable APIs and server-side applications with Node.js and Express.",
        icon: "server",
      },
      {
        title: "Full Stack Solutions",
        description:
          "I deliver end-to-end solutions, from concept to deployment, ensuring seamless integration across the stack.",
        icon: "code",
      },
    ],
  });
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   // Fetch about data
  //   const fetchAbout = async () => {
  //     try {
  //       const response = await fetch("/api/about");
  //       if (response.ok) {
  //         const data = await response.json();
  //         setAbout(data);
  //       } else {
  //         // If API fails, use default data
  //         setAbout({
  //           name: "Bahaa El Moqayad",
  //           title: "Full Stack JavaScript Developer",
  //           bio: "I'm a passionate Full Stack JavaScript Developer with over 5 years of experience building modern web applications. I specialize in React, Next.js, Node.js and TypeScript, focusing on creating performant and scalable solutions that solve real-world problems.",
  //           experience: "5+ years",
  //           location: "San Francisco, CA",
  //           education: "Bachelor's in Computer Science",
  //           categories: [
  //             {
  //               title: "Frontend Development",
  //               description:
  //                 "I create responsive, accessible, and performant user interfaces using modern JavaScript frameworks.",
  //               icon: "web",
  //             },
  //             {
  //               title: "Backend Development",
  //               description:
  //                 "I build robust and scalable APIs and server-side applications with Node.js and Express.",
  //               icon: "server",
  //             },
  //             {
  //               title: "Full Stack Solutions",
  //               description:
  //                 "I deliver end-to-end solutions, from concept to deployment, ensuring seamless integration across the stack.",
  //               icon: "code",
  //             },
  //           ],
  //         });
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching about data:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchAbout();
  // }, []);

  const renderIcon = (iconName) => {
    switch (iconName) {
      case "web":
        return <WebIcon fontSize="large" />;
      case "server":
        return <StorageIcon fontSize="large" />;
      case "code":
      default:
        return <CodeIcon fontSize="large" />;
    }
  };

  return (
    <Box
      id="about"
      sx={{
        py: { xs: 10, md: 15 },
        background: `radial-gradient(ellipse at bottom, ${theme.palette.background.paper}30, ${theme.palette.background.default})`,
      }}
    >
      <Container>
        <AnimatedTitle
          text="About Me"
          subtitle="Here you'll find more information about me, what I do, and my current skills"
        />

        {loading ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography>Loading...</Typography>
          </Box>
        ) : about ? (
          <Grid container>
            <Grid component="div" item size={{ xs: 12, md: 7 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                <Box sx={{ position: "relative", mb: 6 }}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "-10px",
                      left: "-10px",
                      right: { xs: "-10px", md: "30%" },
                      bottom: "-10px",
                      background: createGradientBackground(135),
                      opacity: 0.1,
                      borderRadius: "10px",
                      zIndex: 0,
                    }}
                  />
                  <Box
                    sx={{
                      position: "relative",
                      zIndex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: { xs: "center", md: "flex-start" },
                      textAlign: { xs: "center", md: "left" },
                      padding: 4,
                    }}
                  >
                    <Avatar
                      src={about.avatar}
                      alt={about.name}
                      sx={{
                        width: 150,
                        height: 150,
                        mb: 3,
                        boxShadow: `0 0 20px ${theme.palette.primary.main}50`,
                        background: createGradientBackground(),
                      }}
                    />
                    <Typography
                      variant="h3"
                      component="h2"
                      fontWeight="bold"
                      color="white"
                      gutterBottom
                      sx={{
                        fontSize: { xs: 32, md: 42 },
                      }}
                    >
                      {about.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="white"
                      gutterBottom
                      sx={{ mb: 2 }}
                    >
                      {about.title}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                        mb: 3,
                        justifyContent: { xs: "center", md: "flex-start" },
                        maxWidth: "500px",
                      }}
                    >
                      <Chip
                        label={`Experience: ${about.experience}`}
                        size="small"
                        sx={{ color: "#fff" }}
                      />
                      <Chip
                        label={`Location: ${about.location}`}
                        size="small"
                        sx={{ color: "#fff" }}
                      />
                      <Chip
                        label={`Education: ${about.education}`}
                        size="small"
                        sx={{ color: "#fff" }}
                      />
                    </Box>

                    <Typography
                      variant="body1"
                      paragraph
                      sx={{ maxWidth: "400px", color: "#fff" }}
                    >
                      {about.bio}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            <Grid component="div" item size={{ xs: 12, md: 5 }}>
              <Grid container spacing={3}>
                {about.categories.map((category, index) => (
                  <Grid component="div" item xs={12} sm={6} md={6} key={index}>
                    <AnimatedCard delay={index * 0.2}>
                      <Box
                        sx={{
                          p: 3,
                          position: "relative",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderRadius: "12px",
                            padding: "2px",
                            background:
                              "linear-gradient(45deg, #ff0000, #00ff00, #0000ff, #ff0000)",
                            backgroundSize: "300% 300%",
                            animation: "gradientBorder 8s ease infinite",
                            WebkitMask:
                              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                            zIndex: 1,
                          },
                          "@keyframes gradientBorder": {
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
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 60,
                            height: 60,
                            borderRadius: "12px",
                            background: createGradientBackground(),
                            mb: 2,
                            color: "white",
                            position: "relative",
                            zIndex: 2,
                          }}
                        >
                          {renderIcon(category.icon)}
                        </Box>
                        <Typography
                          variant="h6"
                          gutterBottom
                          fontWeight="bold"
                          color="white"
                        >
                          {category.title}
                        </Typography>
                        <Typography variant="body2" color="white">
                          {category.description}
                        </Typography>
                      </Box>
                    </AnimatedCard>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography>No information available.</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
