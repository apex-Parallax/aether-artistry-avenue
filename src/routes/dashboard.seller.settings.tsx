import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/seller/settings")({
  head: () => ({ meta: [{ title: "Settings — Seller Dashboard — CreativeHub" }] }),
  component: SellerSettings,
  errorComponent: ({ error }) => <div className="p-8 text-foreground">{error.message}</div>,
  notFoundComponent: () => <div className="p-8 text-foreground">Not found.</div>,
});

function SellerSettings() {
  const [name, setName] = useState("Mara Olsson");
  const [headline, setHeadline] = useState("Cinematographer · Stockholm");
  const [rate, setRate] = useState("1200");
  const [available, setAvailable] = useState(true);

  return (
    <DashboardShell role="seller" active="settings">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <Card title="Public profile">
          <SField label="Display name" value={name} onChange={setName} />
          <SField label="Headline" value={headline} onChange={setHeadline} />
          <SField label="Day rate (USD)" value={rate} onChange={setRate} />
        </Card>
        <Card title="Availability">
          <Toggle label="Open to new projects" on={available} onChange={setAvailable} />
          <Toggle label="Accept rush jobs (24h)" />
          <Toggle label="Travel for shoots" on />
        </Card>
        <Card title="Payouts">
          <p className="text-sm text-muted-foreground">Connected: <span className="text-foreground">Stripe · ••• 4242</span></p>
          <button className="mt-4 rounded-full glass px-5 py-2.5 text-sm hover:bg-white/5">Manage payouts</button>
        </Card>
        <Card title="Danger zone">
          <p className="text-sm text-muted-foreground">Unpublish portfolio and pause your account.</p>
          <button className="mt-4 rounded-full border border-destructive/40 text-destructive px-5 py-2.5 text-sm hover:bg-destructive/10">
            Deactivate account
          </button>
        </Card>
      </form>
    </DashboardShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-card p-6">
      <h3 className="font-display text-lg font-medium tracking-tight mb-5">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
function SField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl bg-background/60 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent-purple"
      />
    </label>
  );
}
function Toggle({ label, on = false, onChange }: { label: string; on?: boolean; onChange?: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-4 py-1 cursor-pointer">
      <span className="text-sm text-foreground/90">{label}</span>
      <button
        type="button"
        onClick={() => onChange?.(!on)}
        className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-accent-purple" : "bg-muted"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition-all ${
            on ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </label>
  );
}