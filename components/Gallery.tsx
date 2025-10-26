"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const displayImages = images.slice(0, 4);

  return (
    <section className="py-16 px-4 md:py-24 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <h2
          className="text-2xl md:text-2xl text-center mb-12 text-neutral-800 font-light"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Những khoảnh khắc của chúng tôi
        </h2>

        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8">
          {displayImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={
                  image.src ||
                  "/placeholder.svg?height=400&width=400&query=wedding+photo"
                }
                alt={image.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                priority={index < 2}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p
            className="text-neutral-600 text-sm tracking-wide"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Ghi lại câu chuyện tình yêu của chúng tôi
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
