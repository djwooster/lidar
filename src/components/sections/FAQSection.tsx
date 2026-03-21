"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: "q1",
    question: "Why does the scan have to happen before drywall?",
    answer:
      "LiDAR works by bouncing laser pulses off surfaces and measuring the return time to calculate exact 3D positions. Once drywall is installed, the scanner can only see the drywall surface — the pipes, wires, ducts, and framing behind it are completely blocked. There is no technology that can non-destructively map the inside of a finished wall at the precision level required for reliable contractor use. The pre-drywall window — typically one to four days between framing inspection and insulation — is the only opportunity. We coordinate with your builder to schedule within that window.",
  },
  {
    id: "q2",
    question: "How is the data delivered and what format is it in?",
    answer:
      "You receive access to a cloud-hosted interactive viewer within 48 hours of the scan. The viewer runs in any modern browser with no software install required. You can pan, zoom, rotate, and measure directly in 3D. We also provide downloadable exports: a dense point cloud (.LAS/.LAZ), a processed mesh (.OBJ), and a flattened 2D floor plan with MEP overlays (.PDF + .DXF for CAD use). All data is stored in our secure vault and accessible indefinitely — there are no expiring links or annual fees.",
  },
  {
    id: "q3",
    question: "Can I share access with my contractor or future buyer?",
    answer:
      "Yes — and this is one of Blueprint's most important features. You can generate a shareable read-only link at any time from your dashboard. Recipients can open the full 3D viewer in their browser without creating an account or downloading anything. When you sell your home, you can transfer ownership of the Blueprint file to the buyer — it becomes part of the property record. Many of our clients include their Blueprint access link in their home's listing materials.",
  },
  {
    id: "q4",
    question: "How accurate is the scan?",
    answer:
      "Our scanners operate at ±1mm spatial accuracy at the distances used in residential construction. Point cloud density averages 1 point per mm², which means individual wires, pipe fittings, and staples are visible and measurable. For context: this level of precision tells a plumber not just which wall a pipe is in, but exactly how many inches from the stud edge it runs — so they can make a single precise cut rather than opening a large inspection hole.",
  },
  {
    id: "q5",
    question: "What if I missed the pre-drywall window?",
    answer:
      "Unfortunately, once drywall is installed and taped, the scan window is permanently closed — there is nothing we can do to recover what wasn't captured. If your home is still under construction and you are not yet at insulation, contact us immediately — we may still be able to schedule. For homes that are already finished, we offer a limited 'accessible systems' scan that documents exposed MEP in crawlspaces, attic cavities, unfinished basements, and utility rooms. While it doesn't capture full in-wall routing, it documents what's reachable and can still be highly valuable for remodels.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
  reduced,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
  reduced: boolean;
}) {
  return (
    <div
      className={`rounded-xl border transition-colors duration-200 overflow-hidden ${
        isOpen
          ? "border-[#22d3ee]/25 bg-[#1e293b]/60"
          : "border-[#94a3b8]/12 bg-[#1e293b]/30"
      }`}
    >
      <button
        className="w-full px-5 py-5 flex items-start justify-between gap-4 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${faq.id}`}
        id={`faq-trigger-${faq.id}`}
      >
        <span
          className={`font-semibold text-base leading-snug transition-colors duration-200 ${
            isOpen ? "text-[#22d3ee]" : "text-white"
          }`}
        >
          {faq.question}
        </span>
        <div
          className={`mt-0.5 shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors duration-200 ${
            isOpen
              ? "border-[#22d3ee] text-[#22d3ee]"
              : "border-[#94a3b8]/30 text-[#94a3b8]"
          }`}
          aria-hidden="true"
        >
          {isOpen ? (
            <Minus className="w-3 h-3" />
          ) : (
            <Plus className="w-3 h-3" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${faq.id}`}
            role="region"
            aria-labelledby={`faq-trigger-${faq.id}`}
            key="content"
            initial={reduced ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduced ? { opacity: 1, height: 0 } : { opacity: 0, height: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            style={{ overflow: "hidden", willChange: "height" }}
          >
            <div className="px-5 pb-5">
              <div className="w-full h-px bg-[#22d3ee]/10 mb-4" aria-hidden="true" />
              <p className="text-[#94a3b8] text-sm leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="bg-[#0f172a] py-24 px-6"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <p className="font-mono text-[#22d3ee] text-xs tracking-widest mb-3">
            // FAQ
          </p>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-bold text-white"
          >
            Questions Before You Book
          </h2>
        </motion.div>

        {/* FAQ list */}
        <motion.div
          className="flex flex-col gap-3"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.15 }}
        >
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
              reduced={shouldReduceMotion}
            />
          ))}
        </motion.div>

        {/* Bottom nudge */}
        <motion.div
          className="mt-10 text-center"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.3 }}
        >
          <p className="text-[#94a3b8] text-sm mb-4">
            Still have questions?{" "}
            <a
              href="mailto:hello@blueprintlidar.com"
              className="text-[#22d3ee] hover:underline underline-offset-4"
            >
              Email us directly
            </a>{" "}
            — we respond within one business day.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
