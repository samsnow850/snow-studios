import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { AppEntry } from "@/lib/apps-data";

export function AppCard({ app }: { app: AppEntry }) {
  return (
    <Link
      to="/apps/$slug"
      params={{ slug: app.slug }}
      className="group relative flex flex-col overflow-hidden rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]"
    >
      <div className="flex items-center gap-4">
        <img
          src={app.icon}
          alt={`${app.name} icon`}
          loading="lazy"
          width={72}
          height={72}
          className="h-16 w-16 rounded-2xl object-cover shadow-sm"
        />
        <div className="min-w-0">
          <h3 className="truncate text-xl font-semibold tracking-tight text-foreground">
            {app.name}
          </h3>
          <p className="truncate text-sm text-muted-foreground">{app.tagline}</p>
        </div>
      </div>

      <p className="mt-6 text-[15px] leading-relaxed text-foreground/80">
        {app.oneLiner}
      </p>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {app.appStoreUrl && <span>iOS</span>}
          {app.appStoreUrl && app.playStoreUrl && <span>·</span>}
          {app.playStoreUrl && <span>Android</span>}
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
          Learn more
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60"
        style={{ backgroundColor: app.accent }}
      />
    </Link>
  );
}