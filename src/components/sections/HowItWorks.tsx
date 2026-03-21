"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Calendar, ScanLine, FileCode2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Calendar,
    title: "Schedule",
    description:
      "Book your scan online in minutes. We coordinate directly with your builder to align with the framing inspection window — the only time the walls are open.",
  },
  {
    number: "02",
    icon: ScanLine,
    title: "We Scan Pre-Drywall",
    description:
      "Our technician arrives with a professional-grade LiDAR scanner and captures every inch of the framed interior — every pipe, wire, duct, and stud — in millimeter detail.",
  },
  {
    number: "03",
    icon: FileCode2,
    title: "Receive Your Digital Twin",
    description:
      "Within 48 hours you receive a permanent, shareable digital blueprint accessible from any device — yours forever, ready to share with any contractor or future buyer.",
  },
];

export default function HowItWorks() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section
      id="how-it-works"
      className="bg-[#0f172a] py-24 px-6"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <p className="font-mono text-[#22d3ee] text-xs tracking-widest mb-3">
            // THREE STEPS
          </p>
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl font-bold text-white"
          >
            How It Works
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                className="relative flex flex-col items-center text-center md:items-start md:text-left"
                variants={itemVariants}
                style={{ willChange: "transform" }}
              >
                {/* Dashed connector line — hidden on mobile, shows between steps */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-8 left-[calc(100%+0px)] w-full h-px"
                    aria-hidden="true"
                    style={{
                      background:
                        "repeating-linear-gradient(to right, #22d3ee33 0px, #22d3ee33 6px, transparent 6px, transparent 14px)",
                      width: "calc(100% - 0px)",
                      left: "calc(100% + 16px)",
                      top: "28px",
                    }}
                  />
                )}

                {/* Icon + number */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="relative flex items-center justify-center w-14 h-14 rounded-xl border border-[#22d3ee]/20 bg-[#22d3ee]/5">
                    <Icon
                      className="w-6 h-6 text-[#22d3ee]"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="font-mono text-3xl font-bold text-[#22d3ee]/20 leading-none select-none">
                    {step.number}
                  </span>
                </div>

                {/* Step number label */}
                <p className="font-mono text-[10px] text-[#22d3ee] tracking-widest mb-2">
                  // STEP {step.number}
                </p>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[#94a3b8] text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
