import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { apps } from "@/data/apps";

export function FloatingNav() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isApps = pathname.startsWith("/apps");
  const isContact = pathname === "/contact";

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#1a1a1a]/95 px-2 py-2 shadow-2xl backdrop-blur-md">
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              scrollTop();
            }
          }}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:bg-white/5 hover:text-white ${
            isHome ? "bg-white/10 text-white" : "text-white/80"
          }`}
        >
          Home
        </Link>

        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:bg-white/5 hover:text-white ${
              isApps ? "bg-white/10 text-white" : "text-white/80"
            }`}
            aria-haspopup="menu"
            aria-expanded={open}
          >
            Apps
            <span className="block h-1.5 w-1.5 rounded-full bg-[var(--color-accent-blue)]" />
          </button>

          {open && (
            <div
              role="menu"
              className="absolute bottom-full left-1/2 mb-4 w-64 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#1a1a1a] p-2 shadow-xl"
            >
              {apps.map((a) => (
                <Link
                  key={a.slug}
                  to="/apps/$slug"
                  params={{ slug: a.slug }}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                  role="menuitem"
                >
                  {a.logo ? (
                    <img
                      src={a.logo}
                      alt=""
                      className="h-9 w-9 flex-shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-9 w-9 flex-shrink-0 rounded-lg bg-white/5" />
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{a.name}</span>
                    <span className="mt-0.5 text-[11px] text-white/40">
                      {a.platforms.join(" + ")}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          to="/about"
          onClick={(e) => {
            if (isAbout) {
              e.preventDefault();
              scrollTop();
            }
          }}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:bg-white/5 hover:text-white ${
            isAbout ? "bg-white/10 text-white" : "text-white/80"
          }`}
        >
          About
        </Link>

        <Link
          to="/contact"
          onClick={(e) => {
            if (isContact) {
              e.preventDefault();
              scrollTop();
            }
          }}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:bg-white/5 hover:text-white ${
            isContact ? "bg-white/10 text-white" : "text-white/80"
          }`}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
