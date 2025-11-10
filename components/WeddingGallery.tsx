"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SlideImage {
  id: string | number;
  src: string;
  alt?: string;
}

interface WeddingGalleryProps {
  slides: SlideImage[];
}

export function WeddingGallery({ slides }: WeddingGalleryProps) {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // Optional: slideshow auto-play when not fullscreen
  useEffect(() => {
    if (fullscreenIndex !== null) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length, fullscreenIndex]);

  const openFullscreen = (i: number) => setFullscreenIndex(i);
  const closeFullscreen = () => setFullscreenIndex(null);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Masonry grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className="relative cursor-pointer aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:scale-105 transition-transform"
            onClick={() => openFullscreen(i)}
          >
            <Image
              src={slide.src}
              alt={slide.alt ?? `Slide ${i}`}
              fill
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 50vw, 33vw"
              priority
            />
          </div>
        ))}
      </div>

      {/* Fullscreen overlay */}
      {fullscreenIndex !== null && (
        <div
          ref={containerRef}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          <Button
            onClick={closeFullscreen}
            size="icon"
            variant="ghost"
            className="absolute top-5 right-5 bg-black/40 text-white hover:bg-black/70 z-50"
          >
            <X size={24} />
          </Button>

          <div className="relative w-full max-w-[90vw] max-h-[90vh]">
            <Image
              src={slides[fullscreenIndex].src}
              alt={slides[fullscreenIndex].alt ?? `Slide ${fullscreenIndex}`}
              fill
              className="object-contain"
              style={{ objectPosition: "center" }}
              priority
            />
          </div>

          {/* Optional: navigate left/right */}
          {slides.length > 1 && (
            <>
              <Button
                onClick={() =>
                  setFullscreenIndex(
                    (prev) => (prev! - 1 + slides.length) % slides.length
                  )
                }
                size="icon"
                variant="ghost"
                className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/40 text-white hover:bg-black/70"
              >
                &#8592;
              </Button>
              <Button
                onClick={() =>
                  setFullscreenIndex((prev) => (prev! + 1) % slides.length)
                }
                size="icon"
                variant="ghost"
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/40 text-white hover:bg-black/70"
              >
                &#8594;
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
