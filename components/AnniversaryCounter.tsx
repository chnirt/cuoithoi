"use client";

import { useState, useEffect } from "react";

interface AnniversaryCounterProps {
  weddingDate: string; // ISO string
}

export default function AnniversaryCounter({
  weddingDate,
}: AnniversaryCounterProps) {
  const [daysPassed, setDaysPassed] = useState(0);

  useEffect(() => {
    const target = new Date(weddingDate).getTime();

    const update = () => {
      const now = Date.now();
      const diff = now - target;
      if (diff > 0) {
        setDaysPassed(Math.floor(diff / (1000 * 60 * 60 * 24)));
      }
    };

    update();
    const timer = setInterval(update, 60 * 1000); // cập nhật mỗi phút là đủ
    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <section className="py-12 text-center">
      <h3
        className="text-2xl sm:text-3xl text-neutral-700 font-light mb-4"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        Kỉ Niệm Ngày Cưới
      </h3>
      <p
        className="text-4xl sm:text-5xl text-[#b9a27f] font-semibold"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        {daysPassed.toLocaleString()} ngày
      </p>
    </section>
  );
}
