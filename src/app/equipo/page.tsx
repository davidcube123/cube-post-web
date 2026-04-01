"use client";

import { Mail, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const teamMembers = [
  { name: "David Carceles", email: "david.carceles@cube-post.com", imdb: "https://www.imdb.com/name/nm3393551/" },
  { name: "Quique Canadas", email: "quique.canadas@cube-post.com", imdb: "https://www.imdb.com/name/nm2728181/" },
  { name: "Laura Sanchez", email: "laura.sanchez@cube-post.com", imdb: "https://www.imdb.com/name/nm2731549/" },
  { name: "Enric Sebastia", email: "enric.sebastia@cube-post.com", imdb: "https://www.imdb.com/name/nm3122887/" },
  { name: "Nacho Melero", email: "nacho.melero@cube-post.com", imdb: "https://www.imdb.com/name/nm1968531/" },
  { name: "Rafael Marmodoro", email: "rafa.marmodoro@cube-post.com", imdb: "https://www.imdb.com/name/nm8596931/" },
  { name: "Stephane Cattan", email: "stephane.cattan@cube-post.com", imdb: "https://www.imdb.com/name/nm3714791/" },
  { name: "Jordi Gil", email: "jordi.gil@cube-post.com", imdb: "https://www.imdb.com/name/nm13161107/" },
];

const colors = ["#00ff88", "#ffff00", "#ff00aa", "#00aaff"];

export default function EquipoPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-24 md:py-32 grid-background">
      <div className="container mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 gradient-text tracking-tight">
            {t.team.title}
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t.team.subtitle}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => {
            const color = colors[index % colors.length];
            return (
              <div
                key={member.name}
                className="group relative p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-border transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    {member.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    {member.imdb && (
                      <a
                        href={member.imdb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#f5c518]/10 hover:bg-[#f5c518]/20 transition-all duration-300 group/link"
                        title="IMDB"
                      >
                        <span className="text-[#f5c518] text-xs font-bold group-hover/link:scale-110 transition-transform">
                          IMDb
                        </span>
                      </a>
                    )}
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 hover:scale-110"
                      style={{ backgroundColor: `${color}20` }}
                      title={member.email}
                    >
                      <Mail size={18} style={{ color }} />
                    </a>
                  </div>
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"
                  style={{ boxShadow: `inset 0 0 40px ${color}08, 0 0 30px ${color}08` }}
                />
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">{t.team.cta}</p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00ff88] via-[#ff00aa] to-[#00aaff] text-black font-semibold hover:scale-105 transition-transform duration-300"
          >
            {t.team.ctaButton}
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
