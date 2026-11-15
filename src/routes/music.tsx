import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Music, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { PageHeader, Section, seo } from "@/components/sholok/ui";
import { playlists, tileDark, tracks } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/music")({
  head: () => seo("Music", "Playlists for every mood on SHOLOK Music (Vibe)."),
  component: MusicPage,
});
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
function MusicPage() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const t = tracks[i];
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setPos((p) => { if (p + 1 >= t.len) { setI((x) => (x + 1) % tracks.length); return 0; } return p + 1; }), 1000);
    return () => clearInterval(id);
  }, [playing, t.len]);
  const pick = (n: number) => { setI((n + tracks.length) % tracks.length); setPos(0); setPlaying(true); };
  return (
    <div>
      <PageHeader title="Music" domain="vibe.sholok.com" desc="Playlists for every mood" icon={Music} />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{playlists.map((p, n) => <button key={p.name} onClick={() => pick(n)} className="lift rounded-2xl p-4 text-left" style={tileDark(p.hue)}><p className="font-bold text-primary-foreground">{p.name}</p><p className="text-xs text-primary-foreground/80">{p.count} songs</p></button>)}</div>
          <Section title="Top tracks"><ol>{tracks.map((x, n) => <li key={x.id}><button onClick={() => pick(n)} className={cn("flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm hover:bg-muted", n === i && "bg-secondary")}><span className="w-5 text-muted-foreground">{n + 1}</span><span className="flex-1"><span className="block font-semibold">{x.title}</span><span className="text-xs text-muted-foreground">{x.artist}</span></span><span className="text-xs text-muted-foreground">{fmt(x.len)}</span></button></li>)}</ol></Section>
        </div>
        <div className="card-surface self-start p-5 lg:sticky lg:top-20">
          <div className={cn("aspect-square rounded-2xl bg-brand", playing && "animate-pulse")} />
          <p className="mt-4 text-lg font-bold">{t.title}</p><p className="text-sm text-muted-foreground">{t.artist}</p>
          <input type="range" min={0} max={t.len} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Seek" className="mt-4 w-full accent-[var(--color-primary)]" />
          <div className="flex justify-between text-xs text-muted-foreground"><span>{fmt(pos)}</span><span>{fmt(t.len)}</span></div>
          <div className="mt-3 flex items-center justify-center gap-4">
            <button aria-label="Previous" onClick={() => pick(i - 1)} className="rounded-full p-2 hover:bg-muted"><SkipBack className="h-5 w-5" /></button>
            <button aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying(!playing)} className="grid h-14 w-14 place-items-center rounded-full bg-hot text-hot-foreground">{playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}</button>
            <button aria-label="Next" onClick={() => pick(i + 1)} className="rounded-full p-2 hover:bg-muted"><SkipForward className="h-5 w-5" /></button>
          </div>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">Demo player — no audio is streamed.</p>
        </div>
      </div>
    </div>
  );
}
