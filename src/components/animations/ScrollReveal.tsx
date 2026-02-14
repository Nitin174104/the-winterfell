"use client";

import { motion, useInView, useAnimation, Variant } from "framer-motion";
import { useRef, useEffect } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
  distance = 50,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  const getVariants = (): { hidden: Variant; visible: Variant } => {
    const hidden: any = { opacity: 0 };
    const visible: any = { opacity: 1 };

    switch (direction) {
      case "left":
        hidden.x = -distance;
        visible.x = 0;
        break;
      case "right":
        hidden.x = distance;
        visible.x = 0;
        break;
      case "up":
        hidden.y = distance;
        visible.y = 0;
        break;
      case "down":
        hidden.y = -distance;
        visible.y = 0;
        break;
      case "none":
        break;
    }

    return { hidden, visible };
  };

  const variants = getVariants();

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
