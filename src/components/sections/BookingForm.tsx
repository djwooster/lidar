"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type FormState = "idle" | "submitting" | "success" | "error";

export default function BookingForm() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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
    "w-full bg-[#0a0a0b] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors duration-150";

  return (
    <section
      id="book-form"
      className="bg-[#0a0a0b] px-8 pb-28 border-t border-white/[0.05]"
      aria-labelledby="booking-form-heading"
    >
      <div className="max-w-7xl mx-auto pt-20">
        <motion.div
          className="max-w-xl"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
          style={{ willChange: "transform" }}
        >
          <p className="font-mono text-[10px] text-white/20 tracking-[0.22em] uppercase mb-4">
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
                    <label htmlFor="firstName" className="font-mono text-[9px] text-white/20 tracking-[0.18em] uppercase">
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
                    <label htmlFor="lastName" className="font-mono text-[9px] text-white/20 tracking-[0.18em] uppercase">
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
                  <label htmlFor="email" className="font-mono text-[9px] text-white/20 tracking-[0.18em] uppercase">
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
                  <label htmlFor="phone" className="font-mono text-[9px] text-white/20 tracking-[0.18em] uppercase">
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

                {state === "error" && (
                  <p className="font-mono text-[9px] text-red-400/70 tracking-wider">
                    Something went wrong — please try again or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="mt-2 inline-flex items-center justify-center px-8 py-3.5 bg-[#f97316] hover:bg-[#ea6c0a] disabled:opacity-50 text-white font-semibold text-sm rounded-lg transition-all duration-150 hover:scale-[1.01] active:scale-[0.99]"
                >
                  {state === "submitting" ? "Sending…" : "Book Your Scan"}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
