"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

function ReticleCorner({
  position,
  delay,
  reduced,
}: {
  position: "tl" | "tr" | "bl" | "br";
  delay: number;
  reduced: boolean;
}) {
  const isLeft = position === "tl" || position === "bl";
  const isTop = position === "tl" || position === "tr";
  const size = 20;
  const thickness = 1.5;
  const arm = size * 0.6;

  return (
    <motion.div
      className={`absolute ${
        isTop ? "top-0" : "bottom-0"
      } ${isLeft ? "left-0" : "right-0"}`}
      style={{ willChange: "transform" }}
      initial={reduced ? { opacity: 0.4 } : { opacity: 0, x: isLeft ? -8 : 8, y: isTop ? -8 : 8 }}
      animate={{ opacity: 0.4, x: 0, y: 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
        <rect x={isLeft ? 0 : size - arm} y={isTop ? 0 : size - thickness} width={arm} height={thickness} fill="white" />
        <rect x={isLeft ? 0 : size - thickness} y={isTop ? 0 : size - arm} width={thickness} height={arm} fill="white" />
      </svg>
    </motion.div>
  );
}

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const stagger = (i: number) => (shouldReduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] });

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0a0a0b]"
      aria-label="Hero — Blueprint LiDAR pre-drywall scanning"
    >
      {/* ── Video background ─────────────────────────────────────────────── */}
      {/* DROP KLING VIDEO FILE: /public/videos/hero-scan.mp4              */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline preload="none"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.18]"
        aria-hidden="true"
      >
        <source src="/videos/hero-scan.mp4" type="video/mp4" />
      </video>

      {/* Edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, #0a0a0b 85%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #0a0a0b 0%, transparent 12%, transparent 88%, #0a0a0b 100%)" }}
        aria-hidden="true"
      />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pt-32 pb-24">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <motion.p
            className="font-mono text-[10px] text-white/25 tracking-[0.22em] uppercase mb-8"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={stagger(0)}
          >
            Pre-Drywall Scanning Service
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.04] tracking-tight mb-7"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stagger(1)}
            style={{ willChange: "transform" }}
          >
            Your walls close once.{" "}
            <span className="text-white/40">Capture everything before they do.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-[#6b6b6b] text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stagger(2)}
            style={{ willChange: "transform" }}
          >
            We scan your home during framing to create a permanent digital record
            of every pipe, wire, and duct — accessible forever.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stagger(3)}
            style={{ willChange: "transform" }}
          >
            <a
              href="#book"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-semibold text-sm rounded-lg transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
              aria-label="Book your pre-drywall scan"
            >
              Book Your Pre-Drywall Scan
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-white/10 hover:border-white/20 text-white/50 hover:text-white/80 font-semibold text-sm rounded-lg transition-all duration-150"
              aria-label="See how Blueprint LiDAR works"
            >
              See How It Works
            </a>
          </motion.div>
        </div>

        {/* Corner reticle — positioned top-right of the content block */}
        <div
          className="absolute top-32 right-8 w-40 h-40 pointer-events-none hidden lg:block"
          aria-hidden="true"
        >
          <ReticleCorner position="tl" delay={0.8} reduced={shouldReduceMotion} />
          <ReticleCorner position="tr" delay={0.85} reduced={shouldReduceMotion} />
          <ReticleCorner position="bl" delay={0.9} reduced={shouldReduceMotion} />
          <ReticleCorner position="br" delay={0.95} reduced={shouldReduceMotion} />

          {/* Scan indicator */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 1.2, duration: 0.5 }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#f97316]"
              animate={shouldReduceMotion ? {} : { opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              aria-hidden="true"
            />
            <span className="font-mono text-[8px] text-white/20 tracking-widest">REC</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-8 flex items-center gap-3"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { delay: 1.4, duration: 0.5 }}
        aria-hidden="true"
      >
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent"
          animate={shouldReduceMotion ? {} : { scaleY: [0.3, 1, 0.3], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ willChange: "transform", transformOrigin: "top" }}
        />
        <span className="font-mono text-[9px] text-white/20 tracking-[0.2em]">SCROLL</span>
      </motion.div>
    </section>
  );
}
