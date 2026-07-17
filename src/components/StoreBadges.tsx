import appStoreBadge from "@/assets/app-store-badge.svg.asset.json";
import googlePlayBadge from "@/assets/google-play-badge.png.asset.json";

type Props = {
  appStore?: string;
  playStore?: string;
  className?: string;
  size?: "sm" | "md";
};

export function StoreBadges({ appStore, playStore, className = "", size = "md" }: Props) {
  const h = size === "sm" ? "h-10" : "h-12";
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {appStore && (
        <a
          href={appStore}
          target="_blank"
          rel="noreferrer"
          aria-label="Download on the App Store"
          className="inline-block transition-opacity hover:opacity-85"
        >
          <img src={appStoreBadge.url} alt="Download on the App Store" className={`${h} w-auto`} />
        </a>
      )}
      {playStore && (
        <a
          href={playStore}
          target="_blank"
          rel="noreferrer"
          aria-label="Get it on Google Play"
          className="inline-block transition-opacity hover:opacity-85"
        >
          <img src={googlePlayBadge.url} alt="Get it on Google Play" className={`${h} w-auto`} />
        </a>
      )}
    </div>
  );
}