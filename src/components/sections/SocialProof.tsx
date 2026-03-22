"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, fadeIn } from "@/lib/motion";

const logos = [
  { name: "Meridian Homes" },
  { name: "Peak Frame & Finish" },
  { name: "Cornerstone Build Co." },
  { name: "Ridgeline Contractors" },
  { name: "Ironwood Custom Builds" },
  { name: "Summit Home Group" },
];

export default function SocialProof() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section
      className="bg-[#0a0a0b] py-28 px-8 border-t border-white/[0.05]"
      aria-labelledby="social-proof-label"
    >
      <div className="max-w-7xl mx-auto">

        <motion.p
          id="social-proof-label"
          className="font-mono text-[12px] text-white/35 tracking-[0.22em] uppercase mb-10"
          {...fadeIn(shouldReduceMotion)}
        >
          Trusted by builders &amp; homeowners
        </motion.p>

        {/* Logo row — replace spans with <Image> tags once real logo files are available */}
        <div
          className="flex flex-wrap items-center gap-3 mb-20"
          role="list"
          aria-label="Companies that trust Blueprint LiDAR"
        >
          {logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              className="flex items-center justify-center h-9 px-4 rounded-lg bg-[#111113] border border-white/[0.06]"
              {...fadeIn(shouldReduceMotion, i * 0.05, 0.35)}
              role="listitem"
              aria-label={logo.name}
            >
              <span className="font-mono text-[9px] text-white/20 tracking-wider uppercase">
                {logo.name}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.figure
          className="max-w-4xl"
          {...fadeUp(shouldReduceMotion, 0.15, 0.7)}
        >
          <blockquote>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug tracking-tight">
              &ldquo;We had a plumber cut into the wrong wall twice on a remodel.
              Never again — we scan every build now.&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <div className="w-6 h-px bg-white/15" aria-hidden="true" />
            <span className="text-[#6b6b6b] text-sm">
              Marcus T. — General Contractor,{" "}
              <span className="text-white/40">Peak Frame &amp; Finish</span>
            </span>
          </figcaption>
        </motion.figure>

      </div>
    </section>
  );
}
