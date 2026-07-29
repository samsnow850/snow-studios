import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";

type GateSession = { seoUnlocked?: boolean };

export type { SeoRow, SeoTotals, SeoReport } from "./seo-types";
import type { SeoRow, SeoTotals, SeoReport } from "./seo-types";

function sessionConfig() {
  return {
    password: process.env.SESSION_SECRET!,
    name: "seo-gate",
    maxAge: 60 * 60 * 24 * 7,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

export async function readGate() {
  const session = await useSession<GateSession>(sessionConfig());
  return Boolean(session.data.seoUnlocked);
}

export async function attemptUnlock(password: string) {
  const expected = process.env.SEO_DASHBOARD_PASSWORD;
  if (!expected) throw new Error("SEO_DASHBOARD_PASSWORD is not set");
  const a = createHash("sha256").update(String(password), "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  if (!timingSafeEqual(a, b)) return false;
  const session = await useSession<GateSession>(sessionConfig());
  await session.update({ seoUnlocked: true });
  return true;
}

export async function clearGate() {
  const session = await useSession<GateSession>(sessionConfig());
  await session.clear();
}

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

async function gsc(path: string, init?: { method?: string; body?: unknown }) {
  const res = await fetch(`${GATEWAY}${path}`, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${process.env.LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": `${process.env.GOOGLE_SEARCH_CONSOLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`GSC request failed [${res.status}] ${path}: ${text}`);
    throw new Error(`Search Console request failed [${res.status}]`);
  }
  return text ? JSON.parse(text) : {};
}

function isoDaysAgo(days: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

function mapRows(rows: any[]): SeoRow[] {
  return (rows ?? []).map((r) => ({
    key: String(r.keys?.[0] ?? ""),
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: r.ctr ?? 0,
    position: r.position ?? 0,
  }));
}

function totalsOf(rows: SeoRow[]): SeoTotals {
  const clicks = rows.reduce((s, r) => s + r.clicks, 0);
  const impressions = rows.reduce((s, r) => s + r.impressions, 0);
  const weighted = rows.reduce((s, r) => s + r.position * r.impressions, 0);
  return {
    clicks,
    impressions,
    ctr: impressions ? clicks / impressions : 0,
    position: impressions ? weighted / impressions : 0,
  };
}

export async function buildReport(requestedSite?: string): Promise<SeoReport> {
  const siteList = await gsc("/webmasters/v3/sites");
  const sites: string[] = (siteList.siteEntry ?? []).map((s: any) => s.siteUrl);
  if (sites.length === 0) throw new Error("No verified Search Console properties on the connected account.");
  const preferred = sites.find((s) => s.includes("snowstudios.app")) ?? sites[0];
  const siteUrl = requestedSite && sites.includes(requestedSite) ? requestedSite : preferred;
  const enc = encodeURIComponent(siteUrl);

  const end = isoDaysAgo(1);
  const start = isoDaysAgo(28);
  const prevEnd = isoDaysAgo(29);
  const prevStart = isoDaysAgo(56);

  const query = (body: Record<string, unknown>) =>
    gsc(`/webmasters/v3/sites/${enc}/searchAnalytics/query`, { method: "POST", body });

  const [daily, prevDaily, queries, pages, countries, devices] = await Promise.all([
    query({ startDate: start, endDate: end, dimensions: ["date"], rowLimit: 500 }),
    query({ startDate: prevStart, endDate: prevEnd, dimensions: ["date"], rowLimit: 500 }),
    query({ startDate: start, endDate: end, dimensions: ["query"], rowLimit: 25 }),
    query({ startDate: start, endDate: end, dimensions: ["page"], rowLimit: 25 }),
    query({ startDate: start, endDate: end, dimensions: ["country"], rowLimit: 10 }),
    query({ startDate: start, endDate: end, dimensions: ["device"], rowLimit: 10 }),
  ]);

  const dailyRows = mapRows(daily.rows);
  return {
    siteUrl,
    sites,
    range: { start, end },
    totals: totalsOf(dailyRows),
    previousTotals: totalsOf(mapRows(prevDaily.rows)),
    daily: dailyRows,
    queries: mapRows(queries.rows),
    pages: mapRows(pages.rows),
    countries: mapRows(countries.rows),
    devices: mapRows(devices.rows),
  };
}
