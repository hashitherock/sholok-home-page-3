import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Play, Tv } from "lucide-react";
import { PageHeader, Pill, seo } from "@/components/sholok/ui";
import { tileDark, videos } from "@/lib/data";

export const Route = createFileRoute("/tv")({
  head: () => seo("TV", "Watch food, travel, tech, sports and music videos on SHOLOK TV."),
  component: TvPage,
});
function TvPage() {
  const [cat, setCat] = useState("All");
  const [now, setNow] = useState(videos[0]!);
  const list = videos.filter((v) => cat === "All" || v.cat === cat);
  return (
    <div>
      <PageHeader title="TV" domain="tv.sholok.com" desc="Videos and clips worth your time" icon={Tv} />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="relative grid aspect-video place-items-center rounded-2xl" style={tileDark(now.hue)}>
            <Play className="h-16 w-16 fill-primary-foreground text-primary-foreground" />
            <span className="absolute bottom-3 left-3 rounded-full bg-hot px-2 py-0.5 text-[11px] font-bold text-hot-foreground">Preview · {now.len}</span>
          </div>
          <h2 className="mt-4 text-xl font-bold">{now.title}</h2>
          <p className="text-sm text-muted-foreground">{now.channel} · {now.views} views · Demo player, no video stream</p>
        </div>
        <div>
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1">{["All", ...new Set(videos.map((v) => v.cat))].map((c) => <Pill key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Pill>)}</div>
          <div className="space-y-3">{list.map((v) => <button key={v.id} onClick={() => setNow(v)} className="flex w-full gap-3 rounded-xl p-1.5 text-left hover:bg-muted"><span className="aspect-video w-36 shrink-0 rounded-lg" style={tileDark(v.hue)} /><span><span className="line-clamp-2 text-sm font-semibold">{v.title}</span><span className="text-xs text-muted-foreground">{v.channel}</span></span></button>)}</div>
        </div>
      </div>
    </div>
  );
}
