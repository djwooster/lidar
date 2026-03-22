import { ScanLine } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="bg-[#0a0a0b] border-t border-white/[0.05] py-12 px-8"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <ScanLine className="w-4 h-4 text-white/30" aria-hidden="true" />
              <span className="font-semibold text-white/70 text-sm tracking-tight">Blueprint LiDAR</span>
            </div>
            <p className="text-[#6b6b6b] text-sm leading-relaxed max-w-xs">
              Permanent digital blueprints for residential construction —
              captured during the only window that matters.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <p className="font-mono text-[11px] text-white/30 tracking-[0.2em] uppercase mb-4">Navigation</p>
            <ul className="space-y-2.5">
              {[
                { label: "How It Works", href: "#how-it-works" },
                { label: "Features", href: "#vault" },
                { label: "FAQ", href: "#faq" },
                { label: "Book a Scan", href: "#book" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[#6b6b6b] hover:text-white/70 text-sm transition-colors duration-150">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="font-mono text-[11px] text-white/30 tracking-[0.2em] uppercase mb-4">Contact</p>
            <a
              href="mailto:hello@blueprintlidar.com"
              className="text-[#6b6b6b] hover:text-white/70 text-sm transition-colors duration-150 block"
            >
              hello@blueprintlidar.com
            </a>
            <p className="text-[#6b6b6b]/50 text-xs mt-2">Mon–Fri, 8am–6pm</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/[0.04] pt-6">
          <p className="font-mono text-[9px] text-white/15 tracking-[0.2em]">
            blueprint lidar © 2026 — all rights reserved
          </p>
          <div className="flex items-center gap-5">
            {[{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }].map((link) => (
              <a key={link.label} href={link.href} className="text-[#6b6b6b]/40 hover:text-white/30 text-xs transition-colors duration-150">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
