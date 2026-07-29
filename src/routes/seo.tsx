import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getSeoReport, getSeoStatus, lockSeo, unlockSeo } from "@/lib/seo.functions";
import type { SeoRow, SeoTotals } from "@/lib/seo-types";

export const Route = createFileRoute("/seo")({
  head: () => ({
    meta: [
      { title: "SEO Dashboard — Snow Studios" },
      { name: "description", content: "Private search performance dashboard for Snow Studios apps." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "SEO Dashboard — Snow Studios" },
      { property: "og:description", content: "Private search performance dashboard for Snow Studios apps." },
    ],
  }),
  component: SeoPage,
});

function SeoPage() {
  const statusFn = useServerFn(getSeoStatus);
  const status = useQuery({ queryKey: ["seo-status"], queryFn: () => statusFn() });

  if (status.isLoading) {
    return <Shell><p className="text-ink/50">Loading…</p></Shell>;
  }
  return status.data?.unlocked ? <Dashboard /> : <Unlock />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas pb-40 text-ink">
      <div className="mx-auto max-w-6xl px-6 pt-28 md:pt-36">{children}</div>
    </div>
  );
}

function Unlock() {
  const qc = useQueryClient();
  const unlock = useServerFn(unlockSeo);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const mutation = useMutation({
    mutationFn: (pw: string) => unlock({ data: { password: pw } }),
    onSuccess: (res) => {
      if (res.ok) qc.invalidateQueries({ queryKey: ["seo-status"] });
      else setError(true);
    },
  });

  return (
    <Shell>
      <div className="mx-auto max-w-sm pt-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-ink/40">Private</p>
        <h1 className="font-display text-4xl font-light leading-[1.05] tracking-tight">SEO Dashboard</h1>
        <p className="mt-4 text-sm text-ink/50">Enter the password to view search performance.</p>
        <form
          className="mt-8 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setError(false);
            mutation.mutate(password);
          }}
        >
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-2xl border border-ink/10 bg-stone px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/30 focus:border-ink/30"
          />
          {error && <p className="text-sm text-red-500">Incorrect password.</p>}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded-2xl bg-ink px-4 py-3 text-sm font-medium text-canvas disabled:opacity-50"
          >
            {mutation.isPending ? "Checking…" : "Unlock"}
          </button>
        </form>
      </div>
    </Shell>
  );
}

const nf = new Intl.NumberFormat("en-US");
const fmt = {
  clicks: (n: number) => nf.format(Math.round(n)),
  impressions: (n: number) => nf.format(Math.round(n)),
  ctr: (n: number) => `${(n * 100).toFixed(2)}%`,
  position: (n: number) => n.toFixed(1),
};

function Dashboard() {
  const qc = useQueryClient();
  const reportFn = useServerFn(getSeoReport);
  const lockFn = useServerFn(lockSeo);
  const [site, setSite] = useState<string | undefined>(undefined);

  const report = useQuery({
    queryKey: ["seo-report", site ?? "default"],
    queryFn: () => reportFn({ data: { siteUrl: site } }),
    retry: false,
  });

  if (report.isLoading) return <Shell><p className="text-ink/50">Loading Search Console data…</p></Shell>;
  if (report.isError)
    return (
      <Shell>
        <p className="text-sm text-red-500">
          Couldn’t load Search Console data: {(report.error as Error).message}
        </p>
      </Shell>
    );

  const d = report.data!;
  const metrics: { label: string; key: keyof SeoTotals; format: (n: number) => string; invert?: boolean }[] = [
    { label: "Clicks", key: "clicks", format: fmt.clicks },
    { label: "Impressions", key: "impressions", format: fmt.impressions },
    { label: "Average CTR", key: "ctr", format: fmt.ctr },
    { label: "Average position", key: "position", format: fmt.position, invert: true },
  ];

  const chartData = d.daily.map((r) => ({
    date: r.key,
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr * 100,
    position: r.position,
  }));

  return (
    <Shell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-ink/40">Search performance</p>
          <h1 className="font-display text-4xl font-light leading-[1.05] tracking-tight md:text-5xl">SEO Dashboard</h1>
          <p className="mt-3 text-sm text-ink/50">
            Last 28 days · {d.range.start} → {d.range.end}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={d.siteUrl}
            onChange={(e) => setSite(e.target.value)}
            className="rounded-full border border-ink/10 bg-stone px-4 py-2 text-sm text-ink outline-none"
          >
            {d.sites.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={async () => {
              await lockFn();
              qc.invalidateQueries({ queryKey: ["seo-status"] });
            }}
            className="rounded-full border border-ink/10 px-4 py-2 text-sm text-ink/60 hover:bg-ink/5"
          >
            Lock
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((m, i) => {
          const now = d.totals[m.key];
          const prev = d.previousTotals[m.key];
          const delta = prev ? ((now - prev) / prev) * 100 : 0;
          const good = m.invert ? delta < 0 : delta > 0;
          return (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-3xl border border-ink/10 bg-stone p-6"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-ink/40">{m.label}</p>
              <p className="mt-3 font-display text-3xl font-light tracking-tight">{m.format(now)}</p>
              <p className={`mt-2 text-xs ${prev ? (good ? "text-emerald-500" : "text-red-500") : "text-ink/40"}`}>
                {prev ? `${delta > 0 ? "+" : ""}${delta.toFixed(1)}% vs previous 28 days` : "No prior data"}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 rounded-3xl border border-ink/10 bg-stone p-6">
        <p className="mb-6 text-sm font-medium">Clicks & impressions</p>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ left: -12, right: 8, top: 4 }}>
              <defs>
                <linearGradient id="clicksFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeOpacity={0.1} vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, opacity: 0.5 }} tickLine={false} axisLine={false} minTickGap={24} />
              <YAxis yAxisId="l" tick={{ fontSize: 11, opacity: 0.5 }} tickLine={false} axisLine={false} />
              <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 11, opacity: 0.5 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 16, border: "1px solid rgba(128,128,128,0.2)", background: "var(--color-stone)", color: "var(--color-ink)" }}
              />
              <Area yAxisId="r" type="monotone" dataKey="impressions" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.12} strokeWidth={1.5} />
              <Area yAxisId="l" type="monotone" dataKey="clicks" stroke="#34d399" fill="#34d399" fillOpacity={0.18} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <RowTable title="Top queries" rows={d.queries} />
        <RowTable title="Top pages" rows={d.pages} truncate />
        <RowTable title="Countries" rows={d.countries} />
        <RowTable title="Devices" rows={d.devices} />
      </div>
    </Shell>
  );
}

function RowTable({ title, rows, truncate }: { title: string; rows: SeoRow[]; truncate?: boolean }) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-stone p-6">
      <p className="mb-4 text-sm font-medium">{title}</p>
      {rows.length === 0 ? (
        <p className="text-sm text-ink/40">No data for this period.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.12em] text-ink/40">
                <th className="pb-2 font-normal"> </th>
                <th className="pb-2 text-right font-normal">Clicks</th>
                <th className="pb-2 text-right font-normal">Impr.</th>
                <th className="pb-2 text-right font-normal">CTR</th>
                <th className="pb-2 text-right font-normal">Pos.</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 15).map((r) => (
                <tr key={r.key} className="border-t border-ink/5">
                  <td className="max-w-[220px] truncate py-2 pr-3 text-ink/80">
                    {truncate ? r.key.replace(/^https?:\/\/[^/]+/, "") || "/" : r.key}
                  </td>
                  <td className="py-2 text-right tabular-nums">{fmt.clicks(r.clicks)}</td>
                  <td className="py-2 text-right tabular-nums">{fmt.impressions(r.impressions)}</td>
                  <td className="py-2 text-right tabular-nums">{fmt.ctr(r.ctr)}</td>
                  <td className="py-2 text-right tabular-nums">{fmt.position(r.position)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
