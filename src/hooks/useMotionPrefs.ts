import { useEffect, useState } from "react";

export type MotionTier = "mobile" | "tablet" | "desktop";

export type MotionPrefs = {
  /** true until we know the client's capabilities (SSR-safe default) */
  pending: boolean;
  reduced: boolean;
  /** mouse/trackpad present -> cursor + magnetic + tilt effects are allowed */
  finePointer: boolean;
  tier: MotionTier;
  /** full effects: desktop, fine pointer, motion allowed */
  rich: boolean;
};

const initial: MotionPrefs = {
  pending: true,
  reduced: false,
  finePointer: false,
  tier: "mobile",
  rich: false,
};

function read(): MotionPrefs {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const width = window.innerWidth;
  const tier: MotionTier = width >= 1024 ? "desktop" : width >= 640 ? "tablet" : "mobile";
  return {
    pending: false,
    reduced,
    finePointer,
    tier,
    rich: !reduced && finePointer && tier === "desktop",
  };
}

/**
 * Single source of truth for "how much motion is this visitor allowed".
 * Every animation component reads this instead of re-querying matchMedia.
 */
export function useMotionPrefs(): MotionPrefs {
  const [prefs, setPrefs] = useState<MotionPrefs>(initial);

  useEffect(() => {
    const update = () => setPrefs(read());
    update();

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(pointer: fine)");
    motion.addEventListener("change", update);
    pointer.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      motion.removeEventListener("change", update);
      pointer.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return prefs;
}

/** Non-reactive check for event handlers. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Non-reactive check for event handlers. */
export function hasFinePointer() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
}
