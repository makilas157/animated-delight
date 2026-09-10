import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Re-keys its subtree on pathname change so each route fades/lifts in.
 * Routing itself is untouched — this is presentation only.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
