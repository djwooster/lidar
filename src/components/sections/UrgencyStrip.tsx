"use client";

import { ScanLine } from "lucide-react";

export default function UrgencyStrip() {
  return (
    <div
      className="w-full border-y border-white/[0.05]"
      style={{ background: "rgba(249,115,22,0.04)" }}
      role="alert"
      aria-label="Scan window urgency notice"
    >
      <div className="max-w-7xl mx-auto px-8 py-3 flex items-center gap-3">
        <ScanLine className="w-3.5 h-3.5 text-[#f97316]/60 shrink-0" aria-hidden="true" />
        <p className="font-mono text-[11px] text-white/30 tracking-wide">
          <span className="text-[#f97316]/70">scan window —</span>{" "}
          pre-drywall only. must complete before insulation.{" "}
          <span className="text-white/40">book at framing inspection.</span>
        </p>
      </div>
    </div>
  );
}
