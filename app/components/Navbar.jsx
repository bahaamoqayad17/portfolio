"use client";

import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import GradientText from "./GradientText";

const pages = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollY } = useScroll();

  const navbarOpacity = useTransform(scrollY, [0, 100], [0.6, 0.95]);
  const navbarBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(10px)"]
  );
  const navbarHeight = useTransform(scrollY, [0, 100], ["80px", "70px"]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = pages.map((page) => page.href.replace("#", ""));
      const scrollPosition = window.scrollY + 100; // Adding offset for active state

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        opacity: navbarOpacity,
        backdropFilter: navbarBlur,
      }}
    >
      <AppBar
        position="static"
        sx={{
          background: "rgba(18, 18, 18, 0.8)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: navbarHeight }}>
            {/* Desktop Logo */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="#hero"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 2,
                fontWeight: 700,
                letterSpacing: ".1rem",
                textDecoration: "none",
              }}
            >
              <GradientText>Bahaa El Moqayad</GradientText>
            </Typography>

            {/* Mobile Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  "& .MuiPaper-root": {
                    background: "rgba(30, 30, 30, 0.95)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                  },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    href={page.href}
                    sx={{
                      color:
                        activeSection === page.href.replace("#", "")
                          ? "primary.main"
                          : "text.primary",
                      "&:hover": {
                        background: "rgba(106, 17, 203, 0.1)",
                      },
                    }}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Mobile Logo */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="#hero"
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: ".1rem",
                textDecoration: "none",
              }}
            >
              <GradientText sx={{ fontSize: 24 }}>
                Bahaa El Moqayad
              </GradientText>
            </Typography>

            {/* Desktop Menu */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              {pages.map((page) => {
                const isActive = activeSection === page.href.replace("#", "");
                return (
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    href={page.href}
                    sx={{
                      my: 2,
                      mx: 1.5,
                      color: "white",
                      display: "block",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "10px",
                        left: isActive ? "10%" : "50%",
                        right: isActive ? "10%" : "50%",
                        height: "2px",
                        background: "linear-gradient(45deg, #6a11cb, #2575fc)",
                        transition: "all 0.3s ease",
                        opacity: isActive ? 1 : 0,
                      },
                      "&:hover::after": {
                        left: "10%",
                        right: "10%",
                        opacity: 1,
                      },
                    }}
                  >
                    {page.name}
                  </Button>
                );
              })}
            </Box>

            {/* Right side action button */}
            {/* <Box sx={{ flexGrow: 0 }}>
              <Button
                component={Link}
                href="/dashboard"
                variant="contained"
                sx={{
                  display: { xs: "none", md: "block" },
                }}
              >
                Dashboard
              </Button>
            </Box> */}
          </Toolbar>
        </Container>
      </AppBar>
    </motion.div>
  );
}

export default Navbar;
