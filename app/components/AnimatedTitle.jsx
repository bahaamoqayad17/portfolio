"use client";

import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import GradientText from "./GradientText";

export default function AnimatedTitle({ text, subtitle, align = "center" }) {
  const textArray = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <Box
      sx={{
        textAlign: align,
        mb: subtitle ? 2 : 6,
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Typography variant="h2" component="h2" sx={{ fontWeight: 700 }}>
          {textArray.map((word, index) => (
            <motion.span
              key={index}
              variants={childVariants}
              style={{ display: "inline-block", marginRight: "0.5rem" }}
            >
              {index === textArray.length - 1 ? (
                <GradientText variant="h2" animationDuration={10}>
                  {word}
                </GradientText>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </Typography>
      </motion.div>

      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            type: "spring",
            stiffness: 100,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mt: 2,
              mb: 5,
              maxWidth: "800px",
              mx: align === "center" ? "auto" : 0,
              color: "#fff",
            }}
          >
            {subtitle}
          </Typography>
        </motion.div>
      )}
    </Box>
  );
}
