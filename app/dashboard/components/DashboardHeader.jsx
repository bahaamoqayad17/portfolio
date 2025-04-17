"use client";

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createGradientBackground } from "@/app/theme";

export default function DashboardHeader({
  isSidebarOpen,
  toggleSidebar,
  title,
}) {
  const theme = useTheme();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    router.push("/");
    handleMenuClose();
  };

  const handleGoToSettings = () => {
    router.push("/dashboard/settings");
    handleMenuClose();
  };

  const handleGoToProfile = () => {
    router.push("/dashboard/profile");
    handleMenuClose();
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(20, 20, 20, 0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            fontWeight: 600,
            position: "relative",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            key={title}
          >
            {title}
          </motion.div>
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="large"
            aria-label="show new notifications"
            color="inherit"
            sx={{
              mr: 2,
              "&:hover": {
                background: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            sx={{
              p: 0.5,
              border: "2px solid transparent",
              "&:hover": {
                borderColor: theme.palette.primary.main,
              },
              transition: "all 0.3s ease",
            }}
          >
            <Avatar
              alt="Admin User"
              sx={{
                width: 36,
                height: 36,
                background: createGradientBackground(),
              }}
            >
              A
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            background: "rgba(30, 30, 30, 0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            "& .MuiMenuItem-root": {
              padding: "10px 20px",
              gap: 2,
              borderRadius: "4px",
              margin: "4px",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.05)",
              },
            },
          },
        }}
      >
        <MenuItem onClick={handleGoToProfile}>
          <PersonIcon fontSize="small" />
          <Typography>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleGoToSettings}>
          <SettingsIcon fontSize="small" />
          <Typography>Settings</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon fontSize="small" />
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </AppBar>
  );
}
