"use client";

import { ScanLine } from "lucide-react";

export default function UrgencyStrip() {
  return (
    <div
      className="w-full bg-[#0f172a] border-y border-[#f97316]/20"
      role="alert"
      aria-label="Scan window urgency notice"
    >
      <div className="relative overflow-hidden">
        {/* Orange left accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#f97316]" aria-hidden="true" />

        {/* Subtle orange tint background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(249,115,22,0.06) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-8 py-3.5 flex items-center gap-3">
          <ScanLine
            className="w-4 h-4 text-[#f97316] shrink-0"
            aria-hidden="true"
          />
          <p className="font-mono text-xs text-[#94a3b8] tracking-wide">
            <span className="text-[#f97316] font-semibold">// SCAN WINDOW:</span>{" "}
            Pre-drywall only — must be completed before insulation.{" "}
            <span className="text-slate-300">
              Book at framing inspection.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
