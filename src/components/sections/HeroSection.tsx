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
      className={`absolute ${isTop ? "top-0" : "bottom-0"} ${isLeft ? "left-0" : "right-0"}`}
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

  const stagger = (i: number) =>
    shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <section
      className="bg-[#0a0a0b] pb-0"
      aria-label="Hero — Blueprint LiDAR pre-drywall scanning"
    >
      {/* ── Text block — pure dark background, no video behind it ─────── */}
      <div className="max-w-7xl mx-auto px-8 pt-36 sm:pt-44 pb-12 relative">
        <div className="max-w-[780px]">

          {/* Eyebrow */}
          <motion.p
            className="font-mono text-[10px] text-white/30 tracking-[0.22em] uppercase mb-7"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={stagger(0)}
          >
            Pre-Drywall Scanning Service
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="text-[28px] sm:text-[42px] font-medium text-white leading-[1.08] tracking-tight mb-6"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stagger(1)}
            style={{ willChange: "transform" }}
          >
            Your walls close once.
            <br />
            <span className="text-white/45">Capture everything before they do.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-[#6b6b6b] text-base sm:text-lg leading-relaxed mb-9 max-w-md"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stagger(2)}
            style={{ willChange: "transform" }}
          >
            We scan your home during framing to create a permanent digital record
            of every pipe, wire, and duct — accessible forever.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stagger(3)}
            style={{ willChange: "transform" }}
          >
            <a
              href="#book"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-semibold text-sm rounded-lg transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
              aria-label="Book your pre-drywall scan"
            >
              Book Your Scan
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-white/10 hover:border-white/20 text-white/50 hover:text-white/80 font-semibold text-sm rounded-lg transition-all duration-150 w-full sm:w-auto"
              aria-label="See how Blueprint LiDAR works"
            >
              See How It Works
            </a>
          </motion.div>
        </div>

        {/* Reticle — ambient top-right detail, aligned with text block */}
        <div
          className="absolute top-36 sm:top-44 right-8 w-28 h-28 pointer-events-none hidden lg:block"
          aria-hidden="true"
        >
          <ReticleCorner position="tl" delay={0.8} reduced={shouldReduceMotion} />
          <ReticleCorner position="tr" delay={0.85} reduced={shouldReduceMotion} />
          <ReticleCorner position="bl" delay={0.9} reduced={shouldReduceMotion} />
          <ReticleCorner position="br" delay={0.95} reduced={shouldReduceMotion} />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5"
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

      {/* ── Video frame — starts below copy, extends below fold ────────── */}
      <motion.div
        className="relative mx-6 sm:mx-8 lg:mx-12 overflow-hidden rounded-t-2xl"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={stagger(4)}
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        {/* aspect-video preserves the full frame — no content is cropped */}
        <video
          ref={videoRef}
          autoPlay muted loop playsInline preload="auto"
          className="w-full aspect-video object-cover"
        >
          <source src="/videos/hero-video.mov" type="video/mp4" />
        </video>

        {/* Top gradient — long, gradual fade from page bg into video */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: "55%",
            background: "linear-gradient(to bottom, #0a0a0b 0%, rgba(10,10,11,0.85) 20%, rgba(10,10,11,0.5) 45%, rgba(10,10,11,0.15) 72%, transparent 100%)",
          }}
        />

        {/* Bottom gradient — fades into the next section */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "30%",
            background: "linear-gradient(to bottom, transparent 0%, rgba(10,10,11,0.7) 70%, #0a0a0b 100%)",
          }}
        />

        {/* Side fades — softens left/right edges */}
        <div
          className="absolute inset-y-0 left-0 w-16 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(10,10,11,0.35), transparent)" }}
        />
        <div
          className="absolute inset-y-0 right-0 w-16 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(10,10,11,0.35), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
