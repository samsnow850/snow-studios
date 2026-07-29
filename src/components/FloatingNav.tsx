import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apps } from "@/data/apps";

const pillTransition = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
};

function NavPill({ active, children, onClick, isButton = false }: {
  active: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  isButton?: boolean;
}) {
  const baseText = active ? "text-canvas" : "text-ink/80 hover:text-ink";
  return (
    <div className="relative">
      {active && (
        <motion.div
          layoutId="nav-active-pill"
          className="absolute inset-0 rounded-full bg-ink"
          transition={pillTransition}
          initial={false}
        />
      )}
      {isButton ? (
        <button
          type="button"
          onClick={onClick}
          className={`relative z-10 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${baseText}`}
        >
          {children}
        </button>
      ) : (
        <span className={`relative z-10 block rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${baseText}`}>
          {children}
        </span>
      )}
    </div>
  );
}

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
    <motion.nav
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#1a1a1a]/95 px-2 py-2 shadow-2xl backdrop-blur-md">
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              scrollTop();
            }
          }}
        >
          <NavPill active={isHome}>Home</NavPill>
        </Link>

        <div className="relative" ref={ref}>
          <NavPill
            active={isApps}
            isButton
            onClick={() => setOpen((v) => !v)}
          >
            Apps
            <span className="block h-1.5 w-1.5 rounded-full bg-[var(--color-accent-blue)]" />
          </NavPill>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link
          to="/about"
          onClick={(e) => {
            if (isAbout) {
              e.preventDefault();
              scrollTop();
            }
          }}
        >
          <NavPill active={isAbout}>About</NavPill>
        </Link>

        <Link
          to="/contact"
          onClick={(e) => {
            if (isContact) {
              e.preventDefault();
              scrollTop();
            }
          }}
        >
          <NavPill active={isContact}>Contact</NavPill>
        </Link>
      </div>
    </motion.nav>
  );
}
