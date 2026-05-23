"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/lib/seo";

export function AnimatedLogo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <motion.svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Background circle with gradient */}
        <motion.circle
          cx="20"
          cy="20"
          r="18"
          className="fill-primary/10 stroke-primary"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Inner geometric shape - Abstract "B" */}
        <motion.path
          d="M14 10V30M14 10H22C25.3137 10 28 12.6863 28 16C28 19.3137 25.3137 22 22 22H14M14 22H24C27.3137 22 30 24.6863 30 28C30 29.1046 29.7 30 29 30H14"
          className="stroke-primary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        />

        {/* Animated accent dot */}
        <motion.circle
          cx="32"
          cy="12"
          r="3"
          className="fill-accent"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          whileHover={{ scale: 1.3 }}
        />

        {/* Orbiting particle on hover */}
        <motion.circle
          cx="20"
          cy="20"
          r="2"
          className="fill-primary opacity-0 group-hover:opacity-100"
          animate={{
            cx: [20, 35, 20, 5, 20],
            cy: [5, 20, 35, 20, 5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.svg>

      <div className="flex flex-col">
        <motion.span
          className="text-xl font-bold gradient-text leading-none"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {siteConfig.name}
        </motion.span>
        <motion.span
          className="text-[10px] text-muted-foreground"
          lang="ar"
          dir="rtl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {siteConfig.arabicName}
        </motion.span>
      </div>
    </Link>
  );
}
