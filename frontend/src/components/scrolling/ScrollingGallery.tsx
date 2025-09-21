import React, { useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ScrollingGalleryProps {
  images: string[];
  autoPlay?: boolean;
  speed?: number; // pixels per frame for autoplay
  interval?: number; // milliseconds between scrolls
}

export const ScrollingGallery: React.FC<ScrollingGalleryProps> = ({
  images,
  autoPlay = true,
  speed = 1,
  interval = 3000, // default interval for autoplay
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  };

  // Autoplay continuous scroll
  useEffect(() => {
    if (!autoPlay) return;
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const autoScroll = () => {
      container.scrollLeft += speed;

      // Reset scroll to start for seamless loop
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [autoPlay, speed]);

  // Duplicate images for smooth infinite loop
  const allImages = [...images, ...images];

  return (
    <div className="relative w-full">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-md"
      >
        <ArrowLeft className="w-6 h-6 text-gray-800" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-md"
      >
        <ArrowRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Scrollable Gallery */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-hidden py-4 px-2"
      >
        {allImages.map((img, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 h-48 sm:w-96 sm:h-56 md:w-[400px] md:h-60 rounded-lg overflow-hidden"
          >
            <img
              src={img}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover block"
            />
          </div>
        ))}
      </div>
    </div>
  );
};