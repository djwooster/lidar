"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { ScanLine, Clock, Cloud, Share2, CalendarCheck } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

const features = [
  {
    icon: Clock,
    label: "48-hour delivery",
    description: "Your digital blueprint arrives within two business days of the scan.",
  },
  {
    icon: ScanLine,
    label: "±1mm accuracy",
    description: "Sub-millimeter spatial precision across every system in the wall cavity.",
  },
  {
    icon: Cloud,
    label: "Lifetime cloud access",
    description: "Stored securely in your vault — accessible from any device, forever.",
  },
  {
    icon: Share2,
    label: "Shareable with anyone",
    description: "Send a read-only link to any contractor or future buyer. No login needed.",
  },
  {
    icon: CalendarCheck,
    label: "Pre-drywall coordination",
    description: "We align with your builder's inspection window so nothing is missed.",
  },
];

export default function BookingForm() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [state, setState] = useState<FormState>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    try {
      // TODO: replace with your API endpoint or form service
      await new Promise((res) => setTimeout(res, 900));
      setState("success");
    } catch {
      setState("error");
    }
  }

  const inputClass =
    "w-full bg-[#0a0a0b] border border-white/[0.18] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/35 transition-colors duration-150";

  const labelClass = "font-mono text-[9px] text-white/45 tracking-[0.18em] uppercase";

  return (
    <section
      id="book-form"
      className="bg-[#0a0a0b] px-8 pb-28 border-t border-white/[0.05]"
      aria-labelledby="booking-form-heading"
    >
      <div className="max-w-7xl mx-auto pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: Form ─────────────────────────────────────── */}
          <motion.div {...fadeUp(shouldReduceMotion)}>
            <p className="font-mono text-[12px] text-white/35 tracking-[0.22em] uppercase mb-4">
              Get in touch
            </p>
            <h2
              id="booking-form-heading"
              className="font-medium text-white leading-[1.08] tracking-tight mb-2"
              style={{ fontSize: "clamp(22px, 5.5vw, 36px)" }}
            >
              Request a scan.
            </h2>
            <p className="text-[#6b6b6b] text-sm leading-relaxed mb-10">
              Fill out the form and we&apos;ll be in touch within one business day to confirm your window.
            </p>

            {state === "success" ? (
              <motion.div
                className="rounded-xl border border-white/[0.07] bg-[#111113] p-8"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]" aria-hidden="true" />
                  <span className="font-mono text-[9px] text-white/30 tracking-widest">RECEIVED</span>
                </div>
                <p className="text-white font-medium mb-1">We&apos;ll be in touch shortly.</p>
                <p className="text-[#6b6b6b] text-sm leading-relaxed">
                  Check your inbox — we&apos;ll confirm your scan window within one business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col gap-4">
                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="firstName" className={labelClass}>
                        First name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Jane"
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="lastName" className={labelClass}>
                        Last name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        required
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Smith"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className={labelClass}>
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className={inputClass}
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className={labelClass}>
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className={inputClass}
                    />
                  </div>

                  {/* Property address */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="address" className={labelClass}>
                      Property address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      autoComplete="street-address"
                      required
                      value={form.address}
                      onChange={handleChange}
                      placeholder="123 Maple St, Springfield, IL 62701"
                      className={inputClass}
                    />
                  </div>

                  {state === "error" && (
                    <p className="font-mono text-[9px] text-red-400/70 tracking-wider">
                      Something went wrong — please try again or email us directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    className="mt-2 inline-flex items-center justify-center px-8 py-3.5 bg-[#f97316] hover:bg-[#ea6c0a] disabled:opacity-50 text-white font-semibold text-sm rounded-lg transition-all duration-150 hover:scale-[1.01] active:scale-[0.99] w-full sm:w-auto"
                  >
                    {state === "submitting" ? "Sending…" : "Book Your Scan"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* ── Right: Feature card ────────────────────────────── */}
          <motion.div {...fadeUp(shouldReduceMotion, 0.15)}>
            <div className="rounded-2xl border border-white/[0.07] bg-[#111113] p-8 relative overflow-hidden">
              {/* Subtle top-right glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
                style={{ background: "radial-gradient(circle at top right, rgba(34,211,238,0.04) 0%, transparent 65%)" }}
                aria-hidden="true"
              />

              <p className="font-mono text-[11px] text-white/35 tracking-[0.2em] uppercase mb-6">
                What you get
              </p>

              <div className="flex flex-col divide-y divide-white/[0.05]">
                {features.map(({ icon: Icon, label, description }, i) => (
                  <motion.div
                    key={label}
                    className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: 0.2 + i * 0.07 }}
                    style={{ willChange: "transform" }}
                  >
                    <div className="w-8 h-8 rounded-lg border border-white/[0.07] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-white/35" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-white/80 text-sm font-medium mb-0.5">{label}</p>
                      <p className="text-[#6b6b6b] text-xs leading-relaxed">{description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom mono tag */}
              <div className="mt-6 pt-6 border-t border-white/[0.05] flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-white/10" aria-hidden="true" />
                <span className="font-mono text-[8px] text-white/15 tracking-wider">ONE-TIME SCAN · NO SUBSCRIPTION · NO HIDDEN FEES</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
