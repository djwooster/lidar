"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function FinalCTA() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="book"
      className="bg-[#0a0a0b] py-32 px-8 border-t border-white/[0.05]"
      aria-labelledby="final-cta-heading"
    >
      {/* Subtle scan-line sweep — horizontal, very low opacity */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.04) 60%, transparent 100%)",
            willChange: "transform",
          }}
          animate={{ y: [0, 200, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />
      )}

      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl">

          <motion.p
            className="font-mono text-[10px] text-white/20 tracking-[0.22em] uppercase mb-6"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
          >
            Book your scan
          </motion.p>

          <motion.h2
            id="final-cta-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.04] tracking-tight mb-6"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            style={{ willChange: "transform" }}
          >
            One scan.{" "}
            <span className="text-white/30">A lifetime of answers.</span>
          </motion.h2>

          <motion.p
            className="text-[#6b6b6b] text-lg leading-relaxed mb-10"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
            style={{ willChange: "transform" }}
          >
            Book before drywall goes up. It&apos;s the only chance you&apos;ll get.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start gap-5"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
            style={{ willChange: "transform" }}
          >
            <a
              href="mailto:hello@blueprintlidar.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-semibold text-base rounded-lg transition-all duration-150 hover:scale-[1.01] active:scale-[0.99]"
              aria-label="Book your pre-drywall scan"
            >
              Book Your Pre-Drywall Scan
            </a>

            <p className="font-mono text-[10px] text-white/15 tracking-[0.15em] self-center sm:self-auto sm:mt-1">
              no commitment required ·{" "}
              scan within 48h of booking
            </p>
          </motion.div>

          {/* Trust row */}
          <motion.div
            className="flex flex-wrap gap-x-8 gap-y-2 mt-12"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.35 }}
          >
            {["±1mm accuracy", "48-hour delivery", "lifetime cloud storage", "shareable with contractors"].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <div className="w-px h-3 bg-white/10" aria-hidden="true" />
                <span className="font-mono text-[9px] text-white/20 tracking-wider">{badge}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
