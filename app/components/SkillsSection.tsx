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

// Types for skills
interface Skill {
  name: string;
  level: number;
  description: string;
  category: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

export default function SkillsSection() {
  const theme = useTheme();
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([
    {
      category: "Frontend",
      skills: [
        {
          name: "HTML/CSS",
          level: 95,
          description: "Semantic HTML, CSS3, Responsive Design",
          category: "Frontend",
        },
        {
          name: "JavaScript",
          level: 90,
          description: "ES6+, TypeScript, DOM Manipulation",
          category: "Frontend",
        },
        {
          name: "React",
          level: 92,
          description: "Hooks, Context API, Redux, Next.js",
          category: "Frontend",
        },
        {
          name: "UI Frameworks",
          level: 85,
          description: "Material UI, Tailwind CSS, Bootstrap",
          category: "Frontend",
        },
      ],
    },
    {
      category: "Backend",
      skills: [
        {
          name: "Node.js",
          level: 88,
          description: "Express, API Development, Authentication",
          category: "Backend",
        },
        {
          name: "Databases",
          level: 85,
          description: "MongoDB, PostgreSQL, Prisma ORM",
          category: "Backend",
        },
        {
          name: "GraphQL",
          level: 80,
          description: "Apollo Server, Queries, Mutations",
          category: "Backend",
        },
        {
          name: "API Design",
          level: 87,
          description: "RESTful API, Authentication, Security",
          category: "Backend",
        },
      ],
    },
    {
      category: "DevOps & Tools",
      skills: [
        {
          name: "Git & GitHub",
          level: 90,
          description: "Version Control, Branching, CI/CD",
          category: "DevOps & Tools",
        },
        {
          name: "Docker",
          level: 75,
          description: "Containerization, Docker Compose",
          category: "DevOps & Tools",
        },
        {
          name: "Testing",
          level: 80,
          description: "Jest, React Testing Library, Cypress",
          category: "DevOps & Tools",
        },
        {
          name: "Performance",
          level: 82,
          description: "Optimization, Lazy Loading, Code Splitting",
          category: "DevOps & Tools",
        },
      ],
    },
  ]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   // Fetch skills from API
  //   const fetchSkills = async () => {
  //     try {
  //       const response = await fetch('/api/skills');
  //       if (response.ok) {
  //         const data = await response.json();

  //         // Group skills by category
  //         const groupedSkills = data.reduce((acc: any, skill: Skill) => {
  //           const existingCategory = acc.find((c: SkillCategory) => c.category === skill.category);
  //           if (existingCategory) {
  //             existingCategory.skills.push(skill);
  //           } else {
  //             acc.push({
  //               category: skill.category,
  //               skills: [skill]
  //             });
  //           }
  //           return acc;
  //         }, []);

  //         setSkillCategories(groupedSkills);
  //       } else {
  //         // If API fails, use default data
  //         const defaultSkills: SkillCategory[] = [
  //           {
  //             category: 'Frontend',
  //             skills: [
  //               { name: 'HTML/CSS', level: 95, description: 'Semantic HTML, CSS3, Responsive Design', category: 'Frontend' },
  //               { name: 'JavaScript', level: 90, description: 'ES6+, TypeScript, DOM Manipulation', category: 'Frontend' },
  //               { name: 'React', level: 92, description: 'Hooks, Context API, Redux, Next.js', category: 'Frontend' },
  //               { name: 'UI Frameworks', level: 85, description: 'Material UI, Tailwind CSS, Bootstrap', category: 'Frontend' },
  //             ]
  //           },
  //           {
  //             category: 'Backend',
  //             skills: [
  //               { name: 'Node.js', level: 88, description: 'Express, API Development, Authentication', category: 'Backend' },
  //               { name: 'Databases', level: 85, description: 'MongoDB, PostgreSQL, Prisma ORM', category: 'Backend' },
  //               { name: 'GraphQL', level: 80, description: 'Apollo Server, Queries, Mutations', category: 'Backend' },
  //               { name: 'API Design', level: 87, description: 'RESTful API, Authentication, Security', category: 'Backend' },
  //             ]
  //           },
  //           {
  //             category: 'DevOps & Tools',
  //             skills: [
  //               { name: 'Git & GitHub', level: 90, description: 'Version Control, Branching, CI/CD', category: 'DevOps & Tools' },
  //               { name: 'Docker', level: 75, description: 'Containerization, Docker Compose', category: 'DevOps & Tools' },
  //               { name: 'Testing', level: 80, description: 'Jest, React Testing Library, Cypress', category: 'DevOps & Tools' },
  //               { name: 'Performance', level: 82, description: 'Optimization, Lazy Loading, Code Splitting', category: 'DevOps & Tools' },
  //             ]
  //           }
  //         ];

  //         setSkillCategories(defaultSkills);
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching skills:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchSkills();
  // }, []);

  return (
    <Box
      id="skills"
      sx={{
        py: { xs: 10, md: 15 },
        background: `linear-gradient(180deg, ${theme.palette.background.default}, ${theme.palette.background.paper}30)`,
      }}
    >
      <Container>
        <AnimatedTitle
          text="My Skills"
          subtitle="I continuously enhance my skills to deliver modern and efficient solutions"
        />

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
                            <Tooltip
                              title={skill.description}
                              placement="top"
                              arrow
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
                                    fontWeight="medium"
                                    color="white"
                                  >
                                    {skill.name}
                                  </Typography>
                                  <Typography variant="body2" color="white">
                                    {skill.level}%
                                  </Typography>
                                </Box>
                                <Box sx={{ position: "relative" }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={skill.level}
                                    sx={{
                                      height: 10,
                                      borderRadius: 5,
                                      backgroundColor:
                                        "rgba(255, 255, 255, 0.1)",
                                      "& .MuiLinearProgress-bar": {
                                        borderRadius: 5,
                                        background: createGradientBackground(),
                                      },
                                    }}
                                  />
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      top: 0,
                                      left: 0,
                                      right: 0,
                                      bottom: 0,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "flex-start",
                                      px: 1,
                                      opacity: 0,
                                      transition: "opacity 0.3s ease",
                                      "&:hover": {
                                        opacity: 1,
                                      },
                                    }}
                                  >
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        color: "white",
                                        fontSize: "0.6rem",
                                      }}
                                    >
                                      {skill.description}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Tooltip>
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
            <Typography>No skills information available.</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
