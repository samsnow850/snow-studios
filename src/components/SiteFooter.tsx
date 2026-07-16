import { Link } from "@tanstack/react-router";
import { APPS } from "@/lib/apps-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-muted/40">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-2">
        <div>
          <div className="text-lg font-semibold tracking-tight text-foreground">
            samuel<span className="text-accent">.</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Small, useful apps that solve real problems. Built with care.
          </p>
        </div>
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Apps
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            {APPS.map((app) => (
              <li key={app.slug}>
                <Link
                  to="/apps/$slug"
                  params={{ slug: app.slug }}
                  className="text-foreground/80 transition-colors hover:text-foreground"
                >
                  {app.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-black/5 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} · Made with obsessive attention to detail.
      </div>
    </footer>
  );
}