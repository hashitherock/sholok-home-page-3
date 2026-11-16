import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LineChart as LC, Star } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Input } from "@/components/ui/input";
import { PageHeader, Section, seo } from "@/components/sholok/ui";
import { fx, stocks } from "@/lib/data";
import { useLocal } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/finance")({
  head: () => seo("Finance", "Stock index, share prices and exchange rates overview on SHOLOK Finance (demo data)."),
  component: Finance,
});
function Finance() {
  const [sel, setSel] = useState(stocks[0].sym);
  const [watch, setWatch] = useLocal<string[]>("watch", []);
  const [amt, setAmt] = useState("100");
  const s = stocks.find((x) => x.sym === sel)!;
  const data = useMemo(() => { let v = s.price * 0.94; return Array.from({ length: 30 }, (_, i) => { v = v * (1 + Math.sin(i * 1.7 + s.price) * 0.012 + 0.002); return { d: i + 1, v: +v.toFixed(2) }; }); }, [s]);
  return (
    <div>
      <PageHeader title="Finance" domain="finance.sholok.com" desc="Markets at a glance — sample data, not live prices" icon={LC} />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <Section title={`${s.sym} · ${s.name}`} action={<span className={cn("text-lg font-extrabold", s.chg >= 0 ? "text-hot" : "text-primary")}>{s.price.toLocaleString()} ({s.chg >= 0 ? "+" : ""}{s.chg}%)</span>}>
            <div className="h-64"><ResponsiveContainer><AreaChart data={data}><defs><linearGradient id="fa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--color-primary)" stopOpacity={0.3} /><stop offset="1" stopColor="var(--color-primary)" stopOpacity={0} /></linearGradient></defs><XAxis dataKey="d" hide /><YAxis domain={["auto", "auto"]} hide /><Tooltip /><Area dataKey="v" stroke="var(--color-primary)" strokeWidth={2} fill="url(#fa)" /></AreaChart></ResponsiveContainer></div>
          </Section>
          <Section title="Stocks">
            <table className="w-full text-sm"><tbody>{stocks.map((x) => <tr key={x.sym} className={cn("cursor-pointer border-t hover:bg-muted", x.sym === sel && "bg-secondary")} onClick={() => setSel(x.sym)}>
              <td className="py-2.5"><button aria-label="Watch" onClick={(e) => { e.stopPropagation(); setWatch(watch.includes(x.sym) ? watch.filter((y) => y !== x.sym) : [...watch, x.sym]); }}><Star className={watch.includes(x.sym) ? "h-4 w-4 fill-hot text-hot" : "h-4 w-4 text-muted-foreground"} /></button></td>
              <td className="font-bold">{x.sym}</td><td className="hidden text-muted-foreground sm:table-cell">{x.name}</td><td className="text-right">{x.price.toLocaleString()}</td><td className={cn("text-right font-semibold", x.chg >= 0 ? "text-hot" : "text-primary")}>{x.chg >= 0 ? "+" : ""}{x.chg}%</td></tr>)}</tbody></table>
          </Section>
        </div>
        <div className="space-y-6">
          <Section title="Exchange rates">
            <ul className="space-y-2">{fx.map((f) => <li key={f.pair} className="flex justify-between text-sm"><span className="font-semibold">{f.pair}</span><span>{f.rate}</span></li>)}</ul>
            <label htmlFor="usd" className="mt-4 block text-xs font-semibold">Convert USD to BDT</label>
            <Input id="usd" inputMode="decimal" value={amt} onChange={(e) => setAmt(e.target.value)} className="mt-1" />
            <p className="mt-2 text-lg font-extrabold text-primary">৳{((Number(amt) || 0) * fx[0].rate).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
          </Section>
          <Section title="Watchlist">{watch.length === 0 ? <p className="text-sm text-muted-foreground">Star a stock to watch it.</p> : <ul className="space-y-1 text-sm">{watch.map((w) => <li key={w}><button onClick={() => setSel(w)} className="font-semibold hover:text-primary">{w}</button></li>)}</ul>}</Section>
        </div>
      </div>
    </div>
  );
}
