import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell, Trophy } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Pill, Section, seo } from "@/components/sholok/ui";
import { matches, standings } from "@/lib/data";
import { useLocal } from "@/lib/store";

export const Route = createFileRoute("/sports")({
  head: () => seo("Sports", "Cricket, football and kabaddi scores, fixtures and standings on SHOLOK Sports (demo)."),
  component: Sports,
});
function Sports() {
  const [sport, setSport] = useState("All");
  const [rem, setRem] = useLocal<number[]>("reminders", []);
  const list = matches.filter((m) => sport === "All" || m.sport === sport);
  return (
    <div>
      <PageHeader title="Sports" domain="sports.sholok.com" desc="Scores and fixtures — sample data" icon={Trophy} />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="mb-4 flex gap-2">{["All", "Cricket", "Football", "Kabaddi"].map((s) => <Pill key={s} active={sport === s} onClick={() => setSport(s)}>{s}</Pill>)}</div>
          <div className="space-y-3">{list.map((m) => (
            <div key={m.id} className="card-surface flex items-center gap-4 p-4">
              <span className="w-20 text-xs font-semibold text-muted-foreground">{m.sport}<br />{m.when}</span>
              <span className="flex-1 font-semibold">{m.home}<br />{m.away}</span>
              <span className="text-right">
                <span className="block font-extrabold">{m.score}</span>
                {m.status === "Upcoming" ? <button onClick={() => { setRem(rem.includes(m.id) ? rem.filter((x) => x !== m.id) : [...rem, m.id]); toast(rem.includes(m.id) ? "Reminder removed" : "Reminder set (in this browser)"); }} className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary"><Bell className={rem.includes(m.id) ? "h-3 w-3 fill-primary" : "h-3 w-3"} />{rem.includes(m.id) ? "Reminding" : "Remind me"}</button>
                  : <span className={m.status.startsWith("Live") ? "rounded-full bg-hot px-2 py-0.5 text-[10px] font-bold text-hot-foreground" : "text-xs text-muted-foreground"}>{m.status}</span>}
              </span>
            </div>))}</div>
        </div>
        <Section title="Premier League table">
          <table className="w-full text-sm"><thead><tr className="text-xs text-muted-foreground"><th className="text-left">Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>Pts</th></tr></thead>
            <tbody>{standings.map((s, i) => <tr key={s.team} className="border-t text-center"><td className="py-2 text-left"><span className={i < 1 ? "mr-2 font-bold text-hot" : "mr-2 text-muted-foreground"}>{i + 1}</span>{s.team}</td><td>{s.p}</td><td>{s.w}</td><td>{s.d}</td><td>{s.l}</td><td className="font-bold">{s.pts}</td></tr>)}</tbody></table>
        </Section>
      </div>
    </div>
  );
}
