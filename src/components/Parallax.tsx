import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-driven depth: children drift vertically at a fraction of the
 * scroll speed, so layers separate in space.
 *
 * Effect is reduced on tablets and disabled on phones / reduced motion.
 */
export function Parallax({
  children,
  speed = 0.12,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let factor = speed;

    const setFactor = () => {
      const w = window.innerWidth;
      // phones: no parallax; tablets: half strength; desktop: full
      factor = w < 640 ? 0 : w < 1024 ? speed * 0.5 : speed;
      if (factor === 0) el.style.transform = "";
    };

    const update = () => {
      raf = 0;
      if (factor === 0) return;
      const r = el.getBoundingClientRect();
      const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -factor;
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      setFactor();
      onScroll();
    };

    setFactor();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/** Alias with a clearer name for layered hero/section backgrounds. */
export const ParallaxElement = Parallax;
