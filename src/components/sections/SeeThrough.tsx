"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Label callout for SVG elements
function Label({
  x,
  y,
  text,
  side = "right",
}: {
  x: number;
  y: number;
  text: string;
  side?: "left" | "right";
}) {
  const lineLength = 40;
  const lineEndX = side === "right" ? x + lineLength : x - lineLength;
  const textAnchor = side === "right" ? "start" : "end";
  const textX = side === "right" ? lineEndX + 6 : lineEndX - 6;

  return (
    <g aria-label={text}>
      {/* Connector dot */}
      <circle cx={x} cy={y} r="2.5" fill="#22d3ee" />
      {/* Connector line */}
      <line
        x1={x}
        y1={y}
        x2={lineEndX}
        y2={y}
        stroke="#22d3ee"
        strokeWidth="1"
        strokeDasharray="3 2"
        opacity="0.7"
      />
      {/* Label text */}
      <text
        x={textX}
        y={y}
        dominantBaseline="middle"
        textAnchor={textAnchor}
        fontSize="9"
        fontFamily="var(--font-geist-mono), monospace"
        fill="#22d3ee"
        opacity="0.9"
      >
        {text}
      </text>
    </g>
  );
}

export default function SeeThrough() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [isDrywallHovered, setIsDrywallHovered] = useState(false);

  // Animation delays for each layer
  const getDelay = (index: number) =>
    shouldReduceMotion ? 0 : index * 0.25;

  const layerVariant = (delay: number) => ({
    hidden: shouldReduceMotion ? { opacity: 1, pathLength: 1 } : { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, delay },
    },
  });

  return (
    <section
      className="bg-[#080e1c] py-24 px-6 overflow-hidden"
      aria-labelledby="see-through-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Text ─────────────────────────────────────── */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            style={{ willChange: "transform" }}
          >
            <p className="font-mono text-[#22d3ee] text-xs tracking-widest mb-4">
              // X-RAY VIEW
            </p>
            <h2
              id="see-through-heading"
              className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight"
            >
              See Everything{" "}
              <span className="text-[#22d3ee]">Behind the Walls</span>
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-8">
              Our millimeter-accurate LiDAR scans capture the exact position of
              every system before drywall goes up — so any future contractor can
              work with precision, not guesswork.
            </p>
            <div className="flex flex-col gap-3">
              {[
                "Exact pipe and wire locations — no more guessing where to cut",
                "Every duct run, access panel, and blocking documented",
                "Shared with contractors via link — no login required",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] mt-2 shrink-0"
                    aria-hidden="true"
                  />
                  <p className="text-[#94a3b8] text-sm leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Hover hint */}
            <p className="font-mono text-[10px] text-[#94a3b8]/50 mt-8 tracking-widest">
              // HOVER THE WALL TO PEEL BACK DRYWALL →
            </p>
          </motion.div>

          {/* ── Right: SVG Wall Illustration ───────────────────── */}
          <motion.div
            className="relative"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            style={{ willChange: "transform" }}
          >
            {/* Glow effect behind SVG */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(34,211,238,0.06) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            {/* Wall illustration */}
            <div
              className="relative rounded-2xl border border-[#22d3ee]/10 bg-[#0a111f] overflow-hidden cursor-crosshair"
              onMouseEnter={() => setIsDrywallHovered(true)}
              onMouseLeave={() => setIsDrywallHovered(false)}
              onFocus={() => setIsDrywallHovered(true)}
              onBlur={() => setIsDrywallHovered(false)}
              tabIndex={0}
              role="img"
              aria-label="Interactive wall cross-section — hover to reveal hidden MEP systems"
            >
              <svg
                viewBox="0 0 520 360"
                className="w-full h-auto"
                aria-hidden="true"
              >
                {/* Background */}
                <rect width="520" height="360" fill="#080e1c" />

                {/* ── Layer 1: Framing Studs ──────────────────── */}
                <motion.g
                  variants={layerVariant(getDelay(0))}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {/* Top plate */}
                  <rect
                    x="30"
                    y="20"
                    width="460"
                    height="28"
                    fill="rgba(148,163,184,0.06)"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    rx="1"
                  />
                  <text x="240" y="38" fontSize="8" textAnchor="middle" fill="#94a3b8" opacity="0.5" fontFamily="var(--font-geist-mono),monospace">
                    TOP PLATE
                  </text>

                  {/* Left stud */}
                  <rect
                    x="30"
                    y="48"
                    width="28"
                    height="270"
                    fill="rgba(148,163,184,0.06)"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    rx="1"
                  />

                  {/* Right stud */}
                  <rect
                    x="462"
                    y="48"
                    width="28"
                    height="270"
                    fill="rgba(148,163,184,0.06)"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    rx="1"
                  />

                  {/* Center stud */}
                  <rect
                    x="246"
                    y="48"
                    width="28"
                    height="270"
                    fill="rgba(148,163,184,0.06)"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    rx="1"
                  />

                  {/* Bottom plate */}
                  <rect
                    x="30"
                    y="318"
                    width="460"
                    height="28"
                    fill="rgba(148,163,184,0.06)"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    rx="1"
                  />
                  <text x="240" y="336" fontSize="8" textAnchor="middle" fill="#94a3b8" opacity="0.5" fontFamily="var(--font-geist-mono),monospace">
                    BOTTOM PLATE
                  </text>
                </motion.g>

                {/* ── Layer 2: MEP Systems ────────────────────── */}
                <motion.g
                  variants={layerVariant(getDelay(1))}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {/* HVAC Duct */}
                  <rect
                    x="78"
                    y="65"
                    width="160"
                    height="48"
                    fill="rgba(34,211,238,0.06)"
                    stroke="#22d3ee"
                    strokeWidth="1.5"
                    rx="2"
                  />
                  {/* Duct crosshatch lines */}
                  <line x1="110" y1="65" x2="110" y2="113" stroke="#22d3ee" strokeWidth="0.5" opacity="0.3" />
                  <line x1="142" y1="65" x2="142" y2="113" stroke="#22d3ee" strokeWidth="0.5" opacity="0.3" />
                  <line x1="174" y1="65" x2="174" y2="113" stroke="#22d3ee" strokeWidth="0.5" opacity="0.3" />
                  <line x1="206" y1="65" x2="206" y2="113" stroke="#22d3ee" strokeWidth="0.5" opacity="0.3" />

                  {/* HVAC Duct — right cavity */}
                  <rect
                    x="284"
                    y="65"
                    width="160"
                    height="48"
                    fill="rgba(34,211,238,0.06)"
                    stroke="#22d3ee"
                    strokeWidth="1.5"
                    rx="2"
                  />
                  <line x1="316" y1="65" x2="316" y2="113" stroke="#22d3ee" strokeWidth="0.5" opacity="0.3" />
                  <line x1="348" y1="65" x2="348" y2="113" stroke="#22d3ee" strokeWidth="0.5" opacity="0.3" />
                  <line x1="380" y1="65" x2="380" y2="113" stroke="#22d3ee" strokeWidth="0.5" opacity="0.3" />
                  <line x1="412" y1="65" x2="412" y2="113" stroke="#22d3ee" strokeWidth="0.5" opacity="0.3" />

                  {/* PEX Water Lines — two parallel pipes left cavity */}
                  {/* Hot line */}
                  <line
                    x1="78"
                    y1="158"
                    x2="238"
                    y2="158"
                    stroke="#22d3ee"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                  <line
                    x1="78"
                    y1="158"
                    x2="238"
                    y2="158"
                    stroke="#080e1c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  {/* Cold line */}
                  <line
                    x1="78"
                    y1="172"
                    x2="238"
                    y2="172"
                    stroke="#22d3ee"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                  <line
                    x1="78"
                    y1="172"
                    x2="238"
                    y2="172"
                    stroke="#080e1c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.6"
                  />

                  {/* Romex 14/2 Wiring */}
                  <line
                    x1="78"
                    y1="224"
                    x2="238"
                    y2="224"
                    stroke="#22d3ee"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                  {/* Wire staples */}
                  <rect x="110" y="220" width="4" height="8" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.5" rx="0.5" />
                  <rect x="160" y="220" width="4" height="8" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.5" rx="0.5" />
                  <rect x="210" y="220" width="4" height="8" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.5" rx="0.5" />

                  {/* Romex — right cavity */}
                  <line
                    x1="284"
                    y1="224"
                    x2="444"
                    y2="224"
                    stroke="#22d3ee"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                  <rect x="316" y="220" width="4" height="8" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.5" rx="0.5" />
                  <rect x="366" y="220" width="4" height="8" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.5" rx="0.5" />
                  <rect x="416" y="220" width="4" height="8" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.5" rx="0.5" />

                  {/* Blocking 2x6 */}
                  <rect
                    x="30"
                    y="278"
                    width="460"
                    height="18"
                    fill="rgba(148,163,184,0.08)"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    rx="1"
                  />

                  {/* Label callouts */}
                  <Label x={158} y={89} text="HVAC DUCT" side="right" />
                  <Label x={78} y={158} text="PEX HOT" side="left" />
                  <Label x={78} y={172} text="PEX COLD" side="left" />
                  <Label x={444} y={224} text="14/2 ROMEX" side="right" />
                  <Label x={490} y={287} text="BLOCKING: 2x6" side="right" />
                </motion.g>

                {/* ── Layer 3: Drywall Overlay ─────────────────── */}
                <motion.g
                  animate={{
                    opacity: isDrywallHovered
                      ? 0
                      : shouldReduceMotion
                      ? 0.18
                      : undefined,
                  }}
                  variants={
                    shouldReduceMotion
                      ? undefined
                      : {
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 0.18,
                            transition: { duration: 0.7, delay: getDelay(2) },
                          },
                        }
                  }
                  initial={shouldReduceMotion ? { opacity: 0.18 } : "hidden"}
                  whileInView={shouldReduceMotion ? undefined : "visible"}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{ willChange: "opacity" }}
                >
                  <rect
                    x="30"
                    y="20"
                    width="460"
                    height="326"
                    fill="#94a3b8"
                    rx="2"
                  />
                  {/* Drywall texture lines */}
                  <line x1="30" y1="183" x2="490" y2="183" stroke="#0f172a" strokeWidth="1" opacity="0.3" />
                  <text
                    x="240"
                    y="178"
                    fontSize="9"
                    textAnchor="middle"
                    fill="#0f172a"
                    opacity="0.4"
                    fontFamily="var(--font-geist-mono),monospace"
                  >
                    ½" DRYWALL
                  </text>
                </motion.g>

                {/* Hover prompt */}
                <motion.text
                  x="240"
                  y="350"
                  fontSize="8"
                  textAnchor="middle"
                  fill="#22d3ee"
                  opacity="0.4"
                  fontFamily="var(--font-geist-mono),monospace"
                  animate={{ opacity: isDrywallHovered ? 0 : 0.4 }}
                  transition={{ duration: 0.3 }}
                >
                  HOVER TO REVEAL →
                </motion.text>
              </svg>
            </div>

            {/* Scan indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#0f172a]/90 border border-[#22d3ee]/20 rounded px-2.5 py-1.5">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]"
                animate={shouldReduceMotion ? {} : { opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                aria-hidden="true"
              />
              <span className="font-mono text-[9px] text-[#22d3ee] tracking-widest">
                SCAN ACTIVE
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
