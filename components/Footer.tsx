"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  return (
    <motion.footer
      {...fadeInUp()}
      className="bg-gradient-to-b from-neutral-50 to-white text-neutral-800 py-20 md:py-28 border-t border-neutral-100 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-20 h-20 border border-neutral-200 rounded-full opacity-10" />
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 border border-neutral-200 rounded-full opacity-10" />
      </div>

      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        {/* Divider */}
        <motion.div
          {...fadeInUp(0.1)}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-neutral-300" />
          <div className="w-1 h-1 bg-neutral-400 rounded-full" />
          <div className="w-20 h-px bg-gradient-to-r from-neutral-300 via-neutral-400 to-neutral-300" />
          <div className="w-1 h-1 bg-neutral-400 rounded-full" />
          <div className="w-12 h-px bg-gradient-to-r from-neutral-300 to-transparent" />
        </motion.div>

        {/* Main thank-you text */}
        <motion.p
          {...fadeInUp(0.2)}
          className="text-3xl md:text-4xl font-light mb-4"
          style={{ color: "#8b7355", fontFamily: "Dancing Script, cursive" }}
        >
          Hẹn gặp lại bạn trong ngày trọng đại của chúng mình
        </motion.p>

        {/* Subtext */}
        <motion.p
          {...fadeInUp(0.3)}
          className="text-neutral-600 text-sm md:text-base font-light mb-6"
          style={{ fontFamily: "Georgia, serif", lineHeight: 1.6 }}
        >
          Cảm ơn vì đã đồng hành, chia sẻ và gửi yêu thương trong suốt hành
          trình này.
        </motion.p>

        {/* Footer note */}
        <motion.p
          {...fadeInUp(0.4)}
          className="text-neutral-500 text-xs md:text-sm font-light"
          style={{ fontFamily: "Georgia, serif" }}
        >
          © 2025 Chúng mình — Tình yêu, niềm vui & hạnh phúc
        </motion.p>
      </div>
    </motion.footer>
  );
}
