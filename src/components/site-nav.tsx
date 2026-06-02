import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
// Link kept for the logo home link
import { Menu, X } from "lucide-react";

const links = [
  { href: "#explore", label: "Explore" },
  { href: "#categories", label: "Categories" },
  { href: "#how", label: "How it works" },
  { href: "#join", label: "Pricing" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500 ${
            scrolled ? "glass shadow-elegant" : ""
          }`}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative h-8 w-8 rounded-lg bg-gradient-primary shadow-glow transition-transform group-hover:scale-110">
              <div className="absolute inset-[2px] rounded-[6px] bg-background flex items-center justify-center">
                <span className="text-gradient-primary font-display font-bold text-sm">C</span>
              </div>
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">
              CreativeHub
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <a href="#join" className="text-sm text-muted-foreground hover:text-foreground px-4 py-2 transition-colors">
              Sign in
            </a>
            <a href="#join" className="inline-flex items-center gap-1.5 text-sm font-medium rounded-full px-5 py-2.5 bg-foreground text-background hover:bg-foreground/90 transition-all hover:shadow-glow">
              Join CreativeHub
            </a>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <div className="md:hidden mt-2 glass rounded-2xl p-4 flex flex-col gap-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-3 py-3 text-sm text-foreground/90 rounded-lg hover:bg-white/5">
                {l.label}
              </a>
            ))}
            <div className="h-px bg-border my-2" />
            <a href="#join" onClick={() => setOpen(false)} className="px-3 py-3 text-sm rounded-lg hover:bg-white/5">Sign in</a>
            <a href="#join" onClick={() => setOpen(false)} className="px-3 py-3 text-sm rounded-lg bg-foreground text-background text-center mt-1">Join CreativeHub</a>
          </div>
        )}
      </div>
    </header>
  );
}