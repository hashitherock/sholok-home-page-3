import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Heart } from "lucide-react";
import { PageHeader, Pill, seo } from "@/components/sholok/ui";
import { tileDark, webtoons } from "@/lib/data";
import { useLocal } from "@/lib/store";

export const Route = createFileRoute("/webtoon")({
  head: () => seo("Webtoon", "Read daily comics in fantasy, romance, action and comedy on SHOLOK Webtoon."),
  component: Webtoon,
});
const days = ["All", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Favorites"];
function Webtoon() {
  const [day, setDay] = useState("All");
  const [fav, setFav] = useLocal<number[]>("fav-webtoon", []);
  const list = webtoons.filter((w) => day === "All" || (day === "Favorites" ? fav.includes(w.id) : w.day === day));
  return (
    <div>
      <PageHeader title="Webtoon" domain="webtoon.sholok.com" desc="New episodes every day" icon={BookOpen} />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">{days.map((d) => <Pill key={d} active={day === d} onClick={() => setDay(d)}>{d}</Pill>)}</div>
        {list.length === 0 && <p className="text-sm text-muted-foreground">No titles here yet — tap the heart on a comic to save it.</p>}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">{list.map((w) => (
          <div key={w.id} className="group">
            <div className="relative flex aspect-[3/4] items-end rounded-xl p-3 transition-transform group-hover:-translate-y-1" style={tileDark(w.hue)}>
              <button onClick={() => setFav(fav.includes(w.id) ? fav.filter((x) => x !== w.id) : [...fav, w.id])} aria-label="Favorite" className="absolute right-2 top-2 rounded-full bg-card/90 p-1.5"><Heart className={fav.includes(w.id) ? "h-4 w-4 fill-hot text-hot" : "h-4 w-4"} /></button>
              <span className="font-bold text-primary-foreground">{w.title}</span>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">{w.genre} · {w.day} · ★ {w.rating}</p>
          </div>))}</div>
      </div>
    </div>
  );
}
