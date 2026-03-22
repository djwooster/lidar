"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { fadeUp } from "@/lib/motion";

function Label({
  x, y, text, side = "right",
}: {
  x: number; y: number; text: string; side?: "left" | "right";
}) {
  const lineLength = 38;
  const lineEndX = side === "right" ? x + lineLength : x - lineLength;
  const textX = side === "right" ? lineEndX + 5 : lineEndX - 5;

  return (
    <g aria-label={text}>
      <circle cx={x} cy={y} r="2" fill="#22d3ee" opacity="0.7" />
      <line x1={x} y1={y} x2={lineEndX} y2={y} stroke="#22d3ee" strokeWidth="0.75" opacity="0.35" strokeDasharray="3 2" />
      <text
        x={textX} y={y}
        dominantBaseline="middle"
        textAnchor={side === "right" ? "start" : "end"}
        fontSize="8"
        fontFamily="var(--font-geist-mono), monospace"
        fill="#22d3ee"
        opacity="0.6"
      >
        {text}
      </text>
    </g>
  );
}

export default function SeeThrough() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [isRevealed, setIsRevealed] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  const svgRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(svgRef, { once: true, margin: "-60px" });

  const layerDelay = (i: number) => (shouldReduceMotion ? 0 : i * 0.3);

  return (
    <section
      className="bg-[#0a0a0b] py-28 px-8 border-t border-white/[0.05]"
      aria-labelledby="see-through-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left: Text ──────────────────────────────────────── */}
          <motion.div {...fadeUp(shouldReduceMotion)}>
            <p className="font-mono text-[12px] text-white/35 tracking-[0.22em] uppercase mb-4">
              X-ray view
            </p>
            <h2
              id="see-through-heading"
              className="font-medium text-white mb-6 leading-[1.08] tracking-tight" style={{ fontSize: "clamp(22px, 5.5vw, 36px)" }}
            >
              See everything behind the walls.
            </h2>
            <p className="text-[#6b6b6b] text-base leading-relaxed mb-8 max-w-md">
              Our millimeter-accurate LiDAR scans capture the exact position of
              every system before drywall goes up — so any future contractor can
              work with precision, not guesswork.
            </p>
            <div className="flex flex-col gap-3.5">
              {[
                "Exact pipe and wire locations — no guessing where to cut",
                "Every duct run, access panel, and blocking documented",
                "Share with contractors via link — no login required",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-px h-4 bg-white/15 mt-0.5 shrink-0" aria-hidden="true" />
                  <p className="text-[#6b6b6b] text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <p className="font-mono text-[9px] text-white/15 mt-10 tracking-[0.2em]">
              {isTouchDevice ? "tap illustration to reveal hidden systems" : "hover illustration to reveal hidden systems"}
            </p>
          </motion.div>

          {/* ── Right: SVG Wall Illustration ─────────────────────── */}
          <motion.div className="relative" {...fadeUp(shouldReduceMotion, 0.15)}>
            <div
              ref={svgRef}
              className="relative rounded-2xl border border-white/[0.07] bg-[#0d0d0f] overflow-hidden cursor-crosshair"
              onMouseEnter={() => !isTouchDevice && setIsRevealed(true)}
              onMouseLeave={() => !isTouchDevice && setIsRevealed(false)}
              onTouchStart={() => setIsRevealed(v => !v)}
              onFocus={() => setIsRevealed(true)}
              onBlur={() => setIsRevealed(false)}
              tabIndex={0}
              role="img"
              aria-label="Interactive wall cross-section — tap or hover to reveal hidden MEP systems"
            >
              <svg viewBox="0 0 520 360" className="w-full h-auto" aria-hidden="true">
                <rect width="520" height="360" fill="#0d0d0f" />

                {/* ── Layer 1: Framing ───────────────────────────── */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: layerDelay(0) }}
                >
                  <rect x="30" y="20" width="460" height="24" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" rx="1" />
                  <text x="240" y="36" fontSize="7" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontFamily="var(--font-geist-mono),monospace">TOP PLATE</text>
                  <rect x="30" y="44" width="26" height="266" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" rx="1" />
                  <rect x="464" y="44" width="26" height="266" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" rx="1" />
                  <rect x="247" y="44" width="26" height="266" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" rx="1" />
                  <rect x="30" y="310" width="460" height="24" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" rx="1" />
                  <text x="240" y="326" fontSize="7" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontFamily="var(--font-geist-mono),monospace">BOTTOM PLATE</text>
                </motion.g>

                {/* ── Layer 2: MEP Systems ────────────────────────── */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: layerDelay(1) }}
                >
                  {/* HVAC Duct — left cavity */}
                  <rect x="76" y="60" width="155" height="50" fill="rgba(34,211,238,0.04)" stroke="#22d3ee" strokeWidth="1" rx="2" opacity="0.8" />
                  {[108, 138, 168, 198].map(x => (
                    <line key={x} x1={x} y1="60" x2={x} y2="110" stroke="#22d3ee" strokeWidth="0.4" opacity="0.2" />
                  ))}
                  {/* HVAC Duct — right cavity */}
                  <rect x="289" y="60" width="155" height="50" fill="rgba(34,211,238,0.04)" stroke="#22d3ee" strokeWidth="1" rx="2" opacity="0.8" />
                  {[321, 351, 381, 411].map(x => (
                    <line key={x} x1={x} y1="60" x2={x} y2="110" stroke="#22d3ee" strokeWidth="0.4" opacity="0.2" />
                  ))}

                  {/* PEX Water Lines */}
                  <line x1="76" y1="155" x2="231" y2="155" stroke="#22d3ee" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
                  <line x1="76" y1="155" x2="231" y2="155" stroke="#0d0d0f" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                  <line x1="76" y1="169" x2="231" y2="169" stroke="#22d3ee" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
                  <line x1="76" y1="169" x2="231" y2="169" stroke="#0d0d0f" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

                  {/* Romex 14/2 — both cavities */}
                  <line x1="76" y1="220" x2="231" y2="220" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
                  {[108, 158, 208].map(x => (
                    <rect key={x} x={x} y="217" width="3" height="6" fill="none" stroke="#22d3ee" strokeWidth="0.8" opacity="0.4" rx="0.5" />
                  ))}
                  <line x1="289" y1="220" x2="444" y2="220" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
                  {[321, 371, 421].map(x => (
                    <rect key={x} x={x} y="217" width="3" height="6" fill="none" stroke="#22d3ee" strokeWidth="0.8" opacity="0.4" rx="0.5" />
                  ))}

                  {/* Blocking 2x6 */}
                  <rect x="30" y="272" width="460" height="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 2" rx="1" />

                  {/* Labels */}
                  <Label x={158} y={85} text="HVAC DUCT" side="right" />
                  <Label x={76} y={155} text="PEX HOT" side="left" />
                  <Label x={76} y={169} text="PEX COLD" side="left" />
                  <Label x={444} y={220} text="14/2 ROMEX" side="right" />
                  <Label x={490} y={280} text="BLOCKING: 2×6" side="right" />
                </motion.g>

                {/* ── Layer 3: Drywall Overlay ─────────────────────── */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isRevealed ? 0 : (isInView ? 0.14 : 0) }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: isRevealed ? 0.35 : 0.8, delay: isRevealed ? 0 : layerDelay(2), ease: "easeInOut" }}
                  style={{ willChange: "opacity" }}
                >
                  <rect x="30" y="20" width="460" height="314" fill="#8a8a8a" rx="1" />
                  <line x1="30" y1="177" x2="490" y2="177" stroke="#0d0d0f" strokeWidth="0.5" opacity="0.5" />
                  <text x="240" y="172" fontSize="8" textAnchor="middle" fill="#0d0d0f" opacity="0.35" fontFamily="var(--font-geist-mono),monospace">½″ DRYWALL</text>
                </motion.g>

                {/* Hover/tap hint */}
                <motion.text
                  x="240" y="350" fontSize="7.5" textAnchor="middle"
                  fill="rgba(255,255,255,0.15)"
                  fontFamily="var(--font-geist-mono),monospace"
                  animate={{ opacity: isRevealed ? 0 : 1 }}
                  transition={{ duration: 0.25 }}
                >
                  {isTouchDevice ? "TAP TO REVEAL SYSTEMS" : "HOVER TO REVEAL SYSTEMS"}
                </motion.text>
              </svg>
            </div>

            {/* Status badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#0a0a0b]/90 border border-white/[0.08] rounded px-2.5 py-1.5">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]"
                animate={shouldReduceMotion ? {} : { opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                aria-hidden="true"
              />
              <span className="font-mono text-[8px] text-white/30 tracking-widest">SCAN ACTIVE</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
