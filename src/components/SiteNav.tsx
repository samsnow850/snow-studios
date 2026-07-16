import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { APPS } from "@/lib/apps-data";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="pointer-events-auto flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl">
        <Link
          to="/"
          className="rounded-full px-3 py-1.5 text-sm font-semibold tracking-tight text-foreground"
          onClick={() => setMobileOpen(false)}
        >
          samuel<span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center gap-1 sm:flex" ref={ref}>
          <Link
            to="/"
            className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-foreground" }}
          >
            Home
          </Link>
          <a
            href="/#about"
            className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </a>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-expanded={open}
            >
              Apps
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open && (
              <div className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-2xl border border-black/5 bg-white/90 p-2 shadow-[0_20px_50px_rgb(0,0,0,0.12)] backdrop-blur-xl">
                {APPS.map((app) => (
                  <Link
                    key={app.slug}
                    to="/apps/$slug"
                    params={{ slug: app.slug }}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted"
                  >
                    <img
                      src={app.icon}
                      alt=""
                      loading="lazy"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-[10px] object-cover"
                    />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-foreground">
                        {app.name}
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        {app.tagline}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-full px-3 py-1.5 text-sm text-muted-foreground sm:hidden"
          aria-expanded={mobileOpen}
        >
          Menu
        </button>
      </nav>

      {mobileOpen && (
        <div className="pointer-events-auto absolute left-4 right-4 top-20 rounded-3xl border border-black/5 bg-white/95 p-3 shadow-[0_20px_50px_rgb(0,0,0,0.12)] backdrop-blur-xl sm:hidden">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="block rounded-xl px-3 py-2 text-sm text-foreground"
          >
            Home
          </Link>
          <a
            href="/#about"
            onClick={() => setMobileOpen(false)}
            className="block rounded-xl px-3 py-2 text-sm text-foreground"
          >
            About
          </a>
          <div className="mt-1 px-3 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Apps
          </div>
          {APPS.map((app) => (
            <Link
              key={app.slug}
              to="/apps/$slug"
              params={{ slug: app.slug }}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-xl p-2"
            >
              <img
                src={app.icon}
                alt=""
                loading="lazy"
                width={40}
                height={40}
                className="h-10 w-10 rounded-[10px] object-cover"
              />
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-foreground">
                  {app.name}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {app.tagline}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}