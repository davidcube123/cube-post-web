"use client";

import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import Image from "next/image";

interface SpaceImage {
  id: number;
  src: string;
  rotation?: number;
}

// Ordenado: impactantes y salas primero, luego detalles y decoración
const spaceImages: SpaceImage[] = [
  // === IMPACTANTES Y SALAS (primero) ===
  { id: 1, src: "/espacios/sala_grading_monitores.jpg" },     // Sala de grading con monitores - MUY impactante
  { id: 2, src: "/espacios/puerta_color_1.jpg" },              // Puerta COLOR 1 amarilla - visual fuerte
  { id: 3, src: "/espacios/pasillo_entrada.jpg" },             // Entrada con logo Cube Post
  { id: 4, src: "/espacios/lounge_bar.jpg" },                  // Lounge/bar - espacio impresionante
  { id: 5, src: "/espacios/logo_cube_resolve.jpeg" },          // Logo con DaVinci Resolve
  { id: 6, src: "/espacios/color_3.jpg" },                     // Sala de color
  { id: 7, src: "/espacios/Grading_1.jpg" },                   // Sala de grading
  { id: 8, src: "/espacios/espacio_color_1_-_2.jpg" },         // Espacio de color

  // === DETALLES TÉCNICOS Y ARTÍSTICOS ===
  { id: 9, src: "/espacios/cubo_lmt_decoracion.jpg" },         // Cubo LMT decorativo
  { id: 10, src: "/espacios/monitor_sony_trinitron.jpg" },     // Monitor Sony vintage
  { id: 11, src: "/espacios/color_science_revistas.jpg" },     // Revistas Color Science
  { id: 12, src: "/espacios/HW.jpg" },                         // Hardware

  // === ESPACIOS COMUNES ===
  { id: 13, src: "/espacios/recepcion.jpg" },                  // Recepción
  { id: 14, src: "/espacios/bar_color_.jpg" },                 // Bar área
  { id: 15, src: "/espacios/entrada.jpg" },                    // Entrada exterior

  // === VISTAS Y ADICIONALES ===
  { id: 16, src: "/espacios/san.jpg" },                        // Vista
  { id: 17, src: "/espacios/san_2.jpg" },                      // Vista 2
  { id: 18, src: "/espacios/1706794512070.jpg" },              // Detalle
  { id: 19, src: "/espacios/logo_CUbe_entrada.jpg" },          // Logo entrada
  { id: 20, src: "/espacios/20260213_151041.jpg", rotation: 90 },
  { id: 21, src: "/espacios/20260213_151138.jpg", rotation: 90 },
  { id: 22, src: "/espacios/20260213_150715.jpg", rotation: 90 },
  { id: 23, src: "/espacios/20260213_150815.jpg", rotation: 90 },
  { id: 24, src: "/espacios/20260213_151148.jpg", rotation: 90 },
  { id: 25, src: "/espacios/20251231_100137.jpg", rotation: 90 },
];

// Simplified variants
const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
};

// Memoized image card
interface ImageCardProps {
  image: SpaceImage;
  index: number;
  onClick: () => void;
}

const ImageCard = memo(function ImageCard({ image, index, onClick }: ImageCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="break-inside-avoid mb-4 group cursor-pointer relative overflow-hidden rounded-lg"
      onClick={onClick}
    >
      <div
        className="relative w-full overflow-hidden rounded-lg bg-zinc-900"
        style={image.rotation ? { aspectRatio: "3/4" } : { aspectRatio: "4/3" }}
      >
        <Image
          src={image.src}
          alt="Cube Post instalaciones"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
            image.rotation ? "rotate-90" : ""
          }`}
          loading={index < 2 ? "eager" : "lazy"}
          quality={70}
          placeholder="empty"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <ZoomIn size={20} className="text-white" />
          </div>
        </div>
        {/* Border */}
        <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-[#00ff88]/40 transition-colors duration-200 pointer-events-none" />
      </div>
    </motion.div>
  );
});

export default function EspaciosPage() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<SpaceImage | null>(null);

  const handleImageClick = useCallback((image: SpaceImage) => {
    setSelectedImage(image);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#FFD700]" style={{ textShadow: '0 0 30px rgba(255, 215, 0, 0.3)' }}>
            {t.spaces.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.spaces.subtitle}
          </p>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="container mx-auto px-6">
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.04 } },
          }}
        >
          {spaceImages.map((image, index) => (
            <ImageCard
              key={image.id}
              image={image}
              index={index}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute -top-10 right-0 p-2 text-white/70 hover:text-white transition-colors z-10"
              >
                <X size={24} />
              </button>
              <div className="overflow-hidden rounded-lg flex items-center justify-center relative w-full h-[85vh]">
                <Image
                  src={selectedImage.src}
                  alt="Cube Post instalaciones"
                  fill
                  sizes="100vw"
                  className={`object-contain ${selectedImage.rotation ? "rotate-90" : ""}`}
                  quality={85}
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
