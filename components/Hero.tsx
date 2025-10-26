"use client";

import { motion } from "framer-motion";

interface Couple {
  bride?: string | null;
  groom?: string | null;
}

interface EventInfo {
  date?: string | null;
}

export default function Hero({
  couple,
  event,
}: {
  couple?: Couple;
  event?: EventInfo;
}) {
  const bride = (couple?.bride || "Cô Dâu").toUpperCase();
  const groom = (couple?.groom || "Chú Rể").toUpperCase();
  const date = event?.date || "Ngày trọng đại";

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-24 md:py-36 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-24 left-12 w-32 h-32 border border-neutral-200 rounded-full opacity-20" />
        <div className="absolute bottom-24 right-12 w-24 h-24 border border-neutral-200 rounded-full opacity-20" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-neutral-200 rounded-full opacity-10" />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-neutral-500 text-xs uppercase tracking-[0.3em] mb-10 font-light"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Mời bạn tham dự lễ cưới của chúng mình
        </motion.p>

        <div className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap px-2">
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
        </div>

        {/* Decorative Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex items-center justify-center mb-8 mt-8"
        >
          <div className="w-8 h-px bg-neutral-300" />
          <div className="mx-4 w-1 h-1 bg-neutral-400 rounded-full" />
          <div className="w-16 h-px bg-gradient-to-r from-neutral-300 via-neutral-400 to-neutral-300" />
          <div className="mx-4 w-1 h-1 bg-neutral-400 rounded-full" />
          <div className="w-8 h-px bg-neutral-300" />
        </motion.div>

        {/* Wedding Date */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="space-y-2"
        >
          <p
            className="text-lg md:text-xl text-neutral-700 font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {date}
          </p>
          <p
            className="text-xs md:text-sm text-neutral-500 tracking-wide font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Chúng mình rất mong được gặp bạn!
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
