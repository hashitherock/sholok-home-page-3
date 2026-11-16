import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookA, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EmptyState, PageHeader, Pill, Section, seo } from "@/components/sholok/ui";
import { dictionary } from "@/lib/data";
import { useLocal } from "@/lib/store";

export const Route = createFileRoute("/dictionary")({
  head: () => seo("Dictionary", "English–Bangla meanings, pronunciation and example sentences on SHOLOK Dictionary."),
  component: Dict,
});
function Dict() {
  const [q, setQ] = useState("resilient");
  const [saved, setSaved] = useLocal<string[]>("words", []);
  const w = q.trim().toLowerCase();
  const e = dictionary[w];
  const sugg = Object.keys(dictionary).filter((k) => w && k.startsWith(w) && k !== w);
  return (
    <div>
      <PageHeader title="Dictionary" domain="dictionary.sholok.com" desc="Meanings, pronunciation and examples" icon={BookA} />
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 md:grid-cols-[1fr_260px]">
        <div>
          <label htmlFor="dq" className="sr-only">Look up a word</label>
          <Input id="dq" value={q} onChange={(x) => setQ(x.target.value)} placeholder="Look up a word…" className="h-12 text-lg" />
          {sugg.length > 0 && <div className="mt-2 flex gap-2">{sugg.map((s) => <Pill key={s} onClick={() => setQ(s)}>{s}</Pill>)}</div>}
          <div className="mt-5">{e ? (
            <article className="card-surface p-6">
              <div className="flex items-start justify-between"><div><h2 className="text-3xl font-extrabold">{w}</h2><p className="text-sm text-muted-foreground">{e.phon} · <i>{e.pos}</i></p></div>
                <button aria-label="Save word" onClick={() => setSaved(saved.includes(w) ? saved.filter((x) => x !== w) : [...saved, w])}><Star className={saved.includes(w) ? "h-6 w-6 fill-hot text-hot" : "h-6 w-6"} /></button></div>
              <p className="mt-4 text-xl font-bold text-primary">{e.bn}</p>
              <ol className="mt-3 list-decimal space-y-1 pl-5">{e.defs.map((d) => <li key={d}>{d}</li>)}</ol>
              <p className="mt-4 border-l-2 border-hot pl-3 italic text-muted-foreground">“{e.ex}”</p>
              <div className="mt-4 flex flex-wrap gap-2">{e.syn.map((s) => <span key={s} className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">{s}</span>)}</div>
            </article>
          ) : <EmptyState title={w ? `“${q}” isn't in this demo dictionary` : "Type a word"} hint={`Try: ${Object.keys(dictionary).join(", ")}`} />}</div>
        </div>
        <Section title="My word list">{saved.length === 0 ? <p className="text-sm text-muted-foreground">Star a word to save it.</p> : <div className="flex flex-wrap gap-2">{saved.map((s) => <Pill key={s} onClick={() => setQ(s)}>{s}</Pill>)}</div>}</Section>
      </div>
    </div>
  );
}
