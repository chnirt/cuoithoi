"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

type CountdownTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Countdown({ targetDate }: { targetDate?: string }) {
  const isValidDate = targetDate && !isNaN(new Date(targetDate).getTime());
  const target = useMemo(
    () => (isValidDate ? new Date(targetDate!).getTime() : null),
    [targetDate, isValidDate]
  );

  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!target) return;

    const updateCountdown = () => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) return;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [target]);

  if (!isValidDate) return null; // Không render nếu targetDate bị null hoặc sai format

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <p
          className="text-3xl sm:text-4xl md:text-5xl font-medium text-neutral-800 min-w-[3rem] sm:min-w-[4rem] text-center"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {String(value).padStart(2, "0")}
        </p>
        <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
      </div>
      <p
        className="text-xs sm:text-sm md:text-sm text-neutral-500 mt-2 sm:mt-3 uppercase tracking-[0.05em] font-normal"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {label}
      </p>
    </motion.div>
  );

  const units = [
    { label: "Ngày", value: timeLeft.days },
    { label: "Giờ", value: timeLeft.hours },
    { label: "Phút", value: timeLeft.minutes },
    { label: "Giây", value: timeLeft.seconds },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-neutral-50 border-b border-neutral-100"
    >
      <div className="max-w-3xl mx-auto px-4 text-center">
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-neutral-500 text-sm sm:text-base mb-6 font-normal"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Đếm ngược tới ngày vui của chúng mình
        </motion.p>

        {/* Countdown numbers */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 md:gap-8 mb-6 sm:mb-8">
          {units.map((unit, idx) => (
            <div
              key={unit.label}
              className="flex items-center gap-3 sm:gap-5 md:gap-8"
            >
              <TimeUnit value={unit.value} label={unit.label} />
              {idx < units.length - 1 && (
                <div className="w-px h-8 sm:h-10 md:h-12 bg-neutral-300 opacity-40" />
              )}
            </div>
          ))}
        </div>

        {/* Footer text */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-neutral-600 text-sm sm:text-base font-normal"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Ngày chúng mình nên duyên
        </motion.div>
      </div>
    </motion.section>
  );
}
