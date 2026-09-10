import { useRef, type ReactNode } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/hooks/useMotionPrefs";

/**
 * Wraps any button/link so it drifts a few pixels toward the cursor and
 * springs back on leave. Desktop pointers only; inert for reduced motion.
 */
export function MagneticButton({
  children,
  strength = 8,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !hasFinePointer()) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--mag-x", `${(dx * strength).toFixed(2)}px`);
      el.style.setProperty("--mag-y", `${(dy * strength).toFixed(2)}px`);
    });
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mag-x", "0px");
    el.style.setProperty("--mag-y", "0px");
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerUp={reset}
      className={`magnetic ${className}`}
    >
      {children}
    </span>
  );
}
