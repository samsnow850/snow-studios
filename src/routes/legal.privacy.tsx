import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { LegalPage } from "@/components/LegalPage";
import { LEGAL_APP_SLUGS } from "@/lib/legal-content";

const search = z.object({
  app: z.enum(LEGAL_APP_SLUGS as [string, ...string[]]).catch("shelf-track"),
});

export const Route = createFileRoute("/legal/privacy")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Samuel Snow apps" },
      { name: "description", content: "We don't collect or sell your data. Privacy policies for SF POPOS, NY POPS, and Shelf Track." },
      { property: "og:title", content: "Privacy Policy — Samuel Snow apps" },
      { property: "og:description", content: "We don't collect or sell your data." },
    ],
  }),
  component: Page,
});

function Page() {
  const { app } = Route.useSearch();
  return <LegalPage app={app as any} kind="privacy" />;
}