'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
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
  Divider
} from '@mui/material';
import { createGradientBackground } from '@/app/theme';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';

export default function SignInPage() {
  const theme = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid container sx={{ height: '80vh', overflow: 'hidden', borderRadius: '16px', boxShadow: '0 8px 40px rgba(0, 0, 0, 0.1)' }}>
        <Grid 
          md={6} 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            p: { xs: 4, sm: 6, md: 8 },
            bgcolor: 'background.paper'
          }}
        >
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in to access your dashboard
            </Typography>
          </Box>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <Paper
            component="form"
            onSubmit={handleSignIn}
            elevation={0}
            sx={{
              p: 4,
              background: 'rgba(30, 30, 30, 0.5)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              mb: 4
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </Paper>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Default credentials: admin@example.com / admin123
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Button
              component={Link}
              href="/"
              variant="outlined"
              sx={{ textTransform: 'none' }}
            >
              Back to Home
            </Button>
          </Box>
        </Grid>
        
        <Grid
          md={6}
          sx={{
            height: '100%',
            position: 'relative',
            display: { xs: 'none', md: 'block' },
            background: createGradientBackground(),
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)',
              zIndex: 1
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'white',
              zIndex: 2,
              width: '80%'
            }}
          >
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              Dashboard Access
            </Typography>
            <Typography variant="body1" paragraph>
              Manage your portfolio content, projects, skills, and more from the secure admin dashboard.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}