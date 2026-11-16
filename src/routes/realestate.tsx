import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bath, BedDouble, Building2, Heart, Ruler } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState, PageHeader, Pill, Section, seo } from "@/components/sholok/ui";
import { properties, taka, tile } from "@/lib/data";
import { useLocal } from "@/lib/store";

export const Route = createFileRoute("/realestate")({
  head: () => seo("Real Estate", "Apartments, houses, offices and shops for sale or rent on SHOLOK Real Estate (sample listings)."),
  component: RealEstate,
});
function RealEstate() {
  const [deal, setDeal] = useState("All");
  const [type, setType] = useState("All");
  const [fav, setFav] = useLocal<number[]>("fav-homes", []);
  const [loan, setLoan] = useState({ amt: "5000000", rate: "9", yrs: "20" });
  const list = properties.filter((p) => (deal === "All" || p.deal === deal) && (type === "All" || p.type === type));
  const P = Number(loan.amt), r = Number(loan.rate) / 1200, n = Number(loan.yrs) * 12;
  const emi = P > 0 && r > 0 && n > 0 ? (P * r * (1 + r) ** n) / ((1 + r) ** n - 1) : 0;
  return (
    <div>
      <PageHeader title="Real Estate" domain="realestate.sholok.com" desc="Homes and offices — sample listings" icon={Building2} />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_300px]">
        <div>
          <div className="mb-3 flex gap-2">{["All", "Sale", "Rent"].map((d) => <Pill key={d} active={deal === d} onClick={() => setDeal(d)}>{d}</Pill>)}</div>
          <div className="mb-5 flex flex-wrap gap-2">{["All", "Apartment", "House", "Office", "Shop"].map((d) => <Pill key={d} active={type === d} onClick={() => setType(d)}>{d}</Pill>)}</div>
          {list.length === 0 && <EmptyState title="No listings match" />}
          <div className="grid gap-4 sm:grid-cols-2">{list.map((p) => (
            <article key={p.id} className="card-surface lift overflow-hidden">
              <div className="relative aspect-[16/9]" style={tile(p.hue)}>
                <span className="absolute left-3 top-3 rounded-full bg-hot px-2 py-0.5 text-[10px] font-bold text-hot-foreground">For {p.deal}</span>
                <button aria-label="Save listing" onClick={() => setFav(fav.includes(p.id) ? fav.filter((x) => x !== p.id) : [...fav, p.id])} className="absolute right-3 top-3 rounded-full bg-card p-1.5"><Heart className={fav.includes(p.id) ? "h-4 w-4 fill-hot text-hot" : "h-4 w-4"} /></button>
              </div>
              <div className="p-4">
                <p className="text-lg font-extrabold text-primary">{taka(p.price)}{p.deal === "Rent" && <span className="text-xs font-medium text-muted-foreground">/month</span>}</p>
                <p className="font-semibold">{p.title}</p><p className="text-xs text-muted-foreground">{p.area} · {p.type}</p>
                <div className="mt-3 flex gap-4 text-xs text-muted-foreground">{p.beds > 0 && <span><BedDouble className="mr-1 inline h-3.5 w-3.5" />{p.beds}</span>}<span><Bath className="mr-1 inline h-3.5 w-3.5" />{p.baths}</span><span><Ruler className="mr-1 inline h-3.5 w-3.5" />{p.size} sqft</span></div>
                <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => toast.success("Viewing request noted", { description: "Demo only — no agent is contacted." })}>Request a viewing</Button>
              </div>
            </article>))}</div>
        </div>
        <Section title="Loan calculator" className="self-start">
          {([["amt", "Loan amount (৳)"], ["rate", "Interest rate (%)"], ["yrs", "Years"]] as const).map(([k, l]) => <div key={k} className="mb-3"><label htmlFor={k} className="text-xs font-semibold">{l}</label><Input id={k} inputMode="decimal" value={loan[k]} onChange={(e) => setLoan({ ...loan, [k]: e.target.value })} className="mt-1" /></div>)}
          <p className="text-xs text-muted-foreground">Monthly payment</p><p className="text-2xl font-extrabold text-primary">{taka(Math.round(emi))}</p>
        </Section>
      </div>
    </div>
  );
}
