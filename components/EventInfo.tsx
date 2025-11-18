"use client";

import { defaultWeddingData } from "@/mock/defaultWeddingData";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { motion } from "framer-motion";
import DecorativeLine from "./DecorativeLine";
import { fadeInUpVariant, staggerContainer } from "@/lib/animations";
import { Button } from "./ui/button";
import { getTimeStrFromISO } from "@/utils/wedding";

export type EventInfoType = {
  date?: string | null;
  datetime?: string | null;
  time?: string | null;
  venue?: string | null;
  address?: string | null;
  mapUrl?: string | null;
  calendarUrl?: string | null;
};

interface EventInfoProps {
  event?: EventInfoType | null;
}

export default function EventInfo({ event }: EventInfoProps) {
  if (!event || !event.datetime) return null;

  let formattedDate = "";
  let timeStr = "";

  try {
    const eventDate = parseISO(event.datetime);
    formattedDate = format(eventDate, "EEEE, dd/MM/yyyy", { locale: vi });
    timeStr = getTimeStrFromISO(event.datetime);
  } catch {
    console.warn("Invalid date format:", event.datetime);
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer(0.15)}
      className="py-20 md:py-28 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-28 h-28 border border-neutral-200 rounded-full opacity-10" />
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 border border-neutral-200 rounded-full opacity-10" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 relative z-10 text-center">
        {/* Heading */}
        <motion.div variants={fadeInUpVariant} className="mb-16">
          <p
            className="text-neutral-400 text-xs uppercase tracking-[0.3em] mb-6 font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {defaultWeddingData.content.eventInfo}
          </p>
          <h2
            className="text-3xl md:text-3xl font-light text-neutral-800 mb-8"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {defaultWeddingData.content.rsvpSection}
          </h2>
          <DecorativeLine />
        </motion.div>

        {/* Time & Venue */}
        <div className="space-y-16 mb-16">
          {timeStr && formattedDate && (
            <motion.div variants={fadeInUpVariant}>
              <SectionLabel label="Thời gian" />
              <p
                className="text-2xl md:text-2xl text-neutral-800 font-light mb-2"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {timeStr}
              </p>
              <p
                className="text-neutral-500 text-sm font-light"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {formattedDate}
              </p>
              <DecorativeLine compact />
            </motion.div>
          )}

          {event.venue && event.address && (
            <motion.div variants={fadeInUpVariant}>
              <SectionLabel label="Địa điểm" />
              <p
                className="text-2xl md:text-2xl text-neutral-800 font-light mb-2"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {event.venue}
              </p>
              <p
                className="text-neutral-500 text-sm font-light"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {event.address}
              </p>
            </motion.div>
          )}
        </div>

        {/* Buttons */}
        <motion.div
          variants={fadeInUpVariant}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          {event.mapUrl && (
            <EventButton label="Xem Bản Đồ" url={event.mapUrl} />
          )}
          {event.calendarUrl && (
            <EventButton label="Lưu Vào Lịch" url={event.calendarUrl} />
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}

const SectionLabel = ({ label }: { label: string }) => (
  <p
    className="text-neutral-400 text-xs uppercase tracking-[0.3em] mb-4 font-light"
    style={{ fontFamily: "Georgia, serif" }}
  >
    {label}
  </p>
);

const EventButton = ({ label, url }: { label: string; url: string }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className="w-full"
  >
    <Button
      onClick={() => window.open(url, "_blank")}
      variant="outline"
      className="w-full font-light px-8 py-4 text-[#8b7355] hover:text-[#8b7355] border-[#8b7355] bg-transparent hover:bg-[#f8f6f3] hover:shadow-md"
      style={{ fontFamily: "Georgia, serif" }}
    >
      {label}
    </Button>
  </motion.div>
);
