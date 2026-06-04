import { Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { BarChart3, Settings, LayoutDashboard } from "lucide-react";
import type { ReactNode } from "react";

type Role = "buyer" | "seller";

export function DashboardShell({
  role,
  active,
  children,
}: {
  role: Role;
  active: "analytics" | "settings";
  children: ReactNode;
}) {
  const base = role === "buyer" ? "/dashboard/buyer" : "/dashboard/seller";
  const accent = role === "buyer" ? "accent-blue" : "accent-purple";

  const tabs = [
    { key: "analytics", label: "Analytics", icon: BarChart3, to: base },
    { key: "settings", label: "Settings", icon: Settings, to: `${base}/settings` },
  ] as const;

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
            <LayoutDashboard className={`h-4 w-4 text-${accent}`} />
            <span className={`text-${accent}`}>{role} dashboard</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight">
            {role === "buyer" ? "Hire smarter." : "Your craft. Your numbers."}
          </h1>

          <div className="mt-10 flex gap-1 border-b border-border/60">
            {tabs.map((t) => {
              const isActive = t.key === active;
              return (
                <Link
                  key={t.key}
                  to={t.to}
                  className={`relative inline-flex items-center gap-2 px-5 py-3 text-sm transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <t.icon className="h-4 w-4" />
                  {t.label}
                  {isActive && (
                    <span className={`absolute -bottom-px left-0 right-0 h-px bg-${accent}`} />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-10">{children}</div>
        </div>
      </section>
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta?: string;
}) {
  return (
    <div className="rounded-2xl border border-border/40 bg-card p-6">
      <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</div>
      <div className="mt-4 font-display text-3xl md:text-4xl font-semibold tracking-tight text-gradient">
        {value}
      </div>
      {delta && <div className="mt-2 text-xs text-accent-blue">{delta}</div>}
    </div>
  );
}

export function ChartCard({
  title,
  data,
  accent = "blue",
}: {
  title: string;
  data: number[];
  accent?: "blue" | "purple";
}) {
  const max = Math.max(...data, 1);
  return (
    <div className="rounded-2xl border border-border/40 bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-medium tracking-tight">{title}</h3>
        <span className="text-xs text-muted-foreground">Last 12 weeks</span>
      </div>
      <div className="mt-6 flex items-end gap-2 h-40">
        {data.map((v, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-md ${
              accent === "blue"
                ? "bg-gradient-to-t from-accent-blue/20 to-accent-blue"
                : "bg-gradient-to-t from-accent-purple/20 to-accent-purple"
            }`}
            style={{ height: `${(v / max) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}