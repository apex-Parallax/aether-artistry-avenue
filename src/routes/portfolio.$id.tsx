import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/site-nav";

type Portfolio = {
  id: string | number;
  title: string;
  description: string;
  category: string;
  image?: string;
  imageUrl?: string;
};

export const Route = createFileRoute("/portfolio/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Portfolio #${params.id} — CreativeHub` },
      { name: "description", content: `Portfolio details on CreativeHub.` },
    ],
  }),
  component: PortfolioPage,
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-8">
      <p>{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p>Portfolio not found.</p>
    </div>
  ),
});

async function fetchPortfolio(id: string): Promise<Portfolio | null> {
  const res = await fetch("http://localhost:5000/portfolios");
  if (!res.ok) throw new Error("Failed to fetch portfolio");
  const list: Portfolio[] = await res.json();
  return list.find((p) => String(p.id) === id) ?? null;
}

function PortfolioPage() {
  const { id } = Route.useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["portfolio", id],
    queryFn: () => fetchPortfolio(id),
  });

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-clip">
      <SiteNav />
      <section className="pt-36 pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to categories
          </Link>

          {isLoading && (
            <div className="space-y-6">
              <div className="h-10 w-2/3 bg-muted rounded animate-pulse" />
              <div className="aspect-[16/9] bg-muted rounded-2xl animate-pulse" />
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
            </div>
          )}

          {isError && (
            <div className="rounded-2xl border border-border/40 bg-card p-8 text-muted-foreground">
              {(error as Error).message}
            </div>
          )}

          {!isLoading && !isError && !data && (
            <div className="rounded-2xl border border-border/40 bg-card p-12 text-center text-muted-foreground">
              Portfolio not found.
            </div>
          )}

          {data && (
            <article>
              <p className="text-xs uppercase tracking-[0.2em] text-accent-blue mb-4">
                {data.category}
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight">
                {data.title}
              </h1>
              {(data.image || data.imageUrl) && (
                <div className="mt-12 relative overflow-hidden rounded-2xl border border-border/40 aspect-[16/9]">
                  <img
                    src={data.image || data.imageUrl}
                    alt={data.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <p className="mt-10 text-lg text-muted-foreground leading-relaxed max-w-3xl whitespace-pre-line">
                {data.description}
              </p>
            </article>
          )}
        </div>
      </section>
    </div>
  );
}