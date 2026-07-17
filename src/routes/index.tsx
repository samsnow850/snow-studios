import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Instagram } from "lucide-react";
import { apps } from "@/data/apps";

export const Route = createFileRoute("/")({
  component: Index,
});

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4";

const SERVICES = [...apps.map((a) => a.name), "Other"];
const CONTACT_EMAIL = "support@snowstudios.app";

function SocialBtn({
  href,
  className,
  label,
  children,
}: {
  href: string;
  className: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`w-8 h-8 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity ${className}`}
    >
      {children}
    </a>
  );
}

function Index() {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const toggle = (s: string) =>
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    const subject = encodeURIComponent(`Hello from ${name || "the site"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nInterested in: ${selected.join(", ") || "—"}\n\n${message}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSending(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white p-3 sm:p-4 md:p-6">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-[calc(100vh-48px)]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={VIDEO_URL}
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex flex-col min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-full p-4 sm:p-6 md:p-8 gap-6">
          {/* Navbar */}
          <nav className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm pl-3 sm:pl-4 pr-2 py-2 w-full sm:w-auto flex items-center gap-3 sm:gap-6">
            <Link to="/" aria-label="Snow Studios">
              <svg viewBox="0 0 256 256" className="w-8 h-8">
                <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z" fill="black" />
                <path d="M 256 128 L 128 128 L 0 0 L 128 0 Z" fill="black" />
              </svg>
            </Link>
            <div className="hidden sm:flex items-center gap-6">
              <Link to="/" className="text-gray-800 text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap">Home</Link>
              {apps.map((a) => (
                <Link
                  key={a.slug}
                  to="/apps/$slug"
                  params={{ slug: a.slug }}
                  className="text-gray-800 text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap"
                >
                  {a.name}
                </Link>
              ))}
              <Link to="/about" className="text-gray-800 text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap">About</Link>
            </div>
            <Link
              to="/contact"
              className="ml-auto bg-black text-white text-sm font-medium px-4 sm:px-5 py-2 rounded-xl hover:bg-gray-800"
            >
              Contact
            </Link>
          </nav>

          <div className="flex-1" />

          {/* Bottom row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h1 className="text-white text-3xl sm:text-4xl xl:text-5xl font-medium leading-tight drop-shadow-lg lg:max-w-lg xl:max-w-2xl shrink-0">
              Small apps for the{" "}
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}>
                places
              </span>
              <br />
              and things you{" "}
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}>
                care
              </span>{" "}
              about.
            </h1>

            <div className="w-full lg:w-[min(480px,45%)] shrink-0">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-6 flex flex-col gap-4">
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-6 gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-xl">✓</div>
                    <p className="text-base font-semibold text-gray-900">You're all set!</p>
                    <p className="text-sm text-gray-500">Expect a reply within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl sm:text-2xl font-semibold text-black tracking-tight">Say hello! 👋</h2>

                    <div className="flex flex-row items-center justify-between gap-3 bg-gray-50 rounded-2xl px-4 py-2.5">
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">Drop us a line</p>
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 font-semibold hover:underline truncate block">
                          {CONTACT_EMAIL}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <SocialBtn
                          href="https://www.instagram.com/samsnow850"
                          label="Instagram"
                          className="bg-orange-100 text-orange-400"
                        >
                          <Instagram size={13} />
                        </SocialBtn>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-gray-200" />
                      <span className="text-gray-400 font-medium text-sm">OR</span>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    <form onSubmit={onSubmit} className="flex flex-col gap-4">
                      <label className="text-sm font-medium text-black">Tell us about your vision</label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full name"
                          className="flex-1 min-w-0 text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                        />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          className="flex-1 min-w-0 text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                        />
                      </div>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="What are you looking to build or improve..."
                        className="text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition resize-none"
                      />
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-black">I'm interested in...</label>
                        <div className="flex flex-wrap gap-1.5">
                          {SERVICES.map((s) => {
                            const active = selected.includes(s);
                            return (
                              <button
                                type="button"
                                key={s}
                                onClick={() => toggle(s)}
                                className={`text-xs font-medium px-3 py-2 rounded-lg border transition-all ${
                                  active
                                    ? "bg-gray-100 text-black border-black"
                                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                                }`}
                              >
                                {s}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full bg-black text-white text-sm font-semibold py-3 rounded-2xl hover:bg-gray-800 transition-colors disabled:opacity-60"
                      >
                        {sending ? "Sending..." : "Send my message"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function _unused() {
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
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-stone px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-stone"
            >
              About Snow Studios
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
