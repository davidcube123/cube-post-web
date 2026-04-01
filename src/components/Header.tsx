"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    // Check if intro has been shown
    const hasSeenIntro = sessionStorage.getItem("cube-intro-seen");
    if (hasSeenIntro) {
      setIsVisible(true);
    } else {
      // Wait for intro to finish
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2300);
      return () => clearTimeout(timer);
    }
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/servicios", label: t.nav.services },
    { href: "/espacios", label: t.nav.spaces },
    { href: "/equipo", label: t.nav.team },
    { href: "/trabajos", label: t.nav.works },
    { href: "/contacto", label: t.nav.contact },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo Original */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/cube-logo-original.jpg"
                alt="Cube Post"
                width={120}
                height={48}
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
                transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium tracking-wide transition-all duration-300 relative",
                    "hover:text-white",
                    pathname === link.href
                      ? "text-white"
                      : "text-muted-foreground",
                    "after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px]",
                    "after:bg-gradient-to-r after:from-[#00ff88] after:via-[#ff00aa] after:to-[#00aaff]",
                    "after:transition-all after:duration-300",
                    pathname === link.href
                      ? "after:w-full"
                      : "hover:after:w-full"
                  )}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Social Links & Language Selector */}
          <motion.div
            className="hidden md:flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <a
              href="https://www.instagram.com/cube__post/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors duration-300"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/cube-post/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors duration-300"
            >
              <Linkedin size={20} />
            </a>

            {/* Language Selector */}
            <div className="flex items-center gap-1 ml-2 text-sm">
              <button
                onClick={() => setLanguage("es")}
                className={cn(
                  "px-2 py-1 rounded transition-all duration-300",
                  language === "es"
                    ? "text-white bg-white/10"
                    : "text-muted-foreground hover:text-white"
                )}
              >
                ES
              </button>
              <span className="text-muted-foreground">|</span>
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "px-2 py-1 rounded transition-all duration-300",
                  language === "en"
                    ? "text-white bg-white/10"
                    : "text-muted-foreground hover:text-white"
                )}
              >
                EN
              </button>
            </div>
          </motion.div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="min-w-[44px] min-h-[44px] touch-target"
                aria-label="Abrir menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] max-w-[320px] bg-background border-border safe-right"
            >
              <nav className="flex flex-col gap-2 mt-8 px-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-all duration-200 py-3 px-4 rounded-lg min-h-[48px] flex items-center",
                      "active:scale-[0.98] active:bg-white/5",
                      pathname === link.href
                        ? "text-white gradient-text bg-white/5"
                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Language Selector */}
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                  <button
                    onClick={() => setLanguage("es")}
                    className={cn(
                      "flex-1 px-4 py-3 rounded-lg transition-all duration-200 min-h-[48px] text-center font-medium",
                      "active:scale-[0.98]",
                      language === "es"
                        ? "text-white bg-white/10 border border-white/20"
                        : "text-muted-foreground hover:text-white border border-transparent"
                    )}
                  >
                    Español
                  </button>
                  <button
                    onClick={() => setLanguage("en")}
                    className={cn(
                      "flex-1 px-4 py-3 rounded-lg transition-all duration-200 min-h-[48px] text-center font-medium",
                      "active:scale-[0.98]",
                      language === "en"
                        ? "text-white bg-white/10 border border-white/20"
                        : "text-muted-foreground hover:text-white border border-transparent"
                    )}
                  >
                    English
                  </button>
                </div>

                <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-border">
                  <a
                    href="https://www.instagram.com/cube__post/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-white transition-colors p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full hover:bg-white/5"
                    aria-label="Instagram"
                  >
                    <Instagram size={28} />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/cube-post/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-white transition-colors p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full hover:bg-white/5"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={28} />
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
