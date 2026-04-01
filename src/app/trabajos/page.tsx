"use client";

import { useState, useCallback, memo, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

// Projects ordered by custom sequence
const projects = [
  // 1. Deep Water (2026)
  {
    title: "Deep Water",
    poster: "https://c3687.eu-central-1.linodeobjects.com/2025/02/MV5BZmE4MTYzNzQtMjVkNy00NWY1LTllMjctYTc5YzY5NjNiYTk3XkEyXkFqcGc@._V1_.jpg",
    director: "Renny Harlin",
    omdbTitle: "Deep Water",
  },
  // 2. Tadeo Jones y la Lámpara Maravillosa (2026)
  {
    title: "Tadeo Jones y la Lámpara Maravillosa",
    poster: "https://m.media-amazon.com/images/M/MV5BYTViNTY5ODAtMzVlMi00MGViLTliZjgtMDQ5MDlmZjYyZjU4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    director: "Enrique Gato",
    omdbTitle: "Tad and the Magic Lamp",
  },
  // 3. SIRAT
  {
    title: "SIRAT",
    poster: "https://m.media-amazon.com/images/M/MV5BYjIxMTIwNmYtMzczMi00NWIzLTg1ODgtOWFhYjE3YTNkZDI0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    director: "Oliver Laxe",
    dop: "Mauro Herce",
    omdbTitle: "Sirat",
  },
  // 2. The Night Manager S02
  {
    title: "The Night Manager S02",
    poster: "https://m.media-amazon.com/images/M/MV5BODA1NDA1ODUtNGM0Ny00NWZkLTlhZmYtMzQ3NDk2OWZjNjMzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    omdbTitle: "The Night Manager",
  },
  // 3. Ídolos
  {
    title: "Ídolos",
    poster: "https://m.media-amazon.com/images/M/MV5BODEyNGFmYWItYjM2YS00NmNhLWIxN2UtNWRjMGExNDc3YWQ5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    omdbTitle: "Idolos",
  },
  // 4. Dos Tumbas (was 13)
  {
    title: "Dos Tumbas",
    lmt: "/lmt/dos-tumbas-lmt.jpg",
    poster: "https://m.media-amazon.com/images/M/MV5BNzA3OTE0N2ItNzZjMS00OTI0LTkwNjUtMGMzOGU5ODQ2Y2ZhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    director: "Kike Maíllo",
    dop: "Román Martínez de Bujo",
    omdbTitle: "Dos Tumbas",
  },
  // 5. Ruido (was 10)
  {
    title: "Ruido",
    lmt: "/lmt/ruido-lmt.jpg",
    poster: "https://m.media-amazon.com/images/M/MV5BZTE2ZWYzM2MtNmFiZi00M2ZhLWE1NDMtNGFkYjRmOGIwODI2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    director: "Ingride Santos",
    dop: "Beatriz Sastre",
    omdbTitle: "Ruido",
  },
  // 6. The Map That Leads to You (was 12)
  {
    title: "The Map That Leads to You",
    lmt: "/lmt/map-leads-to-you-lmt.jpg",
    poster: "https://m.media-amazon.com/images/M/MV5BYmViMTI1OTktOGRkZS00YjdmLWFhNGMtMWMwNTRmZWY3MmI4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    director: "Lasse Hallström",
    dop: "Elias M. Felix",
    omdbTitle: "The Map That Leads to You",
  },
  // 7. Siempre es Invierno (was 11)
  {
    title: "Siempre es Invierno",
    lmt: "/lmt/siempre-es-invierno-lmt.jpg",
    poster: "https://m.media-amazon.com/images/M/MV5BMDRiMDZhZjgtMTlhMS00NDVlLTk3YjUtZDRmMjI0Mjc3NmYxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    director: "David Trueba",
    dop: "Agnès Piqué Corbera",
    omdbTitle: "Siempre es invierno",
  },
  // 8. Golpes (was 7)
  {
    title: "Golpes",
    lmt: "/lmt/golpes-lmt.jpg",
    poster: "https://m.media-amazon.com/images/M/MV5BNmYzZmMxMmQtMTI0My00NGY3LWJlNzUtMzRjODZkZWIwODgwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    director: "Rafael Cobos",
    dop: "Sergi Vilanova",
    omdbTitle: "Golpes",
  },
  // 9. El Rastre del Llop (was 9)
  {
    title: "El Rastre del Llop",
    lmt: "/lmt/rastre-del-llop-lmt.jpg",
    poster: "https://m.media-amazon.com/images/M/MV5BZmE3MzI3MzItMDg0MS00Mzg1LTk3NzctNjUzMWYwNWIxMTIzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    director: "Ángeles Hernández",
    dop: "Mariano Suárez",
    omdbTitle: "El rastre del llop",
  },
  // 10. Les Irresponsables (was 8)
  {
    title: "Les Irresponsables",
    lmt: "/lmt/les-irresponsables-lmt.jpg",
    poster: "https://m.media-amazon.com/images/M/MV5BNzNmYmJiYjEtYmI3My00NWI5LTk5MTUtYWE1YWE0NjA0Y2YyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    director: "Laura Mañá",
    dop: "Sergi Gallardo",
    omdbTitle: "Les irresponsables",
  },
  // 11. Apocalipsis Z (was 17)
  {
    title: "Apocalipsis Z",
    lmt: "https://ext.same-assets.com/2561987519/460045720.jpeg",
    poster: "https://m.media-amazon.com/images/M/MV5BZjBiMDZjMzMtYzRjYS00ODc0LTlmNDEtYjQxYjJkYjdhODdkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    dop: "Elias M. Felix",
    omdbTitle: "Apocalypse Z: The Beginning of the End",
  },
  // 12. Cites Barcelona S02 (was 19)
  {
    title: "Cites Barcelona S02",
    lmt: "https://ext.same-assets.com/2561987519/2175374505.jpeg",
    poster: "https://m.media-amazon.com/images/M/MV5BYTFmOTQ2M2EtYzFiMS00OTIyLTkyN2QtMTE3Y2ZlYzI1OTkyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    dop: "Albert Pascual",
    omdbTitle: "Cites",
  },
  // 13. The Penguin Lessons (was 20)
  {
    title: "The Penguin Lessons",
    lmt: "https://ext.same-assets.com/2561987519/3719077407.jpeg",
    poster: "https://m.media-amazon.com/images/M/MV5BYTU1MmE0NDEtNjM0OC00MjExLThmNjUtNTE4ZGU0NjRmY2NlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    director: "Peter Cattaneo",
    dop: "Xavi Gimenez",
    omdbTitle: "The Penguin Lessons",
  },
  // 14. Mi Amiga Eva (was 24)
  {
    title: "Mi Amiga Eva",
    lmt: "https://ext.same-assets.com/2561987519/2156165389.jpeg",
    poster: "https://m.media-amazon.com/images/M/MV5BNTg0ZjgwMGEtOGM4My00YTgyLWEyMmQtNjFhNzI3OThlYmIxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    director: "Cesc Gay",
    dop: "Andreu Rebes",
    omdbTitle: "Mi amiga Eva",
  },
  // 15. Mariposas Negras (was 5)
  {
    title: "Mariposas Negras",
    poster: "https://m.media-amazon.com/images/M/MV5BZGY4NzY0MDktYmZiNy00YWQ0LThlNWYtNTc1YzI1MmNiZmYyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    director: "David Baute",
    omdbTitle: "Mariposas Negras",
  },
  // 16. La Luz de Aisha (was 6)
  {
    title: "La Luz de Aisha",
    poster: "https://spainaudiovisualhub.digital.gob.es/content/dam/seteleco-hub-audiovisual/resources/images/animacion/la-luz-de-aisha/La_luz_de_Aisha_cartel.jpg",
    director: "Shadi Adib",
    omdbTitle: "La luz de Aisha",
  },
  // 17. La Buena Letra (was 23)
  {
    title: "La Buena Letra",
    lmt: "https://ext.same-assets.com/2561987519/1784482997.jpeg",
    poster: "https://m.media-amazon.com/images/M/MV5BZjhmNTY1NmUtMDJhYS00MDVhLTllMmYtNjU0YjMxNTU2NDgxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    director: "Celia Rico",
    dop: "Sara Gallego",
    omdbTitle: "La buena letra",
  },
  // 18. La ultima noche en Tremore Beach (was 21)
  {
    title: "La ultima noche en Tremore Beach",
    lmt: "https://ext.same-assets.com/2561987519/2841821197.jpeg",
    poster: "https://m.media-amazon.com/images/M/MV5BYWNkY2RkYjktYzFjYy00MDFhLWIwMWItMDMzMGVkMzE4MTgzXkEyXkFqcGc@._V1_.jpg",
    director: "Oriol Paulo",
    dop: "Bernat Bosch, Albert Pascual",
    omdbTitle: "The Last Night at Tremore Beach",
  },
  // 19. Wolfgang (was 25)
  {
    title: "Wolfgang",
    lmt: "https://ext.same-assets.com/2561987519/4251018731.jpeg",
    poster: "https://m.media-amazon.com/images/M/MV5BMGZhMWM3ZTMtMTFjYy00NzUwLTgzMDgtODQ5YjI0MTM0YjM1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    director: "Javi Ruiz Caldera",
    dop: "Sergi Vilanova",
    omdbTitle: "Wolfgang",
  },
  // 20. Mamen Mayo (was 22)
  {
    title: "Mamen Mayo",
    lmt: "https://ext.same-assets.com/2561987519/2695777774.jpeg",
    poster: "https://m.media-amazon.com/images/M/MV5BNzFkZDAzNWItNzEzMS00MDY1LTg4N2UtZTc1MWEwMzc4YTkxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    director: "Carmen Aumedes, Oriol Perez",
    dop: "Josep Pardo, Pau Munoz",
    omdbTitle: "Mamen Mayo",
  },
  // 21. Campamento Garra de Oso (was 4)
  {
    title: "Campamento Garra de Oso",
    poster: "https://m.media-amazon.com/images/M/MV5BZDQxMWY4NmUtMDQ2OS00ZDEwLWJiYzQtM2JkNGRjYzMwMGZjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    director: "Silvia Quer",
    omdbTitle: "Campamento Garra de Oso",
  },
  // 22. Salve Maria (was 18)
  {
    title: "Salve Maria",
    lmt: "https://ext.same-assets.com/2561987519/1908467169.jpeg",
    poster: "https://m.media-amazon.com/images/M/MV5BZjIxMjZiNTMtMjIzMi00MDkxLWEwN2QtNzFlZmI5ZTczZmJjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    director: "Mar Coll",
    dop: "Rulo Zimmerman",
    omdbTitle: "Salve Maria",
  },
  // 23. Escape (was 16)
  {
    title: "Escape",
    lmt: "https://ext.same-assets.com/2561987519/302337332.jpeg",
    poster: "https://m.media-amazon.com/images/M/MV5BODYxYmZhMTktMTY1NC00YWJhLTkzNDYtNmYxYjJhZjlkMzJiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    director: "Rodrigo Cortes",
    dop: "Rafa Garcia",
    omdbTitle: "Escape",
  },
  // 24. Estacion Rocafort (was 14)
  {
    title: "Estacion Rocafort",
    lmt: "https://ext.same-assets.com/2561987519/95868007.jpeg",
    poster: "https://m.media-amazon.com/images/M/MV5BMTIyZDRjOTItZGJkMi00Njc3LTg2MTMtNTJkNjMzNmZmMzk1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    dop: "Marc Miro",
    omdbTitle: "Estación Rocafort",
  },
  // 25. Norberta (was 15)
  {
    title: "Norberta",
    lmt: "https://ext.same-assets.com/2561987519/1935953877.jpeg",
    poster: "https://upload.wikimedia.org/wikipedia/en/0/03/Norberta_%28film%29_poster.jpg",
    dop: "David Valldeperez",
    omdbTitle: "Norberta",
  },
];

// Unified border color - elegant cyan/teal (same as LMT carousel)
const colors = ["#38bdf8"];

// Simplified animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

// Rating type
interface RatingData {
  imdbRating: string | null;
  imdbID: string | null;
}

// Memoized Project Card
interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  isFlipped: boolean;
  onFlip: () => void;
  color: string;
  t: ReturnType<typeof useLanguage>["t"];
  language: string;
  rating: RatingData | null;
}

const ProjectCard = memo(function ProjectCard({
  project,
  index,
  isFlipped,
  onFlip,
  color,
  t,
  language,
  rating,
}: ProjectCardProps) {
  const hasPoster = !!project.poster;
  const hasLmt = !!project.lmt;
  const canFlip = hasLmt;

  // Lazy load images after first 8 cards
  const shouldLazyLoad = index >= 8;

  return (
    <motion.div
      variants={cardVariants}
      className={`group relative aspect-[3/4] sm:aspect-[4/5] ${canFlip ? "cursor-pointer" : ""}`}
      style={{ perspective: "1000px" }}
      onClick={canFlip ? onFlip : undefined}
      role={canFlip ? "button" : undefined}
      tabIndex={canFlip ? 0 : undefined}
      onKeyDown={canFlip ? (e) => { if (e.key === 'Enter' || e.key === ' ') onFlip(); } : undefined}
    >
      {/* Card container with 3D flip */}
      <div
        className="relative w-full h-full transition-transform duration-400 ease-out"
        style={{
          transform: isFlipped && canFlip ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front - Movie Poster or Title Card */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {hasPoster ? (
            <Image
              src={project.poster}
              alt={`${project.title} - Poster`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading={shouldLazyLoad ? "lazy" : "eager"}
              placeholder="empty"
              unoptimized
            />
          ) : (
            /* Title Card when no poster available */
            <div
              className="w-full h-full flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)`,
              }}
            >
              {/* Decorative elements */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 30% 20%, ${color}15 0%, transparent 50%),
                               radial-gradient(circle at 70% 80%, ${color}10 0%, transparent 40%)`,
                }}
              />
              <div
                className="absolute top-0 left-0 w-full h-1"
                style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
              />
              <div
                className="absolute bottom-0 left-0 w-full h-1"
                style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
              />

              {/* Film reel icon */}
              <div className="mb-6 opacity-30">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="12" cy="5" r="1.5" fill={color} />
                  <circle cx="12" cy="19" r="1.5" fill={color} />
                  <circle cx="5" cy="12" r="1.5" fill={color} />
                  <circle cx="19" cy="12" r="1.5" fill={color} />
                </svg>
              </div>

              {/* Title */}
              <h3
                className="text-2xl md:text-3xl font-bold text-center px-6 leading-tight"
                style={{
                  color: color,
                  textShadow: `0 0 30px ${color}50`,
                }}
              >
                {project.title}
              </h3>

              <p className="text-sm text-white/40 mt-3 uppercase tracking-widest">
                Cube Post
              </p>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

          {/* Title - only show on poster cards */}
          {hasPoster && (
            <div className="absolute top-0 left-0 p-2 sm:p-4 md:p-5 pr-8 sm:pr-16 md:pr-20">
              <h3 className="text-xs sm:text-sm md:text-lg font-bold text-white mb-0.5 sm:mb-1 line-clamp-2">{project.title}</h3>
              <p className="text-[8px] sm:text-xs md:text-sm text-white/60 hidden sm:block">
                {language === "es" ? "Postproduccion por Cube Post" : "Post-production by Cube Post"}
              </p>
            </div>
          )}

          {/* Director and DOP - hidden on smallest screens */}
          {(project.director || project.dop) && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 md:p-3 flex-col items-end gap-1 sm:gap-2 md:gap-3 hidden sm:flex">
              {project.director && (
                <div className="text-right">
                  <p className="text-[8px] sm:text-[10px] text-white/50 uppercase tracking-wider">{t.works.director}</p>
                  <p className="text-[10px] sm:text-xs text-white/80 font-medium max-w-[60px] sm:max-w-[80px] md:max-w-[90px] line-clamp-2">{project.director}</p>
                </div>
              )}
              {project.dop && (
                <div className="text-right">
                  <p className="text-[8px] sm:text-[10px] text-white/50 uppercase tracking-wider">{t.works.dop}</p>
                  <p className="text-[10px] sm:text-xs text-white/80 font-medium max-w-[60px] sm:max-w-[80px] md:max-w-[90px] line-clamp-2">{project.dop}</p>
                </div>
              )}
            </div>
          )}

          {/* IMDB Rating Badge */}
          {rating?.imdbRating && (
            <a
              href={rating.imdbID ? `https://www.imdb.com/title/${rating.imdbID}/` : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-[#f5c518] hover:bg-[#e6b800] transition-colors min-h-[32px] sm:min-h-[36px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Star size={12} className="text-black fill-black sm:w-[14px] sm:h-[14px]" />
              <span className="text-xs sm:text-sm font-bold text-black">{rating.imdbRating}</span>
              <span className="text-[8px] sm:text-[10px] text-black/70 font-medium hidden sm:inline">IMDb</span>
            </a>
          )}

          {/* Flip hint - only show if can flip */}
          {canFlip && (
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-[8px] sm:text-[10px] font-medium">FLIP</span>
            </div>
          )}

          {/* Border */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none transition-shadow duration-200 group-hover:shadow-lg"
            style={{ boxShadow: `inset 0 0 0 2px ${color}60` }}
          />
        </div>

        {/* Back - LUT Image (only render if has LMT) */}
        {hasLmt && (
          <div
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="w-full h-full relative">
              <Image
                src={project.lmt}
                alt={`${project.title} - LUT`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover"
                loading="lazy"
                unoptimized
              />
            </div>
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 35%, transparent 65%, ${color}80 100%)`,
              }}
            />
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              <div className="flex justify-end items-start">
                <span className="px-2.5 py-1 rounded-full bg-white/20 text-white text-xs uppercase tracking-wider">
                  LUT
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
                <p className="text-xs text-white/60 uppercase tracking-wider">LMT / Color Science</p>
              </div>
            </div>
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{ boxShadow: `inset 0 0 0 2px ${color}` }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
});

export default function TrabajosPage() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [ratings, setRatings] = useState<Record<string, RatingData>>({});
  const [loadingRatings, setLoadingRatings] = useState(true);
  const { t, language } = useLanguage();

  // Fetch ratings directly from OMDb API (for static export compatibility)
  useEffect(() => {
    const fetchRatings = async () => {
      const OMDB_API_KEY = "trilogy"; // Demo key
      const ratingsMap: Record<string, RatingData> = {};

      try {
        // Fetch ratings for each project (with rate limiting)
        for (const project of projects.slice(0, 15)) { // Limit to avoid API rate limits
          const title = project.omdbTitle || project.title;
          try {
            const response = await fetch(
              `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}&type=movie`
            );

            if (response.ok) {
              const data = await response.json();
              if (data.Response === "True" && data.imdbRating && data.imdbRating !== "N/A") {
                ratingsMap[project.title] = {
                  imdbRating: data.imdbRating,
                  imdbID: data.imdbID || null,
                };
              }
            }
            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));
          } catch {
            // Silently fail for individual ratings
          }
        }
        setRatings(ratingsMap);
      } catch (error) {
        console.error("Failed to fetch ratings:", error);
      } finally {
        setLoadingRatings(false);
      }
    };

    fetchRatings();
  }, []);

  const toggleFlip = useCallback((index: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  return (
    <div className="min-h-screen py-16 sm:py-24 md:py-32 grid-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 gradient-text tracking-tight">
            {t.works.title}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
            {t.works.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground/60 mt-3 sm:mt-4">
            {language === "es" ? "Toca las tarjetas para ver la LUT" : "Tap cards to see the LUT"}
          </p>
          <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="text-xl sm:text-2xl font-bold text-[#38bdf8]">{projects.length}</span>
            <span className="text-xs sm:text-sm text-white/60">
              {language === "es" ? "proyectos completados" : "completed projects"}
            </span>
          </div>
          {loadingRatings && (
            <p className="text-xs text-muted-foreground/40 mt-2 animate-pulse">
              {language === "es" ? "Cargando calificaciones IMDb..." : "Loading IMDb ratings..."}
            </p>
          )}
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-8xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isFlipped={flippedCards.has(index)}
              onFlip={() => toggleFlip(index)}
              color={colors[index % colors.length]}
              t={t}
              language={language}
              rating={ratings[project.title] || null}
            />
          ))}
        </motion.div>

        <div className="mt-14 text-center">
          <p className="text-muted-foreground mb-4">{t.works.cta}</p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-white/50 text-white font-medium transition-colors duration-200"
          >
            {t.works.ctaButton}
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
