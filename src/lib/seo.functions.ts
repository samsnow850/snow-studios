import { createServerFn } from "@tanstack/react-start";
import type { SeoReport } from "./seo-types";

export const unlockSeo = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const { attemptUnlock } = await import("./seo.server");
    return { ok: await attemptUnlock(data.password) };
  });

export const lockSeo = createServerFn({ method: "POST" }).handler(async () => {
  const { clearGate } = await import("./seo.server");
  await clearGate();
  return { ok: true as const };
});

export const getSeoStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { readGate } = await import("./seo.server");
  return { unlocked: await readGate() };
});

export const getSeoReport = createServerFn({ method: "POST" })
  .inputValidator((data: { siteUrl?: string } | undefined) => data ?? {})
  .handler(async ({ data }): Promise<SeoReport> => {
    const { readGate, buildReport } = await import("./seo.server");
    if (!(await readGate())) throw new Error("Locked");
    return buildReport(data.siteUrl);
  });
