import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Visual entrance + optional slow vertical float loop for images and
 * illustration blocks. The float is CSS-only and stops for reduced motion.
 */
export function FloatImage({
  children,
  delay = 0,
  float = true,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  float?: boolean;
  className?: string;
}) {
  return (
    <Reveal delay={delay}>
      <div className={`${float ? "float-slow" : ""} ${className}`}>{children}</div>
    </Reveal>
  );
}
