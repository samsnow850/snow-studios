import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { apps, getApp, type AppEntry, type AppReview } from "@/data/apps";
import { getAppMeta, type AppMeta } from "@/lib/app-meta.functions";
import { StoreBadges } from "@/components/StoreBadges";

export const Route = createFileRoute("/apps/$slug")({
  loader: async ({ params }) => {
    const valid = apps.find((a) => a.slug === params.slug);
    if (!valid) throw notFound();
    const meta: AppMeta = valid.itunesId
      ? await getAppMeta({ data: { itunesId: valid.itunesId } })
      : { version: null, updated: null, rating: null, ratingCount: null };
    return { slug: valid.slug, meta };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "App not found" }, { name: "robots", content: "noindex" }] };
    }
    const app = getApp(loaderData.slug);
    return {
      meta: [
        { title: `${app.name} — ${app.tagline}` },
        { name: "description", content: app.short },
        { property: "og:title", content: `${app.name} — ${app.tagline}` },
        { property: "og:description", content: app.short },
        { property: "og:type", content: "website" },
        { property: "og:image", content: app.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: app.image },
      ],
    };
  },
  component: AppPage,
});

function formatUpdated(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function AppPage() {
  const { slug, meta } = Route.useLoaderData();
  const app = getApp(slug);
  const updated = formatUpdated(meta.updated);

  return (
    <div className="min-h-screen bg-canvas pb-40 text-ink">
      <header className="mx-auto max-w-5xl px-6 pt-28 pb-12 md:pt-36">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-ink/50 transition-colors hover:text-ink"
        >
          <span aria-hidden>←</span> All apps
        </Link>

        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-ink/40">
          {app.platforms.join(" · ")}
        </p>
        <h1 className="font-display text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
          {app.name}
        </h1>
        <p className="mt-6 max-w-2xl text-xl font-light leading-relaxed text-ink/60 md:text-2xl">
          {app.tagline}
        </p>

        {(meta.version || updated) && (
          <div className="mt-8 flex flex-wrap gap-2">
            {meta.version && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-stone px-3 py-1 text-xs font-medium text-ink/70">
                <span className="text-ink/40">Version</span>
                <span className="tabular-nums">{meta.version}</span>
              </span>
            )}
            {updated && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-stone px-3 py-1 text-xs font-medium text-ink/70">
                <span className="text-ink/40">Updated</span>
                <span>{updated}</span>
              </span>
            )}
          </div>
        )}


        <StoreBadges appStore={app.appStore} playStore={app.playStore} className="mt-10" />
      </header>

      <section className="mx-auto max-w-5xl px-6">
        {app.screenshots && app.screenshots.length > 0 ? (
          <div className="rounded-3xl bg-stone p-6 outline outline-1 -outline-offset-1 outline-black/5 sm:p-10">
            <ul className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 sm:grid sm:snap-none sm:grid-cols-4 sm:gap-6 sm:overflow-visible">
              {app.screenshots.map((s) => (
                <li key={s.src} className="flex shrink-0 snap-center flex-col items-center gap-3 sm:shrink">
                  <div className="relative w-[220px] shrink-0 overflow-hidden rounded-[2.25rem] bg-black p-1.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] sm:w-full">
                    <img
                      src={s.src}
                      alt={`${app.name} — ${s.label}`}
                      className="aspect-[9/19.5] w-full rounded-[1.85rem] object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-widest text-ink/50">
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-3xl bg-stone outline outline-1 -outline-offset-1 outline-black/5">
            <img
              src={app.image}
              alt={`${app.name} preview`}
              className={`w-full object-cover ${
                app.imageAspect === "21/9" ? "aspect-[21/9]" : "aspect-[4/5] md:aspect-[16/10]"
              }`}
            />
          </div>
        )}
      </section>

      <section className="mx-auto max-w-5xl px-6 pt-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-ink/40">
              Overview
            </h2>
          </div>
          <p className="text-2xl font-light leading-snug text-ink/80 md:col-span-2">
            {app.long}
          </p>
        </div>
      </section>

      <FeaturesSection app={app} />

      <ReviewsSection app={app} meta={meta} />

      {app.changelog && app.changelog.length > 0 && <ChangelogSection app={app} />}

      {app.faqs && app.faqs.length > 0 && <FaqSection app={app} />}

      <section className="mx-auto mt-24 max-w-5xl border-t border-ink/5 px-6 pt-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h3 className="font-display text-2xl font-light md:text-3xl">
              Get {app.name} today.
            </h3>
            <p className="mt-2 text-ink/60">{app.platforms.join(" · ")}</p>
          </div>
          <StoreBadges appStore={app.appStore} playStore={app.playStore} />
        </div>
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink/40">
          <Link
            to="/legal/privacy"
            search={{ app: app.slug }}
            className="hover:text-ink"
          >
            Privacy Policy
          </Link>
          <Link
            to="/legal/terms"
            search={{ app: app.slug }}
            className="hover:text-ink"
          >
            Terms of Use
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeaturesSection({ app }: { app: AppEntry }) {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-ink/40">
            Features
          </h2>
        </div>
        <ul className="grid grid-cols-1 gap-8 md:col-span-2 md:grid-cols-2">
          {app.features.map((f) => (
            <li key={f.title}>
              <h3 className="font-display text-lg font-medium">{f.title}</h3>
              <p className="mt-2 text-ink/60 leading-relaxed">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const rounded = Math.round(rating * 2) / 2;
  const px = size === "lg" ? "text-2xl" : size === "md" ? "text-lg" : "text-sm";
  return (
    <span
      className={`inline-flex ${px} tracking-tight`}
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= Math.floor(rounded);
        const half = !filled && i - 0.5 === rounded;
        return (
          <span key={i} aria-hidden className="relative">
            <span className={filled || half ? "text-amber-500" : "text-ink/15"}>
              {filled ? "★" : half ? "★" : "★"}
            </span>
            {half && (
              <span className="absolute inset-0 overflow-hidden text-ink/15" style={{ clipPath: "inset(0 0 0 50%)" }}>
                ★
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

function ReviewsSection({ app, meta }: { app: AppEntry; meta: AppMeta }) {
  const reviews = app.reviews;
  const shownRating =
    meta.rating ?? reviews.reduce((s, r) => s + r.rating, 0) / Math.max(reviews.length, 1);
  const shownCount = meta.ratingCount ?? reviews.length;

  const buckets = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));
  const maxBucket = Math.max(1, ...buckets.map((b) => b.count));

  return (
    <section className="mx-auto max-w-5xl px-6 pt-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-ink/40">
            Reviews
          </h2>
        </div>

        <div className="md:col-span-2">
          <div className="grid grid-cols-1 gap-8 rounded-3xl border border-ink/5 bg-stone p-8 sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="flex flex-col items-start">
              <div className="font-display text-5xl font-light leading-none text-ink">
                {shownRating.toFixed(1)}
              </div>
              <div className="mt-3">
                <Stars rating={shownRating} size="md" />
              </div>
              <div className="mt-2 text-xs text-ink/50">
                {shownCount.toLocaleString()} {shownCount === 1 ? "rating" : "ratings"}
              </div>
            </div>
            <ul className="flex flex-col gap-1.5">
              {buckets.map((b) => (
                <li key={b.star} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 text-xs text-ink/60">
                  <span className="w-3 tabular-nums text-ink/40">{b.star}</span>
                  <span className="h-1.5 overflow-hidden rounded-full bg-ink/5">
                    <span
                      className="block h-full rounded-full bg-amber-500"
                      style={{ width: `${(b.count / maxBucket) * 100}%` }}
                    />
                  </span>
                  <span className="w-6 text-right tabular-nums text-ink/40">{b.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {reviews.map((r) => (
              <ReviewCard key={`${r.author}-${r.title}`} review={r} />
            ))}
          </ul>

          <p className="mt-6 text-xs text-ink/40">
            Rating summary from the App Store; individual reviews shown are a curated selection.
          </p>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: AppReview }) {
  return (
    <li className="flex h-full flex-col rounded-2xl border border-ink/5 bg-stone p-6">
      <div className="flex items-center justify-between gap-3">
        <Stars rating={review.rating} />
        <span className="text-xs text-ink/40">{review.date}</span>
      </div>
      <h4 className="mt-3 font-display text-base font-medium text-ink">{review.title}</h4>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{review.body}</p>
      <p className="mt-4 text-xs text-ink/40">
        {review.author}
        {review.location ? ` · ${review.location}` : ""}
      </p>
    </li>
  );
}

function FaqSection({ app }: { app: AppEntry }) {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-ink/40">
            FAQs
          </h2>
        </div>
        <div className="md:col-span-2">
          <h3 className="mb-10 font-display text-2xl font-light leading-snug text-ink/80">
            Frequently Asked Questions
          </h3>
          <ul className="grid grid-cols-1 gap-8">
            {app.faqs!.map((faq) => (
              <li key={faq.q}>
                <h4 className="font-display text-lg font-medium">{faq.q}</h4>
                <p className="mt-2 leading-relaxed text-ink/60">{faq.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ChangelogSection({ app }: { app: AppEntry }) {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-ink/40">
            Changelog
          </h2>
        </div>
        <div className="md:col-span-2">
          <h3 className="mb-10 font-display text-2xl font-light leading-snug text-ink/80">
            Release notes — what shipped in each version.
          </h3>
          <ol className="flex flex-col gap-10">
            {app.changelog!.map((entry) => (
              <li key={entry.version} className="border-t border-ink/5 pt-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display text-xl font-medium">Version {entry.version}</h4>
                  <span className="text-xs text-ink/40">{entry.date}</span>
                </div>
                <ul className="mt-4 flex flex-col gap-1.5 text-ink/70">
                  {entry.notes.map((n) => (
                    <li key={n} className="flex gap-2 leading-relaxed">
                      <span aria-hidden className="text-ink/30">•</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
                {entry.behind && entry.behind.length > 0 && (
                  <>
                    <p className="mt-5 text-xs font-medium uppercase tracking-widest text-ink/40">
                      Behind the scenes
                    </p>
                    <ul className="mt-2 flex flex-col gap-1.5 text-ink/60">
                      {entry.behind.map((b) => (
                        <li key={b} className="flex gap-2 text-sm leading-relaxed">
                          <span aria-hidden className="text-ink/30">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
