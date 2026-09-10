import { useEffect, useRef, useState } from "react";

/**
 * Small accent-coloured spider that trails the cursor with spring lag.
 * Legs skitter while moving and settle when the cursor is idle. It also
 * reacts to what's under the pointer: buttons/links grow + glow, cards
 * flatten into a wider "grip" state.
 *
 * Disabled on touch devices and for prefers-reduced-motion.
 *
 * To remove this effect entirely, delete the <CursorSpider /> line in
 * src/routes/__root.tsx (this file can then be deleted too).
 */
export function CursorSpider() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [walking, setWalking] = useState(false);
  const [hover, setHover] = useState<"none" | "action" | "card">("none");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let vx = 0;
    let vy = 0;
    let raf = 0;
    let idle: ReturnType<typeof setTimeout>;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setWalking(true);
      clearTimeout(idle);
      idle = setTimeout(() => setWalking(false), 180);
    };

    const onOver = (e: PointerEvent) => {
      const el = e.target as Element | null;
      if (!el?.closest) return;
      if (el.closest("a, button, [role='button'], input, textarea, select")) {
        setHover("action");
      } else if (el.closest(".catalog-card, .depth-card, .social-card, .glass-panel")) {
        setHover("card");
      } else {
        setHover("none");
      }
    };

    const tick = () => {
      // spring easing toward the cursor -> visible crawl-to-catch-up lag
      vx = (vx + (target.x - pos.x) * 0.06) * 0.82;
      vy = (vy + (target.y - pos.y) * 0.06) * 0.82;
      pos.x += vx;
      pos.y += vy;
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);
      const el = ref.current;
      if (el) {
        el.style.transform = `translate3d(${pos.x - 14}px, ${pos.y - 14}px, 0) rotate(${
          Math.hypot(vx, vy) > 0.4 ? angle + 90 : 0
        }deg)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(raf);
      clearTimeout(idle);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      data-hover={hover}
      className="cursor-spider pointer-events-none fixed top-0 left-0 z-50 hidden h-7 w-7 md:block"
    >
      <div className="cursor-spider-inner h-full w-full">
        <svg viewBox="0 0 32 32" className="h-full w-full">
          <g
            stroke="oklch(0.68 0.19 40)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            style={{
              transformOrigin: "16px 16px",
              animation: walking ? "tvx-skitter 0.22s ease-in-out infinite" : "none",
            }}
          >
            <path d="M14 14 L6 8 L3 11" />
            <path d="M14 16 L4 16 L1 19" />
            <path d="M14 18 L5 22 L3 26" />
            <path d="M15 20 L12 27 L14 30" />
            <path d="M18 14 L26 8 L29 11" />
            <path d="M18 16 L28 16 L31 19" />
            <path d="M18 18 L27 22 L29 26" />
            <path d="M17 20 L20 27 L18 30" />
          </g>
          <ellipse cx="16" cy="13" rx="2.6" ry="2.2" fill="oklch(0.68 0.19 40)" />
          <ellipse cx="16" cy="18.5" rx="3.4" ry="4.2" fill="oklch(0.72 0.16 70)" />
        </svg>
      </div>
      <style>{`@keyframes tvx-skitter{0%,100%{transform:scaleY(1) rotate(0deg)}50%{transform:scaleY(0.9) rotate(3deg)}}`}</style>
    </div>
  );
}

/** Clearer alias — same single cursor implementation. */
export const CustomCursor = CursorSpider;
