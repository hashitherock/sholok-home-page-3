import { createFileRoute } from "@tanstack/react-router";
import { CloudSun, Droplets, Wind } from "lucide-react";
import { PageHeader, Section, seo } from "@/components/sholok/ui";
import { cities } from "@/lib/data";
import { useLocal } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/weather")({
  head: () => seo("Weather", "Forecasts, humidity, wind and air quality for cities across Bangladesh on SHOLOK Weather (demo)."),
  component: Weather,
});
const days = ["Today", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function Weather() {
  const [city, setCity] = useLocal("city", "Dhaka");
  const [unit, setUnit] = useLocal<"C" | "F">("unit", "C");
  const c = cities.find((x) => x.name === city) ?? cities[0];
  const u = (t: number) => (unit === "C" ? t : Math.round(t * 9 / 5 + 32)) + "°";
  return (
    <div>
      <PageHeader title="Weather" domain="weather.sholok.com" desc="Forecasts near you — sample data" icon={CloudSun}>
      </PageHeader>
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="city" className="sr-only">City</label>
          <select id="city" value={city} onChange={(e) => setCity(e.target.value)} className="h-10 rounded-md border bg-card px-3 text-sm font-semibold">{cities.map((x) => <option key={x.name}>{x.name}</option>)}</select>
          <div className="flex rounded-full border bg-card p-0.5">{(["C", "F"] as const).map((x) => <button key={x} onClick={() => setUnit(x)} className={cn("rounded-full px-3 py-1 text-sm font-semibold", unit === x && "bg-primary text-primary-foreground")}>°{x}</button>)}</div>
        </div>
        <div className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
          <div className="rounded-3xl bg-brand p-8 text-primary-foreground shadow-lift">
            <p className="text-lg opacity-90">{c.name}</p>
            <p className="text-7xl font-extrabold">{u(c.temp)}</p>
            <p className="text-lg">{c.cond} · H {u(c.hi)} L {u(c.lo)}</p>
            <div className="mt-6 flex gap-6 text-sm"><span><Droplets className="mr-1 inline h-4 w-4" />{c.hum}%</span><span><Wind className="mr-1 inline h-4 w-4" />{c.wind} km/h</span><span>AQI {c.aqi}</span></div>
          </div>
          <Section title="Other cities"><ul className="space-y-2">{cities.map((x) => <li key={x.name}><button onClick={() => setCity(x.name)} className={cn("flex w-full justify-between rounded-lg px-2 py-2 text-sm hover:bg-muted", x.name === city && "bg-secondary")}><span className="font-semibold">{x.name}</span><span>{x.cond} · {u(x.temp)}</span></button></li>)}</ul></Section>
        </div>
        <Section title="7-day forecast"><div className="grid grid-cols-4 gap-3 sm:grid-cols-7">{days.map((d, i) => <div key={d} className="rounded-xl bg-muted p-3 text-center"><p className="text-xs font-semibold">{d}</p><CloudSun className="mx-auto my-2 h-6 w-6 text-hot" /><p className="text-sm font-bold">{u(c.hi - (i % 3))}</p><p className="text-xs text-muted-foreground">{u(c.lo + (i % 2))}</p></div>)}</div></Section>
      </div>
    </div>
  );
}
