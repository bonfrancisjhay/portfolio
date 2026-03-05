import { useTheme } from "./ThemeContext";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

function Gallery() {
  const { dark } = useTheme();
  const [start, setStart] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  const images = [
    { src: "/images/gallery1.jpg" },
    { src: "/images/gallery2.jpg" },
    { src: "/images/gallery3.jpg" },
    { src: "/images/gallery4.jpg" },
    { src: "/images/gallery5.jpg" },
    { src: "/images/gallery6.jpg" },
    { src: "/images/gallery7.jpg" },
  ];

  // Show 2 on mobile, 5 on desktop
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const visible = isMobile ? 2 : 5;

  const canPrev = start > 0;
  const canNext = start + visible < images.length;

  const prev = () => { if (canPrev) setStart((s) => s - 1); };
  const next = () => { if (canNext) setStart((s) => s + 1); };

  return (
    <section className={`w-full ${dark ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-5xl mx-auto px-4 md:px-10 py-10">
        <h2 className="text-xl font-bold mb-6">Gallery</h2>

        {/* Carousel Row */}
        <div className="flex items-center gap-2 md:gap-3">

          {/* Left Arrow */}
          <button onClick={prev}
            className={`flex-shrink-0 p-1 transition
              ${canPrev
                ? dark ? "text-white" : "text-black"
                : dark ? "text-gray-700" : "text-gray-300"}`}>
            <ChevronLeft size={24} />
          </button>

          {/* Images */}
          <div className="flex gap-2 md:gap-3 overflow-hidden flex-1">
            {images.slice(start, start + visible).map((img, i) => (
              <div
                key={i}
                onClick={() => setLightbox(start + i)}
                className="flex-1 cursor-zoom-in overflow-hidden"
              >
                <img
                  src={img.src}
                  alt={`Gallery ${start + i + 1}`}
                  className="w-full h-24 sm:h-32 md:h-38 object-cover hover:opacity-80 transition rounded"
                />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button onClick={next}
            className={`flex-shrink-0 p-1 transition
              ${canNext
                ? dark ? "text-white" : "text-black"
                : dark ? "text-gray-700" : "text-gray-300"}`}>
            <ChevronRight size={24} />
          </button>

        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setLightbox(null)}
          >
            <X size={28} />
          </button>
          <img
            src={images[lightbox].src}
            alt={`Gallery ${lightbox + 1}`}
            className="w-full max-w-3xl max-h-screen rounded-lg object-contain"
          />
        </div>
      )}
    </section>
  );
}

export default Gallery;