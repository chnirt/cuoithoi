"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { defaultWeddingData } from "@/mock/defaultWeddingData";
import type { CountdownTime } from "@/types/wedding";
import { fadeInUp, fadeInScale } from "@/lib/animations";

interface CountdownProps {
  targetDate?: string;
}

export default function Countdown({ targetDate }: CountdownProps) {
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
      const diff = target - Date.now();
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

  if (!isValidDate) return null;

  /** Component hiển thị từng unit thời gian */
  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <p
          className="text-3xl sm:text-4xl md:text-5xl text-neutral-800 font-light min-w-[3rem] text-center"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {String(value).padStart(2, "0")}
        </p>
        <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
      </div>
      <p
        className="text-[0.7rem] sm:text-sm uppercase tracking-[0.15em] text-neutral-500 mt-3"
        style={{ fontFamily: "Georgia, serif" }}
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
      {...fadeInScale(0)}
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-neutral-50 border-b border-neutral-100"
    >
      <div className="max-w-3xl mx-auto px-4 text-center">
        {/* Heading */}
        <motion.p
          {...fadeInUp(0.1)}
          className="text-neutral-500 text-sm sm:text-base mb-8 font-light tracking-wide"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {defaultWeddingData.content.countdown}
        </motion.p>

        {/* Countdown numbers */}
        <motion.div
          {...fadeInUp(0.2)}
          className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8"
        >
          {units.map((unit, idx) => (
            <div key={unit.label} className="flex items-center gap-4">
              <TimeUnit value={unit.value} label={unit.label} />
              {idx < units.length - 1 && (
                <div className="w-px h-8 sm:h-10 bg-neutral-300 opacity-30" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Footer text */}
        <motion.p
          {...fadeInUp(0.3)}
          className="text-neutral-600 text-sm sm:text-base font-light"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {defaultWeddingData.content.saveTheDate}
        </motion.p>
      </div>
    </motion.section>
  );
}
