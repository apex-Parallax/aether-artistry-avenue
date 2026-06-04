import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { SiteNav } from "@/components/site-nav";

type Portfolio = {
  id: string | number;
  title: string;
  description: string;
  category: string;
  image?: string;
  imageUrl?: string;
};

const CATEGORIES = [
  "All",
  "Web Development",
  "Graphic Design",
  "Photography",
  "Video Editing",
  "UI/UX Design",
  "Content Writing",
  "Music Production",
  "Digital Marketing",
];

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Portfolios — CreativeHub" },
      { name: "description", content: "Discover portfolios from world-class creative talent across every discipline." },
      { property: "og:title", content: "Explore Portfolios — CreativeHub" },
      { property: "og:description", content: "Discover portfolios from world-class creative talent." },
    ],
  }),
  component: ExplorePage,
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

async function fetchPortfolios(): Promise<Portfolio[]> {
  const res = await fetch("http://localhost:5000/portfolios");
  if (!res.ok) throw new Error("Failed to fetch portfolios");
  return res.json();
}

function ExplorePage() {
  const [active, setActive] = useState("All");
  const [q, setQ] = useState("");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["portfolios"],
    queryFn: fetchPortfolios,
  });

  const filtered = useMemo(() => {
    let list = data ?? [];
    if (active !== "All") {
      list = list.filter((p) => p.category?.toLowerCase() === active.toLowerCase());
    }
    if (q.trim()) {
      const needle = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(needle) ||
          p.description?.toLowerCase().includes(needle),
      );
    }
    return list;
  }, [data, active, q]);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-clip">
      <SiteNav />
      <section className="pt-36 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-blue mb-4">Explore</p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight max-w-3xl">
            Portfolios that move brands.
          </h1>

          <div className="mt-10 flex flex-col md:flex-row gap-4 md:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search portfolios"
                className="w-full rounded-full glass pl-11 pr-4 py-3 text-sm bg-transparent placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent-blue"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                  active === c
                    ? "bg-foreground text-background"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-12">
            {isLoading && <GridSkeleton />}
            {isError && (
              <div className="rounded-2xl border border-border/40 bg-card p-8 text-muted-foreground">
                Couldn't load portfolios: {(error as Error).message}
              </div>
            )}
            {!isLoading && !isError && filtered.length === 0 && (
              <div className="rounded-2xl border border-border/40 bg-card p-12 text-center text-muted-foreground">
                No portfolios match your filters.
              </div>
            )}
            {!isLoading && !isError && filtered.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => {
                  const img = p.image || p.imageUrl;
                  return (
                    <Link
                      key={p.id}
                      to="/portfolio/$id"
                      params={{ id: String(p.id) }}
                      className="group relative overflow-hidden rounded-2xl bg-card border border-border/40 flex flex-col"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                        {img ? (
                          <img src={img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-accent-blue/20 to-accent-purple/20" />
                        )}
                      </div>
                      <div className="p-6 flex flex-col gap-2">
                        <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{p.category}</div>
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-display text-xl font-medium tracking-tight">{p.title}</h3>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground shrink-0" />
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border/40 bg-card overflow-hidden">
          <div className="aspect-[4/3] bg-muted animate-pulse" />
          <div className="p-6 space-y-3">
            <div className="h-3 w-20 bg-muted rounded animate-pulse" />
            <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}