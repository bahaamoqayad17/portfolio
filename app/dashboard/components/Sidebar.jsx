"use client";

import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Code as CodeIcon,
  BarChart as BarChartIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import GradientText from "../../components/GradientText";
import { createGradientBackground } from "../../theme";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const menuItems = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { name: "Projects", icon: <CodeIcon />, path: "/dashboard/projects" },
    { name: "Skills", icon: <BarChartIcon />, path: "/dashboard/skills" },
    { name: "About", icon: <PersonIcon />, path: "/dashboard/about" },
    { name: "Messages", icon: <EmailIcon />, path: "/dashboard/contact" },
  ];

  const handleNavigate = (path) => {
    router.push(path);
    if (isMobile) toggleSidebar();
  };

  const drawerWidth = isOpen ? 240 : 70;

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isOpen}
      onClose={toggleSidebar}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: "hidden",
          background: "rgba(20, 20, 20, 0.95)",
          backdropFilter: "blur(10px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isOpen ? "space-between" : "center",
          py: 2,
          px: isOpen ? 2 : 0,
        }}
      >
        {isOpen && (
          <Box component="span" sx={{ ml: 1 }}>
            <GradientText variant="h6" fontWeight="bold">
              Bahaa El Moqayad
            </GradientText>
          </Box>
        )}
        <IconButton onClick={toggleSidebar}>
          <ChevronLeftIcon
            sx={{ transform: isOpen ? "rotate(0deg)" : "rotate(180deg)" }}
          />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)" }} />

      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path !== "/dashboard" && pathname.startsWith(item.path));

          return (
            <ListItem
              key={item.name}
              disablePadding
              sx={{ display: "block", mb: 0.5 }}
            >
              <Tooltip title={isOpen ? "" : item.name} placement="right">
                <ListItemButton
                  onClick={() => handleNavigate(item.path)}
                  sx={{
                    minHeight: 48,
                    justifyContent: isOpen ? "initial" : "center",
                    px: isOpen ? 3 : 2.5,
                    mx: isOpen ? 1 : 0.7,
                    borderRadius: "10px",
                    position: "relative",
                    ...(isActive && {
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: "4px",
                        borderRadius: "0 4px 4px 0",
                        background: createGradientBackground(90),
                      },
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isOpen ? 2 : "auto",
                      justifyContent: "center",
                      color: isActive ? "primary.main" : "text.primary",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {isOpen && (
                    <ListItemText
                      primary={item.name}
                      sx={{
                        opacity: isOpen ? 1 : 0,
                        color: isActive ? "primary.main" : "text.primary",
                        "& .MuiListItemText-primary": {
                          fontWeight: isActive ? 600 : 400,
                        },
                      }}
                    />
                  )}
                  {isActive && isOpen && (
                    <Box
                      component={motion.div}
                      layoutId="activeIndicator"
                      sx={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: createGradientBackground(),
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)", mt: 2 }} />

      <List>
        <ListItem disablePadding sx={{ display: "block", mt: 0.5 }}>
          <Tooltip title={isOpen ? "" : "Go to Website"} placement="right">
            <ListItemButton
              onClick={() => router.push("/")}
              sx={{
                minHeight: 48,
                justifyContent: isOpen ? "initial" : "center",
                px: isOpen ? 3 : 2.5,
                mx: isOpen ? 1 : 0.7,
                borderRadius: "10px",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isOpen ? 2 : "auto",
                  justifyContent: "center",
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              {isOpen && <ListItemText primary="Go to Website" />}
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>
    </Drawer>
  );
}
