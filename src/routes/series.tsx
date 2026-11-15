import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Library } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageHeader, Pill, seo } from "@/components/sholok/ui";
import { series, tileDark } from "@/lib/data";
import { useLocal } from "@/lib/store";

export const Route = createFileRoute("/series")({
  head: () => seo("Series", "Serialized novels and comics from popular authors on SHOLOK Series."),
  component: Series,
});
function Series() {
  const [type, setType] = useState("All");
  const [prog, setProg] = useLocal<Record<number, number>>("series-progress", {});
  const list = series.filter((s) => type === "All" || s.type === type);
  return (
    <div>
      <PageHeader title="Series" domain="series.sholok.com" desc="Novels and comics, one episode at a time" icon={Library} />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex gap-2">{["All", "Novel", "Comic"].map((t) => <Pill key={t} active={type === t} onClick={() => setType(t)}>{t}</Pill>)}</div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((s) => { const p = prog[s.id] ?? 0; return (
          <div key={s.id} className="card-surface flex gap-4 p-4">
            <div className="aspect-[3/4] w-24 shrink-0 rounded-lg" style={tileDark(s.hue)} />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="text-xs font-semibold text-hot">{s.type}</span><p className="font-bold">{s.title}</p><p className="text-xs text-muted-foreground">{s.author} · {s.eps} episodes</p>
              <Progress value={(p / s.eps) * 100} className="mt-auto h-1.5" /><p className="mt-1 text-[11px] text-muted-foreground">{p ? `Episode ${p} of ${s.eps}` : "Not started"}</p>
              <Button size="sm" className="mt-2" disabled={p >= s.eps} onClick={() => { setProg({ ...prog, [s.id]: p + 1 }); toast(`Episode ${p + 1} marked as read`); }}>{p ? "Read next" : "Start reading"}</Button>
            </div>
          </div>); })}</div>
      </div>
    </div>
  );
}
