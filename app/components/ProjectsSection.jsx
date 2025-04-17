"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedTitle from "./AnimatedTitle";
import AnimatedCard from "./AnimatedCard";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import { createGradientBackground } from "../theme";

export default function ProjectsSection() {
  const theme = useTheme();
  const [projects, setProjects] = useState([
    {
      id: "1",
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform built with Next.js, TypeScript, and Material UI. Includes product listings, cart functionality, and secure checkout.",
      image: "/assets/project-placeholder.svg",
      technologies: [
        "Next.js",
        "TypeScript",
        "Material UI",
        "Stripe",
        "MongoDB",
      ],
      demoUrl: "https://example.com/ecommerce",
      githubUrl: "https://github.com/username/ecommerce",
      category: "Full Stack",
    },
    {
      id: "2",
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, team workspaces, and progress tracking functionality.",
      image: "/assets/project-placeholder.svg",
      technologies: ["React", "Node.js", "Express", "Socket.io", "PostgreSQL"],
      demoUrl: "https://example.com/taskmanager",
      githubUrl: "https://github.com/username/taskmanager",
      category: "Full Stack",
    },
    {
      id: "3",
      title: "Portfolio Website",
      description:
        "A responsive portfolio website built with Next.js and TypeScript showcasing modern design principles and animations.",
      image: "/assets/project-placeholder.svg",
      technologies: ["Next.js", "TypeScript", "Framer Motion", "Material UI"],
      demoUrl: "https://example.com/portfolio",
      githubUrl: "https://github.com/username/portfolio",
      category: "Frontend",
    },
    {
      id: "4",
      title: "RESTful API Service",
      description:
        "A scalable RESTful API service with complete documentation, authentication, and rate limiting.",
      image: "/assets/project-placeholder.svg",
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Swagger"],
      githubUrl: "https://github.com/username/api-service",
      category: "Backend",
    },
    {
      id: "5",
      title: "Weather Dashboard",
      description:
        "An interactive weather dashboard providing real-time weather data and forecasts using external API integration.",
      image: "/assets/project-placeholder.svg",
      technologies: ["React", "Redux", "Chart.js", "Weather API"],
      demoUrl: "https://example.com/weather",
      githubUrl: "https://github.com/username/weather-app",
      category: "Frontend",
    },
    {
      id: "6",
      title: "Blog Platform",
      description:
        "A full-featured blog platform with rich text editing, user authentication, and content management.",
      image: "/assets/project-placeholder.svg",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Draft.js"],
      demoUrl: "https://example.com/blog",
      githubUrl: "https://github.com/username/blog-platform",
      category: "Full Stack",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // useEffect(() => {
  //   // Fetch projects from API
  //   const fetchProjects = async () => {
  //     try {
  //       const response = await fetch('/api/projects');
  //       if (response.ok) {
  //         const data = await response.json();
  //         setProjects(data);

  //         // Extract unique categories
  //         const uniqueCategories = Array.from(new Set(data.map((project: Project) => project.category))) as string[];
  //         setCategories(['All', ...uniqueCategories]);
  //       } else {
  //         // If API fails, use default data
  //         const defaultProjects = [
  //           {
  //             id: '1',
  //             title: 'E-Commerce Platform',
  //             description: 'A full-featured e-commerce platform built with Next.js, TypeScript, and Material UI. Includes product listings, cart functionality, and secure checkout.',
  //             image: '/assets/project-placeholder.svg',
  //             technologies: ['Next.js', 'TypeScript', 'Material UI', 'Stripe', 'MongoDB'],
  //             demoUrl: 'https://example.com/ecommerce',
  //             githubUrl: 'https://github.com/username/ecommerce',
  //             category: 'Full Stack'
  //           },
  //           {
  //             id: '2',
  //             title: 'Task Management App',
  //             description: 'A collaborative task management application with real-time updates, team workspaces, and progress tracking functionality.',
  //             image: '/assets/project-placeholder.svg',
  //             technologies: ['React', 'Node.js', 'Express', 'Socket.io', 'PostgreSQL'],
  //             demoUrl: 'https://example.com/taskmanager',
  //             githubUrl: 'https://github.com/username/taskmanager',
  //             category: 'Full Stack'
  //           },
  //           {
  //             id: '3',
  //             title: 'Portfolio Website',
  //             description: 'A responsive portfolio website built with Next.js and TypeScript showcasing modern design principles and animations.',
  //             image: '/assets/project-placeholder.svg',
  //             technologies: ['Next.js', 'TypeScript', 'Framer Motion', 'Material UI'],
  //             demoUrl: 'https://example.com/portfolio',
  //             githubUrl: 'https://github.com/username/portfolio',
  //             category: 'Frontend'
  //           },
  //           {
  //             id: '4',
  //             title: 'RESTful API Service',
  //             description: 'A scalable RESTful API service with complete documentation, authentication, and rate limiting.',
  //             image: '/assets/project-placeholder.svg',
  //             technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
  //             githubUrl: 'https://github.com/username/api-service',
  //             category: 'Backend'
  //           },
  //           {
  //             id: '5',
  //             title: 'Weather Dashboard',
  //             description: 'An interactive weather dashboard providing real-time weather data and forecasts using external API integration.',
  //             image: '/assets/project-placeholder.svg',
  //             technologies: ['React', 'Redux', 'Chart.js', 'Weather API'],
  //             demoUrl: 'https://example.com/weather',
  //             githubUrl: 'https://github.com/username/weather-app',
  //             category: 'Frontend'
  //           },
  //           {
  //             id: '6',
  //             title: 'Blog Platform',
  //             description: 'A full-featured blog platform with rich text editing, user authentication, and content management.',
  //             image: '/assets/project-placeholder.svg',
  //             technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Draft.js'],
  //             demoUrl: 'https://example.com/blog',
  //             githubUrl: 'https://github.com/username/blog-platform',
  //             category: 'Full Stack'
  //           }
  //         ];

  //         setProjects(defaultProjects);

  //         // Extract unique categories
  //         const uniqueCategories = Array.from(new Set(defaultProjects.map((project) => project.category)));
  //         setCategories(['All', ...uniqueCategories]);
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching projects:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchProjects();
  // }, []);

  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
  };

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <Box
      id="projects"
      sx={{
        py: { xs: 10, md: 15 },
        background:
          "radial-gradient(ellipse at top, rgba(30, 30, 30, 0.8), rgba(15, 15, 15, 1))",
      }}
    >
      <Container>
        <AnimatedTitle
          text="My Projects"
          subtitle="Here's a selection of my recent work that showcases my skills and experience"
        />

        {loading ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography>Loading projects...</Typography>
          </Box>
        ) : projects.length > 0 ? (
          <>
            {categories.length > 1 && (
              <Box sx={{ mb: 6, display: "flex", justifyContent: "center" }}>
                <Tabs
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  textColor="primary"
                  sx={{
                    "& .MuiTabs-indicator": {
                      background: createGradientBackground(),
                      height: "3px",
                      borderRadius: "3px",
                    },
                  }}
                >
                  {categories.map((category) => (
                    <Tab
                      key={category}
                      value={category}
                      label={category}
                      sx={{
                        fontWeight: 600,
                        "&.Mui-selected": {
                          color: "primary.main",
                        },
                      }}
                    />
                  ))}
                </Tabs>
              </Box>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", margin: "-16px" }}
                >
                  {filteredProjects.map((project, index) => (
                    <Box
                      key={project.id}
                      sx={{
                        width: { xs: "100%", sm: "50%", md: "33.33%" },
                        padding: "16px",
                      }}
                    >
                      <AnimatedCard delay={index * 0.1}>
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            background: "rgba(30, 30, 30, 0.6)",
                            position: "relative",
                            overflow: "hidden",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "5px",
                              background: createGradientBackground(),
                            },
                          }}
                        >
                          <CardMedia
                            component="div"
                            sx={{
                              height: 0,
                              paddingTop: "56.25%", // 16:9 aspect ratio
                              position: "relative",
                              overflow: "hidden",
                              background: `url('https://via.placeholder.com/400x225?text=${encodeURIComponent(
                                project.title
                              )}')`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          />
                          <CardContent sx={{ flexGrow: 1, p: 3 }}>
                            <Typography
                              variant="h5"
                              component="h3"
                              gutterBottom
                              fontWeight="bold"
                              color="white"
                            >
                              {project.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="white"
                              sx={{ mb: 2 }}
                            >
                              {project.description}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                mt: 2,
                              }}
                            >
                              {project.technologies.map((tech, techIndex) => (
                                <Chip
                                  key={techIndex}
                                  label={tech}
                                  size="small"
                                  sx={{
                                    backgroundColor: "rgba(106, 17, 203, 0.1)",
                                    borderColor: "rgba(106, 17, 203, 0.3)",
                                    margin: "2px",
                                    color: "#fff",
                                  }}
                                />
                              ))}
                            </Box>
                          </CardContent>
                          <CardActions sx={{ px: 3, pb: 3, pt: 0 }}>
                            {project.demoUrl && (
                              <Button
                                size="small"
                                variant="contained"
                                startIcon={<LaunchIcon />}
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Live Demo
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<GitHubIcon />}
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ ml: 1 }}
                              >
                                Code
                              </Button>
                            )}
                          </CardActions>
                        </Card>
                      </AnimatedCard>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography>No projects available.</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
