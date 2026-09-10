import { useRef, type ReactNode } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/hooks/useMotionPrefs";

/**
 * Pointer-driven 3D tilt. Wraps any card-like child and rotates it in 3D
 * space toward the cursor, with a soft moving sheen for depth.
 *
 * Desktop mouse/trackpad only: touch devices and reduced-motion visitors
 * get the static card.
 */
export function Tilt3D({
  children,
  max = 8,
  className = "",
}: {
  children: ReactNode;
  /** clamped to 5–8 degrees */
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const limit = Math.min(Math.max(max, 5), 8);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !hasFinePointer()) return;
    if (e.pointerType !== "mouse") return;
    if (window.innerWidth < 1024) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--tilt-x", `${(0.5 - py) * limit * 2}deg`);
      el.style.setProperty("--tilt-y", `${(px - 0.5) * limit * 2}deg`);
      el.style.setProperty("--sheen-x", `${px * 100}%`);
      el.style.setProperty("--sheen-y", `${py * 100}%`);
      el.style.setProperty("--tilt-active", "1");
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--tilt-active", "0");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tilt-3d ${className}`}
    >
      <div className="tilt-3d-inner">
        {children}
        <span aria-hidden className="tilt-3d-sheen" />
      </div>
    </div>
  );
}
