"use client";

import { memo } from "react";
import Image from "next/image";

// LMT images from projects - only those with LMT
const lmtImages = [
  { title: "Dos Tumbas", src: "/lmt/dos-tumbas-lmt.jpg" },
  { title: "Ruido", src: "/lmt/ruido-lmt.jpg" },
  { title: "The Map That Leads to You", src: "/lmt/map-leads-to-you-lmt.jpg" },
  { title: "Siempre es Invierno", src: "/lmt/siempre-es-invierno-lmt.jpg" },
  { title: "Golpes", src: "/lmt/golpes-lmt.jpg" },
  { title: "El Rastre del Llop", src: "/lmt/rastre-del-llop-lmt.jpg" },
  { title: "Les Irresponsables", src: "/lmt/les-irresponsables-lmt.jpg" },
  { title: "Apocalipsis Z", src: "https://ext.same-assets.com/2561987519/460045720.jpeg" },
  { title: "Cites Barcelona S02", src: "https://ext.same-assets.com/2561987519/2175374505.jpeg" },
  { title: "The Penguin Lessons", src: "https://ext.same-assets.com/2561987519/3719077407.jpeg" },
  { title: "Mi Amiga Eva", src: "https://ext.same-assets.com/2561987519/2156165389.jpeg" },
  { title: "La Buena Letra", src: "https://ext.same-assets.com/2561987519/1784482997.jpeg" },
  { title: "Tremore Beach", src: "https://ext.same-assets.com/2561987519/2841821197.jpeg" },
  { title: "Wolfgang", src: "https://ext.same-assets.com/2561987519/4251018731.jpeg" },
  { title: "Mamen Mayo", src: "https://ext.same-assets.com/2561987519/2695777774.jpeg" },
  { title: "Salve Maria", src: "https://ext.same-assets.com/2561987519/1908467169.jpeg" },
  { title: "Escape", src: "https://ext.same-assets.com/2561987519/302337332.jpeg" },
  { title: "Estacion Rocafort", src: "https://ext.same-assets.com/2561987519/95868007.jpeg" },
  { title: "Norberta", src: "https://ext.same-assets.com/2561987519/1935953877.jpeg" },
];

// Card component
const LMTCard = memo(function LMTCard({
  title,
  src,
}: {
  title: string;
  src: string;
  index: number;
}) {
  // Unified color for all borders - elegant cyan/teal
  const borderColor = "#38bdf8";
  // Check if image is local (starts with /)
  const isLocalImage = src.startsWith('/');

  return (
    <div
      className="flex-shrink-0 w-[120px] h-[90px] sm:w-[150px] sm:h-[115px] md:w-[200px] md:h-[150px] lg:w-[260px] lg:h-[195px] relative overflow-hidden group bg-[#0a0a12]"
      style={{
        border: `1px solid ${borderColor}50`,
        borderRadius: "6px",
        boxShadow: `0 0 20px ${borderColor}15, 0 0 40px ${borderColor}08`,
      }}
    >
      <Image
        src={src}
        alt={`${title} - LMT`}
        fill
        sizes="(max-width: 768px) 200px, 280px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ objectPosition: 'center 35%' }}
        loading="lazy"
        unoptimized={isLocalImage}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to top, ${borderColor}50 0%, transparent 50%)`,
        }}
      />
      {/* Title on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-[10px] md:text-xs font-medium text-white truncate">{title}</p>
        <p className="text-[8px] text-white/60 uppercase tracking-wider">LMT</p>
      </div>
    </div>
  );
});

export const LMTCarousel = memo(function LMTCarousel() {
  // Double the images for seamless loop
  const doubledImages = [...lmtImages, ...lmtImages];

  return (
    <div
      className="absolute left-0 right-0 pointer-events-none select-none"
      style={{
        top: "18%",
        zIndex: 10,
      }}
    >
      {/* Fade edges - positioned to cover full card height */}
      <div className="absolute inset-y-0 left-0 w-12 sm:w-16 md:w-32 bg-gradient-to-r from-[#020205] via-[#020205]/80 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-12 sm:w-16 md:w-32 bg-gradient-to-l from-[#020205] via-[#020205]/80 to-transparent z-10" />

      {/* Scrolling container - faster on mobile */}
      <div
        className="flex gap-2 sm:gap-3 md:gap-4 whitespace-nowrap pointer-events-auto py-1 sm:py-2 carousel-scroll"
        style={{
          willChange: "transform",
        }}
      >
        {doubledImages.map((lmt, index) => (
          <LMTCard
            key={`${lmt.title}-${index}`}
            title={lmt.title}
            src={lmt.src}
            index={index}
          />
        ))}
      </div>
    </div>
  );
});
