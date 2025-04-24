"use client";

import { useState } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Avatar,
  Chip,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import AnimatedTitle from "./AnimatedTitle";
import AnimatedCard from "./AnimatedCard";
import { useTheme } from "@mui/material/styles";
import CodeIcon from "@mui/icons-material/Code";
import WebIcon from "@mui/icons-material/Web";
import MobileIcon from "@mui/icons-material/MobileScreenShare";
import DesktopIcon from "@mui/icons-material/DesktopWindows";
import DownloadIcon from "@mui/icons-material/Download";
import { createGradientBackground } from "../theme";

export default function AboutSection() {
  const theme = useTheme();
  const [about, setAbout] = useState({
    name: "Bahaa El Moqayad",
    avatar: "/bahaa.jpg",
    title: "About Me",
    bio: [
      "I'm not just here to write code — I'm here to help you build *Your Business*. With over 5 years of experience developing high-impact web, mobile, and desktop applications",
      "I bring deep technical expertise and a genuine passion for turning ideas into reality. Whether you're starting from scratch or scaling an existing product, I take time to understand your vision, your users, and your goals.",
      "I specialize in modern JavaScript technologies like React, Next.js, Node.js, Fastify, React Native, Expo, and Electron, and I care deeply about clean, scalable, and user-focused solutions.",
      "Your project deserves more than just a developer — it deserves a committed partner who's just as excited about your success as you are.",
      "Let's bring your vision to life — and make it even better than you imagined.",
    ].join("\n\n"),
    experience: "5+ years",
    location: "Palestine, Gaza",
    education: "Bachelor's in Computer Science",
    categories: [
      {
        title: "Web Development",
        description:
          "From sleek marketing pages to dynamic SaaS platforms, I build web apps with React, Next.js, and Tailwind CSS. I focus on performance, accessibility, and responsive design to ensure your users get a fast and flawless experience. I also use Material UI for elegant component styling and integrate both REST APIs and GraphQL for robust data interactions.",
        icon: "web",
      },
      {
        title: "Mobile Development",
        description:
          "Using React Native and Expo, I craft smooth, cross-platform mobile apps that feel native. Whether it's a startup MVP or a full-featured product, I use React Native Paper and NativeWind to deliver polished UI/UX, and I always keep user experience and business goals at the core of development.",
        icon: "mobile",
      },
      {
        title: "Desktop Development",
        description:
          "When your product needs to live on the desktop, I use Electron.js and Tauri to create fast, secure, and beautiful desktop apps. I bring web technology to the desktop in a way that feels native, efficient, and aligned with your project's long-term vision.",
        icon: "desktop",
      },
    ],
  });

  const [loading, setLoading] = useState(false);

  const renderIcon = (iconName) => {
    switch (iconName) {
      case "web":
        return <WebIcon fontSize="large" />;
      case "mobile":
        return <MobileIcon fontSize="large" />;
      case "desktop":
        return <DesktopIcon fontSize="large" />;
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
        <AnimatedTitle text="About Me" subtitle="Subtitle" />

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

                    <Box sx={{ maxWidth: "400px" }}>
                      {about.bio.split("\n\n").map((paragraph, index) => (
                        <Typography
                          key={index}
                          variant="body1"
                          paragraph
                          sx={{ color: "#fff", mb: 2 }}
                        >
                          {paragraph}
                        </Typography>
                      ))}
                    </Box>

                    <Button
                      variant="contained"
                      startIcon={<DownloadIcon />}
                      href="/resume.pdf"
                      download
                      sx={{
                        mt: 2,
                        background: createGradientBackground(),
                        color: "#fff",
                        "&:hover": {
                          background: createGradientBackground(45),
                        },
                      }}
                    >
                      Download Resume
                    </Button>
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
