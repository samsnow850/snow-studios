import sfPoposImage from "@/assets/app-sf-popos.jpg";
import nyPopsImage from "@/assets/app-ny-pops.jpg";
import shelfTrackImage from "@/assets/app-shelf-track.jpg";
import sfPoposHome from "@/assets/sfpopos-homepage.png.asset.json";
import sfPoposMap from "@/assets/sfpopos-map.png.asset.json";
import sfPoposDetail from "@/assets/sfpopos-detail.png.asset.json";
import sfPoposFavorites from "@/assets/sfpopos-favorites.png.asset.json";
import sfPoposLogo from "@/assets/sfpopos-logo.png.asset.json";
import nyPopsLogo from "@/assets/nypops-logo.png.asset.json";

export type AppPlatform = "iOS" | "Android" | "Universal";

export type AppReview = {
  author: string;
  location?: string;
  rating: number; // 1-5
  title: string;
  body: string;
  date: string; // display string like "Mar 2025"
};

export type AppEntry = {
  slug: "sf-popos" | "ny-pops" | "shelf-track";
  name: string;
  tagline: string;
  short: string;
  long: string;
  platforms: AppPlatform[];
  appStore?: string;
  playStore?: string;
  itunesId?: string;
  image: string;
  imageAspect: "4/5" | "21/9";
  logo?: string;
  screenshots?: { src: string; label: string }[];
  features: { title: string; body: string }[];
  reviews: AppReview[];
};

export const apps: AppEntry[] = [
  {
    slug: "sf-popos",
    name: "SF POPOS",
    tagline: "A field guide to San Francisco's hidden public spaces.",
    short: "80+ Privately Owned Public Open Spaces in San Francisco — mapped, searchable, and always in your pocket.",
    long: "Downtown San Francisco is full of rooftop terraces, quiet gardens, and sunlit atriums that most people walk right past. SF POPOS maps every single one — over 80 privately owned public open spaces — so you can find a place to sit, read, or take a break wherever you are.",
    platforms: ["iOS", "Android"],
    appStore: "https://apps.apple.com/us/app/sf-popos/id6749281919",
    itunesId: "6749281919",
    playStore: "https://play.google.com/store/apps/details?id=com.sfpopos.app",
    image: sfPoposImage,
    imageAspect: "4/5",
    logo: sfPoposLogo.url,
    screenshots: [
      { src: sfPoposHome.url, label: "Browse" },
      { src: sfPoposMap.url, label: "Map" },
      { src: sfPoposDetail.url, label: "Details" },
      { src: sfPoposFavorites.url, label: "Favorites" },
    ],
    features: [
      { title: "Every space, one app", body: "Access all 80+ POPOS across San Francisco in a single, focused map." },
      { title: "Spots near you", body: "An interactive map surfaces hidden gems right around the corner." },
      { title: "Save your favorites", body: "Bookmark the spaces you love and return to them anytime." },
    ],
    reviews: [
      {
        author: "Maya R.",
        location: "San Francisco, CA",
        rating: 5,
        title: "My favorite lunch-break tool",
        body: "I work in FiDi and had no idea half these rooftops existed. Now I've got a rotation of quiet spots for coffee. The map is fast and the descriptions are honest.",
        date: "Feb 2026",
      },
      {
        author: "danielk",
        location: "Oakland, CA",
        rating: 5,
        title: "Actually useful, actually simple",
        body: "No accounts, no ads, no fluff. Just every POPOS in the city with clear info. Exactly what a small, focused app should feel like.",
        date: "Jan 2026",
      },
      {
        author: "Priya S.",
        rating: 4,
        title: "Great for tourists too",
        body: "Used this on a weekend trip. Found beautiful atriums I would never have walked into otherwise. Would love filters for restrooms and wifi someday.",
        date: "Dec 2025",
      },
      {
        author: "j_walters",
        location: "SoMa",
        rating: 5,
        title: "Local gem",
        body: "It's clear a real person made this. The little notes on each space feel curated, not scraped. Highly recommend.",
        date: "Nov 2025",
      },
    ],
  },
  {
    slug: "ny-pops",
    name: "NY POPS",
    tagline: "New York has hidden places. Here's how to find them.",
    short: "The best clean, free, and quiet public spaces across New York City — from atriums to plazas.",
    long: "NY POPS is a curated guide to New York's Privately Owned Public Spaces — the plazas, arcades, and indoor atriums that stay open to the public. Great for finding somewhere to sit, work, or duck out of the weather.",
    platforms: ["iOS", "Android"],
    appStore: "https://apps.apple.com/us/app/ny-pops/id6760239983",
    itunesId: "6760239983",
    playStore: "https://play.google.com/store/apps/details?id=com.samuelsnow.nypops",
    image: nyPopsImage,
    imageAspect: "4/5",
    logo: nyPopsLogo.url,
    features: [
      { title: "Hidden places, mapped", body: "Hundreds of public spaces across Manhattan and the boroughs." },
      { title: "Clean, free, quiet", body: "Filter for the qualities that matter when you need a break." },
      { title: "Built for the city", body: "Fast, offline-friendly, and native on both iOS and Android." },
    ],
    reviews: [
      {
        author: "Alex T.",
        location: "Manhattan, NY",
        rating: 5,
        title: "A New Yorker's best friend",
        body: "I've lived here 12 years and still discover a new plaza every week with this. The atriums saved me during that heat wave in July.",
        date: "Feb 2026",
      },
      {
        author: "brooklyn_bea",
        rating: 5,
        title: "Quiet spots are gold",
        body: "The filter for clean and quiet is the whole reason I downloaded it. Perfect for calls between meetings. Never been let down.",
        date: "Jan 2026",
      },
      {
        author: "Marcus D.",
        location: "Queens, NY",
        rating: 4,
        title: "Solid and getting better",
        body: "Good coverage in Manhattan. Would love more Queens and Brooklyn spots but the team is clearly adding to it.",
        date: "Dec 2025",
      },
      {
        author: "Elena K.",
        rating: 5,
        title: "Design is beautiful",
        body: "Feels like a native New York app. Fast, clean, and doesn't try to be a social network. Just a great utility.",
        date: "Oct 2025",
      },
    ],
  },
  {
    slug: "shelf-track",
    name: "Shelf Track",
    tagline: "Track stock, manage shelves.",
    short: "A fast iOS home inventory app — shelves, quantities, photos, ordering lists, and sync across devices.",
    long: "Shelf Track is a home inventory app built for real homes. Give every item a shelf and a count, snap a photo or pick a symbol, and swipe items between On shelf, Need to order, and Ordered. Everything syncs across your iPhone and iPad.",
    platforms: ["iOS"],
    appStore: "https://apps.apple.com/us/app/shelf-track-inventory-tracking/id6761561265",
    itunesId: "6761561265",
    image: shelfTrackImage,
    imageAspect: "21/9",
    features: [
      { title: "Shelves your way", body: "Pantry, garage, bins, closets — name them anything. Items belong to one shelf and stay easy to find." },
      { title: "Quantities & quick adjust", body: "1 to 99,999. Tap the stepper on the item screen to bump counts without opening a full editor." },
      { title: "Photos or symbols", body: "Snap from camera, pick from library, or choose any SF Symbol. Spot items at a glance." },
      { title: "Search, filter, sort", body: "Search by name, filter by shelf, and sort by name, shelf, quantity, or date added." },
      { title: "Ordering lists", body: "Three states: On shelf, Need to order, Ordered. Swipe right to move items between them." },
      { title: "Sync across devices", body: "Sign in with Apple or Google. Inventory, photos, and preferences follow you everywhere." },
    ],
    reviews: [
      {
        author: "Hannah W.",
        rating: 5,
        title: "Finally, a home inventory app that fits",
        body: "I've tried five of these. Shelf Track is the only one I actually opened again the next day. The swipe between 'on shelf' and 'need to order' is genius.",
        date: "Feb 2026",
      },
      {
        author: "gregp",
        rating: 5,
        title: "Perfect for the garage",
        body: "Bins, screws, filters — I finally know what I have before I go to the hardware store. Photos + counts is all I needed.",
        date: "Jan 2026",
      },
      {
        author: "Sana M.",
        rating: 4,
        title: "Beautiful and fast",
        body: "iCloud sync just works between my iPhone and iPad. Would love a Mac app someday, but this is already the best in the category.",
        date: "Dec 2025",
      },
      {
        author: "the_pantry",
        rating: 5,
        title: "Pantry sanity restored",
        body: "SF Symbols instead of photos for pantry items is such a small touch and it makes the whole app feel considered.",
        date: "Nov 2025",
      },
    ],
  },
];

export const getApp = (slug: AppEntry["slug"]) => apps.find((a) => a.slug === slug)!;
