"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import AnimatedTitle from "./AnimatedTitle";
import AnimatedCard from "./AnimatedCard";
import { useTheme } from "@mui/material/styles";
import { createGradientBackground } from "../theme";

const SkillProgressBar = ({ skill }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <Tooltip
        title={skill.description}
        placement="top"
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "rgba(0, 0, 0, 0.8)",
              "& .MuiTooltip-arrow": {
                color: "rgba(0, 0, 0, 0.8)",
              },
            },
          },
        }}
      >
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={mounted ? skill.level : 0}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              cursor: "pointer",
              "& .MuiLinearProgress-bar": {
                borderRadius: 5,
                background: createGradientBackground(),
                transition: mounted ? 'transform 1s ease-in-out' : 'none',
              },
            }}
          />
        </Box>
      </Tooltip>
    </Box>
  );
};

export default function SkillsSection() {
  const theme = useTheme();
  const [skillCategories, setSkillCategories] = useState([
    {
      category: "Frontend Development",
      skills: [
        {
          name: "React",
          level: 92,
          description: "Hooks, Context API, Redux Toolkit, Next.js",
          category: "Frontend Development",
        },
        {
          name: "Next.js",
          level: 90,
          description: "SSR, SSG, Routing, API Routes, Dynamic Imports",
          category: "Frontend Development",
        },
        {
          name: "UI Frameworks",
          level: 88,
          description: "Material UI, Tailwind CSS, React Native Paper",
          category: "Frontend Development",
        },
        {
          name: "Responsive Design",
          level: 93,
          description: "Mobile-First Approach, Flexbox, CSS Grid",
          category: "Frontend Development",
        },
      ],
    },
    {
      category: "Backend Development",
      skills: [
        {
          name: "Fastify",
          level: 85,
          description:
            "High-performance backend services, schema-based validation",
          category: "Backend Development",
        },
        {
          name: "Express.js",
          level: 88,
          description: "Routing, Middleware, REST APIs",
          category: "Backend Development",
        },
        {
          name: "API Design & GraphQL",
          level: 82,
          description:
            "RESTful APIs, Token Auth, Best Practices , Apollo Server, Mercurius, Schema Design, Queries & Mutations",
          category: "Backend Development",
        },
        {
          name: "Databases",
          level: 85,
          description: "MongoDB, PostgreSQL, Prisma ORM",
          category: "Backend Development",
        },
      ],
    },
    {
      category: "Mobile Development",
      skills: [
        {
          name: "React Native",
          level: 88,
          description: "Cross-platform mobile apps, Navigation, Expo",
          category: "Mobile Development",
        },
        {
          name: "Expo",
          level: 86,
          description: "Fast development, OTA updates, Push Notifications",
          category: "Mobile Development",
        },
        {
          name: "Tauri",
          level: 75,
          description: "Secure & lightweight desktop apps with web tech",
          category: "Mobile Development",
        },
        {
          name: "Electron.js",
          level: 78,
          description: "Desktop apps with Node.js and Chromium",
          category: "Mobile Development",
        },
      ],
    },
  ]);

  const [loading, setLoading] = useState(false);

  return (
    <Box
      id="skills"
      sx={{
        py: { xs: 10, md: 15 },
        background: `linear-gradient(180deg, ${theme.palette.background.default}, ${theme.palette.background.paper}30)`,
      }}
    >
      <Container>
        <AnimatedTitle text="My Skills" subtitle="What I'm good at" />

        {loading ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography>Loading...</Typography>
          </Box>
        ) : skillCategories.length > 0 ? (
          <Grid container spacing={3}>
            {skillCategories.map((category, categoryIndex) => (
              <Grid item size={{ xs: 12, md: 4 }} key={categoryIndex}>
                <AnimatedCard delay={categoryIndex * 0.2}>
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
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{
                        pb: 2,
                        mb: 3,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        position: "relative",
                        color: "#fff",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: -1,
                          left: 0,
                          width: "80px",
                          height: "3px",
                          background: createGradientBackground(),
                          borderRadius: "3px",
                        },
                      }}
                    >
                      {category.category}
                    </Typography>

                    <Grid container spacing={4}>
                      {category.skills.map((skill, skillIndex) => (
                        <Grid item size={12} key={skillIndex}>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ delay: 0.2 + skillIndex * 0.1 }}
                          >
                            <Box
                              sx={{
                                mb: 3,
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  fontWeight="bold"
                                  color="white"
                                >
                                  {skill.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  fontWeight="bold"
                                  color="white"
                                >
                                  {skill.level}%
                                </Typography>
                              </Box>
                              <Box sx={{ position: "relative" }}>
                                <SkillProgressBar skill={skill} />
                              </Box>
                            </Box>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </AnimatedCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography>No data available</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
