"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { defaultWeddingData } from "@/mock/defaultWeddingData";
import type { GalleryProps } from "@/types/wedding";
import {
  fadeInUpVariant,
  fadeInScaleVariant,
  staggerContainer,
} from "@/lib/animations";

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
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-10">
          {displayImages.map((image) => (
            <motion.div
              key={image.id}
              variants={fadeInScaleVariant}
              className="relative aspect-square overflow-hidden rounded-xl shadow-sm"
            >
              <Image
                src={
                  image.src ||
                  "/placeholder.svg?height=400&width=400&query=wedding+photo"
                }
                alt={image.alt ?? "Ảnh cưới"}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500 ease-out"
                priority={true}
              />
            </motion.div>
          ))}
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
