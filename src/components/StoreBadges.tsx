type Props = {
  appStoreUrl?: string;
  playStoreUrl?: string;
  size?: "sm" | "md";
};

export function StoreBadges({ appStoreUrl, playStoreUrl, size = "md" }: Props) {
  const cls =
    size === "sm"
      ? "h-10 px-4 text-xs"
      : "h-12 px-5 text-sm";
  return (
    <div className="flex flex-wrap items-center gap-3">
      {appStoreUrl && (
        <a
          href={appStoreUrl}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-2 rounded-full bg-foreground font-medium text-background transition-transform hover:-translate-y-0.5 ${cls}`}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M17.564 12.646c-.02-2.06 1.68-3.05 1.756-3.098-.957-1.396-2.446-1.586-2.976-1.608-1.267-.128-2.472.746-3.115.746-.643 0-1.633-.727-2.687-.706-1.383.02-2.66.803-3.374 2.036-1.44 2.494-.368 6.19 1.036 8.219.687.994 1.505 2.109 2.577 2.07 1.037-.041 1.428-.671 2.681-.671 1.253 0 1.606.671 2.702.649 1.117-.02 1.822-1.014 2.505-2.012.79-1.153 1.117-2.27 1.137-2.328-.025-.011-2.181-.836-2.202-3.297zM15.51 6.487c.568-.69.952-1.647.847-2.6-.82.033-1.813.545-2.4 1.234-.527.61-.988 1.584-.864 2.52.914.07 1.848-.464 2.417-1.154z" />
          </svg>
          App Store
        </a>
      )}
      {playStoreUrl && (
        <a
          href={playStoreUrl}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-2 rounded-full border border-black/10 bg-white font-medium text-foreground transition-transform hover:-translate-y-0.5 ${cls}`}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M3.6 2.3c-.4.3-.6.8-.6 1.4v16.6c0 .6.2 1.1.6 1.4l9.4-9.7L3.6 2.3zm10.5 8.7l2.7-2.7L5.4 2l8.7 9zm0 2l-8.7 9 11.4-6.4-2.7-2.6zm5.5-3.2l-2.6 1.5-3.1 3.1 3.1 3.1 2.6 1.5c1.1-.6 1.1-2 0-2.6l-.7-.4c1.1-.7 1.1-2.1 0-2.7l.7-.4c1.1-.6 1.1-2 0-2.6-.1 0-.1 0 0-.5z" />
          </svg>
          Google Play
        </a>
      )}
    </div>
  );
}