"use client";

import { motion } from "framer-motion";
import { defaultWeddingData } from "@/mock/defaultWeddingData";
import DecorativeLine from "./DecorativeLine";
import { fadeInUpVariant, staggerContainer } from "@/lib/animations";

export default function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer(0.15)}
      className="bg-gradient-to-b from-neutral-50 to-white text-neutral-800 py-20 md:py-28 border-t border-neutral-100 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-20 h-20 border border-neutral-200 rounded-full opacity-10" />
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 border border-neutral-200 rounded-full opacity-10" />
      </div>

      <div className="max-w-3xl mx-auto px-4 text-center relative z-10 space-y-6">
        {/* Decorative line */}
        <motion.div variants={fadeInUpVariant}>
          <DecorativeLine />
        </motion.div>

        {/* Main thank-you text */}
        <motion.p
          variants={fadeInUpVariant}
          className="text-3xl md:text-4xl font-light"
          style={{ color: "#8b7355", fontFamily: "Dancing Script, cursive" }}
        >
          {defaultWeddingData.content.rsvpThankYou}
        </motion.p>

        {/* Subtext */}
        <motion.p
          variants={fadeInUpVariant}
          className="text-neutral-600 text-base md:text-lg font-light leading-relaxed"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {defaultWeddingData.content.footerMessage}
        </motion.p>

        {/* Divider line */}
        <motion.div variants={fadeInUpVariant}>
          <DecorativeLine />
        </motion.div>

        {/* Footer note */}
        <motion.p
          variants={fadeInUpVariant}
          className="text-neutral-500 text-xs md:text-sm font-light"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {defaultWeddingData.content.copyright}
        </motion.p>
      </div>
    </motion.footer>
  );
}
