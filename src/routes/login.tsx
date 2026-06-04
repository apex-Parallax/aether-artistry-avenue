import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — CreativeHub" },
      { name: "description", content: "Sign in to your CreativeHub account." },
    ],
  }),
  component: LoginPage,
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

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json().catch(() => ({}));
      if (data?.token) localStorage.setItem("ch_token", data.token);
      localStorage.setItem("ch_role", role);
      navigate({ to: role === "buyer" ? "/dashboard/buyer" : "/dashboard/seller" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
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
            <p className="text-xs uppercase tracking-[0.2em] text-accent-blue mb-4">Welcome back</p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
              Sign in to CreativeHub
            </h1>
          </div>

          <form onSubmit={onSubmit} className="mt-12 glass rounded-2xl p-8 space-y-5">
            <div className="flex gap-2 rounded-full bg-background/50 p-1">
              {(["buyer", "seller"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 rounded-full py-2 text-xs font-medium capitalize transition-colors ${
                    role === r ? "bg-foreground text-background" : "text-muted-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <Field label="Email">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="you@studio.com" />
            </Field>
            <Field label="Password">
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="••••••••" />
            </Field>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? "Signing in…" : "Sign in"}
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-center text-sm text-muted-foreground">
              New here?{" "}
              <Link to="/signup" className="text-foreground hover:text-accent-blue">Create an account</Link>
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