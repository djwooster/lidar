import type React from "react";

/**
 * Fade up + slide on scroll. Spread directly into a whileInView motion element.
 * @example <motion.div {...fadeUp(shouldReduceMotion)} className="...">
 */
export function fadeUp(reduced: boolean, delay = 0, duration = 0.6) {
  return {
    initial: reduced ? { opacity: 1 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: reduced ? { duration: 0 } : { duration, delay },
    style: { willChange: "transform" } as React.CSSProperties,
  };
}

/**
 * Opacity-only fade on scroll (no Y movement). Spread into a whileInView motion element.
 * @example <motion.div {...fadeIn(shouldReduceMotion, 0.1)} className="...">
 */
export function fadeIn(reduced: boolean, delay = 0, duration = 0.5) {
  return {
    initial: reduced ? { opacity: 1 } : { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: reduced ? { duration: 0 } : { duration, delay },
  };
}
