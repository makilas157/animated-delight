import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pointer-driven depth for hero layers: children drift a handful of pixels
 * against the cursor. Capped small so text stays readable and stable.
 * Desktop fine-pointer only, and off for reduced motion.
 */
export function MouseParallax({
  children,
  depth = 10,
  className = "",
}: {
  children: ReactNode;
  /** max pixel drift on each axis (kept within 5–15px) */
  depth?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const cap = Math.min(Math.max(depth, 5), 15);
    let raf = 0;
    let tx = 0;
    let ty = 0;

    const apply = () => {
      raf = 0;
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
    };

    const onMove = (e: PointerEvent) => {
      tx = ((e.clientX / window.innerWidth) * 2 - 1) * -cap;
      ty = ((e.clientY / window.innerHeight) * 2 - 1) * -cap;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [depth]);

  return (
    <div ref={ref} className={`mouse-parallax ${className}`}>
      {children}
    </div>
  );
}
