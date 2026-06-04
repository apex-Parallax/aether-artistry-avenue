import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Camera, Video, Wand2, Palette, Layout, Code2, Music, Megaphone, PenTool } from "lucide-react";
import { SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Browse Categories — CreativeHub" },
      { name: "description", content: "Browse creative categories on CreativeHub: Web Development, Graphic Design, Photography, Video Editing, UI/UX Design, Content Writing, Music Production, and Digital Marketing." },
      { property: "og:title", content: "Browse Categories — CreativeHub" },
      { property: "og:description", content: "Discover top creative talent across every discipline." },
    ],
  }),
  component: CategoriesPage,
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

const categories = [
  { icon: Code2, label: "Web Development", blurb: "Frontend, backend, full-stack engineers." },
  { icon: Palette, label: "Graphic Design", blurb: "Logos, branding, print and packaging." },
  { icon: Camera, label: "Photography", blurb: "Editorial, product, portrait, fashion." },
  { icon: Wand2, label: "Video Editing", blurb: "Long-form, social cuts, color grading." },
  { icon: Layout, label: "UI/UX Design", blurb: "Apps, dashboards, design systems." },
  { icon: PenTool, label: "Content Writing", blurb: "Copy, longform, scripts and SEO." },
  { icon: Music, label: "Music Production", blurb: "Beats, mixing, mastering, sound design." },
  { icon: Megaphone, label: "Digital Marketing", blurb: "Paid, SEO, lifecycle and growth." },
];

function CategoriesPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-clip">
      <SiteNav />
      <section className="pt-36 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-blue mb-4">
            Categories
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight max-w-3xl">
            Browse every discipline.
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground text-lg">
            Find the right talent for your next brief — across design, code,
            video, music and beyond.
          </p>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
            {categories.map((c) => (
              <Link
                key={c.label}
                to="/category/$name"
                params={{ name: c.label }}
                className="group relative bg-background p-8 transition-colors hover:bg-card flex flex-col gap-6 min-h-[220px]"
              >
                <div className="flex items-center justify-between">
                  <c.icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-accent-blue" strokeWidth={1.5} />
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 opacity-0 -translate-x-1 translate-y-1 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-foreground" />
                </div>
                <div className="mt-auto">
                  <div className="font-display text-xl font-medium tracking-tight">{c.label}</div>
                  <div className="text-sm text-muted-foreground mt-2">{c.blurb}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}