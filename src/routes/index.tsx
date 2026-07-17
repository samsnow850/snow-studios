import { createFileRoute, Link } from "@tanstack/react-router";
import { apps } from "@/data/apps";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-canvas pb-40 text-ink">
      {/* Hero */}
      <header className="mx-auto max-w-5xl px-6 pt-28 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-3xl">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-ink/40">
            Independent developer
          </p>
          <h1 className="font-display text-4xl font-light leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Building{" "}
            <span className="font-medium">useful, polished apps</span>{" "}
            that solve real problems.
          </h1>
          <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-ink/60 md:text-xl">
            I focus on simple, thoughtful experiences and turning ideas into products
            people can actually use. Three of them are below.
          </p>
        </div>
      </header>

      {/* Apps grid */}
      <main className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 md:grid-cols-2">
        {apps.map((app, i) => {
          const isWide = app.imageAspect === "21/9";
          return (
            <Link
              key={app.slug}
              to="/apps/$slug"
              params={{ slug: app.slug }}
              className={`group block ${isWide ? "md:col-span-2" : ""}`}
            >
              <div className="relative overflow-hidden rounded-3xl bg-stone outline outline-1 -outline-offset-1 outline-black/5">
                <img
                  src={app.image}
                  alt={`${app.name} preview`}
                  loading={i === 0 ? "eager" : "lazy"}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    isWide ? "aspect-[21/9]" : "aspect-[4/5]"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-medium">{app.name}</h2>
                  <p className="mt-1 text-ink/50">{app.tagline}</p>
                </div>
                <span className="shrink-0 rounded border border-ink/10 px-2 py-1 text-[10px] font-bold uppercase tracking-tight">
                  {app.platforms.join(" + ")}
                </span>
              </div>
            </Link>
          );
        })}
      </main>

      {/* About */}
      <section id="about" className="mx-auto mt-40 max-w-5xl border-t border-ink/5 px-6 pt-12 pb-20 scroll-mt-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-ink/40">
              About
            </h3>
            <p className="text-2xl font-light leading-snug text-ink/80">
              I'm a developer who enjoys building useful, polished apps that solve real
              problems. I focus on creating simple, thoughtful experiences and turning
              ideas into products people can actually use.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-ink/40">
              Elsewhere
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://apps.apple.com/us/developer/samuel-snow/id1620253929"
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg transition-colors hover:text-[var(--color-accent-blue)]"
                >
                  App Store
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@example.com"
                  className="text-lg transition-colors hover:text-[var(--color-accent-blue)]"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
