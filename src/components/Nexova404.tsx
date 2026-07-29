import { Link } from "@tanstack/react-router";
import { apps } from "@/data/apps";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Nexova404() {
  return (
    <div className="fixed inset-0 z-[100] overflow-auto bg-black">
      <div className="relative min-h-screen flex flex-col">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Wordmark */}
          <header className="px-6 py-6 md:px-12">
            <Link
              to="/"
              className="font-display text-sm font-medium tracking-[0.24em] uppercase text-white/80 transition-colors hover:text-white"
            >
              Snow Studios
            </Link>
          </header>

          {/* Hero */}
          <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 md:py-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
              Page not found
            </p>

            <span className="four-oh-four mt-6 font-display text-[92px] sm:text-[150px] md:text-[210px] font-light leading-none tracking-tighter text-white select-none">
              404
            </span>

            <h1 className="mt-4 max-w-lg font-display text-2xl font-light leading-tight text-white/85 md:text-4xl">
              This one slipped off the map.
            </h1>
            <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-white/55">
              The page you're looking for moved, or never existed. Here's the way back.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
              >
                Back to home
              </Link>
              <Link
                to="/contact"
                className="liquid-glass rounded-full px-6 py-3 text-sm font-medium text-white"
              >
                Report a broken link
              </Link>
            </div>
          </section>

          {/* Transparent bottom bar */}
          <footer className="relative z-10 px-4 pb-6 sm:px-6 md:px-12">
            <div className="liquid-glass rounded-3xl px-5 py-5 sm:px-8 sm:py-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
                    The apps
                  </h2>
                  <ul className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {apps.map((app) => (
                      <li key={app.slug}>
                        <Link
                          to="/apps/$slug"
                          params={{ slug: app.slug }}
                          className="flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white"
                        >
                          {app.logo && (
                            <img
                              src={app.logo}
                              alt=""
                              className="h-5 w-5 rounded-[6px] object-cover"
                            />
                          )}
                          {app.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
                    Elsewhere
                  </h2>
                  <ul className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {quickLinks.map((l) => (
                      <li key={l.to}>
                        <Link
                          to={l.to}
                          className="text-sm text-white/65 transition-colors hover:text-white"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-6 border-t border-white/10 pt-4 text-[11px] text-white/35">
                © {new Date().getFullYear()} Snow Studios — built in San Francisco.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
