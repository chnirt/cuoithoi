"use client";

import { motion } from "framer-motion";
import { defaultWeddingData } from "@/mock/defaultWeddingData";
import type { GalleryProps } from "@/types/wedding";
import { fadeInUpVariant, staggerContainer } from "@/lib/animations";
import { SlideShowStyle } from "./SlideshowVideoStyle";

export default function Gallery({ images }: GalleryProps) {
  const displayImages = images?.slice(0, 4) ?? [];

  return (
    <section className="py-16 px-4 md:py-24 bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer(0.15)}
        className="max-w-5xl mx-auto"
      >
        {/* Title */}
        <motion.h2
          variants={fadeInUpVariant}
          className="text-2xl md:text-3xl text-center mb-12 text-neutral-800 font-light"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {defaultWeddingData.content.galleryTitle}
        </motion.h2>

        {/* Gallery grid */}
        <div className="mb-10 rounded-xl shadow-[0_4px_20px_rgba(185,162,127,0.12)] overflow-hidden">
          <SlideShowStyle slides={displayImages} />
        </div>

        {/* Caption */}
        <motion.div variants={fadeInUpVariant} className="text-center">
          <p
            className="text-neutral-600 text-base sm:text-lg font-light tracking-wide"
            style={{ fontFamily: "var(--font-script)" }}
          >
            {defaultWeddingData.content.galleryCaption}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
