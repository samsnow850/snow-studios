import { createServerFn } from "@tanstack/react-start";

export type AppMeta = {
  version: string | null;
  updated: string | null; // ISO date
  rating: number | null;
  ratingCount: number | null;
};

export const getAppMeta = createServerFn({ method: "GET" })
  .inputValidator((input: { itunesId: string }) => {
    if (!/^\d+$/.test(input.itunesId)) throw new Error("Invalid itunesId");
    return input;
  })
  .handler(async ({ data }): Promise<AppMeta> => {
    const empty: AppMeta = { version: null, updated: null, rating: null, ratingCount: null };
    try {
      const res = await fetch(
        `https://itunes.apple.com/lookup?id=${data.itunesId}`,
        { headers: { accept: "application/json" } },
      );
      if (!res.ok) return empty;
      const json = (await res.json()) as {
        results?: Array<{
          version?: string;
          currentVersionReleaseDate?: string;
          averageUserRating?: number;
          userRatingCount?: number;
        }>;
      };
      const r = json.results?.[0];
      return {
        version: r?.version ?? null,
        updated: r?.currentVersionReleaseDate ?? null,
        rating: typeof r?.averageUserRating === "number" ? r.averageUserRating : null,
        ratingCount: typeof r?.userRatingCount === "number" ? r.userRatingCount : null,
      };
    } catch {
      return empty;
    }
  });
