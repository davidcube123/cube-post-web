"use client";

import { memo } from "react";

export const ScrollingBanner = memo(function ScrollingBanner() {
  // The text to repeat - fewer copies
  const text = "Cube Postproduccion";
  const repeatedText = Array(6).fill(text).join(" • ");

  return (
    <div
      className="absolute left-0 right-0 overflow-hidden pointer-events-none select-none"
      style={{
        top: "58%",
        transform: "translateY(-50%) translateZ(0)",
        zIndex: 5,
        willChange: "transform",
      }}
    >
      {/* Fade edges - simplified */}
      <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#020205] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#020205] to-transparent z-10" />

      {/* Scrolling text container - GPU accelerated */}
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: "scroll-left 35s linear infinite",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <span
          className="text-white/10 text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight px-3 sm:px-6"
          style={{
            fontFamily: "'Syne', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
          }}
        >
          {repeatedText}
        </span>
        <span
          className="text-white/10 text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight px-3 sm:px-6"
          style={{
            fontFamily: "'Syne', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
          }}
        >
          {repeatedText}
        </span>
      </div>
    </div>
  );
});
