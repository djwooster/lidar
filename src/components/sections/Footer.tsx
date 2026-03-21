import { ScanLine } from "lucide-react";

export default function Footer() {
  const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#vault" },
    { label: "FAQ", href: "#faq" },
    { label: "Book a Scan", href: "#book" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer
      className="bg-[#0a111f] border-t border-[#94a3b8]/10 pt-12 pb-8 px-6"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center">
                <ScanLine className="w-4 h-4 text-[#f97316]" aria-hidden="true" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                Blueprint
                <span className="text-[#22d3ee]"> LiDAR</span>
              </span>
            </div>
            <p className="text-[#94a3b8] text-sm leading-relaxed max-w-xs">
              Permanent digital blueprints for residential construction — captured
              during the only window that matters.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="font-mono text-[10px] text-[#94a3b8]/50 tracking-widest mb-4">
              // NAVIGATION
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#94a3b8] hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="font-mono text-[10px] text-[#94a3b8]/50 tracking-widest mb-4">
              // CONTACT
            </p>
            <div className="space-y-2">
              <a
                href="mailto:hello@blueprintlidar.com"
                className="text-[#94a3b8] hover:text-[#22d3ee] text-sm transition-colors duration-200 block"
                aria-label="Email Blueprint LiDAR"
              >
                hello@blueprintlidar.com
              </a>
              <p className="text-[#94a3b8]/50 text-xs font-mono">
                // Mon–Fri 8am–6pm local time
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#94a3b8]/8 mb-6" aria-hidden="true" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="font-mono text-[10px] text-[#94a3b8]/40 tracking-widest">
            // BLUEPRINT LIDAR © 2026 — ALL RIGHTS RESERVED
          </p>

          <div className="flex items-center gap-5">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#94a3b8]/40 hover:text-[#94a3b8] text-xs transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
