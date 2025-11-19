"use client";

import { motion } from "framer-motion";
import DecorativeLine from "./DecorativeLine";
import type { Couple } from "@/types/wedding";
import { fadeInUp, fadeInScale } from "@/lib/animations";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

interface AnniversaryHeroProps {
  couple?: Couple;
  weddingDate: string;
}

export default function AnniversaryHero({
  couple,
  weddingDate,
}: AnniversaryHeroProps) {
  const bride = (couple?.bride || "Cô Dâu").toUpperCase();
  const groom = (couple?.groom || "Chú Rể").toUpperCase();

  let formattedDate = "Ngày cưới";
  try {
    const date = parseISO(weddingDate);
    formattedDate = format(date, "dd/MM/yyyy", { locale: vi });
  } catch {
    console.warn("Invalid date format:", weddingDate);
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
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        {/* Message */}
        <motion.p
          {...fadeInUp(0.1)}
          className="text-neutral-500 text-sm sm:text-base uppercase tracking-[0.25em] mb-8 sm:mb-10 font-light"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Chúc mừng kỷ niệm lễ cưới của
        </motion.p>

        {/* Couple names */}
        <motion.div
          {...fadeInScale(0.15)}
          className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap px-2 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-light text-neutral-800 w-full"
            style={{
              fontFamily: "var(--font-names)",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "0.05em",
            }}
          >
            {bride}
          </motion.h1>
          <span className="w-full text-center text-neutral-400 text-lg sm:text-2xl">
            &
          </span>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-light text-neutral-800 w-full"
            style={{
              fontFamily: "var(--font-names)",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "0.05em",
            }}
          >
            {groom}
          </motion.h1>
        </motion.div>

        {/* Decorative Line */}
        <motion.div {...fadeInUp(0.3)} className="my-6">
          <DecorativeLine />
        </motion.div>

        {/* Wedding Date */}
        <motion.p
          {...fadeInUp(0.4)}
          className="text-base sm:text-lg md:text-xl text-neutral-700 font-light"
          style={{ fontFamily: "Georgia, serif", lineHeight: 1.4 }}
        >
          {formattedDate}
        </motion.p>
      </div>
    </motion.section>
  );
}
