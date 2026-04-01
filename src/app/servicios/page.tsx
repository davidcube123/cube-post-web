"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Film,
  Settings,
  Monitor,
  Clapperboard,
  Wifi,
  Package,
  Edit,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const serviceKeys = [
  { key: "workflow", icon: Settings, color: "#00ff88" },
  { key: "color", icon: Palette, color: "#ffff00" },
  { key: "qc", icon: Film, color: "#ff00aa" },
  { key: "editing", icon: Edit, color: "#00aaff" },
  { key: "grading", icon: Clapperboard, color: "#00ff88" },
  { key: "online", icon: Monitor, color: "#ffff00" },
  { key: "remote", icon: Wifi, color: "#ff00aa" },
  { key: "mastering", icon: Package, color: "#00aaff" },
] as const;

// Simplified animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
};

// Memoized service card
interface ServiceCardProps {
  serviceKey: string;
  icon: React.ElementType;
  color: string;
  title: string;
  desc: string;
}

const ServiceCard = memo(function ServiceCard({
  serviceKey,
  icon: Icon,
  color,
  title,
  desc,
}: ServiceCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="service-card group relative p-7 rounded-xl border border-border/50 bg-card/30 hover:border-border transition-colors duration-200 cursor-pointer"
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-110"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon size={24} style={{ color }} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-3 text-white tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed">
        {desc}
      </p>

      {/* Subtle hover effect */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: `linear-gradient(135deg, ${color}08 0%, transparent 50%)` }}
      />
    </motion.div>
  );
});

export default function ServiciosPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-24 md:py-32 grid-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text tracking-tight">
            {t.services.title}
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {serviceKeys.map((service) => {
            const serviceData = t.services.items[service.key];
            return (
              <ServiceCard
                key={service.key}
                serviceKey={service.key}
                icon={service.icon}
                color={service.color}
                title={serviceData.title}
                desc={serviceData.desc}
              />
            );
          })}
        </motion.div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            {t.services.encryptionDesc}
          </p>
          <p className="text-lg font-semibold text-white">
            {t.services.encryption}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {t.services.encryptionDesc.includes("proteccion")
              ? "Garantizando una transmisión segura y confiable"
              : "Ensuring secure and reliable transmission"}
          </p>
        </div>
      </div>
    </div>
  );
}
