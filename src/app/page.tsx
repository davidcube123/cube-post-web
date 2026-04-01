import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Cube Hero Image - centered and large */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          zIndex: 10,
        }}
      >
        <div className="relative w-[85vw] h-[85vw] max-w-[900px] max-h-[900px] sm:w-[75vw] sm:h-[75vw] md:w-[70vw] md:h-[70vw] lg:w-[65vw] lg:h-[65vw]">
          <Image
            src="/cube-hero.png"
            alt="Cube Post - Color Science"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
