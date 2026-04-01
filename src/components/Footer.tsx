"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-background border-t border-border/30 safe-bottom">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 items-center">
          {/* Logo & Sony Partner */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/cube-logo-original.jpg"
                alt="Cube Post"
                width={160}
                height={64}
                className="h-16 w-auto object-contain"
              />
            </Link>
            <div className="flex items-center gap-4">
              <Image
                src="/sony-partner.jpg"
                alt="Sony Official Partner"
                width={100}
                height={40}
                className="h-10 w-auto object-contain opacity-80"
              />
            </div>
            <div className="flex items-center gap-3 sm:gap-4 mt-4">
              <a
                href="https://www.instagram.com/cube__post/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-[#ff00aa]/20 transition-all duration-300 active:scale-95"
              >
                <Instagram size={22} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/cube-post/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-[#00aaff]/20 transition-all duration-300 active:scale-95"
              >
                <Linkedin size={22} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start gap-3 sm:gap-5">
            <h3 className="text-base sm:text-lg font-semibold mb-1 tracking-tight">{t.footer.contact}</h3>
            <a
              href="mailto:info@cube-post.com"
              className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors group py-2 min-h-[44px]"
            >
              <Mail size={18} className="text-[#00ff88] group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="text-sm sm:text-base">info@cube-post.com</span>
            </a>
            <a
              href="tel:+34932912433"
              className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors group py-2 min-h-[44px]"
            >
              <Phone size={18} className="text-[#ffff00] group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="text-sm sm:text-base">+34 932 91 24 33</span>
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col items-center md:items-end gap-2 sm:gap-5">
            <h3 className="text-base sm:text-lg font-semibold mb-1 tracking-tight">{t.footer.legal}</h3>
            <Link
              href="/privacy-policy"
              className="text-muted-foreground hover:text-white transition-colors text-sm py-2 min-h-[44px] flex items-center"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="/condiciones-generales-de-venta"
              className="text-muted-foreground hover:text-white transition-colors text-sm py-2 min-h-[44px] flex items-center"
            >
              {t.footer.terms}
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
