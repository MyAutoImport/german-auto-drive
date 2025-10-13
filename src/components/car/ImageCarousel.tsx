import { useState } from "react";

export default function ImageCarousel({
  images,
  alt,
  className = "relative w-full h-[300px] md:h-[420px] rounded-xl overflow-hidden",
}: { images: string[]; alt: string; className?: string }) {
  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return (
      <div className={className}>
        <img src={images[0]} alt={alt} className="w-full h-full object-cover" />
      </div>
    );
  }
  const [index, setIndex] = useState(0);
  const total = images.length;
  const go = (d: number) => setIndex((i) => (i + d + total) % total);
  return (
    <div className={className}>
      <div
        className="flex h-full w-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={`${src}-${i}`} className="relative min-w-full h-full">
            <img src={src} alt={alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <button
        aria-label="Anterior"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 px-3 py-2 text-white"
      >
        ‹
      </button>
      <button
        aria-label="Siguiente"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 px-3 py-2 text-white"
      >
        ›
      </button>
      <div className="absolute bottom-3 right-3 rounded-md bg-black/50 px-2 py-1 text-xs text-white">
        {index + 1}/{total}
      </div>
    </div>
  );
}