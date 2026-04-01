"use client";

import { useEffect, useRef, useCallback } from "react";

export function TronBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const isVisibleRef = useRef(true);
  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Performance constants
    const TARGET_FPS = 30;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    let width = 0;
    let height = 0;
    let horizon = 0;
    let vpX = 0;

    // Particle count based on screen size
    const MAX_PARTICLES = 25;
    const getNumParticles = () => width < 768 ? 15 : MAX_PARTICLES;
    let numParticles = MAX_PARTICLES;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      horizon = height * 0.55;
      vpX = width / 2;
      numParticles = getNumParticles();
      // Recreate gradients on resize
      createStaticGradients();
    };

    // Pre-create gradients
    let horizonGradient: CanvasGradient;
    let topVignette: CanvasGradient;
    let bottomVignette: CanvasGradient;

    const createStaticGradients = () => {
      horizonGradient = ctx.createLinearGradient(0, horizon, width, horizon);
      horizonGradient.addColorStop(0, "transparent");
      horizonGradient.addColorStop(0.3, "rgba(255, 0, 170, 0.6)");
      horizonGradient.addColorStop(0.5, "rgba(0, 255, 136, 0.8)");
      horizonGradient.addColorStop(0.7, "rgba(255, 0, 170, 0.6)");
      horizonGradient.addColorStop(1, "transparent");

      topVignette = ctx.createLinearGradient(0, 0, 0, 150);
      topVignette.addColorStop(0, "rgba(0, 0, 0, 0.5)");
      topVignette.addColorStop(1, "transparent");

      bottomVignette = ctx.createLinearGradient(0, height, 0, height - 100);
      bottomVignette.addColorStop(0, "rgba(0, 0, 0, 0.7)");
      bottomVignette.addColorStop(1, "transparent");
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Precompute particle positions
    const particleSeeds = new Float32Array(MAX_PARTICLES * 2);
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const seed = i * 137.5;
      particleSeeds[i * 2] = seed;
      particleSeeds[i * 2 + 1] = seed * 2.3;
    }

    // Visibility detection
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const drawTronGrid = (timestamp: number) => {
      // Skip frames if not visible
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(drawTronGrid);
        return;
      }

      // Throttle to target FPS
      const elapsed = timestamp - lastFrameTimeRef.current;
      if (elapsed < FRAME_INTERVAL) {
        animationRef.current = requestAnimationFrame(drawTronGrid);
        return;
      }
      lastFrameTimeRef.current = timestamp - (elapsed % FRAME_INTERVAL);

      const time = timeRef.current;

      // Clear with dark background
      ctx.fillStyle = "#020205";
      ctx.fillRect(0, 0, width, height);

      // Vertical lines - batch drawing (fewer on mobile)
      ctx.beginPath();
      const numVerticalLines = width < 768 ? 12 : 18;
      for (let i = -numVerticalLines / 2; i <= numVerticalLines / 2; i++) {
        const bottomX = vpX + (i / (numVerticalLines / 2)) * (width * 1.2);
        ctx.moveTo(vpX, horizon);
        ctx.lineTo(bottomX, height);
      }
      ctx.strokeStyle = "rgba(0, 170, 255, 0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Horizontal lines - batch drawing
      ctx.beginPath();
      const numHorizontalLines = 12;
      for (let i = 0; i < numHorizontalLines; i++) {
        const progress = i / numHorizontalLines;
        const y = horizon + Math.pow(progress, 1.5) * (height - horizon);
        const lineWidth = progress * width * 1.5;
        const startX = vpX - lineWidth / 2;
        const endX = vpX + lineWidth / 2;
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
      }
      ctx.strokeStyle = "rgba(0, 200, 200, 0.35)";
      ctx.stroke();

      // Draw horizon line
      ctx.beginPath();
      ctx.moveTo(0, horizon);
      ctx.lineTo(width, horizon);
      ctx.strokeStyle = horizonGradient;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Ceiling grid - batch drawing
      ctx.beginPath();
      ctx.globalAlpha = 0.12;
      for (let i = -10; i <= 10; i++) {
        const topX = vpX + (i / 10) * (width * 1.2);
        ctx.moveTo(vpX, horizon);
        ctx.lineTo(topX, 0);
      }
      ctx.strokeStyle = "rgba(255, 0, 170, 0.2)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Floating particles - simplified
      ctx.fillStyle = "rgba(0, 255, 200, 0.4)";
      for (let i = 0; i < numParticles; i++) {
        const seedX = particleSeeds[i * 2];
        const seedY = particleSeeds[i * 2 + 1];
        const x = ((seedX + time * 20) % width);
        const y = ((seedY + time * 10) % (height * 0.5)) + horizon;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Vignettes
      ctx.fillStyle = topVignette;
      ctx.fillRect(0, 0, width, 150);
      ctx.fillStyle = bottomVignette;
      ctx.fillRect(0, height - 100, width, 100);

      timeRef.current += 0.012;
      animationRef.current = requestAnimationFrame(drawTronGrid);
    };

    animationRef.current = requestAnimationFrame(drawTronGrid);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
