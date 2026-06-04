import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — CreativeHub" },
      { name: "description", content: "Transparent pricing for CreativeHub buyers and sellers. Start free, upgrade as you grow." },
      { property: "og:title", content: "Pricing — CreativeHub" },
      { property: "og:description", content: "Transparent pricing for buyers and sellers." },
    ],
  }),
  component: PricingPage,
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-8">
      <p>{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p>Not found.</p>
    </div>
  ),
});

const tiers = [
  {
    name: "Starter",
    price: "Free",
    desc: "For creatives just getting started.",
    features: ["1 portfolio", "Basic profile", "Get discovered in search", "Community support"],
    cta: "Get started",
    accent: false,
  },
  {
    name: "Pro",
    price: "$19",
    suffix: "/mo",
    desc: "For working pros who want serious reach.",
    features: ["Unlimited portfolios", "Featured in category", "Lower 5% platform fee", "Priority client matching", "Analytics dashboard"],
    cta: "Go Pro",
    accent: true,
  },
  {
    name: "Studio",
    price: "$59",
    suffix: "/mo",
    desc: "For agencies and creative teams.",
    features: ["Everything in Pro", "Up to 10 team members", "Dedicated account manager", "Custom contracts & invoicing", "API access"],
    cta: "Contact sales",
    accent: false,
  },
];

function PricingPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-clip">
      <SiteNav />
      <section className="pt-36 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-accent-purple mb-4">Pricing</p>
            <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight">
              Simple, fair, scales with you.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Free for buyers, always. Creatives pick a plan that matches their craft.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`relative overflow-hidden rounded-3xl border p-8 md:p-10 flex flex-col ${
                  t.accent
                    ? "border-accent-blue/40 bg-card shadow-glow"
                    : "border-border/40 bg-card"
                }`}
              >
                {t.accent && (
                  <div className="absolute inset-0 bg-gradient-glow opacity-40 pointer-events-none" />
                )}
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-medium tracking-tight">{t.name}</h3>
                    {t.accent && (
                      <span className="rounded-full bg-accent-blue/20 text-accent-blue text-xs px-3 py-1">
                        Most popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{t.desc}</p>
                  <div className="mt-8 flex items-baseline gap-1">
                    <span className="font-display text-5xl font-semibold tracking-tight">{t.price}</span>
                    {t.suffix && <span className="text-muted-foreground">{t.suffix}</span>}
                  </div>
                  <ul className="mt-8 space-y-3">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Check className="h-4 w-4 mt-0.5 text-accent-blue shrink-0" />
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/signup"
                    className={`mt-10 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                      t.accent
                        ? "bg-gradient-primary text-primary-foreground hover:scale-[1.02]"
                        : "glass text-foreground hover:bg-white/5"
                    }`}
                  >
                    {t.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}