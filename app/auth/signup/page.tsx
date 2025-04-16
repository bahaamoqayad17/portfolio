"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import { createGradientBackground } from "@/app/theme";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      // Register the user
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to register");
      }

      // Sign in the user after successful registration
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(
          "Registration successful, but failed to sign in automatically. Please sign in manually."
        );
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Grid
        container
        sx={{
          height: "80vh",
          overflow: "hidden",
          borderRadius: "16px",
          boxShadow: "0 8px 40px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid
          item
          md={6}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: { xs: 4, sm: 6, md: 8 },
            bgcolor: "background.paper",
          }}
        >
          <Box sx={{ mb: 6, textAlign: "center" }}>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              Create Your Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign up to manage your portfolio content
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Paper
            component="form"
            onSubmit={handleSignUp}
            elevation={0}
            sx={{
              p: 4,
              background: "rgba(30, 30, 30, 0.5)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
              mb: 4,
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: "bold" }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </Paper>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Button
              component={Link}
              href="/auth/signin"
              variant="outlined"
              sx={{ mr: 2, textTransform: "none" }}
            >
              Sign In
            </Button>
            <Button
              component={Link}
              href="/"
              variant="text"
              sx={{ textTransform: "none" }}
            >
              Back to Home
            </Button>
          </Box>
        </Grid>

        <Grid
          item
          md={6}
          sx={{
            height: "100%",
            position: "relative",
            display: { xs: "none", md: "block" },
            background: createGradientBackground(),
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)",
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "white",
              zIndex: 2,
              width: "80%",
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              fontWeight="bold"
              gutterBottom
            >
              Welcome to Your Portfolio
            </Typography>
            <Typography variant="body1" paragraph>
              Create an account to manage your portfolio content, track contact
              messages, and showcase your skills and projects.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
