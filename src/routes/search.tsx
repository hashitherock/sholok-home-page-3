import { createFileRoute, Link } from "@tanstack/react-router";
import { Search as SearchIcon } from "lucide-react";
import { SearchBar } from "@/components/sholok/SearchBar";
import { EmptyState, Pill, ProductCard, seo } from "@/components/sholok/ui";
import { blogs, cafePosts, news, places, products, questions, services, tileDark, trending, videos } from "@/lib/data";

const cats = ["all", "web", "news", "shopping", "images", "videos", "blogs", "knowledge", "maps"] as const;

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s["q"] === "string" ? s["q"] : "", cat: typeof s["cat"] === "string" ? s["cat"] : "all" }),
  head: () => seo("Search", "Search the web, news, shopping, videos, blogs, knowledge and maps with SHOLOK Search."),
  component: SearchPage,
});

function SearchPage() {
  const { q, cat } = Route.useSearch();
  const t = q.trim().toLowerCase();
  const m = (...f: string[]) => !t || f.some((x) => x.toLowerCase().includes(t));
  const r = {
    web: services.filter((s) => m(s.name, s.desc)),
    news: news.filter((n) => m(n.title, n.summary, n.cat)),
    shopping: products.filter((p) => m(p.name, p.cat, p.seller)),
    videos: videos.filter((v) => m(v.title, v.channel, v.cat)),
    blogs: [...blogs.filter((b) => m(b.title, b.excerpt, b.cat)), ...cafePosts.filter((c) => m(c.title, c.cafe)).map((c) => ({ id: 100 + c.id, title: c.title, author: c.cafe, read: "Cafe", cat: "Cafe", excerpt: `${c.comments} comments · by ${c.author}`, hue: 300 }))],
    knowledge: questions.filter((x) => m(x.q, x.tag)),
    maps: places.filter((p) => m(p.name, p.cat, p.area)),
  };
  const total = Object.values(r).reduce((s, a) => s + a.length, 0);
  const show = (k: string) => cat === "all" || cat === k || (k === "web" && cat === "web");

  return (
    <div>
      <div className="border-b bg-card">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <h1 className="sr-only">SHOLOK Search{q ? ` results for ${q}` : ""}</h1>
          <SearchBar key={q} size="md" initial={q} cat={cat} />
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {cats.map((c) => <Link key={c} to="/search" search={{ q, cat: c }}><Pill active={cat === c}>{c.charAt(0).toUpperCase() + c.slice(1)}</Pill></Link>)}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6">
        {!t ? (
          <div className="card-surface p-6">
            <p className="font-bold">Try a popular search</p>
            <div className="mt-3 flex flex-wrap gap-2">{trending.map((x) => <Link key={x} to="/search" search={{ q: x, cat }}><Pill>{x}</Pill></Link>)}</div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">About <b className="text-foreground">{total}</b> results for “<b className="text-foreground">{q}</b>” in demo content</p>
        )}
        {t && total === 0 && <EmptyState title={`No results for “${q}”`} hint="Check the spelling or try a broader term like “Dhaka” or “shoe”." />}
        {show("web") && r.web.length > 0 && <Block title="SHOLOK services">{r.web.map((s) => <Link key={s.id} to={s.to} className="block rounded-lg p-3 hover:bg-muted"><span className="text-xs text-muted-foreground">{s.domain}</span><span className="block font-semibold text-primary">SHOLOK {s.name}</span><span className="text-sm text-muted-foreground">{s.desc}</span></Link>)}</Block>}
        {show("news") && r.news.length > 0 && <Block title="News">{r.news.map((n) => <Link key={n.id} to="/news" className="flex gap-3 rounded-lg p-3 hover:bg-muted"><span className="h-16 w-24 shrink-0 rounded-lg" style={tileDark(n.hue)} /><span><span className="font-semibold">{n.title}</span><span className="block text-xs text-muted-foreground">{n.source} · {n.time}</span></span></Link>)}</Block>}
        {(show("shopping") || cat === "images") && r.shopping.length > 0 && <Block title={cat === "images" ? "Images" : "Shopping"}><div className="grid grid-cols-2 gap-3 p-2 sm:grid-cols-4">{r.shopping.slice(0, 8).map((p) => <ProductCard key={p.id} p={p} compact />)}</div></Block>}
        {show("videos") && r.videos.length > 0 && <Block title="Videos"><div className="grid gap-3 p-2 sm:grid-cols-3">{r.videos.map((v) => <Link key={v.id} to="/tv"><div className="aspect-video rounded-lg" style={tileDark(v.hue)} /><p className="mt-1 text-sm font-semibold">{v.title}</p><p className="text-xs text-muted-foreground">{v.channel} · {v.views} views</p></Link>)}</div></Block>}
        {show("blogs") && r.blogs.length > 0 && <Block title="Blogs & Cafe">{r.blogs.map((b) => <Link key={b.id} to={b.cat === "Cafe" ? "/cafe" : "/blog"} className="block rounded-lg p-3 hover:bg-muted"><span className="font-semibold">{b.title}</span><span className="block text-sm text-muted-foreground">{b.author} — {b.excerpt}</span></Link>)}</Block>}
        {show("knowledge") && r.knowledge.length > 0 && <Block title="Knowledge">{r.knowledge.map((x) => <Link key={x.id} to="/knowledge" className="block rounded-lg p-3 hover:bg-muted"><span className="font-semibold">Q. {x.q}</span><span className="block text-xs text-muted-foreground">{x.answers} answers · {x.tag}</span></Link>)}</Block>}
        {show("maps") && r.maps.length > 0 && <Block title="Places">{r.maps.map((p) => <Link key={p.id} to="/map" className="block rounded-lg p-3 hover:bg-muted"><span className="font-semibold">{p.name}</span><span className="block text-xs text-muted-foreground">{p.cat} · {p.area} · ★ {p.rating}</span></Link>)}</Block>}
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="card-surface p-3"><h2 className="flex items-center gap-2 px-3 pb-1 pt-2 text-sm font-bold"><SearchIcon className="h-4 w-4 text-primary" />{title}</h2>{children}</section>;
}
