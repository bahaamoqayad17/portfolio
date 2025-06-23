"use client";

import { useState, FormEvent } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import { motion } from "framer-motion";
import AnimatedTitle from "./AnimatedTitle";
import AnimatedCard from "./AnimatedCard";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { useTheme } from "@mui/material/styles";
import { createGradientBackground } from "../theme";

export default function ContactSection() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAlert({
          open: true,
          message: "Thank you for your message! I will get back to you soon.",
          severity: "success",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          mobile: "",
          subject: "",
          message: "",
        });
      } else {
        setAlert({
          open: true,
          message: "Failed to send message. Please try again later.",
          severity: "error",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        message: "Failed to send message. Please try again later.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const ContactInfo = [
    {
      icon: <EmailIcon fontSize="large" />,
      title: "Email",
      content: "bahaamoqayad17@gmail.com",
      link: "mailto:bahaamoqayad17@gmail.com",
    },
    {
      icon: <PhoneIcon fontSize="large" />,
      title: "Phone",
      content: "+972598623000",
      link: "https://wa.me/+972598623000",
    },
    {
      icon: <LocationOnIcon fontSize="large" />,
      title: "Location",
      content: "Palestine, Gaza",
      link: "https://maps.google.com/?q=Palestine, Gaza",
    },
  ];

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 10, md: 15 },
        background: `linear-gradient(180deg, ${theme.palette.background.default}, ${theme.palette.background.paper}30)`,
      }}
    >
      <Container>
        <AnimatedTitle
          text="Get In Touch"
          subtitle="Feel free to contact me if you have any questions or opportunities"
        />

        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                component="h3"
                gutterBottom
                fontWeight="bold"
                color="white"
              >
                Let's Talk
              </Typography>
              <Typography variant="body1" paragraph color="white">
                I'm always open to discussing new projects, creative ideas or
                opportunities to be part of your vision.
              </Typography>
            </Box>

            <Grid container spacing={3} mb={7}>
              {ContactInfo.map((info, index) => (
                <Grid item size={{ xs: 12, md: 4 }} key={index}>
                  <AnimatedCard delay={index * 0.1}>
                    <Box
                      component="a"
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 3,
                        textDecoration: "none",
                        color: "inherit",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
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
                          mr: 3,
                          color: "white",
                        }}
                      >
                        {info.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          gutterBottom
                          fontWeight="bold"
                          color="white"
                        >
                          {info.title}
                        </Typography>
                        <Typography variant="body2" color="white">
                          {info.content}
                        </Typography>
                      </Box>
                    </Box>
                  </AnimatedCard>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Grid>

        <Grid item xs={12}>
          <AnimatedCard>
            <Paper
              component="form"
              onSubmit={handleSubmit}
              elevation={0}
              sx={{
                p: 4,
                background: "rgba(30, 30, 30, 0.5)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "5px",
                  background: createGradientBackground(),
                  zIndex: 1,
                },
              }}
            >
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                fontWeight="bold"
                color="white"
                textAlign="center"
                mb={5}
              >
                Send a Message
              </Typography>

              <Grid container spacing={3}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  name="name"
                  label="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  disabled={loading}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "white",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Your Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  disabled={loading}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "white",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  name="mobile"
                  label="Mobile Number"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  variant="outlined"
                  disabled={loading}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "white",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />
                <TextField
                  required
                  fullWidth
                  id="subject"
                  name="subject"
                  label="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  variant="outlined"
                  disabled={loading}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "white",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={6}
                  id="message"
                  name="message"
                  label="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  variant="outlined"
                  disabled={loading}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "white",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </Grid>
            </Paper>
          </AnimatedCard>
        </Grid>

        <Snackbar
          open={alert.open}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={alert.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
