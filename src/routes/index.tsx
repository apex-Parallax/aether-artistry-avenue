import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Camera, Video, Wand2, Palette, Layout, Code2, Sparkles, Play, Star, Music, Megaphone, PenTool } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import heroBg from "@/assets/hero-bg.jpg";
import creator1 from "@/assets/creator-1.jpg";
import creator2 from "@/assets/creator-2.jpg";
import creator3 from "@/assets/creator-3.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CreativeHub — Hire World-Class Creative Talent" },
      { name: "description", content: "A premium marketplace for photographers, videographers, designers, and developers. Showcase your portfolio. Get hired directly by clients." },
      { property: "og:title", content: "CreativeHub — Hire World-Class Creative Talent" },
      { property: "og:description", content: "The marketplace for the world's top creative and technical freelancers." },
    ],
  }),
  component: Landing,
});

const categories = [
  { icon: Code2, label: "Web Development", count: "21.5k" },
  { icon: Palette, label: "Graphic Design", count: "18.2k" },
  { icon: Camera, label: "Photography", count: "12.4k" },
  { icon: Wand2, label: "Video Editing", count: "9.7k" },
  { icon: Layout, label: "UI/UX Design", count: "11.9k" },
  { icon: PenTool, label: "Content Writing", count: "6.8k" },
  { icon: Music, label: "Music Production", count: "3.9k" },
  { icon: Megaphone, label: "Digital Marketing", count: "8.5k" },
];

const creators = [
  { name: "Mara Olsson", role: "Cinematographer · Stockholm", img: creator3, rate: "From $1,200/day" },
  { name: "Kenji Tanaka", role: "UI/UX Designer · Tokyo", img: creator2, rate: "From $95/hr" },
  { name: "Andre Costa", role: "Photographer · Lisbon", img: creator1, rate: "From $850/day" },
];

const works = [
  { img: work1, title: "Aurora — 3D Identity", by: "Studio Hex", tag: "3D / Branding" },
  { img: work2, title: "Noir Stationery", by: "Field Office", tag: "Print Design" },
  { img: work3, title: "Blue Hour", by: "L. Verret", tag: "Cinematography" },
  { img: work4, title: "Lumen OS", by: "Northwave", tag: "Product UI" },
];

const brands = ["NIKE", "APPLE", "VOGUE", "NETFLIX", "STRIPE", "FIGMA", "AIRBNB", "SPOTIFY", "TESLA", "ADOBE"];

function Landing() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-clip">
      <SiteNav />
      <Hero />
      <Marquee />
      <Categories />
      <FeaturedWork />
      <Creators />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen pt-36 pb-24 flex items-center">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1280}
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-accent-blue/20 blur-3xl animate-float" />
      <div className="absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-accent-purple/25 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue animate-pulse" />
            A marketplace built for visual & technical creatives
          </div>

          <h1 className="font-display text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.95] font-semibold tracking-[-0.04em]">
            Hire the world's <br />
            <span className="text-gradient-primary italic font-light">most creative</span>
            <br />
            minds.
          </h1>

          <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            CreativeHub is the curated marketplace for photographers, filmmakers,
            designers and developers. Discover portfolios. Hire directly.
            Ship work that matters.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#join"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              Start hiring talent
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#categories"
              className="group inline-flex items-center gap-2 rounded-full glass px-6 py-4 text-sm font-medium text-foreground hover:bg-white/5 transition-colors"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10">
                <Play className="h-3 w-3 fill-current" />
              </span>
              Showcase your portfolio
            </a>
          </div>

          <div className="mt-16 grid grid-cols-3 max-w-xl gap-8">
            {[
              { v: "120k+", l: "Verified creatives" },
              { v: "48 hrs", l: "Avg. hire time" },
              { v: "98%", l: "Client satisfaction" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-gradient">
                  {s.v}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const row = [...brands, ...brands];
  return (
    <section className="border-y border-border/50 py-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by creative teams at
        </p>
      </div>
      <div className="relative">
        <div className="flex w-max animate-marquee gap-16 px-8">
          {row.map((b, i) => (
            <span
              key={i}
              className="font-display text-3xl font-medium text-foreground/30 tracking-tight whitespace-nowrap"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section id="categories" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent-blue mb-4">
              Categories
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-semibold tracking-tight max-w-2xl">
              Every discipline.<br /> Curated to perfection.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            From single frames to feature productions — the talent for every
            visual and technical brief lives here.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {categories.map((c) => (
            <Link
              key={c.label}
              to="/category/$name"
              params={{ name: c.label }}
              className="group relative bg-background p-6 sm:p-8 transition-colors hover:bg-card flex flex-col gap-6 min-h-[180px]"
            >
              <div className="flex items-center justify-between">
                <c.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent-blue" strokeWidth={1.5} />
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 -translate-x-1 translate-y-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-foreground" />
              </div>
              <div className="mt-auto">
                <div className="font-display text-lg font-medium tracking-tight">{c.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.count} pros</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Browse all categories <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedWork() {
  return (
    <section id="explore" className="relative py-32 bg-card/30">
      <div className="absolute inset-0 bg-gradient-glow opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent-purple mb-4">
              Featured Work
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-semibold tracking-tight max-w-3xl">
              Portfolios that <em className="text-gradient-primary not-italic">move</em> brands.
            </h2>
          </div>
          <a href="#" className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Browse all work <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          <WorkCard {...works[0]} className="md:col-span-7 md:row-span-2" aspect="aspect-[4/5] md:aspect-auto md:h-full" />
          <WorkCard {...works[1]} className="md:col-span-5" aspect="aspect-[4/3]" />
          <WorkCard {...works[2]} className="md:col-span-5" aspect="aspect-[4/3]" />
          <WorkCard {...works[3]} className="md:col-span-12" aspect="aspect-[21/9]" />
        </div>
      </div>
    </section>
  );
}

function WorkCard({
  img, title, by, tag, className = "", aspect = "aspect-[4/3]",
}: { img: string; title: string; by: string; tag: string; className?: string; aspect?: string }) {
  return (
    <a href="#" className={`group relative overflow-hidden rounded-2xl bg-card border border-border/40 ${className}`}>
      <div className={`relative overflow-hidden ${aspect}`}>
        <img
          src={img}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">{tag}</div>
          <h3 className="font-display text-xl md:text-2xl font-medium text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">by {by}</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full glass text-foreground transition-transform group-hover:rotate-45">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}

function Creators() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent-blue mb-4">
              Top Creatives
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-semibold tracking-tight max-w-3xl">
              Talent worth<br /> obsessing over.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creators.map((c, i) => (
            <div
              key={c.name}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border/40"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-xs">
                  <Star className="h-3 w-3 fill-accent-blue text-accent-blue" /> 4.9
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-tight">{c.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{c.role}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{c.rate}</span>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex -space-x-1">
                    {[1,2,3].map((n) => (
                      <span key={n} className="h-6 w-6 rounded-md bg-gradient-to-br from-accent-blue/30 to-accent-purple/30 border border-border" />
                    ))}
                  </div>
                  <a href="#" className="inline-flex items-center gap-1 text-xs font-medium text-foreground group-hover:text-accent-blue transition-colors">
                    View profile <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const buyer = [
    "Post a brief or browse curated portfolios",
    "Hire directly — no bidding, no noise",
    "Collaborate, approve and pay securely",
  ];
  const seller = [
    "Build a portfolio that stops the scroll",
    "Get matched with briefs that fit your craft",
    "Get paid promptly, keep more of what you earn",
  ];
  return (
    <section id="how" className="py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">How it works</p>
          <h2 className="font-display text-5xl md:text-6xl font-semibold tracking-tight max-w-3xl mx-auto">
            Two sides of one beautiful platform.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Path title="For Buyers" subtitle="Find and hire vetted creatives in days, not weeks." items={buyer} accent="blue" />
          <Path title="For Sellers" subtitle="Showcase your craft to the world's best brands." items={seller} accent="purple" />
        </div>
      </div>
    </section>
  );
}

function Path({ title, subtitle, items, accent }: { title: string; subtitle: string; items: string[]; accent: "blue" | "purple" }) {
  const ring = accent === "blue" ? "from-accent-blue/40" : "from-accent-purple/40";
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-card p-8 md:p-12">
      <div className={`absolute -top-32 -right-32 h-72 w-72 rounded-full bg-gradient-to-br ${ring} to-transparent blur-3xl opacity-60`} />
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{title}</span>
          <span className={`h-2 w-2 rounded-full ${accent === "blue" ? "bg-accent-blue" : "bg-accent-purple"}`} />
        </div>
        <h3 className="font-display text-3xl md:text-4xl font-medium tracking-tight max-w-md">{subtitle}</h3>
        <ul className="mt-10 space-y-5">
          {items.map((item, i) => (
            <li key={item} className="flex items-start gap-4 group">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-mono text-muted-foreground group-hover:border-foreground/60 group-hover:text-foreground transition-colors">
                0{i + 1}
              </span>
              <span className="text-base text-foreground/90 pt-0.5">{item}</span>
            </li>
          ))}
        </ul>
        <a href="#join" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-foreground group">
          Get started as a {title.split(" ")[1]?.toLowerCase()}
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border group-hover:bg-foreground group-hover:text-background transition-colors">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </a>
      </div>
    </div>
  );
}

function CTA() {
  return (
    <section id="join" className="py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-border/40 bg-card p-10 md:p-20 text-center">
          <div className="absolute inset-0 bg-gradient-glow opacity-100" />
          <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 h-96 w-[120%] rounded-full bg-gradient-primary opacity-30 blur-3xl" />
          <div className="relative max-w-3xl mx-auto">
            <h2 className="font-display text-5xl md:text-7xl font-semibold tracking-tight leading-[1]">
              Your next great <br />
              <span className="text-gradient-primary italic font-light">collaboration</span> starts here.
            </h2>
            <p className="mt-8 text-lg text-muted-foreground">
              Join 120,000+ creative professionals and the brands hiring them.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#" className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-4 text-sm font-semibold hover:shadow-glow transition-shadow">
                Join as Buyer <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#" className="inline-flex items-center gap-2 rounded-full glass px-7 py-4 text-sm font-semibold text-foreground hover:bg-white/5 transition-colors">
                Join as Seller <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
              {["Free to join", "No bidding wars", "Secure escrow payments"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-accent-blue" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="relative h-7 w-7 rounded-lg bg-gradient-primary">
            <div className="absolute inset-[2px] rounded-[6px] bg-background flex items-center justify-center">
              <span className="text-gradient-primary font-display font-bold text-xs">C</span>
            </div>
          </div>
          <span className="font-display text-sm font-medium">CreativeHub</span>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 CreativeHub Studio. Crafted for creatives.</p>
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
          <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
          <a href="#" className="hover:text-foreground transition-colors">Behance</a>
        </div>
      </div>
    </footer>
  );
}