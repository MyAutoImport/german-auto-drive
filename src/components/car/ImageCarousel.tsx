"use client";
import { useState, useEffect } from "react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  if (!images || images.length === 0) return null;
  
  if (images.length === 1) {
    return (
      <div className="relative w-full h-96 rounded-2xl overflow-hidden">
        <img 
          src={images[0]} 
          alt={alt} 
          className="w-full h-full object-cover" 
        />
      </div>
    );
  }

  const [index, setIndex] = useState(0);
  const total = images.length;
  
  const go = (direction: number) => {
    setIndex((prevIndex) => (prevIndex + direction + total) % total);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full h-96 rounded-2xl overflow-hidden">
      {/* Image track */}
      <div
        className="flex h-full w-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={`${src}-${i}`} className="relative min-w-full h-full">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button 
        aria-label="Imagen anterior"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 px-3 py-2 text-white transition-colors"
      >
        ‹
      </button>
      
      <button 
        aria-label="Siguiente imagen"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 px-3 py-2 text-white transition-colors"
      >
        ›
      </button>

      {/* Counter badge */}
      <div className="absolute bottom-3 right-3 rounded-md bg-black/50 px-2 py-1 text-xs text-white">
        {index + 1}/{total}
      </div>
    </div>
  );
}