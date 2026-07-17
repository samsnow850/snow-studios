import { createFileRoute, Link } from "@tanstack/react-router";
import { apps } from "@/data/apps";
import sfSkyline from "@/assets/sf-skyline.jpg.asset.json";
import nySkyline from "@/assets/ny-skyline.jpg.asset.json";
import samuelPhoto from "@/assets/samuel-snow.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const heroImages: Record<string, string> = {
  "sf-popos": sfSkyline.url,
  "ny-pops": nySkyline.url,
};

function Index() {
  return (
    <div className="bg-canvas pb-24 text-ink">
      {/* Hero */}
      <header className="mx-auto max-w-6xl px-6 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="flex items-baseline justify-between gap-8">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-ink/40">
            Snow Studios — Est. 2025
          </p>
          <p className="hidden text-xs uppercase tracking-[0.24em] text-ink/40 md:block">
            Three apps · iOS &amp; Android
          </p>
        </div>
        <h1 className="mt-10 font-display text-5xl font-light leading-[1.02] tracking-tight md:text-7xl lg:text-[88px]">
          Small apps for the{" "}
          <span className="italic font-medium">places</span> and{" "}
          <span className="italic font-medium">things</span> you care about.
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-xl text-lg font-light leading-relaxed text-ink/60">
            Independent software by Samuel Snow — designed to be quiet, useful, and beautifully specific.
          </p>
          <Link
            to="/about"
            className="justify-self-start text-sm font-medium underline underline-offset-4 decoration-ink/30 hover:decoration-ink md:justify-self-end"
          >
            About the maker →
          </Link>
        </div>
      </header>

      {/* Featured pair: SF + NY */}
      <main className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {apps
            .filter((a) => a.slug === "sf-popos" || a.slug === "ny-pops")
            .map((app, i) => (
              <Link
                key={app.slug}
                to="/apps/$slug"
                params={{ slug: app.slug }}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink">
                  <img
                    src={heroImages[app.slug]}
                    alt={`${app.name} — city photograph`}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  {app.logo && (
                    <img
                      src={app.logo}
                      alt=""
                      className="absolute left-6 top-6 h-14 w-14 rounded-2xl shadow-xl ring-1 ring-white/20"
                    />
                  )}
                  <div className="absolute inset-x-6 bottom-6 text-white">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
                      {app.slug === "sf-popos" ? "San Francisco" : "New York City"}
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-medium md:text-4xl">
                      {app.name}
                    </h2>
                    <p className="mt-2 max-w-sm text-sm font-light text-white/80">
                      {app.tagline}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        {/* Shelf Track — editorial wide card */}
        {apps
          .filter((a) => a.slug === "shelf-track")
          .map((app) => (
            <Link
              key={app.slug}
              to="/apps/$slug"
              params={{ slug: app.slug }}
              className="group mt-8 block"
            >
              <div className="relative overflow-hidden rounded-3xl bg-stone outline outline-1 -outline-offset-1 outline-black/5">
                <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">
                  <div className="flex flex-col justify-between gap-10 p-8 md:p-12">
                    <div className="flex items-center gap-4">
                      {app.logo && (
                        <img
                          src={app.logo}
                          alt=""
                          className="h-12 w-12 rounded-xl shadow-md"
                        />
                      )}
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/50">
                        Home &amp; Inventory
                      </p>
                    </div>
                    <div>
                      <h2 className="font-display text-4xl font-medium md:text-5xl">
                        {app.name}
                      </h2>
                      <p className="mt-3 max-w-md text-base font-light text-ink/60">
                        {app.tagline}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                        Explore
                        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                  <div className="relative min-h-[280px] overflow-hidden bg-gradient-to-br from-[#4a90e2] to-[#1e5aa8]">
                    <img
                      src={app.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}

        {/* Stats strip */}
        <section className="mt-24 border-y border-ink/10 py-14">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { k: "3", v: "Apps shipped" },
              { k: "2", v: "Cities mapped" },
              { k: "iOS / Android", v: "Platforms" },
              { k: "2025", v: "Est." },
            ].map((s) => (
              <div key={s.v}>
                <p className="font-display text-3xl font-light md:text-4xl">{s.k}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink/40">{s.v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <section className="mt-24 grid gap-12 md:grid-cols-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/40">Philosophy</p>
            <h2 className="mt-4 font-display text-3xl font-light leading-tight md:text-4xl">
              Small tools, made with <span className="italic font-medium">care</span>.
            </h2>
          </div>
          {[
            { t: "Quiet by default", b: "No ads, no tracking, no dark patterns. Just the app doing its job." },
            { t: "Specific over general", b: "Each app solves one real problem for a real place or routine." },
            { t: "Made to last", b: "Ongoing updates, thoughtful details, and a design that ages well." },
          ].map((c) => (
            <div key={c.t} className="border-t border-ink/10 pt-6 md:col-span-1 md:border-t-0 md:border-l md:pt-0 md:pl-6">
              <h3 className="font-display text-lg font-medium">{c.t}</h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-ink/60">{c.b}</p>
            </div>
          ))}
        </section>

        {/* About preview */}
        <section className="mt-24 grid gap-10 rounded-3xl bg-stone p-8 md:grid-cols-[1fr_1.2fr] md:p-12">
          <div className="overflow-hidden rounded-2xl">
            <img src={samuelPhoto.url} alt="Samuel Snow" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/40">About the maker</p>
            <h2 className="mt-4 font-display text-3xl font-light leading-tight md:text-4xl">
              Hi, I'm <span className="italic font-medium">Samuel</span>.
            </h2>
            <p className="mt-4 max-w-md text-base font-light leading-relaxed text-ink/70">
              I build small, thoughtful apps inspired by the places and routines I care about — from hidden parks in San Francisco to keeping track of what's in the pantry.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink/90"
            >
              Read more <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* Get in touch */}
        <section className="mt-24 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/40">Get in touch</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-light leading-tight md:text-5xl">
            Have an idea, feedback, or just want to say hi?
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://www.instagram.com/samsnow850"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink/90"
            >
              Instagram
            </a>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-stone"
            >
              About Snow Studios
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
