import { Link } from "@tanstack/react-router";
import { apps, type AppEntry } from "@/data/apps";
import { getLegal, type LegalKind } from "@/lib/legal-content";

export function LegalPage({ app, kind }: { app: AppEntry["slug"]; kind: LegalKind }) {
  const doc = getLegal(app, kind);
  const current = apps.find((a) => a.slug === app)!;

  return (
    <div className="min-h-screen bg-canvas pb-40 text-ink">
      <header className="mx-auto max-w-3xl px-6 pt-28 pb-10 md:pt-36">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-ink/40">
          Legal · {current.name}
        </p>
        <h1 className="font-display text-4xl font-light leading-[1.05] tracking-tight md:text-5xl">
          {doc.title}
        </h1>
        <p className="mt-3 text-sm text-ink/40">Last updated · {doc.updated}</p>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Choose an app">
          {apps.map((a) => {
            const active = a.slug === app;
            return (
              <Link
                key={a.slug}
                to={kind === "privacy" ? "/legal/privacy" : "/legal/terms"}
                search={{ app: a.slug }}
                role="tab"
                aria-selected={active}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-ink bg-ink text-canvas"
                    : "border-ink/10 bg-stone text-ink/70 hover:border-ink/30 hover:text-ink"
                }`}
              >
                {a.logo && (
                  <img src={a.logo} alt="" className="h-4 w-4 rounded-sm object-cover" />
                )}
                {a.name}
              </Link>
            );
          })}
        </div>

        <p className="mt-10 text-lg font-light leading-relaxed text-ink/70">{doc.intro}</p>
      </header>

      <main className="mx-auto max-w-3xl px-6">
        <p className="mb-12 rounded-2xl border border-ink/5 bg-stone px-5 py-4 text-sm text-ink/70">
          <strong className="font-medium text-ink">Across every app,</strong>{" "}
          we don't collect or sell any of your data. We don't share it with advertisers, data brokers, or third parties.
        </p>

        <div className="flex flex-col gap-10">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-medium">{s.heading}</h2>
              <div className="mt-3 space-y-3 leading-relaxed text-ink/70">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="border-t border-ink/5 pt-8">
            <h2 className="font-display text-xl font-medium">Contact</h2>
            <p className="mt-3 leading-relaxed text-ink/70">
              Questions? Email{" "}
              <a
                href={`mailto:${doc.contactEmail}`}
                className="text-ink underline underline-offset-2 hover:no-underline"
              >
                {doc.contactEmail}
              </a>
              .
            </p>
          </section>

          <div className="border-t border-ink/5 pt-8 text-sm">
            <Link
              to={kind === "privacy" ? "/legal/terms" : "/legal/privacy"}
              search={{ app }}
              className="text-ink/60 hover:text-ink"
            >
              {kind === "privacy" ? "Read Terms of Use →" : "Read Privacy Policy →"}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}