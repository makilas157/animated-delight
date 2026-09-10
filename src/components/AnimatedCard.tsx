import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { Tilt3D } from "./Tilt3D";

/**
 * One place for card motion: scroll reveal (optionally staggered),
 * hover lift/glow via the `depth-card` utility, and optional 3D tilt for
 * premium cards. Wraps content instead of duplicating animation logic.
 */
export function AnimatedCard({
  children,
  delay = 0,
  tilt = false,
  glow = true,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  tilt?: boolean;
  glow?: boolean;
  className?: string;
}) {
  const body = (
    <div className={`depth-card ${glow ? "card-glow" : ""} ${className}`}>{children}</div>
  );

  return <Reveal delay={delay}>{tilt ? <Tilt3D max={6}>{body}</Tilt3D> : body}</Reveal>;
}
