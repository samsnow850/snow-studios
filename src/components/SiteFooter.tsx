import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-ink/10 bg-canvas text-ink">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-medium tracking-tight">Snow Studios</p>
            <p className="mt-3 max-w-xs text-sm font-light text-ink/60">
              Independent software by Samuel Snow — quiet, useful, beautifully specific.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/40">Apps</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/apps/$slug" params={{ slug: "sf-popos" }} className="text-ink/70 hover:text-ink">SF POPOS</Link></li>
              <li><Link to="/apps/$slug" params={{ slug: "ny-pops" }} className="text-ink/70 hover:text-ink">NY POPS</Link></li>
              <li><Link to="/apps/$slug" params={{ slug: "shelf-track" }} className="text-ink/70 hover:text-ink">Shelf Track</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/40">Studio</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/" className="text-ink/70 hover:text-ink">Home</Link></li>
              <li><Link to="/about" className="text-ink/70 hover:text-ink">About</Link></li>
              <li><Link to="/contact" className="text-ink/70 hover:text-ink">Contact</Link></li>
              <li><a href="https://www.instagram.com/samsnow850" target="_blank" rel="noreferrer" className="text-ink/70 hover:text-ink">Instagram</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/40">Legal</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/legal/privacy" className="text-ink/70 hover:text-ink">Privacy</Link></li>
              <li><Link to="/legal/terms" className="text-ink/70 hover:text-ink">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-ink/10 pt-6 text-xs text-ink/50 md:flex-row md:items-center">
          <p>© {year} Snow Studios. All rights reserved.</p>
          <p>Designed &amp; built in California.</p>
        </div>
      </div>
    </footer>
  );
}