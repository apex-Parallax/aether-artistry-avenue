import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account — CreativeHub" },
      { name: "description", content: "Join CreativeHub as a buyer or seller." },
    ],
  }),
  component: SignupPage,
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

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("seller");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      if (!res.ok) throw new Error("Could not create account");
      const data = await res.json().catch(() => ({}));
      if (data?.token) localStorage.setItem("ch_token", data.token);
      localStorage.setItem("ch_role", role);
      navigate({ to: role === "buyer" ? "/dashboard/buyer" : "/dashboard/seller" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="pt-36 pb-24">
        <div className="mx-auto max-w-md px-4 sm:px-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-accent-purple mb-4">Join</p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
              Create your account
            </h1>
            <p className="mt-3 text-muted-foreground">Showcase work or hire world-class talent.</p>
          </div>

          <form onSubmit={onSubmit} className="mt-12 glass rounded-2xl p-8 space-y-5">
            <div className="grid grid-cols-2 gap-3">
              {(["seller", "buyer"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`rounded-xl border p-4 text-left transition-colors ${
                    role === r
                      ? "border-accent-blue bg-accent-blue/10"
                      : "border-border hover:border-foreground/40"
                  }`}
                >
                  <div className="font-display text-base font-medium capitalize">I'm a {r}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {r === "seller" ? "Show my work, get hired." : "Find and hire creatives."}
                  </div>
                </button>
              ))}
            </div>

            <Field label="Full name">
              <input required value={name} onChange={(e) => setName(e.target.value)} className="input" placeholder="Alex Rivera" />
            </Field>
            <Field label="Email">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="you@studio.com" />
            </Field>
            <Field label="Password">
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="At least 6 characters" />
            </Field>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? "Creating…" : "Create account"}
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-foreground hover:text-accent-blue">Sign in</Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</span>
      <div className="mt-2 [&_.input]:w-full [&_.input]:rounded-xl [&_.input]:bg-background/60 [&_.input]:border [&_.input]:border-border [&_.input]:px-4 [&_.input]:py-3 [&_.input]:text-sm [&_.input]:placeholder:text-muted-foreground [&_.input]:focus:outline-none [&_.input]:focus:ring-1 [&_.input]:focus:ring-accent-blue">
        {children}
      </div>
    </label>
  );
}