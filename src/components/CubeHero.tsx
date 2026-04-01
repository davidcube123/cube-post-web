"use client";

import Image from "next/image";

export function CubeHero() {
  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-8 md:pt-12">
      {/* LMT Image - smaller and positioned above the banner */}
      <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] overflow-hidden">
        {/* Inner container to crop the white border and bottom text */}
        <div className="absolute inset-[-20%] w-[140%] h-[140%]">
          <Image
            src="https://ext.same-assets.com/2561987519/2841821197.jpeg"
            alt="Cube Post - Color Science LUT"
            fill
            priority
            className="object-cover object-[center_38%]"
            sizes="(max-width: 768px) 320px, 400px"
          />
        </div>

        {/* Gradient overlay to fade bottom into background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              to bottom,
              transparent 0%,
              transparent 50%,
              rgba(2, 2, 5, 0.3) 70%,
              rgba(2, 2, 5, 0.6) 85%,
              rgba(2, 2, 5, 0.9) 95%,
              rgb(2, 2, 5) 100%
            )`
          }}
        />

        {/* Gradient overlay to fade sides into background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              to right,
              rgba(2, 2, 5, 0.8) 0%,
              transparent 15%,
              transparent 85%,
              rgba(2, 2, 5, 0.8) 100%
            )`
          }}
        />

        {/* Top gradient for smooth blend */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              to top,
              transparent 0%,
              transparent 70%,
              rgba(2, 2, 5, 0.4) 90%,
              rgba(2, 2, 5, 0.7) 100%
            )`
          }}
        />
      </div>
    </section>
  );
}
