import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/buyer/settings")({
  head: () => ({ meta: [{ title: "Settings — Buyer Dashboard — CreativeHub" }] }),
  component: BuyerSettings,
  errorComponent: ({ error }) => <div className="p-8 text-foreground">{error.message}</div>,
  notFoundComponent: () => <div className="p-8 text-foreground">Not found.</div>,
});

function BuyerSettings() {
  const [name, setName] = useState("Studio Hex");
  const [email, setEmail] = useState("ops@studiohex.co");
  const [company, setCompany] = useState("Studio Hex");
  const [notify, setNotify] = useState(true);

  return (
    <DashboardShell role="buyer" active="settings">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <Card title="Profile">
          <SField label="Full name" value={name} onChange={setName} />
          <SField label="Email" value={email} onChange={setEmail} />
          <SField label="Company" value={company} onChange={setCompany} />
        </Card>
        <Card title="Preferences">
          <Toggle
            label="Email me when creatives respond"
            on={notify}
            onChange={setNotify}
          />
          <Toggle label="Show me trending portfolios" on />
          <Toggle label="Weekly hiring digest" />
        </Card>
        <Card title="Billing">
          <p className="text-sm text-muted-foreground">Plan: <span className="text-foreground">Studio · $59/mo</span></p>
          <button className="mt-4 rounded-full glass px-5 py-2.5 text-sm hover:bg-white/5">
            Manage billing
          </button>
        </Card>
        <Card title="Danger zone">
          <p className="text-sm text-muted-foreground">Permanently delete your account and all data.</p>
          <button className="mt-4 rounded-full border border-destructive/40 text-destructive px-5 py-2.5 text-sm hover:bg-destructive/10">
            Delete account
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
        className="mt-2 w-full rounded-xl bg-background/60 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent-blue"
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
        className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-accent-blue" : "bg-muted"}`}
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