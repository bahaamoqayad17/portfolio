"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Avatar,
  Chip,
  IconButton,
  LinearProgress,
  Alert,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  DeleteOutline as DeleteOutlineIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { AboutInfo, AboutCategory } from "@/lib/types";
import AboutForm from "../components/AboutForm";
import { createGradientBackground } from "@/app/theme";

export default function AboutPage() {
  const [aboutInfo, setAboutInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchAboutInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/about");
        if (response.ok) {
          const data = await response.json();
          setAboutInfo(data);
        } else {
          console.error("Failed to fetch about info");
          // Set default data if API fails
          setAboutInfo({
            name: "John Doe",
            title: "Full Stack JavaScript Developer",
            bio: "I'm a passionate Full Stack JavaScript Developer with over 5 years of experience building modern web applications. I specialize in React, Next.js, Node.js and TypeScript, focusing on creating performant and scalable solutions that solve real-world problems.",
            experience: "5+ years",
            location: "San Francisco, CA",
            education: "Bachelor's in Computer Science",
            categories: [
              {
                id: "1",
                title: "Frontend Development",
                description:
                  "I create responsive, accessible, and performant user interfaces using modern JavaScript frameworks.",
                icon: "web",
              },
              {
                id: "2",
                title: "Backend Development",
                description:
                  "I build robust and scalable APIs and server-side applications with Node.js and Express.",
                icon: "server",
              },
              {
                id: "3",
                title: "Full Stack Solutions",
                description:
                  "I deliver end-to-end solutions, from concept to deployment, ensuring seamless integration across the stack.",
                icon: "code",
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching about info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutInfo();
  }, []);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSaveAbout = async (updatedAbout) => {
    try {
      setLoading(true);
      const response = await fetch("/api/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAbout),
      });

      if (response.ok) {
        const data = await response.json();
        setAboutInfo(data);
        setEditing(false);
        setAlert({
          message: "About information updated successfully!",
          severity: "success",
        });
      } else {
        setAlert({
          message: "Failed to update about information. Please try again.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error saving about info:", error);
      setAlert({
        message: "An error occurred. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h5" component="h1" fontWeight="bold">
          About Me Management
        </Typography>
        <Button
          variant={editing ? "outlined" : "contained"}
          startIcon={editing ? <SaveIcon /> : <EditIcon />}
          onClick={handleEditToggle}
          disabled={loading}
        >
          {editing ? "Cancel" : "Edit Information"}
        </Button>
      </Box>

      {alert && (
        <Alert
          severity={alert.severity}
          sx={{ mb: 3 }}
          onClose={() => setAlert(null)}
        >
          {alert.message}
        </Alert>
      )}

      {editing ? (
        <AboutForm
          aboutInfo={aboutInfo}
          onSave={handleSaveAbout}
          loading={loading}
        />
      ) : aboutInfo ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            sx={{
              p: 4,
              bgcolor: "rgba(30, 30, 30, 0.7)",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  <Avatar
                    src="/assets/avatar-placeholder.svg"
                    alt={aboutInfo.name}
                    sx={{
                      width: 150,
                      height: 150,
                      mb: 3,
                      boxShadow: `0 0 20px ${theme.palette.primary.main}50`,
                      background: createGradientBackground(),
                    }}
                  />
                  <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {aboutInfo.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary.main"
                    gutterBottom
                  >
                    {aboutInfo.title}
                  </Typography>

                  <Divider sx={{ my: 3, width: "100%", opacity: 0.2 }} />

                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <LocationIcon sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="body2">
                        Location: {aboutInfo.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <WorkIcon sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="body2">
                        Experience: {aboutInfo.experience}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <SchoolIcon sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="body2">
                        Education: {aboutInfo.education}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={8}>
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    fontWeight="bold"
                  >
                    Bio
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {aboutInfo.bio}
                  </Typography>
                </Box>

                <Divider sx={{ my: 3, opacity: 0.2 }} />

                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  fontWeight="bold"
                >
                  Expertise
                </Typography>

                <Grid container spacing={3} sx={{ mt: 1 }}>
                  {aboutInfo.categories.map((category) => (
                    <Grid item xs={12} sm={6} key={category.id}>
                      <Paper
                        sx={{
                          p: 3,
                          height: "100%",
                          background: "rgba(18, 18, 18, 0.5)",
                          borderRadius: "12px",
                          border: "1px solid rgba(255, 255, 255, 0.03)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                            border: "1px solid rgba(255, 255, 255, 0.05)",
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
                          }}
                        >
                          {category.icon === "web" && (
                            <DesignServicesIcon fontSize="large" />
                          )}
                          {category.icon === "server" && (
                            <StorageIcon fontSize="large" />
                          )}
                          {category.icon === "code" && (
                            <CodeIcon fontSize="large" />
                          )}
                        </Box>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                          {category.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {category.description}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      ) : (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            No about information available
          </Typography>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEditToggle}
          >
            Add Information
          </Button>
        </Paper>
      )}
    </Box>
  );
}
