"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function ContactoPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen py-24 md:py-32 grid-background">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 gradient-text tracking-tight">
            {t.contact.title}
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 tracking-tight">{t.contact.info}</h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{t.contact.infoDesc}</p>
            </div>

            <div className="space-y-6">
              <a
                href="mailto:info@cube-post.com"
                className="group flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/30 hover:border-[#00ff88]/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#00ff88]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail size={24} className="text-[#00ff88]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.contact.email}</p>
                  <p className="text-white font-medium">info@cube-post.com</p>
                </div>
              </a>

              <a
                href="tel:+34932912433"
                className="group flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/30 hover:border-[#ffff00]/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#ffff00]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone size={24} className="text-[#ffff00]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.contact.phone}</p>
                  <p className="text-white font-medium">+34 932 91 24 33</p>
                </div>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Carrer+Consell+de+Cent+68B+08015+Barcelona+Spain"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/30 hover:border-[#ff00aa]/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#ff00aa]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin size={24} className="text-[#ff00aa]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.contact.location}</p>
                  <p className="text-white font-medium">Carrer Consell de Cent, 68B</p>
                  <p className="text-white/70 text-sm">08015 Barcelona, España</p>
                </div>
              </a>
            </div>

            <div className="pt-8">
              <Image
                src="https://ext.same-assets.com/2561987519/700214636.jpeg"
                alt="Sony Official Partner"
                width={120}
                height={48}
                className="h-12 w-auto object-contain opacity-70"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="p-8 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6">{t.contact.form.title}</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                    {t.contact.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-[#00ff88] focus:ring-1 focus:ring-[#00ff88] outline-none transition-all duration-300 text-white placeholder:text-muted-foreground"
                    placeholder={t.contact.form.namePlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                    {t.contact.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-[#ffff00] focus:ring-1 focus:ring-[#ffff00] outline-none transition-all duration-300 text-white placeholder:text-muted-foreground"
                    placeholder={t.contact.form.emailPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-2">
                    {t.contact.form.subject}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-[#ff00aa] focus:ring-1 focus:ring-[#ff00aa] outline-none transition-all duration-300 text-white placeholder:text-muted-foreground"
                    placeholder={t.contact.form.subjectPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff] outline-none transition-all duration-300 text-white placeholder:text-muted-foreground resize-none"
                    placeholder={t.contact.form.messagePlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full py-4 rounded-lg font-semibold text-black transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                  style={{
                    background: isSubmitted
                      ? "#00ff88"
                      : "linear-gradient(135deg, #00ff88 0%, #ffff00 50%, #ff00aa 100%)",
                    backgroundSize: "200% auto",
                  }}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : isSubmitted ? (
                    <>
                      <Check size={20} />
                      {t.contact.form.sent}
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {t.contact.form.submit}
                    </>
                  )}
                </button>
              </form>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff88]/20 via-[#ff00aa]/20 to-[#00aaff]/20 rounded-2xl blur-xl -z-10 opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
}
