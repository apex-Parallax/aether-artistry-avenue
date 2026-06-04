import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, StatCard, ChartCard } from "@/components/dashboard-shell";

export const Route = createFileRoute("/dashboard/buyer/")({
  head: () => ({
    meta: [{ title: "Buyer Dashboard — CreativeHub" }],
  }),
  component: BuyerAnalytics,
  errorComponent: ({ error }) => <div className="p-8 text-foreground">{error.message}</div>,
  notFoundComponent: () => <div className="p-8 text-foreground">Not found.</div>,
});

function BuyerAnalytics() {
  const briefs = [12, 18, 9, 22, 25, 17, 30, 28, 33, 41, 38, 52];
  return (
    <DashboardShell role="buyer" active="analytics">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Active briefs" value="14" delta="+3 this week" />
        <StatCard label="Hires made" value="42" delta="+5 this month" />
        <StatCard label="Avg. hire time" value="2.1d" delta="−12% vs last" />
        <StatCard label="Spend (mo)" value="$24.8k" delta="+18%" />
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Briefs posted" data={briefs} accent="blue" />
        <ChartCard title="Proposals received" data={briefs.map((n) => n * 4)} accent="blue" />
      </div>
      <div className="mt-6 rounded-2xl border border-border/40 bg-card p-6">
        <h3 className="font-display text-lg font-medium tracking-tight">Recent activity</h3>
        <ul className="mt-4 divide-y divide-border/60">
          {[
            { t: "Hired Mara Olsson for 'Aurora Identity'", d: "2h ago" },
            { t: "Posted brief: Brand video — Lumen OS", d: "Yesterday" },
            { t: "Reviewed 6 portfolios in Photography", d: "2d ago" },
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