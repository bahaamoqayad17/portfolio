"use client";

import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
  Grid,
  Link as MuiLink,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import Link from "next/link";
import GradientText from "./GradientText";
import { createGradientBackground } from "../theme";

export default function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const sections = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  const socialLinks = [
    { icon: <GitHubIcon />, href: "https://github.com", label: "GitHub" },
    { icon: <LinkedInIcon />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <TwitterIcon />, href: "https://twitter.com", label: "Twitter" },
    { icon: <EmailIcon />, href: "mailto:contact@example.com", label: "Email" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(0deg, rgba(18, 18, 18, 0.95), rgba(30, 30, 30, 0.8))`,
        backdropFilter: "blur(10px)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: createGradientBackground(),
          opacity: 0.5,
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{ mb: 2, fontWeight: "bold" }}
              >
                <GradientText>Bahaa El Moqayad</GradientText>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3, maxWidth: "400px", color: "#fff" }}
              >
                A passionate Full Stack JavaScript Developer building modern web
                applications with cutting-edge technologies.
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <IconButton
                      component="a"
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.05)",
                        color: "#fff",
                        "&:hover": {
                          bgcolor: "rgba(255, 255, 255, 0.1)",
                          color: theme.palette.primary.main,
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {link.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                fontWeight="bold"
                color="white"
                sx={{ mb: 3 }}
              >
                Quick Links
              </Typography>
              <Box
                component="nav"
                sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
              >
                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <MuiLink
                      component={Link}
                      href={section.href}
                      sx={{
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                        "&:hover": {
                          color: theme.palette.primary.main,
                        },
                        display: "flex",
                        alignItems: "center",
                        color: "#fff",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          display: "inline-block",
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: createGradientBackground(),
                          mr: 1.5,
                          color: "#fff",
                        }}
                      />
                      {section.name}
                    </MuiLink>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          <Grid item size={{ xs: 12, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                fontWeight="bold"
                sx={{ mb: 3, color: "#fff" }}
              >
                Contact Info
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <EmailIcon
                    sx={{ mr: 1.5, color: theme.palette.primary.main }}
                  />
                  <Typography variant="body2" color="white">
                    bahaamoqayad.2000030@gmail.com
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <Box
                    component="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    sx={{
                      width: 24,
                      height: 24,
                      mr: 1.5,
                      color: theme.palette.primary.main,
                    }}
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </Box>
                  <Typography variant="body2" color="white">
                    +972598623000
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <Box
                    component="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    sx={{
                      width: 24,
                      height: 24,
                      mr: 1.5,
                      color: theme.palette.primary.main,
                    }}
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </Box>
                  <Typography variant="body2" color="white">
                    Palestine, Gaza
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, opacity: 0.6 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="body2" color="white">
            © {currentYear} Portfolio. All rights reserved.
          </Typography>
          <Typography variant="body2" color="white">
            Designed & Built with{" "}
            <Box component="span" sx={{ color: theme.palette.error.main }}>
              ❤
            </Box>{" "}
            by Bahaa El Moqayad
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
