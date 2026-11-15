import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Navigation } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState, PageHeader, Pill, Stars, seo } from "@/components/sholok/ui";
import { places } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/map")({
  head: () => seo("Map", "Find places, parks, restaurants and landmarks around Dhaka on SHOLOK Map."),
  component: MapPage,
});

function MapPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [sel, setSel] = useState<number | null>(null);
  const list = places.filter((p) => (cat === "All" || p.cat === cat) && (p.name + p.area).toLowerCase().includes(q.toLowerCase()));
  const s = places.find((p) => p.id === sel);
  return (
    <div>
      <PageHeader title="Map" domain="map.sholok.com" desc="Places and directions around you" icon={MapPin} />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[340px_1fr]">
        <div className="space-y-3">
          <label htmlFor="mq" className="sr-only">Search places</label>
          <Input id="mq" placeholder="Search places…" value={q} onChange={(e) => setQ(e.target.value)} className="h-10" />
          <div className="flex flex-wrap gap-2">{["All", "Park", "Landmark", "Restaurant", "Cafe", "Shopping"].map((c) => <Pill key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Pill>)}</div>
          {list.length === 0 && <EmptyState title="No places found" />}
          {list.map((p) => <button key={p.id} onClick={() => setSel(p.id)} className={cn("card-surface w-full p-3 text-left", sel === p.id && "border-primary")}><p className="font-semibold">{p.name}</p><p className="text-xs text-muted-foreground">{p.cat} · {p.area}</p><Stars value={p.rating} /></button>)}
        </div>
        <div className="card-surface relative aspect-[4/3] overflow-hidden bg-secondary">
          <svg className="absolute inset-0 h-full w-full text-border" aria-hidden><defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="currentColor" /></pattern></defs><rect width="100%" height="100%" fill="url(#g)" /><path d="M0 70% C 30% 60%, 50% 80%, 100% 55%" stroke="var(--color-primary-glow)" strokeOpacity=".25" strokeWidth="28" fill="none" /></svg>
          {list.map((p) => <button key={p.id} onClick={() => setSel(p.id)} aria-label={p.name} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${p.x}%`, top: `${p.y}%` }}><MapPin className={cn("h-8 w-8 drop-shadow", sel === p.id ? "fill-hot text-hot-foreground" : "fill-primary text-primary-foreground")} /></button>)}
          {s && <div className="absolute inset-x-4 bottom-4 card-surface flex items-center justify-between p-4"><div><p className="font-bold">{s.name}</p><p className="text-xs text-muted-foreground">{s.cat} · {s.area}</p></div><Button size="sm" onClick={() => toast("Directions preview", { description: `Route to ${s.name} — demo only, no live navigation.` })}><Navigation className="mr-1 h-4 w-4" />Directions</Button></div>}
        </div>
      </div>
    </div>
  );
}
