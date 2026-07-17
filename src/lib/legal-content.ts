import { apps, type AppEntry } from "@/data/apps";

export type LegalKind = "privacy" | "terms";

export const LEGAL_APP_SLUGS = apps.map((a) => a.slug) as AppEntry["slug"][];

export const isLegalApp = (v: unknown): v is AppEntry["slug"] =>
  typeof v === "string" && (LEGAL_APP_SLUGS as string[]).includes(v);

type Section = { heading: string; body: string[] };
export type LegalDoc = {
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
  contactEmail: string;
};

const SHARED_NOTE =
  "We don't collect or sell your data. Any data tied to your account exists only to make the app work for you across your devices.";

export function getLegal(app: AppEntry["slug"], kind: LegalKind): LegalDoc {
  if (app === "sf-popos") return kind === "privacy" ? sfPrivacy : sfTerms;
  if (app === "ny-pops") return kind === "privacy" ? nyPrivacy : nyTerms;
  return kind === "privacy" ? stPrivacy : stTerms;
}

// ---------- SF POPOS ----------
const sfPrivacy: LegalDoc = {
  title: "Privacy Policy",
  updated: "October 21, 2025",
  intro:
    "At SF POPOS, your privacy matters. We don't collect, sell, or share your personal information with anyone. The app doesn't require accounts, logins, or authentication of any kind.",
  contactEmail: "support@sfpopos.app",
  sections: [
    { heading: "Information we collect", body: ["We don't collect any personal data. SF POPOS is designed to be used anonymously — just open the app and start exploring San Francisco's Privately Owned Public Open Spaces (POPOS)."] },
    { heading: "How we use information", body: ["Because we don't collect any personal information, there's nothing for us to use, share, or analyze. The app exists solely to provide information about POPOS."] },
    { heading: "Data security", body: ["We take reasonable steps to protect the app and its infrastructure. Since no personal data is collected or stored, there's no sensitive information at risk."] },
    { heading: "Third-party services", body: ["SF POPOS does not use third-party logins, analytics, or tracking services. Everything runs independently without outside user management systems."] },
    { heading: "Our commitment", body: [SHARED_NOTE] },
  ],
};

const sfTerms: LegalDoc = {
  title: "Terms & Conditions",
  updated: "September 17, 2025",
  intro: "By using SF POPOS, you agree to these Terms & Conditions. If you don't agree, please do not use the app.",
  contactEmail: "support@sfpopos.app",
  sections: [
    { heading: "License to use", body: [
      "We grant you permission to use SF POPOS for personal, non-commercial purposes. This license does not allow you to:",
      "• Copy, modify, or redistribute the app's content",
      "• Use the app for commercial purposes or public display",
      "• Attempt to reverse engineer the software",
      "• Remove any copyright or proprietary notices",
    ] },
    { heading: "Service description", body: ["SF POPOS is a free mobile app that helps you find and explore San Francisco's Privately Owned Public Open Spaces. It provides information only — no accounts or personal data are involved."] },
    { heading: "User conduct", body: ["You agree to use SF POPOS responsibly and only in ways that are legal and respectful of others."] },
    { heading: "Disclaimer", body: ["SF POPOS is provided \u201Cas is.\u201D We make no guarantees about accuracy, completeness, or availability of the information. Use the app at your own risk."] },
    { heading: "Data attribution", body: ["Information about POPOS comes from the San Francisco Planning Department and SPUR. We thank and acknowledge them for making this data available."] },
  ],
};

// ---------- NY POPS ----------
const nyPrivacy: LegalDoc = {
  title: "Privacy Policy",
  updated: "March 11, 2026",
  intro:
    "NY POPS only collects the information needed for the app to function. We never sell or share your data with advertisers or data brokers. Signing in with Google or Apple is optional — you can delete your account and all associated data at any time from the app settings.",
  contactEmail: "support@snowstudios.app",
  sections: [
    { heading: "Information we collect", body: [
      "Contact information such as your name and email address when you create an account through Google or Apple Sign-In. This is used to create your profile and identify you when you leave reviews or appear on leaderboards.",
      "User content such as photos you upload, reviews you write, captions, notes, profile pictures, and bio text. This also includes location reports and issue submissions you send through the app.",
      "Identifiers such as a unique user ID and a push notification token if you enable notifications.",
      "Usage data such as your saved favorites and review votes so the app can provide its features and personalize your experience.",
    ] },
    { heading: "How we use your data", body: ["Your information is used only to run the app and its features. Your name may appear on your public profile, reviews, and leaderboards. We do not use your data for advertising, tracking, or marketing."] },
    { heading: "What we do not do", body: [
      "• We do not sell your data.",
      "• We do not share data with advertisers.",
      "• We do not track your physical location.",
      "• We do not send marketing emails.",
      "• We do not use tracking software or advertising identifiers.",
    ] },
    { heading: "Third-party sign-in", body: ["Google and Apple sign-in are optional. If you use them, those companies may process some of your data according to their own policies. We only receive the basic information they provide, such as your name and email, so your account can work inside NY POPS."] },
    { heading: "Your control", body: ["You can delete your account at any time from the settings menu. When you delete your account, all of your data is permanently removed. Push notifications are optional and can be turned off at any time."] },
    { heading: "Security", body: ["Passwords are not stored by the app because sign-in is handled through Google or Apple. All connections use secure HTTPS encryption."] },
  ],
};

const nyTerms: LegalDoc = {
  title: "Terms & Conditions",
  updated: "March 11, 2026",
  intro: "NY POPS helps you discover Privately Owned Public Spaces throughout New York City. These are simple terms that explain how the app works.",
  contactEmail: "support@snowstudios.app",
  sections: [
    { heading: "Privacy", body: ["We do not sell, share, or monetize your personal data. The app does not use advertising or tracking. Your information stays with you. For more details, see the Privacy Policy."] },
    { heading: "Accounts", body: ["Creating an account allows you to save favorites, write reviews, and appear on leaderboards. You can delete your account and all associated data at any time from the app settings."] },
    { heading: "User content", body: ["Photos, reviews, and other contributions you submit may be visible to other users. You keep ownership of the content you create. By submitting content, you allow us to display it within the app. Community contributions may be reviewed before they are published."] },
    { heading: "Community guidelines", body: ["Please be respectful to other users. Do not post inappropriate, offensive, or misleading content. Do not submit spam or fake reviews. Violations may lead to account suspension."] },
    { heading: "Fair use", body: ["Use the app responsibly. Do not abuse the service, automate requests, or use it for commercial purposes without permission."] },
    { heading: "Disclaimer", body: ["We try to keep all information accurate, but we cannot guarantee that everything is always up to date. Hours, amenities, and access to spaces may change. It is best to verify details before visiting."] },
  ],
};

// ---------- Shelf Track ----------
const stPrivacy: LegalDoc = {
  title: "Privacy Policy",
  updated: "May 3, 2026",
  intro:
    "Shelf Track does not collect or sell your personal data. We don't collect your data. We don't sell your data. Your shelves and items are stored under your own account so they can sync across your devices — nothing more.",
  contactEmail: "support@snowstudios.app",
  sections: [
    { heading: "What we store", body: [
      "When you use Shelf Track, the following information is stored against your account so the app can work across your devices:",
      "• Your shelves, items, quantities, and ordering-list status.",
      "• Optional photos or SF Symbols you attach to items.",
      "• Your in-app preferences (appearance, notifications).",
      "• Basic account info from your sign-in provider (Apple or Google): a user ID, email, and optional display name / profile photo.",
      "That's it. We do not collect contacts, location, browsing history, advertising identifiers, or any other personal data.",
    ] },
    { heading: "What we do NOT do", body: [
      "• We do not sell your data. Ever. To anyone.",
      "• We do not share your data with advertisers or data brokers.",
      "• We do not use analytics or tracking SDKs to profile you.",
      "• We do not read your inventory. Your data is yours.",
    ] },
    { heading: "How sign-in works", body: ["Shelf Track uses Sign in with Apple or Sign in with Google through Firebase Authentication. These providers handle authentication and return a unique user ID that ties your inventory to your account. Apple and Google's own privacy policies apply to the sign-in step."] },
    { heading: "Where your data lives", body: ["Your inventory data is stored in Google Firebase (Cloud Firestore for shelves and items, Cloud Storage for images). Firebase is a Google service and acts as our data processor. A local copy is also cached on your device using SwiftData so the app stays fast and works with already-loaded data offline."] },
    { heading: "Deleting your account and data", body: [
      "You can delete your account directly from Settings inside Shelf Track. After re-authenticating, the app removes:",
      "• All your Firestore documents (shelves, items, preferences, product names).",
      "• All your uploaded images in Cloud Storage.",
      "• Your Firebase Authentication user record.",
      "• The local cache on the device.",
      "If you'd prefer we handle the deletion for you, email support@snowstudios.app from the address tied to your account.",
    ] },
    { heading: "Children", body: ["Shelf Track is not directed to children under 13. We don't knowingly collect information from children."] },
  ],
};

const stTerms: LegalDoc = {
  title: "Terms of Use",
  updated: "May 3, 2026",
  intro: "The simple terms for using Shelf Track. Use the app responsibly and we'll keep building it for you. By downloading or using Shelf Track, you agree to these terms.",
  contactEmail: "support@snowstudios.app",
  sections: [
    { heading: "Your account", body: ["Shelf Track requires sign-in with Apple or Google. You're responsible for keeping your account credentials secure and for the activity that happens under your account."] },
    { heading: "Your content", body: [
      "You own everything you put into Shelf Track — your shelves, items, photos, and notes. We only store it so the app can show it back to you on your devices. See the Privacy Policy for details.",
      "You agree not to upload illegal content, content that infringes someone else's rights, or content that violates Apple's App Store guidelines.",
    ] },
    { heading: "Acceptable use", body: [
      "• Don't try to break, reverse-engineer, or attack the service.",
      "• Don't abuse the sync system (e.g., automated bulk uploads, spam).",
      "• Don't use the app to harass anyone or store harmful material.",
    ] },
    { heading: "Service availability", body: ["Shelf Track is provided \u201Cas is.\u201D We work hard to keep sync running smoothly, but we don't guarantee uninterrupted service. Features may be added, changed, or removed over time."] },
    { heading: "Pricing", body: ["Shelf Track is currently free to download. If paid features are introduced in the future, pricing and billing will be handled through the App Store and clearly disclosed before you're charged."] },
    { heading: "Termination", body: ["You can stop using Shelf Track and delete your account anytime from Settings. We may suspend or terminate accounts that violate these terms."] },
    { heading: "Liability", body: ["To the fullest extent allowed by law, Shelf Track and Samuel Snow are not liable for indirect or consequential damages arising from your use of the app. Your sole remedy if you're unhappy with the app is to stop using it."] },
    { heading: "Changes", body: ["We may update these terms occasionally. Continued use of the app after changes means you accept the new terms."] },
  ],
};