import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { StoreBadges } from "@/components/StoreBadges";
import { APPS, getApp, type AppEntry } from "@/lib/apps-data";

export const Route = createFileRoute("/apps/$slug")({
  loader: ({ params }): { app: AppEntry } => {
    const app = getApp(params.slug);
    if (!app) throw notFound();
    return { app };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "App not found" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { app } = loaderData;
    const title = `${app.name} — ${app.tagline}`;
    return {
      meta: [
        { title },
        { name: "description", content: app.oneLiner },
        { property: "og:title", content: title },
        { property: "og:description", content: app.oneLiner },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/apps/${app.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/apps/${app.slug}` }],
    };
  },
  component: AppDetailPage,
  notFoundComponent: AppNotFound,
});

function AppNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <div className="mx-auto max-w-3xl px-6 pt-40 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">App not found</h1>
        <p className="mt-3 text-muted-foreground">
          That app doesn't exist. Head back to the list.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </div>
    </div>
  );
}

function AppDetailPage() {
  const { app } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-32 sm:pt-40">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All apps
        </Link>

        {/* Hero */}
        <section className="relative mt-8 overflow-hidden rounded-[32px] border border-black/5 bg-white p-8 sm:p-14">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full opacity-30 blur-3xl"
            style={{ backgroundColor: app.accent }}
          />
          <div className="relative grid gap-10 sm:grid-cols-[auto_1fr] sm:items-center">
            <img
              src={app.icon}
              alt={`${app.name} icon`}
              width={160}
              height={160}
              className="h-32 w-32 shrink-0 rounded-[32px] object-cover shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] sm:h-40 sm:w-40"
            />
            <div className="min-w-0">
              <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {app.appStoreUrl && app.playStoreUrl
                  ? "iOS · Android"
                  : app.appStoreUrl
                    ? "iOS · iPadOS"
                    : "Android"}
              </div>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
                {app.name}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground sm:text-xl">
                {app.tagline}
              </p>
              <div className="mt-8">
                <StoreBadges
                  appStoreUrl={app.appStoreUrl}
                  playStoreUrl={app.playStoreUrl}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="mx-auto mt-20 max-w-2xl text-center">
          <p className="text-2xl leading-relaxed tracking-tight text-foreground sm:text-3xl">
            {app.description}
          </p>
        </section>

        {/* Features */}
        <section className="mt-20">
          <div className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Features
          </div>
          <h2 className="mt-2 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need.
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {app.features.map((f, i) => (
              <div
                key={f.title}
                className="rounded-3xl border border-black/5 bg-white p-7"
              >
                <div
                  className="text-xs font-semibold"
                  style={{ color: app.accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why */}
        <section className="mx-auto mt-24 max-w-2xl text-center">
          <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Why it exists
          </div>
          <p className="mt-4 text-xl leading-relaxed text-foreground sm:text-2xl">
            {app.why}
          </p>
          <a
            href={app.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent"
          >
            Visit {app.name.toLowerCase().replace(/\s+/g, "")}.app
            <ExternalLink className="h-4 w-4" />
          </a>
        </section>

        {/* Other apps */}
        <section className="mt-24">
          <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            More apps
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {APPS.filter((a) => a.slug !== app.slug).map((other) => (
              <Link
                key={other.slug}
                to="/apps/$slug"
                params={{ slug: other.slug }}
                className="group flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]"
              >
                <img
                  src={other.icon}
                  alt=""
                  loading="lazy"
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-foreground">
                    {other.name}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {other.tagline}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}