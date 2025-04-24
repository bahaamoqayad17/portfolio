"use client";

import { Box, Typography, Container, Grid, useTheme } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";

const StatItem = ({ number, label, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const theme = useTheme();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = number / steps;
      const interval = duration / steps;

      let currentCount = 0;
      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= number) {
          setCount(number);
          clearInterval(timer);
        } else {
          setCount(Math.floor(currentCount));
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isInView, number]);

  return (
    <Grid item size={{ xs: 12, md: 3 }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay }}
      >
        <Box
          sx={{
            textAlign: "center",
            p: 3,
            borderRadius: "16px",
            background: `linear-gradient(180deg, ${theme.palette.background.paper}30, ${theme.palette.background.paper}10)`,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
              fontWeight: 700,
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            {count}+
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              fontWeight: 500,
            }}
          >
            {label}
          </Typography>
        </Box>
      </motion.div>
    </Grid>
  );
};

const StatsSection = () => {
  const theme = useTheme();

  const stats = [
    { number: 23, label: "Clients" },
    { number: 7, label: "Companies" },
    { number: 57, label: "Projects" },
    { number: 5, label: "Years of Experience" },
  ];

  return (
    <Box
      id="stats"
      sx={{
        py: { xs: 8, md: 12 },
        background: `linear-gradient(180deg, ${theme.palette.background.default}, ${theme.palette.background.paper}30)`,
      }}
    >
      <Container>
        <AnimatedTitle
          text="My Impact"
          subtitle="Numbers that speak for themselves"
        />
        <Grid container spacing={8}>
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              number={stat.number}
              label={stat.label}
              delay={index * 0.2}
            />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StatsSection;
