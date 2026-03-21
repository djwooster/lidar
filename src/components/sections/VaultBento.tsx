"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView, animate } from "framer-motion";
import { ScanLine, LayoutDashboard, HardHat, CalendarX2, Cloud, RefreshCw } from "lucide-react";

// Animated measurement counter
function MeasurementCounter({ inView }: { inView: boolean }) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [value, setValue] = useState(1.2);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    if (shouldReduceMotion) {
      setValue(1.0);
      return;
    }

    // Animate 1.2 → 1.0 → 1.0 (final)
    const controls = animate(1.2, 1.0, {
      duration: 1.4,
      delay: 0.3,
      ease: "easeOut",
      onUpdate: (v) => setValue(parseFloat(v.toFixed(2))),
    });

    return () => controls.stop();
  }, [inView, shouldReduceMotion]);

  return (
    <div className="flex items-end gap-1 mt-4 mb-2">
      <motion.span
        className="font-mono text-4xl font-bold text-[#22d3ee] tabular-nums"
        style={{ willChange: "transform" }}
      >
        {value.toFixed(1)}
      </motion.span>
      <span className="font-mono text-lg text-[#22d3ee]/60 mb-1">mm</span>
    </div>
  );
}

// Animated measurement line
function MeasurementLine({ inView }: { inView: boolean }) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <div className="flex items-center gap-2 mt-3">
      <div className="w-px h-3 bg-[#22d3ee]/40" />
      <motion.div
        className="h-px bg-[#22d3ee]"
        initial={{ width: 0 }}
        animate={inView ? { width: "100%" } : { width: 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 1.0, delay: 0.5, ease: "easeOut" }
        }
        style={{ willChange: "transform", flex: 1 }}
        aria-hidden="true"
      />
      <div className="w-px h-3 bg-[#22d3ee]/40" />
    </div>
  );
}

// Cloud sync animation
function CloudSyncIcon() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <div className="relative flex items-center justify-center w-10 h-10">
      <Cloud className="w-7 h-7 text-[#22d3ee]" aria-hidden="true" />
      <motion.div
        className="absolute"
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        <RefreshCw className="w-3 h-3 text-[#22d3ee]/50" />
      </motion.div>
    </div>
  );
}

// Avatar stack
function AvatarStack() {
  const initials = ["JM", "SR", "KT"];
  const colors = ["bg-slate-600", "bg-slate-500", "bg-slate-700"];

  return (
    <div className="flex items-center mt-4" aria-label="Three contractors with access">
      {initials.map((init, i) => (
        <div
          key={init}
          className={`w-8 h-8 rounded-full ${colors[i]} border-2 border-[#1a2540] flex items-center justify-center text-[10px] font-bold text-slate-300 ${i > 0 ? "-ml-2" : ""}`}
          title={`Contractor ${init}`}
          aria-label={`Contractor ${init}`}
        >
          {init}
        </div>
      ))}
      <span className="ml-3 font-mono text-[10px] text-[#94a3b8]">
        + any contractor you share with
      </span>
    </div>
  );
}

export default function VaultBento() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 },
    },
  };

  const cardVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#0f172a] py-24 px-6"
      aria-labelledby="vault-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <p className="font-mono text-[#22d3ee] text-xs tracking-widest mb-3">
            // THE VAULT
          </p>
          <h2
            id="vault-heading"
            className="text-3xl sm:text-4xl font-bold text-white"
          >
            Everything Captured.{" "}
            <span className="text-[#22d3ee]">Stored Forever.</span>
          </h2>
        </motion.div>

        {/* Bento grid: 1-col mobile, 2-col tablet/desktop */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Card 1 — 1mm Precision */}
          <motion.div
            className="relative rounded-2xl overflow-hidden p-7 flex flex-col"
            variants={cardVariants}
            style={{
              willChange: "transform",
              background: "rgba(15,23,42,0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(34,211,238,0.15)",
              borderTop: "2px solid #22d3ee",
            }}
            whileHover={
              shouldReduceMotion
                ? {}
                : { y: -4, transition: { duration: 0.2 } }
            }
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#22d3ee]/10 flex items-center justify-center">
                <ScanLine className="w-5 h-5 text-[#22d3ee]" aria-hidden="true" />
              </div>
              <span className="font-mono text-[10px] text-[#22d3ee] tracking-widest">
                // ACCURACY
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">1mm Precision</h3>
            <p className="text-[#94a3b8] text-sm leading-relaxed mt-2">
              Professional-grade LiDAR captures spatial data at sub-millimeter
              accuracy. Every system documented to within a hair's width of its
              true position.
            </p>

            <MeasurementCounter inView={isInView} />
            <MeasurementLine inView={isInView} />
            <p className="font-mono text-[9px] text-[#94a3b8]/50 mt-2 tracking-wider">
              SCAN RESOLUTION — POINT CLOUD DENSITY: 1PT/MM²
            </p>
          </motion.div>

          {/* Card 2 — Cloud Access for Life */}
          <motion.div
            className="relative rounded-2xl overflow-hidden p-7 flex flex-col"
            variants={cardVariants}
            style={{
              willChange: "transform",
              background: "rgba(15,23,42,0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(34,211,238,0.15)",
              borderTop: "2px solid #22d3ee",
            }}
            whileHover={
              shouldReduceMotion
                ? {}
                : { y: -4, transition: { duration: 0.2 } }
            }
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#22d3ee]/10 flex items-center justify-center">
                <CloudSyncIcon />
              </div>
              <span className="font-mono text-[10px] text-[#22d3ee] tracking-widest">
                // CLOUD VAULT
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">Cloud Access for Life</h3>
            <p className="text-[#94a3b8] text-sm leading-relaxed mt-2">
              Your scan lives in a permanent, secure cloud vault. Access it from
              any device, at any time.
            </p>

            <div className="mt-4 p-3.5 rounded-lg bg-[#22d3ee]/5 border border-[#22d3ee]/10">
              <p className="text-[#94a3b8] text-sm leading-relaxed">
                <span className="text-white font-semibold">
                  When you sell, your buyer gets the file.
                </span>{" "}
                The blueprint outlives the build — and transfers with the deed.
              </p>
            </div>

            <div className="flex items-center gap-2 mt-5">
              <LayoutDashboard
                className="w-4 h-4 text-[#22d3ee]/50"
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] text-[#94a3b8]/60 tracking-wider">
                BROWSER · iOS · ANDROID · API ACCESS
              </span>
            </div>
          </motion.div>

          {/* Card 3 — Contractor Collaboration */}
          <motion.div
            className="relative rounded-2xl overflow-hidden p-7 flex flex-col"
            variants={cardVariants}
            style={{
              willChange: "transform",
              background: "rgba(15,23,42,0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(34,211,238,0.15)",
              borderTop: "2px solid #22d3ee",
            }}
            whileHover={
              shouldReduceMotion
                ? {}
                : { y: -4, transition: { duration: 0.2 } }
            }
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#22d3ee]/10 flex items-center justify-center">
                <HardHat className="w-5 h-5 text-[#22d3ee]" aria-hidden="true" />
              </div>
              <span className="font-mono text-[10px] text-[#22d3ee] tracking-widest">
                // COLLABORATION
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">
              Contractor Collaboration
            </h3>
            <p className="text-[#94a3b8] text-sm leading-relaxed mt-2">
              Share your scan with any contractor via a single link — no login
              required on their end. They open it in the browser, see exactly
              what's in the wall, and get to work.
            </p>

            <AvatarStack />

            <div className="mt-4 flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]"
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] text-[#94a3b8]/70 tracking-wider">
                SHAREABLE LINK · READ-ONLY · INSTANT ACCESS
              </span>
            </div>
          </motion.div>

          {/* Card 4 — Pre-Drywall Only (URGENCY — orange accent) */}
          <motion.div
            className="relative rounded-2xl overflow-hidden p-7 flex flex-col"
            variants={cardVariants}
            style={{
              willChange: "transform",
              background: "rgba(15,23,42,0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(249,115,22,0.2)",
              borderTop: "2px solid #f97316",
            }}
            whileHover={
              shouldReduceMotion
                ? {}
                : { y: -4, transition: { duration: 0.2 } }
            }
          >
            {/* Orange corner glow */}
            <div
              className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at top right, rgba(249,115,22,0.08) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#f97316]/10 flex items-center justify-center">
                <CalendarX2
                  className="w-5 h-5 text-[#f97316]"
                  aria-hidden="true"
                />
              </div>
              <span className="font-mono text-[10px] text-[#f97316] tracking-widest">
                // TIME-SENSITIVE
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">
              Pre-Drywall Only Window
            </h3>
            <p className="text-[#94a3b8] text-sm leading-relaxed mt-2">
              There is exactly one opportunity to capture what&apos;s inside
              your walls.{" "}
              <span className="text-white">
                It closes the moment insulation goes in.
              </span>
            </p>

            <div className="mt-5 p-3.5 rounded-lg bg-[#f97316]/8 border border-[#f97316]/15">
              <p className="font-mono text-xs text-[#f97316] leading-relaxed">
                // Once drywall is up, the systems behind it are invisible —
                and unknowable — forever.
              </p>
            </div>

            <div className="mt-auto pt-5">
              <a
                href="#book"
                className="inline-flex items-center justify-center w-full py-3 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-bold text-sm rounded-lg transition-colors duration-200"
                aria-label="Book your pre-drywall scan now"
              >
                Book Before Your Window Closes
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
