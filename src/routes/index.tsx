import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Flame, MapPin, MessageCircle, Play, TrendingDown, TrendingUp } from "lucide-react";
import { SearchBar } from "@/components/sholok/SearchBar";
import { MoreLink, ProductCard, Section, Stars, seo } from "@/components/sholok/ui";
import { blogs, cafePosts, cities, fx, matches, news, places, playlists, products, properties, questions, sellers, series, services, stocks, taka, tile, tileDark, trending, videos, webtoons } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => seo("Everything You Need, All in One Place", "Search, news, shopping, community, entertainment, finance and more — the SHOLOK all-in-one internet portal."),
  component: Home,
});

function Home() {
  const w = cities[0];
  return (
    <div>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-14 text-center md:pt-20">
          <p className="font-logo text-5xl text-primary md:text-7xl">SHOLOK</p>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight md:text-4xl">Everything You Need, All in One Place.</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Discover, connect, shop, explore and experience the digital world with SHOLOK.</p>
          <div className="mx-auto mt-8 max-w-3xl text-left"><SearchBar /></div>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {trending.slice(0, 6).map((t, i) => (
              <Link key={t} to="/search" search={{ q: t, cat: "all" }} className="rounded-full border bg-card px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary">
                {i < 2 && <Flame className="mr-1 inline h-3 w-3 text-hot" />}{t}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-6 px-4">
        <section aria-label="Services" className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-10">
          {services.filter((s) => s.id !== "main").map((s, i) => (
            <Link key={s.id} to={s.to} className="group card-surface lift flex flex-col items-center gap-2 p-3 text-center">
              <span className={`grid h-11 w-11 place-items-center rounded-xl transition-colors ${i % 2 ? "bg-hot-soft text-hot group-hover:bg-hot group-hover:text-hot-foreground" : "bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground"}`}><s.icon className="h-5 w-5" /></span>
              <span className="text-xs font-bold">{s.name}</span>
              <span className="hidden text-[10px] leading-tight text-muted-foreground md:block">{s.desc}</span>
            </Link>
          ))}
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          <Section title="News & Trending" action={<MoreLink to="/news" />} className="lg:col-span-2">
            <div className="grid gap-5 md:grid-cols-2">
              <Link to="/news" className="group">
                <div className="flex aspect-[16/10] items-end rounded-xl p-4" style={tileDark(news[0].hue)}>
                  <span className="rounded-full bg-hot px-2 py-0.5 text-[10px] font-bold uppercase text-hot-foreground">Top story</span>
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug group-hover:text-primary">{news[0].title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{news[0].summary}</p>
              </Link>
              <ul className="divide-y">
                {news.slice(1, 7).map((n) => (
                  <li key={n.id}><Link to="/news" className="flex gap-3 py-2.5 hover:text-primary">
                    <span className="w-20 shrink-0 text-[11px] font-semibold uppercase text-primary">{n.cat}</span>
                    <span className="line-clamp-1 text-sm font-medium">{n.title}</span>
                  </Link></li>
                ))}
              </ul>
            </div>
          </Section>
          <Section title="Popular searches" action={<span className="text-[11px] text-muted-foreground">Updated 14:30</span>}>
            <ol className="space-y-1">
              {trending.map((t, i) => (
                <li key={t}><Link to="/search" search={{ q: t, cat: "all" }} className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm hover:bg-muted">
                  <span className={i < 3 ? "w-5 font-extrabold text-hot" : "w-5 font-bold text-muted-foreground"}>{i + 1}</span>
                  <span className="flex-1">{t}</span>
                  {i % 3 === 0 ? <TrendingUp className="h-3.5 w-3.5 text-hot" /> : <span className="text-[10px] text-muted-foreground">—</span>}
                </Link></li>
              ))}
            </ol>
          </Section>
        </div>

        <Section title="Shopping & Smart Store" action={<MoreLink to="/shopping" />}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {products.filter((p) => p.was).concat(products.slice(5, 7)).slice(0, 6).map((p) => <ProductCard key={p.id} p={p} compact />)}
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {sellers.map((s) => (
              <Link key={s.slug} to="/smartstore/$slug" params={{ slug: s.slug }} className="lift flex items-center gap-3 rounded-xl border p-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl font-logo text-lg text-primary-foreground" style={tileDark(s.hue)}>{s.name[0]}</span>
                <span className="flex-1"><span className="block font-bold">{s.name}</span><span className="text-xs text-muted-foreground">{s.tagline}</span></span>
                <Stars value={s.rating} />
              </Link>
            ))}
          </div>
        </Section>

        <div className="grid gap-6 lg:grid-cols-3">
          <Section title="Popular in Cafe" action={<MoreLink to="/cafe" />}>
            <ul className="space-y-3">{cafePosts.slice(0, 4).map((p) => (
              <li key={p.id}><Link to="/cafe" className="block hover:text-primary"><span className="text-[11px] font-semibold text-primary">{p.cafe}</span><span className="line-clamp-1 block text-sm font-medium">{p.title}</span><span className="text-[11px] text-muted-foreground"><MessageCircle className="mr-1 inline h-3 w-3" />{p.comments}</span></Link></li>
            ))}</ul>
          </Section>
          <Section title="Latest blogs" action={<MoreLink to="/blog" />}>
            <ul className="space-y-3">{blogs.slice(0, 4).map((b) => (
              <li key={b.id}><Link to="/blog" className="flex gap-3 hover:text-primary"><span className="h-12 w-12 shrink-0 rounded-lg" style={tile(b.hue)} /><span><span className="line-clamp-2 text-sm font-medium">{b.title}</span><span className="text-[11px] text-muted-foreground">{b.author} · {b.read}</span></span></Link></li>
            ))}</ul>
          </Section>
          <Section title="Trending questions" action={<MoreLink to="/knowledge" />}>
            <ul className="space-y-3">{questions.slice(0, 4).map((q) => (
              <li key={q.id}><Link to="/knowledge" className="flex gap-2 hover:text-primary"><span className="font-logo text-primary">Q.</span><span><span className="line-clamp-2 text-sm font-medium">{q.q}</span><span className="text-[11px] text-muted-foreground">{q.answers} answers</span></span></Link></li>
            ))}</ul>
          </Section>
        </div>

        <Section title="Entertainment" action={<div className="flex gap-3"><MoreLink to="/webtoon" label="Webtoon" /><MoreLink to="/tv" label="TV" /><MoreLink to="/music" label="Music" /></div>}>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {webtoons.slice(0, 3).map((w) => <Link key={w.id} to="/webtoon" className="group"><div className="grid aspect-[3/4] place-items-end rounded-xl p-2 text-left" style={tileDark(w.hue)}><span className="text-xs font-bold text-primary-foreground">{w.title}</span></div><span className="mt-1 block text-[11px] text-muted-foreground">Webtoon · {w.genre}</span></Link>)}
            {series.slice(0, 3).map((s) => <Link key={s.id} to="/series" className="group"><div className="grid aspect-[3/4] place-items-end rounded-xl p-2" style={tileDark(s.hue)}><span className="text-xs font-bold text-primary-foreground">{s.title}</span></div><span className="mt-1 block text-[11px] text-muted-foreground">Series · {s.type}</span></Link>)}
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-[2fr_1fr]">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {videos.slice(0, 3).map((v) => <Link key={v.id} to="/tv" className="group"><div className="relative grid aspect-video place-items-center rounded-xl" style={tileDark(v.hue)}><Play className="h-8 w-8 fill-primary-foreground text-primary-foreground opacity-90 transition-transform group-hover:scale-110" /><span className="absolute bottom-1.5 right-1.5 rounded bg-foreground/70 px-1 text-[10px] text-background">{v.len}</span></div><p className="mt-1.5 line-clamp-1 text-sm font-medium">{v.title}</p></Link>)}
            </div>
            <div className="space-y-2">{playlists.map((p) => <Link key={p.name} to="/music" className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-muted"><span className="h-10 w-10 rounded-lg" style={tileDark(p.hue)} /><span className="flex-1 text-sm font-semibold">{p.name}</span><span className="text-xs text-muted-foreground">{p.count} songs</span></Link>)}</div>
          </div>
        </Section>

        <div className="grid gap-6 lg:grid-cols-3">
          <Section title="Markets" action={<MoreLink to="/finance" />}>
            <ul className="space-y-2">{[...stocks.slice(0, 3), ...fx.slice(0, 2).map((f) => ({ sym: f.pair, name: "Exchange rate", price: f.rate, chg: f.chg }))].map((s) => (
              <li key={s.sym} className="flex items-center justify-between text-sm"><span><span className="font-bold">{s.sym}</span> <span className="text-xs text-muted-foreground">{s.name}</span></span><span className={s.chg >= 0 ? "font-semibold text-hot" : "font-semibold text-primary"}>{s.price.toLocaleString()} {s.chg >= 0 ? <TrendingUp className="inline h-3 w-3" /> : <TrendingDown className="inline h-3 w-3" />}</span></li>
            ))}</ul>
          </Section>
          <Section title="Sports" action={<MoreLink to="/sports" />}>
            <ul className="space-y-2.5">{matches.slice(0, 4).map((m) => (
              <li key={m.id} className="flex items-center justify-between gap-2 text-sm"><span className="min-w-0"><span className="block truncate font-semibold">{m.home} <span className="text-muted-foreground">vs</span> {m.away}</span><span className="text-[11px] text-muted-foreground">{m.sport} · {m.when}</span></span><span className={m.status.startsWith("Live") ? "shrink-0 rounded-full bg-hot px-2 py-0.5 text-[10px] font-bold text-hot-foreground" : "shrink-0 text-xs font-semibold"}>{m.status === "Upcoming" ? m.when : m.score}</span></li>
            ))}</ul>
          </Section>
          <Section title="Weather & places" action={<MoreLink to="/weather" />}>
            <Link to="/weather" className="flex items-center justify-between rounded-xl bg-brand p-4 text-primary-foreground">
              <span><span className="block text-sm opacity-80">{w.name}</span><span className="text-4xl font-extrabold">{w.temp}°</span></span>
              <span className="text-right text-sm">{w.cond}<br /><span className="opacity-80">H {w.hi}° · L {w.lo}°</span></span>
            </Link>
            <div className="mt-3 flex flex-wrap gap-2">{places.slice(0, 4).map((p) => <Link key={p.id} to="/map" className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs hover:border-primary hover:text-primary"><MapPin className="h-3 w-3" />{p.name}</Link>)}</div>
          </Section>
        </div>

        <Section title="Real Estate picks" action={<MoreLink to="/realestate" />}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {properties.slice(0, 4).map((p) => (
              <Link key={p.id} to="/realestate" className="lift overflow-hidden rounded-xl border">
                <div className="flex aspect-[16/9] items-start justify-between p-2" style={tile(p.hue)}><span className="rounded-full bg-card px-2 py-0.5 text-[10px] font-bold text-primary">{p.deal}</span><ArrowUpRight className="h-4 w-4" /></div>
                <div className="p-3"><p className="text-sm font-semibold">{p.title}</p><p className="text-xs text-muted-foreground">{p.area} · {p.size} sqft</p><p className="mt-1 font-extrabold text-primary">{taka(p.price)}{p.deal === "Rent" && <span className="text-xs font-medium text-muted-foreground">/mo</span>}</p></div>
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
