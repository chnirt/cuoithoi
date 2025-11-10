"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";

interface SlideImage {
  id: string | number;
  src: string;
  alt?: string;
}

interface SlideShowProps {
  slides: SlideImage[];
}

export function SlideShowStyle({ slides }: SlideShowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Loop slideshow tự động
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // mỗi 5s chuyển slide
    return () => clearInterval(interval);
  }, [slides.length]);

  // Fullscreen toggle
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden rounded-xl shadow-md"
      style={{
        aspectRatio: "16/9",
        height: isFullscreen ? "100vh" : "auto",
        transition: "all 0.5s ease-in-out",
      }}
    >
      {slides.map((slide, i) => (
        <div
          key={`${slide.id}-${i}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt ?? `Slide ${i}`}
            fill
            className="object-contain bg-black"
            style={{ objectPosition: "center" }}
            priority
          />
        </div>
      ))}

      {/* Fullscreen button */}
      <Button
        onClick={toggleFullscreen}
        size="icon"
        variant="ghost"
        className="absolute top-4 right-4 bg-black/40 text-white hover:text-white hover:bg-black/50 z-10 transition-all"
      >
        {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
      </Button>
    </div>
  );
}
