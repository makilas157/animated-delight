import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/site";
import { Button } from "@/components/ui/button";
import { CursorGrid } from "./CursorGrid";
import { MagneticButton } from "./MagneticButton";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className="site-nav nav-enter fixed top-0 z-40 w-full border-b border-border/60"
    >
      <CursorGrid />
      <nav className="container-x site-nav-inner relative flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="logo-mark" />
          <span className="font-display text-lg font-semibold tracking-tight">tevexxo</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="nav-link text-sm text-muted-foreground transition-colors hover:text-foreground [&.active]:text-accent"
            >
              {l.label}
            </Link>
          ))}
          <MagneticButton strength={6}>
            <Link to="/contact" className="btn-solid px-5 py-2 text-sm">
              Contact us
            </Link>
          </MagneticButton>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
          className="press-feedback lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {open ? (
        <div
          id="mobile-navigation"
          className="mobile-menu border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden"
        >
          <div className="container-x flex flex-col gap-1 py-4">
            {navLinks.map((l, index) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="mobile-menu-link rounded-md px-2 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground [&.active]:text-accent"
                style={{ animationDelay: `${index * 60}ms` }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-solid mobile-menu-link mt-3 justify-center"
              style={{ animationDelay: `${navLinks.length * 60}ms` }}
            >
              Contact us
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
