import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, StatCard, ChartCard } from "@/components/dashboard-shell";

export const Route = createFileRoute("/dashboard/seller/")({
  head: () => ({ meta: [{ title: "Seller Dashboard — CreativeHub" }] }),
  component: SellerAnalytics,
  errorComponent: ({ error }) => <div className="p-8 text-foreground">{error.message}</div>,
  notFoundComponent: () => <div className="p-8 text-foreground">Not found.</div>,
});

function SellerAnalytics() {
  const views = [120, 180, 90, 220, 250, 170, 300, 280, 330, 410, 380, 520];
  const earnings = views.map((v) => Math.round(v * 6.4));
  return (
    <DashboardShell role="seller" active="analytics">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Profile views" value="12.4k" delta="+22% this week" />
        <StatCard label="Inquiries" value="58" delta="+9 this week" />
        <StatCard label="Active jobs" value="6" delta="2 due soon" />
        <StatCard label="Earnings (mo)" value="$8.2k" delta="+34%" />
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Portfolio views" data={views} accent="purple" />
        <ChartCard title="Earnings ($)" data={earnings} accent="purple" />
      </div>
      <div className="mt-6 rounded-2xl border border-border/40 bg-card p-6">
        <h3 className="font-display text-lg font-medium tracking-tight">Latest inquiries</h3>
        <ul className="mt-4 divide-y divide-border/60">
          {[
            { t: "Northwave — Product UI refresh", d: "$3.2k · 4 weeks" },
            { t: "Field Office — Brand video", d: "$1.8k · 2 weeks" },
            { t: "Lumen Labs — App onboarding", d: "$2.4k · 3 weeks" },
          ].map((r) => (
            <li key={r.t} className="flex items-center justify-between py-3 text-sm">
              <span className="text-foreground/90">{r.t}</span>
              <span className="text-muted-foreground">{r.d}</span>
            </li>
          ))}
        </ul>
      </div>
    </DashboardShell>
  );
}