import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Word-by-word entrance for a single headline. Splits on spaces, keeps
 * accent spans intact by accepting pre-split segments.
 *
 * Use only for main headings — not body copy.
 */
export function WordReveal({
  text,
  className = "",
  delay = 0,
  step = 55,
  accentFrom,
}: {
  /** the full heading, plain text */
  text: string;
  className?: string;
  delay?: number;
  step?: number;
  /** word index from which the accent gradient applies */
  accentFrom?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <h1 ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="word-reveal-wrap">
          <span
            className={`word-reveal ${shown ? "word-reveal-in" : ""} ${
              accentFrom !== undefined && i >= accentFrom ? "text-gradient" : ""
            }`}
            style={{ transitionDelay: `${delay + i * step}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </h1>
  );
}

/** Line-by-line variant for shorter stacked headings. */
export function LineReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className="word-reveal-wrap">
      <span className={`word-reveal word-reveal-in ${className}`} style={{ transitionDelay: `${delay}ms` }}>
        {children}
      </span>
    </span>
  );
}
