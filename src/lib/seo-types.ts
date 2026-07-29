export type SeoRow = { key: string; clicks: number; impressions: number; ctr: number; position: number };
export type SeoTotals = { clicks: number; impressions: number; ctr: number; position: number };
export type SeoReport = {
  siteUrl: string;
  sites: string[];
  range: { start: string; end: string };
  totals: SeoTotals;
  previousTotals: SeoTotals;
  daily: SeoRow[];
  queries: SeoRow[];
  pages: SeoRow[];
  countries: SeoRow[];
  devices: SeoRow[];
};
