import iconSfpopos from "@/assets/icon-sfpopos.jpg";
import iconNypops from "@/assets/icon-nypops.jpg";
import iconShelftrack from "@/assets/icon-shelftrack.jpg";

export type AppEntry = {
  slug: "sf-popos" | "ny-pops" | "shelf-track";
  name: string;
  tagline: string;
  oneLiner: string;
  description: string;
  icon: string;
  accent: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  externalUrl: string;
  features: { title: string; body: string }[];
  why: string;
};

export const APPS: AppEntry[] = [
  {
    slug: "sf-popos",
    name: "SF POPOS",
    tagline: "San Francisco's hidden public spaces.",
    oneLiner: "Find all 80+ Privately Owned Public Open Spaces across San Francisco.",
    description:
      "SF POPOS makes San Francisco's network of hidden rooftops, plazas, and atriums easy to explore. Browse every space on an interactive map, filter by what's nearby, and save the ones you love.",
    icon: iconSfpopos,
    accent: "#e85d3a",
    appStoreUrl: "https://apps.apple.com/us/app/sf-popos/id6749281919",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.sfpopos.app",
    externalUrl: "https://sfpopos.app",
    features: [
      {
        title: "Explore every space",
        body: "Access all 80+ POPOS across San Francisco in one place.",
      },
      {
        title: "Find spots near you",
        body: "An interactive map surfaces hidden gems right around the corner.",
      },
      {
        title: "Save your favorites",
        body: "Bookmark the spaces you love and jump back in anytime.",
      },
    ],
    why: "San Francisco has hundreds of public rooftops, plazas, and atriums hiding in plain sight — the city just doesn't make them easy to find. SF POPOS puts every one of them a tap away.",
  },
  {
    slug: "ny-pops",
    name: "NY POPS",
    tagline: "New York's hidden public places.",
    oneLiner: "The best clean, free public spaces across New York City.",
    description:
      "NY POPS brings NYC's overlooked parks, atriums, and plazas together in one map — so wherever you are in the city, you're a short walk from somewhere quiet.",
    icon: iconNypops,
    accent: "#1e3a8a",
    appStoreUrl: "https://apps.apple.com/us/app/ny-pops/id6760239983",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.samuelsnow.nypops",
    externalUrl: "https://nypops.app",
    features: [
      {
        title: "Real places, real numbers",
        body: "Hundreds of hidden public spaces surfaced last month alone.",
      },
      {
        title: "Map-first discovery",
        body: "Open the map and see what's near you, right now.",
      },
      {
        title: "Free and clean",
        body: "Every listing is a public space you can actually walk into.",
      },
    ],
    why: "New York rewards people who know where to look. NY POPS is that shortcut — hundreds of clean, free, quiet spots the guidebooks never mention.",
  },
  {
    slug: "shelf-track",
    name: "Shelf Track",
    tagline: "Track stock, manage shelves.",
    oneLiner:
      "A fast iOS home inventory app for pantries, garages, and everything in between.",
    description:
      "Shelf Track keeps a running count of what's on every shelf — pantry, garage, closets, bins — with photos, quick adjust, and a built-in ordering list that follows you across iPhone and iPad.",
    icon: iconShelftrack,
    accent: "#7d9b76",
    appStoreUrl:
      "https://apps.apple.com/us/app/shelf-track-inventory-tracking/id6761561265",
    externalUrl: "https://shelftrackapp.lovable.app",
    features: [
      {
        title: "Shelves your way",
        body: "Pantry, garage, bins, closets — name them anything. Items belong to one shelf and stay easy to find.",
      },
      {
        title: "Quantities & quick adjust",
        body: "1 to 99,999. Tap the stepper on the item screen to bump counts without opening a full editor.",
      },
      {
        title: "Photos or symbols",
        body: "Snap from camera, pick from library, or choose any SF Symbol. Spot items at a glance.",
      },
      {
        title: "Search, filter, sort",
        body: "Search by name, filter by shelf, and sort by name, shelf, quantity, or date added.",
      },
      {
        title: "Ordering lists",
        body: "Three states: On shelf, Need to order, Ordered. Swipe right to move items between them.",
      },
      {
        title: "Sync across devices",
        body: "Sign in with Apple or Google. Inventory, photos, and preferences follow you everywhere.",
      },
    ],
    why: "Every home already runs on inventory — you just track it in your head until you forget. Shelf Track is a calmer place to keep that list.",
  },
];

export const getApp = (slug: string) =>
  APPS.find((a) => a.slug === slug);