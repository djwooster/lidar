"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView, animate } from "framer-motion";
import { ScanLine, LayoutDashboard, HardHat, CalendarX2, Cloud, RefreshCw } from "lucide-react";

function MeasurementCounter({ inView }: { inView: boolean }) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [value, setValue] = useState(1.2);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;
    if (shouldReduceMotion) { setValue(1.0); return; }
    const ctrl = animate(1.2, 1.0, {
      duration: 1.4, delay: 0.3, ease: "easeOut",
      onUpdate: (v) => setValue(parseFloat(v.toFixed(2))),
    });
    return () => ctrl.stop();
  }, [inView, shouldReduceMotion]);

  return (
    <div className="flex items-end gap-1 mt-5 mb-2">
      <span className="font-mono text-3xl font-bold text-white tabular-nums">{value.toFixed(1)}</span>
      <span className="font-mono text-sm text-white/25 mb-1">mm</span>
    </div>
  );
}

function MeasurementLine({ inView }: { inView: boolean }) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="w-px h-2.5 bg-white/15" />
      <motion.div
        className="h-px bg-white/15"
        initial={{ width: 0 }}
        animate={inView ? { width: "100%" } : { width: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.2, delay: 0.5 }}
        style={{ willChange: "transform", flex: 1 }}
        aria-hidden="true"
      />
      <div className="w-px h-2.5 bg-white/15" />
    </div>
  );
}

function CloudSyncIcon() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  return (
    <div className="relative w-9 h-9 flex items-center justify-center">
      <Cloud className="w-5 h-5 text-white/40" aria-hidden="true" />
      <motion.div
        className="absolute"
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        <RefreshCw className="w-2.5 h-2.5 text-white/20" />
      </motion.div>
    </div>
  );
}

function AvatarStack() {
  const initials = ["JM", "SR", "KT"];
  return (
    <div className="flex items-center mt-5" aria-label="Contractors with access">
      {initials.map((init, i) => (
        <div
          key={init}
          className={`w-7 h-7 rounded-full bg-[#1e1e20] border border-white/10 flex items-center justify-center text-[9px] font-bold text-white/40 ${i > 0 ? "-ml-2" : ""}`}
          title={`Contractor ${init}`}
        >
          {init}
        </div>
      ))}
      <span className="ml-3 text-[11px] text-[#6b6b6b]">+ any contractor you share with</span>
    </div>
  );
}

const cardBase = "bg-[#111113] rounded-2xl border border-white/[0.07] p-7 flex flex-col";

export default function VaultBento() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const fadeUp = (delay: number) =>
    shouldReduceMotion
      ? { initial: { opacity: 1 }, whileInView: { opacity: 1 }, transition: { duration: 0 } }
      : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay } };

  return (
    <section
      ref={sectionRef}
      className="bg-[#0a0a0b] py-28 px-8 border-t border-white/[0.05]"
      aria-labelledby="vault-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <p className="font-mono text-[12px] text-white/35 tracking-[0.22em] uppercase mb-4">
            The Vault
          </p>
          <h2
            id="vault-heading"
            className="font-medium text-white tracking-tight leading-[1.08] max-w-xl" style={{ fontSize: "clamp(22px, 5.5vw, 36px)" }}
          >
            Everything captured.{" "}
            <span className="text-white/35">Stored forever.</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {/* Card 1 — Precision */}
          <motion.div
            className={cardBase}
            viewport={{ once: true }}
            {...fadeUp(0)}
            style={{ willChange: "transform" }}
            whileHover={shouldReduceMotion ? {} : { y: -2, transition: { duration: 0.15 } }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center">
                <ScanLine className="w-4 h-4 text-white/40" aria-hidden="true" />
              </div>
              <p className="font-mono text-[11px] text-white/35 tracking-[0.2em] uppercase">Accuracy</p>
            </div>
            <h3 className="text-xl font-semibold text-white leading-snug">1mm Precision</h3>
            <p className="text-[#6b6b6b] text-sm leading-relaxed mt-2">
              Professional-grade LiDAR captures spatial data at sub-millimeter accuracy. Every system documented to within a hair&apos;s width of its true position.
            </p>
            <MeasurementCounter inView={isInView} />
            <MeasurementLine inView={isInView} />
            <p className="font-mono text-[8px] text-white/15 mt-2 tracking-wider">
              RESOLUTION — 1 PT/MM² DENSITY
            </p>
          </motion.div>

          {/* Card 2 — Cloud */}
          <motion.div
            className={cardBase}
            viewport={{ once: true }}
            {...fadeUp(0.08)}
            style={{ willChange: "transform" }}
            whileHover={shouldReduceMotion ? {} : { y: -2, transition: { duration: 0.15 } }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center">
                <CloudSyncIcon />
              </div>
              <p className="font-mono text-[11px] text-white/35 tracking-[0.2em] uppercase">Cloud Vault</p>
            </div>
            <h3 className="text-xl font-semibold text-white leading-snug">Cloud Access for Life</h3>
            <p className="text-[#6b6b6b] text-sm leading-relaxed mt-2">
              Your scan lives in a permanent, secure cloud vault. Access it from any device, at any time.
            </p>
            <div className="mt-5 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <p className="text-[#6b6b6b] text-sm leading-relaxed">
                <span className="text-white/80 font-medium">When you sell, your buyer gets the file.</span>{" "}
                The blueprint transfers with the deed.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <LayoutDashboard className="w-3.5 h-3.5 text-white/20" aria-hidden="true" />
              <span className="font-mono text-[8px] text-white/20 tracking-wider">BROWSER · iOS · ANDROID · API</span>
            </div>
          </motion.div>

          {/* Card 3 — Collaboration */}
          <motion.div
            className={cardBase}
            viewport={{ once: true }}
            {...fadeUp(0.16)}
            style={{ willChange: "transform" }}
            whileHover={shouldReduceMotion ? {} : { y: -2, transition: { duration: 0.15 } }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center">
                <HardHat className="w-4 h-4 text-white/40" aria-hidden="true" />
              </div>
              <p className="font-mono text-[11px] text-white/35 tracking-[0.2em] uppercase">Collaboration</p>
            </div>
            <h3 className="text-xl font-semibold text-white leading-snug">Contractor Collaboration</h3>
            <p className="text-[#6b6b6b] text-sm leading-relaxed mt-2">
              Share your scan with any contractor via a single link. No login required. They open it in the browser, see exactly what&apos;s in the wall, and get to work.
            </p>
            <AvatarStack />
            <div className="flex items-center gap-2 mt-4">
              <div className="w-1 h-1 rounded-full bg-white/20" aria-hidden="true" />
              <span className="font-mono text-[8px] text-white/20 tracking-wider">SHAREABLE LINK · READ-ONLY · INSTANT ACCESS</span>
            </div>
          </motion.div>

          {/* Card 4 — Urgency (only card with orange) */}
          <motion.div
            className="rounded-2xl border border-[#f97316]/12 bg-[#111113] p-7 flex flex-col relative overflow-hidden"
            viewport={{ once: true }}
            {...fadeUp(0.24)}
            style={{ willChange: "transform" }}
            whileHover={shouldReduceMotion ? {} : { y: -2, transition: { duration: 0.15 } }}
          >
            {/* Subtle orange corner glow */}
            <div
              className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
              style={{ background: "radial-gradient(circle at top right, rgba(249,115,22,0.05) 0%, transparent 65%)" }}
              aria-hidden="true"
            />

            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg border border-[#f97316]/15 flex items-center justify-center">
                <CalendarX2 className="w-4 h-4 text-[#f97316]/60" aria-hidden="true" />
              </div>
              <p className="font-mono text-[11px] text-[#f97316]/55 tracking-[0.2em] uppercase">Time-sensitive</p>
            </div>
            <h3 className="text-xl font-semibold text-white leading-snug">Pre-Drywall Only Window</h3>
            <p className="text-[#6b6b6b] text-sm leading-relaxed mt-2">
              There is exactly one opportunity to capture what&apos;s inside your walls.{" "}
              <span className="text-white/70">It closes the moment insulation goes in.</span>
            </p>
            <div className="mt-5 p-4 rounded-xl border border-[#f97316]/10 bg-[#f97316]/[0.03]">
              <p className="font-mono text-[10px] text-[#f97316]/50 leading-relaxed">
                Once drywall is up, the systems behind it are invisible — and unknowable — forever.
              </p>
            </div>
            <div className="mt-auto pt-6">
              <a
                href="#book"
                className="inline-flex items-center justify-center w-full py-3 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-semibold text-sm rounded-lg transition-colors duration-150"
              >
                Book Before Your Window Closes
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
