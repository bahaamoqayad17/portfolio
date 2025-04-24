"use client";

import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Tab,
  Tabs,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedTitle from "./AnimatedTitle";
import AnimatedCard from "./AnimatedCard";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import { createGradientBackground } from "../theme";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "AlPazar Ads Mobile Application",
      description:
        "A classified ads mobile app built with React Native and Expo, allowing users to list and browse items across multiple categories.",
      role: "Lead Developer",
      technologies: [
        "React Native",
        "Expo",
        "React Native Paper",
        "Node.js",
        "GraphQL",
        "Fastify",
        "Next.js",
        "Material UI",
      ],
      demoUrl: "",
      githubUrl: "https://github.com/bahaamoqayad17/AlPazar",
    },
    {
      id: 2,
      title: "Elite Academy Platform",
      description:
        "An e-learning and course management system for students and trainers, built to be responsive and accessible across all devices.",
      role: "Frontend Developer",
      technologies: ["Laravel", "Blade", "JQuery", "Bootstrap"],
      demoUrl: "",
      githubUrl: "https://github.com/bahaamoqayad17/Elite-Website",
    },
    {
      id: 3,
      title: "Adzirc Affiliate Marketing Platform",
      description:
        "Modern affiliate marketing platform with campaign management, lead tracking, and responsive dashboards.",
      role: "Full Stack Developer",
      technologies: [
        "Next.js",
        "React",
        "Node.js",
        "Express.js",
        "Material UI",
        "MongoDB",
      ],
      demoUrl: "https://offerwall.vercel.app/",
      githubUrl: "https://github.com/bahaamoqayad17/OfferWall",
    },
    {
      id: 4,
      title: "Tips Trips Website",
      description:
        "A web app for tourists to plan trips and for hotels to manage bookings, with a responsive design and control panel.",
      role: "Frontend Developer",
      technologies: ["Next.js", "React", "Material UI", "Redux ToolKit"],
      demoUrl: "https://tips-trips.vercel.app/",
      githubUrl: "https://github.com/bahaamoqayad17/TipsTrips",
    },
    {
      id: 5,
      title: "Moalime E-Learning Platform",
      description:
        "Global e-learning platform for subjects like Math and Science, featuring instructor-led content and responsive UI.",
      role: "Frontend Developer",
      technologies: ["Next.js", "React", "Material UI", "Redux ToolKit"],
      demoUrl: "https://moalime.com/",
      githubUrl: "https://github.com/bahaamoqayad17/moalmi-front",
    },
    {
      id: 6,
      title: "Makani Travel Platform",
      description:
        "Travel platform connecting users with Muslim-friendly experiences and accommodations around the world.",
      role: "Full Stack Developer",
      technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Stripe", "Prisma"],
      demoUrl: "https://makanihomes.com/",
      githubUrl: "",
    },
    {
      id: 7,
      title: "Maydan App",
      description:
        "Mobile app to help students in Gaza find internships with top companies, built with React Native and Firebase.",
      role: "Mobile Developer",
      technologies: ["React Native", "Expo", "Firebase", "Tailwind CSS"],
      demoUrl: "",
      githubUrl: "https://github.com/bahaamoqayad17/Maydan",
    },
    {
      id: 8,
      title: "Investor App",
      description:
        "A financial mobile app for managing crypto and stock portfolios, secure transactions, and wallet tracking.",
      role: "Lead Mobile Developer",
      technologies: [
        "React Native",
        "Expo",
        "Redux Toolkit",
        "Node.js",
        "MongoDB",
      ],
      demoUrl: "",
      githubUrl: "",
      category: "Mobile App",
    },
    {
      id: 9,
      title: "Store Mobile Application",
      description:
        "A modern e-commerce app for browsing, purchasing, and managing orders with payment integration.",
      role: "Mobile Developer",
      technologies: ["React Native", "Expo", "Stripe", "Redux Toolkit"],
      demoUrl: "",
      githubUrl: "",
      category: "Mobile App",
    },
    {
      id: 10,
      title: "OVerse Landing Page",
      description:
        "Landing page for a futuristic tech startup, built with elegant UI, animations, and full mobile responsiveness.",
      role: "Frontend Developer",
      technologies: ["Next.js", "React", "Bootstrap", "Redux Toolkit"],
      demoUrl: "https://o-verse.vercel.app/",
      githubUrl: "https://github.com/bahaamoqayad17/OVerse",
    },
    {
      id: 11,
      title: "Aghati Shopping App",
      description:
        "An onboarding and shopping mobile app designed for modern consumers, offering smart purchasing, secure payment, and seamless UX.",
      role: "Full Stack Developer",
      technologies: [
        "React",
        "Next.js",
        "Redux Toolkit",
        "Node.js",
        "PostgreSQL",
        "Material UI",
      ],
      demoUrl: "",
      githubUrl: "https://github.com/bahaamoqayad17/Aghati",
    },
    {
      id: 12,
      title: "Booklet Website",
      description:
        "A web-based personal finance management platform, helping users track their financial data efficiently and securely.",
      role: "Frontend Developer",
      technologies: ["HTML", "CSS", "JavaScript", "JQuery", "Bootstrap"],
      demoUrl: "https://booklet-website.netlify.app/",
      githubUrl: "https://github.com/bahaamoqayad17/Booklet-WebSite",
    },
    {
      id: 13,
      title: "Clinic Management System",
      description:
        "A clinic management platform to streamline patient records, appointments, and schedules for private medical practices.",
      role: "Full Stack Developer",
      technologies: [
        "React",
        "Next.js",
        "Node.js",
        "MongoDB",
        "Express",
        "Material UI",
      ],
      demoUrl: "https://full-clinic.netlify.app/",
      githubUrl: "https://github.com/bahaamoqayad17/Full-Clinic",
    },
    {
      id: 14,
      title: "Dobby Landing Page",
      description:
        "A stylish landing page for a marine or adventure-themed brand, built with modern UI components and smooth navigation.",
      role: "Full Stack Developer",
      technologies: ["Laravel", "Blade", "JQuery", "Bootstrap", "MySQL"],
      demoUrl: "https://dolphin-club.netlify.app/",
      githubUrl: "https://github.com/bahaamoqayad17/Dolphin-Club",
    },
    {
      id: 15,
      title: "EWave App",
      description:
        "A finance and stock analysis mobile app for traders and investors to track market movement and manage portfolios.",
      role: "Lead Developer",
      technologies: [
        "Node.js",
        "Next.js",
        "Express",
        "MongoDB",
        "Material UI",
        "PayPal",
      ],
      demoUrl: "https://ewaveonline.com/",
      githubUrl: "https://github.com/bahaamoqayad17/EWave",
    },
    {
      id: 16,
      title: "Nest Grocery Store",
      description:
        "An e-commerce grocery platform offering intuitive navigation, product filtering, and responsive design for online shopping.",
      role: "Full Stack Developer",
      technologies: [
        "Next.js",
        "Node.js",
        "MongoDB",
        "Material UI",
        "Stripe",
        "Redux Toolkit",
      ],
      demoUrl: "https://personal-multivendor.netlify.app/",
      githubUrl: "https://github.com/bahaamoqayad17/Personal-Multivendor",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const initialProjectsCount = 6;

  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
  };

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, initialProjectsCount);

  const hasMoreProjects = filteredProjects.length > initialProjectsCount;

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
            <Typography>Loading...</Typography>
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
                  {displayedProjects.map((project, index) => (
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
                              zIndex: 50000,
                            },
                          }}
                        >
                          <CardMedia
                            component="div"
                            sx={{
                              height: 0,
                              paddingTop: "95%",
                              position: "relative",
                              overflow: "hidden",
                              background: `url('/projects/${project.id}.jpg')`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
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
                              variant="subtitle1"
                              color="primary.main"
                              sx={{ mb: 1 }}
                            >
                              Role: {project.role}
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
                                    borderColor: "rgb(177, 177, 177)",
                                    borderWidth: "3px",
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
                                View Demo
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
                                View Code
                              </Button>
                            )}
                          </CardActions>
                        </Card>
                      </AnimatedCard>
                    </Box>
                  ))}
                </Box>

                {hasMoreProjects && (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 4 }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => setShowAll(!showAll)}
                      sx={{
                        background: createGradientBackground(),
                        color: "#fff",
                        "&:hover": {
                          background: createGradientBackground(45),
                        },
                      }}
                    >
                      {showAll ? "Show Less" : "View All Projects"}
                    </Button>
                  </Box>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography>No data available</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
