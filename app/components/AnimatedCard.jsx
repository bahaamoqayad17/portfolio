"use client";

import { Card, styled } from "@mui/material";
import { motion } from "framer-motion";

const StyledCard = styled(Card)(({ theme }) => ({
  overflow: "hidden",
  borderRadius: "16px",
  background: "rgba(30, 30, 30, 0.5)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: `0 15px 40px 0 rgba(0, 0, 0, 0.3), 0 0 15px ${theme.palette.primary.main}30`,
    borderColor: `${theme.palette.primary.main}50`,
  },
}));

export default function AnimatedCard({ children, delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: delay,
      }}
    >
      <StyledCard {...props}>{children}</StyledCard>
    </motion.div>
  );
}
