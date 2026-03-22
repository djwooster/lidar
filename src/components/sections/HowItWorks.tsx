"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Calendar, ScanLine, FileCode2 } from "lucide-react";
import { fadeUp } from "@/lib/motion";

const steps = [
  {
    number: "01",
    icon: Calendar,
    title: "Schedule",
    description:
      "Book online in minutes. We coordinate with your builder to align with the framing inspection window — the only time the walls are open.",
  },
  {
    number: "02",
    icon: ScanLine,
    title: "We Scan Pre-Drywall",
    description:
      "Our technician arrives with a professional-grade LiDAR scanner and captures every pipe, wire, duct, and stud in millimeter detail before insulation goes in.",
  },
  {
    number: "03",
    icon: FileCode2,
    title: "Receive Your Digital Twin",
    description:
      "Within 48 hours you receive a permanent, shareable digital blueprint — accessible from any device, ready to share with any contractor or future buyer.",
  },
];

export default function HowItWorks() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="how-it-works"
      className="bg-[#0a0a0b] py-28 px-8"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto">

        <motion.div className="mb-16" {...fadeUp(shouldReduceMotion)}>
          <p className="font-mono text-[12px] text-white/35 tracking-[0.22em] uppercase mb-4">
            Three steps
          </p>
          <h2
            id="how-it-works-heading"
            className="font-medium text-white tracking-tight leading-[1.08] max-w-lg"
            style={{ fontSize: "clamp(22px, 5.5vw, 36px)" }}
          >
            How It Works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                className="bg-[#0a0a0b] p-8 flex flex-col"
                {...fadeUp(shouldReduceMotion, index * 0.1)}
              >
                <p className="font-mono text-[10px] text-white/15 tracking-[0.2em] mb-6">
                  {step.number}
                </p>
                <div className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center mb-6">
                  <Icon className="w-4 h-4 text-white/50" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
