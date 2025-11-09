"use client";

import { motion } from "framer-motion";
import DecorativeLine from "./DecorativeLine";
import { defaultWeddingData } from "@/mock/defaultWeddingData";
import type { Couple, EventInfo } from "@/types/wedding";
import { fadeInUp, fadeInScale } from "@/lib/animations";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

interface HeroProps {
  couple?: Couple;
  event?: EventInfo;
}

export default function Hero({ couple, event }: HeroProps) {
  const bride = (couple?.bride || "Cô Dâu").toUpperCase();
  const groom = (couple?.groom || "Chú Rể").toUpperCase();
  // const date = event?.date || "Ngày trọng đại";

  let formattedDate = "Ngày trọng đại";
  try {
    if (event?.datetime) {
      const eventDate = parseISO(event.datetime);
      formattedDate = format(eventDate, "dd/MM/yyyy", { locale: vi });
    }
  } catch {
    console.warn("Invalid date format:", event?.datetime);
  }

  return (
    <motion.section
      {...fadeInUp(0)}
      className="py-20 sm:py-24 md:py-36 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-24 left-12 w-32 h-32 border border-neutral-200 rounded-full opacity-20" />
        <div className="absolute bottom-24 right-12 w-24 h-24 border border-neutral-200 rounded-full opacity-20" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-neutral-200 rounded-full opacity-10" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        {/* Intro text */}
        <motion.p
          {...fadeInUp(0.1)}
          className="text-neutral-500 text-xs sm:text-sm uppercase tracking-[0.25em] mb-8 sm:mb-10 font-light"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {defaultWeddingData.content.invitation}
        </motion.p>

        {/* Couple names */}
        <motion.div
          {...fadeInScale(0.15)}
          className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap px-2"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center font-light text-neutral-800"
            style={{
              fontFamily: "var(--font-names)",
              fontSize: "clamp(1.5rem, 4vw, 2.8rem)",
              lineHeight: 1.1,
              letterSpacing: "0.05em",
              fontWeight: 300,
            }}
          >
            {bride}
          </motion.h1>
          <span className="text-neutral-400 text-lg sm:text-2xl">&</span>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center font-light text-neutral-800"
            style={{
              fontFamily: "var(--font-names)",
              fontSize: "clamp(1.5rem, 4vw, 2.8rem)",
              lineHeight: 1.1,
              letterSpacing: "0.05em",
              fontWeight: 300,
            }}
          >
            {groom}
          </motion.h1>
        </motion.div>

        {/* Decorative Line */}
        <motion.div {...fadeInUp(0.3)}>
          <DecorativeLine />
        </motion.div>

        {/* Wedding Date */}
        <motion.div {...fadeInUp(0.4)} className="space-y-2">
          <p
            className="text-base sm:text-lg md:text-xl text-neutral-700 font-light"
            style={{ fontFamily: "Georgia, serif", lineHeight: 1.4 }}
          >
            {formattedDate}
          </p>
          <p
            className="text-xs sm:text-sm md:text-base text-neutral-500 tracking-wide font-light"
            style={{ fontFamily: "Georgia, serif", lineHeight: 1.5 }}
          >
            {defaultWeddingData.content.invitationSubtitle}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
