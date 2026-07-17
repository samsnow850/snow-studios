import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { LegalPage } from "@/components/LegalPage";
import { LEGAL_APP_SLUGS } from "@/lib/legal-content";

const search = z.object({
  app: z.enum(LEGAL_APP_SLUGS as [string, ...string[]]).catch("shelf-track"),
});

export const Route = createFileRoute("/legal/terms")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Terms of Use — Samuel Snow apps" },
      { name: "description", content: "Terms of use for SF POPOS, NY POPS, and Shelf Track." },
      { property: "og:title", content: "Terms of Use — Samuel Snow apps" },
      { property: "og:description", content: "Terms of use for SF POPOS, NY POPS, and Shelf Track." },
    ],
  }),
  component: Page,
});

function Page() {
  const { app } = Route.useSearch();
  return <LegalPage app={app as any} kind="terms" />;
}