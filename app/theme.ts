import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material";

// Define dark theme with gradient capabilities
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6a11cb",
      light: "#8c5eff",
      dark: "#4a0b95",
    },
    secondary: {
      main: "#2575fc",
      light: "#5e9cff",
      dark: "#0052c7",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    success: {
      main: "#4caf50",
    },
    info: {
      main: "#29b6f6",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "3rem",
      lineHeight: 1.2,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.2,
      letterSpacing: "0em",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.75rem",
      lineHeight: 1.2,
      letterSpacing: "0.00735em",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.2,
      letterSpacing: "0em",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.2,
      letterSpacing: "0.0075em",
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.75,
      letterSpacing: "0.00938em",
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.57,
      letterSpacing: "0.00714em",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
    },
    button: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "uppercase",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#1e1e1e",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#6a11cb",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#8c5eff",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "10px 20px",
          transition: "all 0.3s ease",
          textTransform: "none",
          fontWeight: 600,
        },
        contained: {
          background: "linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)",
          boxShadow: "0 3px 5px 2px rgba(106, 17, 203, 0.3)",
          "&:hover": {
            background: "linear-gradient(45deg, #5a0cb0 30%, #1a65e6 90%)",
            boxShadow: "0 5px 8px 2px rgba(106, 17, 203, 0.4)",
            transform: "translateY(-2px)",
          },
        },
        outlined: {
          borderColor: "#6a11cb",
          "&:hover": {
            borderColor: "#8c5eff",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          background: "rgba(30, 30, 30, 0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 15px 40px 0 rgba(0, 0, 0, 0.5)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(18, 18, 18, 0.8)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ffffff",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ffffff",
            },
          },
        },
      },
    },
  },
});

// Helper functions for gradient effects
export const createGradientBackground = (angle = 45) =>
  `linear-gradient(${angle}deg, ${darkTheme.palette.primary.main} 0%, ${darkTheme.palette.secondary.main} 100%)`;

export const createGlowEffect = (color: string) =>
  `0 0 15px ${alpha(color, 0.5)}, 0 0 30px ${alpha(color, 0.3)}`;
