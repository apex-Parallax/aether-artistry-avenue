import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/site-nav";

type Portfolio = {
  id: string | number;
  title: string;
  description: string;
  category: string;
  image?: string;
  imageUrl?: string;
};

export const Route = createFileRoute("/category/$name")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.name} — CreativeHub` },
      { name: "description", content: `Browse ${params.name} portfolios on CreativeHub.` },
      { property: "og:title", content: `${params.name} — CreativeHub` },
      { property: "og:description", content: `Browse ${params.name} portfolios on CreativeHub.` },
    ],
  }),
  component: CategoryPage,
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-8">
      <p>{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p>Category not found.</p>
    </div>
  ),
});

async function fetchPortfolios(): Promise<Portfolio[]> {
  const res = await fetch("http://localhost:5000/portfolios");
  if (!res.ok) throw new Error("Failed to fetch portfolios");
  return res.json();
}

function CategoryPage() {
  const { name } = Route.useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["portfolios"],
    queryFn: fetchPortfolios,
  });

  const filtered = (data ?? []).filter(
    (p) => p.category?.toLowerCase() === name.toLowerCase()
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-clip">
      <SiteNav />
      <section className="pt-36 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> All categories
          </Link>

          <p className="text-xs uppercase tracking-[0.2em] text-accent-blue mb-4">
            Category
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight">
            {name}
          </h1>

          <div className="mt-16">
            {isLoading && <PortfolioSkeletons />}
            {isError && (
              <div className="rounded-2xl border border-border/40 bg-card p-8 text-muted-foreground">
                Couldn't load portfolios: {(error as Error).message}
              </div>
            )}
            {!isLoading && !isError && filtered.length === 0 && (
              <div className="rounded-2xl border border-border/40 bg-card p-12 text-center text-muted-foreground">
                No portfolios yet in {name}.
              </div>
            )}
            {!isLoading && !isError && filtered.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <PortfolioCard key={p.id} portfolio={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  const img = portfolio.image || portfolio.imageUrl;
  return (
    <Link
      to="/portfolio/$id"
      params={{ id: String(portfolio.id) }}
      className="group relative overflow-hidden rounded-2xl bg-card border border-border/40 flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {img ? (
          <img
            src={img}
            alt={portfolio.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-accent-blue/20 to-accent-purple/20" />
        )}
      </div>
      <div className="p-6 flex flex-col gap-2">
        <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {portfolio.category}
        </div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-medium tracking-tight">
            {portfolio.title}
          </h3>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground shrink-0" />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {portfolio.description}
        </p>
      </div>
    </Link>
  );
}

function PortfolioSkeletons() {
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