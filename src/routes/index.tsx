import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { AppCard } from "@/components/AppCard";
import { APPS } from "@/lib/apps-data";
import avatarMe from "@/assets/avatar-me.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Samuel — Small apps that solve real problems" },
      {
        name: "description",
        content:
          "Indie developer building useful, polished mobile apps. Home for SF POPOS, NY POPS, and Shelf Track.",
      },
      {
        property: "og:title",
        content: "Samuel — Small apps that solve real problems",
      },
      {
        property: "og:description",
        content:
          "Indie developer building useful, polished mobile apps. Home for SF POPOS, NY POPS, and Shelf Track.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <main>
        {/* Hero */}
        <section className="relative mx-auto max-w-5xl px-6 pt-40 sm:pt-48">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Independent developer · Shipping now
            </div>
            <h1 className="mt-8 text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
              Small apps that
              <br />
              solve <span className="text-accent">real problems.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
              I design and build focused mobile apps — thoughtful, fast, and
              easy to live with.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#apps"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                See the apps
              </a>
              <a
                href="#about"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-black/10 bg-white px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                About me
              </a>
            </div>
          </div>

          {/* App icon showcase */}
          <div className="mt-20 flex items-center justify-center gap-4 sm:gap-6">
            {APPS.map((app, i) => (
              <img
                key={app.slug}
                src={app.icon}
                alt={`${app.name} icon`}
                width={120}
                height={120}
                className={`h-20 w-20 rounded-2xl object-cover shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] sm:h-28 sm:w-28 sm:rounded-[26px] ${
                  i === 1 ? "translate-y-[-8px] sm:translate-y-[-14px]" : ""
                }`}
              />
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto mt-40 max-w-4xl px-6">
          <div className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            About
          </div>
          <div className="mt-8 grid gap-10 sm:grid-cols-[auto_1fr] sm:items-center">
            <img
              src={avatarMe}
              alt="Portrait"
              width={160}
              height={160}
              loading="lazy"
              className="mx-auto h-32 w-32 rounded-full object-cover shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] sm:h-40 sm:w-40"
            />
            <p className="text-center text-xl leading-relaxed tracking-tight text-foreground sm:text-left sm:text-2xl">
              I'm a developer who enjoys building useful, polished apps that
              solve real problems. I focus on creating simple, thoughtful
              experiences and turning ideas into products people can actually
              use.
            </p>
          </div>
        </section>

        {/* Apps grid */}
        <section id="apps" className="mx-auto mt-40 max-w-6xl px-6">
          <div className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Apps
          </div>
          <h2 className="mx-auto mt-3 max-w-2xl text-center text-4xl font-semibold tracking-tight sm:text-5xl">
            Three apps.<br className="sm:hidden" /> One idea each.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-muted-foreground">
            Every app is built to do one thing genuinely well.
          </p>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {APPS.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>
        </section>

        {/* Closing */}
        <section className="mx-auto mt-40 max-w-3xl px-6 pb-32 text-center">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            More coming soon.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Always shipping something small and useful next.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
