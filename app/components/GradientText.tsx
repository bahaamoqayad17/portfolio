'use client';

import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface GradientTextProps extends TypographyProps {
  children: ReactNode;
  animationDuration?: number;
}

const StyledGradientText = styled(motion.span)(({ theme }) => ({
  backgroundSize: '300% 300%',
  backgroundImage: `linear-gradient(45deg, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.main}, 
    ${theme.palette.primary.light}, 
    ${theme.palette.secondary.light})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline-block',
}));

export default function GradientText({ 
  children, 
  animationDuration = 8, 
  variant = 'h4',
  ...props 
}: GradientTextProps) {
  return (
    <Typography 
      variant={variant} 
      component="span" 
      {...props}
      sx={{ display: 'inline-block', ...props.sx }}
    >
      <StyledGradientText
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: animationDuration,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {children}
      </StyledGradientText>
    </Typography>
  );
}
