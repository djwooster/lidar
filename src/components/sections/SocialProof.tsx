"use client";

import { motion, useReducedMotion } from "framer-motion";

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
      className="bg-[#080e1c] py-20 px-6 border-t border-[#94a3b8]/8"
      aria-labelledby="social-proof-label"
    >
      <div className="max-w-6xl mx-auto">

        <motion.p
          id="social-proof-label"
          className="font-mono text-[10px] text-[#94a3b8]/60 tracking-widest text-center mb-10"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
        >
          // TRUSTED BY BUILDERS &amp; HOMEOWNERS
        </motion.p>

        {/* Logo row */}
        {/* REPLACE placeholder divs with real <Image> components and actual logo files */}
        <div
          className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-16"
          role="list"
          aria-label="Companies that trust Blueprint LiDAR"
        >
          {logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              className="flex items-center justify-center h-10 px-5 rounded-lg bg-[#1e293b]/60 border border-[#94a3b8]/10"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.4, delay: i * 0.07 }
              }
              style={{ willChange: "transform", minWidth: "140px" }}
              role="listitem"
              aria-label={logo.name}
            >
              {/* SWAP with: <Image src="/logos/[name].svg" alt={logo.name} width={120} height={32} /> */}
              <span className="font-mono text-[10px] text-[#94a3b8]/50 tracking-wider uppercase">
                {logo.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Pull quote */}
        <motion.figure
          className="max-w-3xl mx-auto text-center"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.2 }}
          style={{ willChange: "transform" }}
        >
          <div
            className="text-[80px] leading-none text-[#22d3ee]/15 font-bold -mb-4 select-none"
            aria-hidden="true"
          >
            &ldquo;
          </div>

          <blockquote>
            <p className="text-2xl sm:text-3xl font-bold text-white italic leading-relaxed">
              We had a plumber cut into the wrong wall twice on a remodel.
              Never again — we scan every build now.
            </p>
          </blockquote>

          <figcaption className="mt-6 flex flex-col items-center gap-1">
            <div className="w-8 h-px bg-[#22d3ee]/30 mb-3" aria-hidden="true" />
            <span className="font-bold text-white text-sm">
              Marcus T. — General Contractor
            </span>
            {/* SWAP with real name and company */}
            <span className="font-mono text-[10px] text-[#94a3b8]/50 tracking-wider">
              // PEAK FRAME &amp; FINISH — TESTIMONIAL PLACEHOLDER
            </span>
          </figcaption>
        </motion.figure>

      </div>
    </section>
  );
}
