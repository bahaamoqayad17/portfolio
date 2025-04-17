"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  LinearProgress,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import Link from "next/link";
import CodeIcon from "@mui/icons-material/Code";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import EditIcon from "@mui/icons-material/Edit";
import { createGradientBackground } from "../theme";

export default function DashboardPage() {
  const theme = useTheme();
  const [counts, setCounts] = useState({
    projects: 0,
    skills: 0,
    messages: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // Fetch projects count
        const projectsResponse = await fetch("/api/projects");
        const projectsData = await projectsResponse.json();

        // Fetch skills count
        const skillsResponse = await fetch("/api/skills");
        const skillsData = await skillsResponse.json();

        // Set counts
        setCounts({
          projects: projectsData.length || 0,
          skills: skillsData.length || 0,
          messages: 5, // Placeholder
        });

        // Set recent projects
        const sortedProjects = [...projectsData]
          .sort(
            (a, b) =>
              new Date(b.createdAt || "2023-01-01").getTime() -
              new Date(a.createdAt || "2023-01-01").getTime()
          )
          .slice(0, 5)
          .map((project) => ({
            id: project.id,
            title: project.title,
            date: project.createdAt || "2023-01-01",
            category: project.category,
          }));

        setRecentProjects(sortedProjects);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Set default values on error
        setCounts({
          projects: 6,
          skills: 12,
          messages: 5,
        });
        setRecentProjects([
          {
            id: "1",
            title: "E-Commerce Platform",
            date: "2023-06-15",
            category: "Full Stack",
          },
          {
            id: "2",
            title: "Task Management App",
            date: "2023-05-20",
            category: "Full Stack",
          },
          {
            id: "3",
            title: "Portfolio Website",
            date: "2023-04-10",
            category: "Frontend",
          },
          {
            id: "4",
            title: "RESTful API Service",
            date: "2023-03-05",
            category: "Backend",
          },
          {
            id: "5",
            title: "Weather Dashboard",
            date: "2023-02-15",
            category: "Frontend",
          },
        ]);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const cardVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  const StatCard = ({ title, count, icon, color, link }) => (
    <Grid item xs={12} sm={4}>
      <motion.div whileHover="hover" variants={cardVariants}>
        <Card
          component={Link}
          href={link}
          sx={{
            height: "100%",
            background: `rgba(30, 30, 30, 0.7)`,
            borderRadius: "16px",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s ease",
            textDecoration: "none",
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "5px",
              background: color,
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography
                variant="h6"
                component="div"
                fontWeight="bold"
                color="text.primary"
              >
                {title}
              </Typography>
              <Box
                sx={{
                  bgcolor: `${color}20`,
                  color: color,
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                }}
              >
                {icon}
              </Box>
            </Box>
            <Typography
              variant="h3"
              component="div"
              fontWeight="bold"
              color="text.primary"
            >
              {count}
            </Typography>
            <Box display="flex" alignItems="center" mt={2}>
              <Typography variant="body2" color="text.secondary">
                Manage {title.toLowerCase()}
              </Typography>
              <Box
                component="span"
                sx={{ ml: 1, display: "inline-flex", color: color }}
              >
                <EditIcon fontSize="small" />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  );

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Welcome to your Portfolio Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your projects, skills, and website content from here.
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ width: "100%", mt: 4 }}>
          <LinearProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3} mb={4}>
            <StatCard
              title="Projects"
              count={counts.projects}
              icon={<CodeIcon />}
              color={theme.palette.primary.main}
              link="/dashboard/projects"
            />
            <StatCard
              title="Skills"
              count={counts.skills}
              icon={<BarChartIcon />}
              color={theme.palette.secondary.main}
              link="/dashboard/skills"
            />
            <StatCard
              title="Messages"
              count={counts.messages}
              icon={<MailIcon />}
              color={theme.palette.info.main}
              link="/dashboard/contact"
            />
          </Grid>

          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Paper
                sx={{
                  p: 3,
                  background: "rgba(30, 30, 30, 0.7)",
                  borderRadius: "16px",
                  height: "100%",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={3}
                >
                  <Typography variant="h6" component="h2" fontWeight="bold">
                    Recent Projects
                  </Typography>
                  <Button
                    component={Link}
                    href="/dashboard/projects"
                    size="small"
                  >
                    View All
                  </Button>
                </Box>
                <List>
                  {recentProjects.map((project, index) => (
                    <Box key={project.id}>
                      <ListItem
                        sx={{
                          px: 2,
                          py: 1.5,
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                          },
                        }}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            component={Link}
                            href={`/dashboard/projects?id=${project.id}`}
                            size="small"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        }
                      >
                        <ListItemIcon sx={{ minWidth: "40px" }}>
                          <Box
                            sx={{
                              bgcolor: `${theme.palette.primary.main}20`,
                              color: theme.palette.primary.main,
                              width: 32,
                              height: 32,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "8px",
                            }}
                          >
                            <CodeIcon fontSize="small" />
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={project.title}
                          secondary={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mt: 0.5,
                              }}
                            >
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {new Date(project.date).toLocaleDateString()}
                              </Typography>
                              <Chip
                                label={project.category}
                                size="small"
                                sx={{
                                  height: 20,
                                  fontSize: "0.6rem",
                                  bgcolor: `${theme.palette.primary.main}20`,
                                  color: theme.palette.primary.main,
                                }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < recentProjects.length - 1 && (
                        <Divider
                          variant="inset"
                          component="li"
                          sx={{ opacity: 0.1 }}
                        />
                      )}
                    </Box>
                  ))}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper
                sx={{
                  p: 3,
                  background: "rgba(30, 30, 30, 0.7)",
                  borderRadius: "16px",
                  height: "100%",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={3}
                >
                  <Typography variant="h6" component="h2" fontWeight="bold">
                    Quick Actions
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  {[
                    {
                      title: "Add New Project",
                      icon: <CodeIcon />,
                      link: "/dashboard/projects",
                      color: theme.palette.primary.main,
                    },
                    {
                      title: "Update Skills",
                      icon: <BarChartIcon />,
                      link: "/dashboard/skills",
                      color: theme.palette.secondary.main,
                    },
                    {
                      title: "Edit About Me",
                      icon: <PersonIcon />,
                      link: "/dashboard/about",
                      color: theme.palette.warning.main,
                    },
                    {
                      title: "View Messages",
                      icon: <MailIcon />,
                      link: "/dashboard/contact",
                      color: theme.palette.info.main,
                    },
                  ].map((action, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <motion.div whileHover="hover" variants={cardVariants}>
                        <Card
                          component={Link}
                          href={action.link}
                          sx={{
                            bgcolor: `${action.color}10`,
                            border: `1px solid ${action.color}30`,
                            borderRadius: "12px",
                            transition: "all 0.3s ease",
                            textDecoration: "none",
                          }}
                        >
                          <CardActionArea sx={{ p: 2 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <Box
                                sx={{
                                  bgcolor: `${action.color}20`,
                                  color: action.color,
                                  width: 40,
                                  height: 40,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderRadius: "10px",
                                }}
                              >
                                {action.icon}
                              </Box>
                              <Typography
                                variant="body1"
                                fontWeight="medium"
                                color="text.primary"
                              >
                                {action.title}
                              </Typography>
                            </Box>
                          </CardActionArea>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}
