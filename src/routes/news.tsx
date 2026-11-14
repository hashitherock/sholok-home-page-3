import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bookmark, Newspaper } from "lucide-react";
import { toast } from "sonner";
import { EmptyState, PageHeader, Pill, Section, seo } from "@/components/sholok/ui";
import { news, tileDark, trending } from "@/lib/data";
import { useLocal } from "@/lib/store";

export const Route = createFileRoute("/news")({
  head: () => seo("News", "Top stories in technology, business, world, sports and entertainment on SHOLOK News."),
  component: NewsPage,
});

function NewsPage() {
  const cats = ["All", "Saved", ...Array.from(new Set(news.map((n) => n.cat)))];
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const [saved, setSaved] = useLocal<number[]>("saved-news", []);
  const list = news.filter((n) => cat === "All" || (cat === "Saved" ? saved.includes(n.id) : n.cat === cat));
  return (
    <div>
      <PageHeader title="News" domain="news.sholok.com" desc="Stories that matter, from trusted sources" icon={Newspaper} />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_300px]">
        <div>
          <div className="mb-5 flex gap-2 overflow-x-auto pb-1">{cats.map((c) => <Pill key={c} active={cat === c} onClick={() => setCat(c)}>{c}{c === "Saved" && saved.length ? ` (${saved.length})` : ""}</Pill>)}</div>
          {list.length === 0 && <EmptyState title="Nothing saved yet" hint="Tap the bookmark on any story to read it later." />}
          <div className="grid gap-4 md:grid-cols-2">
            {list.map((n) => (
              <article key={n.id} className="card-surface overflow-hidden">
                <div className="aspect-[16/8] p-3" style={tileDark(n.hue)}><span className="rounded-full bg-card px-2 py-0.5 text-[10px] font-bold uppercase text-primary">{n.cat}</span></div>
                <div className="p-4">
                  <button onClick={() => setOpen(open === n.id ? null : n.id)} className="text-left text-lg font-bold leading-snug hover:text-primary">{n.title}</button>
                  <p className="mt-1 text-sm text-muted-foreground">{n.summary}</p>
                  {open === n.id && <p className="mt-3 border-l-2 border-primary pl-3 text-sm">Sample article body. In the full SHOLOK News service, the complete story from {n.source} would appear here with photos, related coverage and comments.</p>}
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{n.source} · {n.time}</span>
                    <button aria-label="Save story" onClick={() => { setSaved(saved.includes(n.id) ? saved.filter((x) => x !== n.id) : [...saved, n.id]); toast(saved.includes(n.id) ? "Removed from saved" : "Saved for later"); }}><Bookmark className={saved.includes(n.id) ? "h-4 w-4 fill-primary text-primary" : "h-4 w-4"} /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <Section title="Trending topics"><ol className="space-y-2">{trending.map((t, i) => <li key={t} className="flex gap-3 text-sm"><span className="w-4 font-bold text-hot">{i + 1}</span>{t}</li>)}</ol></Section>
      </div>
    </div>
  );
}
