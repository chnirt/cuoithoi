"use client";

import { motion } from "framer-motion";

export default function DecorativeLine({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.8 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`flex items-center justify-center gap-3 sm:gap-4 ${
        compact ? "my-4" : "my-6"
      } origin-center`}
    >
      <div className="w-12 h-px bg-gradient-to-r from-transparent to-neutral-300" />
      <div className="w-1 h-1 bg-neutral-400 rounded-full" />
      <div
        className={`h-px bg-gradient-to-r from-neutral-300 via-neutral-400 to-neutral-300 ${
          compact ? "w-16" : "w-20"
        }`}
      />
      <div className="w-1 h-1 bg-neutral-400 rounded-full" />
      <div className="w-12 h-px bg-gradient-to-r from-neutral-300 to-transparent" />
    </motion.div>
  );
}
