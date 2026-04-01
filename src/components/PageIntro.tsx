"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

interface PageIntroProps {
  children: React.ReactNode;
}

// Simple synth sound using Web Audio API
function playIntroSound(audioContext: AudioContext, isMuted: boolean) {
  if (isMuted) return;

  const now = audioContext.currentTime;

  // Create a subtle "digital reveal" sound
  // Low frequency sweep
  const osc1 = audioContext.createOscillator();
  const gain1 = audioContext.createGain();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(80, now);
  osc1.frequency.exponentialRampToValueAtTime(200, now + 0.3);
  gain1.gain.setValueAtTime(0, now);
  gain1.gain.linearRampToValueAtTime(0.15, now + 0.05);
  gain1.gain.linearRampToValueAtTime(0, now + 0.4);
  osc1.connect(gain1);
  gain1.connect(audioContext.destination);
  osc1.start(now);
  osc1.stop(now + 0.5);

  // High sparkle
  const osc2 = audioContext.createOscillator();
  const gain2 = audioContext.createGain();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(2000, now + 0.1);
  osc2.frequency.exponentialRampToValueAtTime(4000, now + 0.3);
  gain2.gain.setValueAtTime(0, now + 0.1);
  gain2.gain.linearRampToValueAtTime(0.08, now + 0.15);
  gain2.gain.linearRampToValueAtTime(0, now + 0.5);
  osc2.connect(gain2);
  gain2.connect(audioContext.destination);
  osc2.start(now + 0.1);
  osc2.stop(now + 0.6);

  // Mid tone pulse
  const osc3 = audioContext.createOscillator();
  const gain3 = audioContext.createGain();
  osc3.type = "triangle";
  osc3.frequency.setValueAtTime(440, now + 0.2);
  osc3.frequency.exponentialRampToValueAtTime(880, now + 0.5);
  gain3.gain.setValueAtTime(0, now + 0.2);
  gain3.gain.linearRampToValueAtTime(0.1, now + 0.25);
  gain3.gain.linearRampToValueAtTime(0, now + 0.7);
  osc3.connect(gain3);
  gain3.connect(audioContext.destination);
  osc3.start(now + 0.2);
  osc3.stop(now + 0.8);
}

// Exit whoosh sound
function playExitSound(audioContext: AudioContext, isMuted: boolean) {
  if (isMuted) return;

  const now = audioContext.currentTime;

  // Whoosh down
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.linearRampToValueAtTime(0, now + 0.3);
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(now);
  osc.stop(now + 0.4);

  // Noise burst for texture
  const bufferSize = audioContext.sampleRate * 0.2;
  const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
  }
  const noise = audioContext.createBufferSource();
  const noiseGain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  noise.buffer = buffer;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2000, now);
  filter.frequency.exponentialRampToValueAtTime(200, now + 0.2);
  noiseGain.gain.setValueAtTime(0.05, now);
  noiseGain.gain.linearRampToValueAtTime(0, now + 0.2);
  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(audioContext.destination);
  noise.start(now);
}

export function PageIntro({ children }: PageIntroProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundPrompt, setShowSoundPrompt] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const hasPlayedIntroRef = useRef(false);
  const hasPlayedExitRef = useRef(false);

  // Initialize audio context and check preferences
  useEffect(() => {
    const savedMuteState = localStorage.getItem("cube-intro-muted");
    const shouldBeMuted = savedMuteState === null ? true : savedMuteState === "true";
    setIsMuted(shouldBeMuted);

    // Check if intro has been shown in this session
    const hasSeenIntro = sessionStorage.getItem("cube-intro-seen");

    if (hasSeenIntro) {
      setIsLoading(false);
      setShowContent(true);
      return;
    }

    // Show sound prompt briefly if not muted
    if (!shouldBeMuted) {
      setShowSoundPrompt(true);
      setTimeout(() => setShowSoundPrompt(false), 1500);
    }

    // Create audio context on user interaction or after a delay
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
    };

    // Try to init audio
    const handleInteraction = () => {
      initAudio();
      if (audioContextRef.current && !hasPlayedIntroRef.current && !isMuted) {
        playIntroSound(audioContextRef.current, false);
        hasPlayedIntroRef.current = true;
      }
    };

    // Add interaction listeners
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });

    // Play intro sound after a short delay if context exists
    const soundTimer = setTimeout(() => {
      initAudio();
      if (audioContextRef.current && !hasPlayedIntroRef.current && !shouldBeMuted) {
        // Resume context if suspended
        if (audioContextRef.current.state === "suspended") {
          audioContextRef.current.resume();
        }
        playIntroSound(audioContextRef.current, shouldBeMuted);
        hasPlayedIntroRef.current = true;
      }
    }, 300);

    // Transition timers
    const timer = setTimeout(() => {
      // Play exit sound
      if (audioContextRef.current && !hasPlayedExitRef.current && !shouldBeMuted) {
        playExitSound(audioContextRef.current, shouldBeMuted);
        hasPlayedExitRef.current = true;
      }
      setIsLoading(false);
      sessionStorage.setItem("cube-intro-seen", "true");
    }, 2000);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 2200);

    return () => {
      clearTimeout(timer);
      clearTimeout(contentTimer);
      clearTimeout(soundTimer);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    localStorage.setItem("cube-intro-muted", String(newMuteState));

    // Initialize audio context on first unmute
    if (!newMuteState && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }

    // Play a small confirmation sound when unmuting
    if (!newMuteState && audioContextRef.current) {
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }
      const now = audioContextRef.current.currentTime;
      const osc = audioContextRef.current.createOscillator();
      const gain = audioContextRef.current.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.15);
      osc.connect(gain);
      gain.connect(audioContextRef.current.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  }, [isMuted]);

  return (
    <>
      {/* Intro Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020205]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Sound toggle button */}
            <motion.button
              className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              onClick={toggleMute}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              title={isMuted ? "Activar sonido" : "Silenciar"}
            >
              {isMuted ? (
                <VolumeX size={20} className="text-white/60" />
              ) : (
                <Volume2 size={20} className="text-[#00ff88]" />
              )}
            </motion.button>

            {/* Sound prompt */}
            <AnimatePresence>
              {showSoundPrompt && (
                <motion.div
                  className="absolute top-6 right-20 px-3 py-2 rounded-lg bg-[#00ff88]/20 border border-[#00ff88]/30"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <span className="text-xs text-[#00ff88]">Sonido activado</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Animated background grid */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 170, 255, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 170, 255, 0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: "50px 50px",
                }}
              />
              {/* Center glow */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                  background: "radial-gradient(circle, rgba(0, 255, 136, 0.08) 0%, rgba(255, 0, 170, 0.04) 50%, transparent 70%)",
                }}
              />
            </div>

            {/* Logo and text */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Logo with animation */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  rotateY: { duration: 1.2, ease: "easeOut" },
                }}
              >
                <Image
                  src="https://ext.same-assets.com/2561987519/3491498880.png"
                  alt="Cube Post"
                  width={120}
                  height={120}
                  className="w-24 h-24 md:w-32 md:h-32"
                  priority
                />
              </motion.div>

              {/* Text reveal */}
              <motion.div
                className="mt-6 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <motion.h1
                  className="text-2xl md:text-3xl font-bold tracking-tight"
                  initial={{ y: 40 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                >
                  <span className="text-white">cube</span>
                  <span className="text-white/50 ml-1">post</span>
                </motion.h1>
              </motion.div>

              {/* Animated line */}
              <motion.div
                className="mt-4 h-[2px] bg-gradient-to-r from-transparent via-[#00ff88] to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 120, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              />

              {/* Loading dots */}
              <div className="mt-6 flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#00ff88]"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              {/* Sound hint */}
              <motion.p
                className="mt-8 text-xs text-white/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                {isMuted ? "Clic en el icono para activar sonido" : ""}
              </motion.p>
            </div>

            {/* Corner accents */}
            <motion.div
              className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#00ff88]/30"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
            <motion.div
              className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#ff00aa]/30 mt-14"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            />
            <motion.div
              className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#00aaff]/30"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
            <motion.div
              className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#ffff00]/30"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content with reveal animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
}
