import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { apps } from "@/data/apps";

export function FloatingNav() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
          className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white [&.active]:text-white"
          activeOptions={{ exact: true }}
          activeProps={{ className: "bg-white/10 text-white" }}
        >
          Home
        </Link>

        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
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
                  className="flex flex-col rounded-lg px-4 py-2.5 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                  role="menuitem"
                >
                  <span className="text-sm font-medium">{a.name}</span>
                  <span className="mt-0.5 text-[11px] text-white/40">
                    {a.platforms.join(" + ")}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          to="/"
          hash="about"
          className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
        >
          About
        </Link>
      </div>
    </nav>
  );
}
