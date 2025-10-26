"use client";

import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { motion } from "framer-motion";

type EventInfoType = {
  date?: string | null;
  datetime?: string | null;
  time?: string | null;
  venue?: string | null;
  address?: string | null;
  mapUrl?: string | null;
  calendarUrl?: string | null;
};

export default function EventInfo({ event }: { event?: EventInfoType | null }) {
  const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  if (!event) return null;

  const datetimeString = event.datetime ?? "";
  let formattedDate = event.date ?? "";

  try {
    if (datetimeString) {
      const eventDate = parseISO(datetimeString);
      formattedDate = format(eventDate, "EEEE, dd/MM/yyyy", { locale: vi });
    }
  } catch (error) {
    console.error("Invalid date format:", event.datetime);
  }

  return (
    <motion.section
      {...fadeInUp()}
      className="py-20 md:py-28 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-28 h-28 border border-neutral-200 rounded-full opacity-10" />
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 border border-neutral-200 rounded-full opacity-10" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 relative z-10 text-center">
        {/* Heading */}
        <motion.div {...fadeInUp(0.1)} className="mb-16">
          <p
            className="text-neutral-400 text-xs uppercase tracking-[0.3em] mb-6 font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Thông Tin Sự Kiện
          </p>
          <h2
            className="text-3xl md:text-3xl font-light text-neutral-800 mb-8"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Chúng mình hân hoan chờ đón bạn
          </h2>
          <Divider />
        </motion.div>

        {/* Time & Venue */}
        <div className="space-y-16 mb-16">
          {/* Time */}
          {event.time && event.date && (
            <motion.div {...fadeInUp(0.2)}>
              <SectionLabel label="Thời gian" />
              <p
                className="text-2xl md:text-2xl text-neutral-800 font-light mb-2"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {event.time}
              </p>
              <p
                className="text-neutral-500 text-sm font-light"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {formattedDate}
              </p>
            </motion.div>
          )}

          {event.time && event.date && <Divider small />}

          {/* Venue */}
          {event.venue && event.address && (
            <motion.div {...fadeInUp(0.3)}>
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
          {...fadeInUp(0.4)}
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

/* -------------------- COMPONENTS -------------------- */

const Divider = ({ small = false }: { small?: boolean }) => (
  <div
    className={`flex items-center justify-center gap-4 my-8 ${
      small ? "opacity-80" : ""
    }`}
  >
    <div className="w-12 h-px bg-gradient-to-r from-transparent to-neutral-300" />
    <div className="w-1 h-1 bg-neutral-400 rounded-full" />
    <div
      className={`h-px bg-gradient-to-r from-neutral-300 via-neutral-400 to-neutral-300 ${
        small ? "w-16" : "w-20"
      }`}
    />
    <div className="w-1 h-1 bg-neutral-400 rounded-full" />
    <div className="w-12 h-px bg-gradient-to-r from-neutral-300 to-transparent" />
  </div>
);

const SectionLabel = ({ label }: { label: string }) => (
  <p
    className="text-neutral-400 text-xs uppercase tracking-[0.3em] mb-4 font-light"
    style={{ fontFamily: "Georgia, serif" }}
  >
    {label}
  </p>
);

const EventButton = ({ label, url }: { label: string; url: string }) => (
  <motion.button
    onClick={() => window.open(url, "_blank")}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className="px-8 py-4 border-2 border-[#8b7355] text-[#8b7355] rounded-lg font-light transition-all duration-300 
               bg-transparent hover:bg-[#f8f6f3] hover:shadow-md"
    style={{ fontFamily: "Georgia, serif" }}
  >
    {label}
  </motion.button>
);
