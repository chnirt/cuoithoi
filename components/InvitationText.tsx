"use client";

import { motion } from "framer-motion";
import DecorativeLine from "./DecorativeLine";
import { defaultWeddingData } from "@/mock/defaultWeddingData";
import { fadeInUp } from "@/lib/animations";

export default function InvitationText() {
  return (
    <motion.section
      {...fadeInUp(0)}
      className="relative overflow-hidden py-20 sm:py-24 md:py-32 bg-gradient-to-b from-white to-neutral-50"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-20 h-20 sm:w-24 sm:h-24 border border-neutral-200 rounded-full opacity-10" />
        <div className="absolute bottom-1/4 right-1/4 w-28 h-28 sm:w-32 sm:h-32 border border-neutral-200 rounded-full opacity-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center space-y-8 sm:space-y-10">
        {/* Intro text */}
        <motion.p
          {...fadeInUp(0.1)}
          className="text-neutral-500 text-xs sm:text-sm uppercase tracking-[0.3em] font-light"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {defaultWeddingData.content.withFamily}
        </motion.p>

        {/* Main invitation text */}
        <motion.p
          {...fadeInUp(0.2)}
          className="text-lg sm:text-2xl md:text-[1.7rem] text-neutral-700 leading-relaxed font-light"
          style={{ fontFamily: "Playfair Display, serif", lineHeight: 1.6 }}
        >
          {defaultWeddingData.content.invitationText}
        </motion.p>

        {/* Decorative Divider */}
        <motion.div {...fadeInUp(0.3)}>
          <DecorativeLine />
        </motion.div>

        {/* Subtext */}
        <motion.p
          {...fadeInUp(0.4)}
          className="text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed font-light max-w-2xl mx-auto px-2"
          style={{ fontFamily: "Georgia, serif", lineHeight: 1.8 }}
        >
          {defaultWeddingData.content.specialMoment}{" "}
          <br className="hidden sm:block" />
          {defaultWeddingData.content.shareJoy}
        </motion.p>
      </div>
    </motion.section>
  );
}
