"use client";

import { motion } from "framer-motion";

export default function InvitationText() {
  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  return (
    <motion.section
      {...fadeIn()}
      className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-white to-neutral-50"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 border border-neutral-200 rounded-full opacity-10" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 border border-neutral-200 rounded-full opacity-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center space-y-8">
        <motion.p
          {...fadeIn(0.1)}
          className="text-neutral-400 text-xs uppercase tracking-[0.3em] font-light"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Cùng với gia đình
        </motion.p>

        <motion.p
          {...fadeIn(0.2)}
          className="text-2xl md:text-2xl text-neutral-700 leading-relaxed font-light"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Chúng mình rất vui được mời bạn đến dự lễ cưới
        </motion.p>

        {/* Decorative Divider */}
        <motion.div
          {...fadeIn(0.3)}
          className="flex items-center justify-center gap-3 sm:gap-4 my-6"
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-neutral-300" />
          <div className="w-1 h-1 bg-neutral-400 rounded-full" />
          <div className="w-16 h-px bg-gradient-to-r from-neutral-300 via-neutral-400 to-neutral-300" />
          <div className="w-1 h-1 bg-neutral-400 rounded-full" />
          <div className="w-12 h-px bg-gradient-to-r from-neutral-300 to-transparent" />
        </motion.div>

        <motion.p
          {...fadeIn(0.4)}
          className="text-base md:text-base text-neutral-600 leading-relaxed font-light max-w-2xl mx-auto"
          style={{ fontFamily: "Georgia, serif", lineHeight: 1.8 }}
        >
          Sự có mặt của bạn sẽ làm ngày hôm nay thêm ý nghĩa.{" "}
          <br className="hidden md:block" />
          Chúng mình rất mong được chia sẻ niềm vui cùng bạn.
        </motion.p>
      </div>
    </motion.section>
  );
}
