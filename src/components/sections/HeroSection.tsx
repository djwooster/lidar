"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Corner bracket reticle — four L-shaped brackets that converge inward on load
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
  const size = 28;
  const thickness = 2;

  const positionClasses = {
    tl: "top-0 left-0",
    tr: "top-0 right-0",
    bl: "bottom-0 left-0",
    br: "bottom-0 right-0",
  }[position];

  const initialOffset = reduced ? 0 : 16;

  return (
    <motion.div
      className={`absolute ${positionClasses}`}
      style={{ willChange: "transform" }}
      initial={
        reduced
          ? { opacity: 1, x: 0, y: 0 }
          : {
              opacity: 0,
              x: isLeft ? -initialOffset : initialOffset,
              y: isTop ? -initialOffset : initialOffset,
            }
      }
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={
        reduced
          ? { duration: 0 }
          : {
              duration: 0.7,
              delay,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }
      }
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        aria-hidden="true"
      >
        {/* Horizontal arm */}
        <rect
          x={isLeft ? 0 : size - size * 0.55}
          y={isTop ? 0 : size - thickness}
          width={size * 0.55}
          height={thickness}
          fill="#22d3ee"
        />
        {/* Vertical arm */}
        <rect
          x={isLeft ? 0 : size - thickness}
          y={isTop ? 0 : size - size * 0.55}
          width={thickness}
          height={size * 0.55}
          fill="#22d3ee"
        />
      </svg>
    </motion.div>
  );
}

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // autoplay blocked — silent fail
      });
    }
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0f172a]"
      aria-label="Hero — Blueprint LiDAR pre-drywall scanning service"
    >
      {/* ── Video background ────────────────────────────────────── */}
      {/* DROP KLING VIDEO FILE HERE: /public/videos/hero-scan.mp4  */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        aria-hidden="true"
      >
        <source src="/videos/hero-scan.mp4" type="video/mp4" />
      </video>

      {/* Radial gradient overlay — fades video to #0f172a on all edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, #0f172a 75%)",
        }}
        aria-hidden="true"
      />

      {/* Edge fade reinforcement */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, #0f172a 0%, transparent 15%, transparent 85%, #0f172a 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6">

        {/* Reticle brackets around the content block */}
        <div className="absolute inset-[-24px] pointer-events-none" aria-hidden="true">
          <ReticleCorner position="tl" delay={0.2} reduced={shouldReduceMotion} />
          <ReticleCorner position="tr" delay={0.25} reduced={shouldReduceMotion} />
          <ReticleCorner position="bl" delay={0.3} reduced={shouldReduceMotion} />
          <ReticleCorner position="br" delay={0.35} reduced={shouldReduceMotion} />

          {/* Pulse ring after brackets settle */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute inset-0 border border-[#22d3ee]/20 rounded-sm"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: [0, 0.6, 0], scale: [1.05, 1.0, 0.98] }}
              transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
              style={{ willChange: "transform, opacity" }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Eyebrow */}
        <motion.p
          className="font-mono text-[#22d3ee] text-xs tracking-widest uppercase"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.5 }}
          style={{ willChange: "transform" }}
        >
          // PRE-DRYWALL SCANNING SERVICE
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{ willChange: "transform" }}
        >
          Your Walls Close Once.
          <br />
          <span className="text-[#f97316]">Capture Everything</span> Before They Do.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-[#94a3b8] text-lg sm:text-xl max-w-2xl leading-relaxed"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.8 }}
          style={{ willChange: "transform" }}
        >
          We scan your home during framing to create a permanent digital record
          of every pipe, wire, and duct — accessible forever.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-4"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.95 }}
          style={{ willChange: "transform" }}
        >
          <a
            href="#book"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-bold text-base rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#f97316] focus-visible:outline-offset-2"
            aria-label="Book your pre-drywall scan"
          >
            Book Your Pre-Drywall Scan
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center px-8 py-4 border border-[#94a3b8]/40 hover:border-[#22d3ee]/60 text-[#94a3b8] hover:text-[#22d3ee] font-semibold text-base rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#22d3ee] focus-visible:outline-offset-2"
            aria-label="See how Blueprint LiDAR works"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Scanning indicator */}
        <motion.div
          className="flex items-center gap-2 mt-6"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 1.3 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-[#f97316]"
            animate={shouldReduceMotion ? {} : { opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <span className="font-mono text-[10px] text-[#94a3b8] tracking-widest uppercase">
            // SCAN READY
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { delay: 1.5, duration: 0.5 }}
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] text-[#94a3b8]/50 tracking-widest">SCROLL</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-[#94a3b8]/30 to-transparent"
          animate={shouldReduceMotion ? {} : { scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
        />
      </motion.div>
    </section>
  );
}
