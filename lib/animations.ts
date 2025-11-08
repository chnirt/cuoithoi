// /lib/animations.ts
import { type MotionProps, type Variants } from "framer-motion";

/* -------------------- MotionProps helpers -------------------- */
export const fadeInUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" },
  viewport: { once: true },
});

export const fadeInScale = (delay = 0): MotionProps => ({
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.8, delay, ease: "easeOut" },
  viewport: { once: true },
});

export const fadeInSlow = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: "easeInOut" },
  viewport: { once: true },
});

/* -------------------- Variants for staggered children -------------------- */
export const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const fadeInScaleVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const fadeInSlowVariant: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeInOut" },
  },
};

/* -------------------- Container helper for stagger -------------------- */
export const staggerContainer = (stagger = 0.15): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
    },
  },
});
