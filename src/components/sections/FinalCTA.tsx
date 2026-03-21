"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function FinalCTA() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="book"
      className="relative bg-[#080e1c] py-28 px-6 overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      {/* Scan line animation — low-opacity horizontal sweep */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, #22d3ee 40%, #22d3ee 60%, transparent 100%)",
            opacity: 0.06,
            willChange: "transform",
          }}
          animate={{ y: ["-20px", "calc(100vh + 20px)"] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 3,
          }}
          aria-hidden="true"
        />
      )}

      {/* Radial glow behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(34,211,238,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22d3ee]/20 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22d3ee]/20 to-transparent" aria-hidden="true" />

      {/* Content */}
      <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center gap-6">

        <motion.p
          className="font-mono text-[#22d3ee] text-xs tracking-widest"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
        >
          // BOOK YOUR SCAN
        </motion.p>

        <motion.h2
          id="final-cta-heading"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
          }
          style={{ willChange: "transform" }}
        >
          One Scan.{" "}
          <span className="text-[#f97316]">A Lifetime of Answers.</span>
        </motion.h2>

        <motion.p
          className="text-[#94a3b8] text-lg sm:text-xl leading-relaxed max-w-xl"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }
          }
          style={{ willChange: "transform" }}
        >
          Book before drywall goes up. It&apos;s the only chance you&apos;ll get.
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-4 mt-2"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.3 }
          }
          style={{ willChange: "transform" }}
        >
          <a
            href="mailto:hello@blueprintlidar.com"
            className="inline-flex items-center justify-center px-10 py-5 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-bold text-lg rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#f97316]/20 focus-visible:outline-2 focus-visible:outline-[#f97316] focus-visible:outline-offset-2"
            aria-label="Book your pre-drywall scan"
          >
            Book Your Pre-Drywall Scan
          </a>

          <p className="font-mono text-[10px] text-[#94a3b8]/50 tracking-widest">
            // No commitment required. Scan completed within 48 hours of booking.
          </p>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-6 pt-6 border-t border-[#94a3b8]/10 w-full"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.5 }
          }
        >
          {[
            "±1mm Accuracy",
            "48-Hour Delivery",
            "Lifetime Cloud Storage",
            "Shareable with Contractors",
          ].map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <div
                className="w-1 h-1 rounded-full bg-[#22d3ee]"
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] text-[#94a3b8]/60 tracking-wider">
                {badge.toUpperCase()}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
