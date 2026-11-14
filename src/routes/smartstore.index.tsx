import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutDashboard, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState, PageHeader, Pill, ProductCard, Stars, seo } from "@/components/sholok/ui";
import { products, sellers, tileDark } from "@/lib/data";

export const Route = createFileRoute("/smartstore/")({
  head: () => seo("Smart Store", "Discover seller storefronts and featured products on SHOLOK Smart Store."),
  component: SmartStore,
});

function SmartStore() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const list = sellers.filter((s) => (cat === "All" || s.cats.includes(cat)) && (s.name + s.desc).toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageHeader title="Smart Store" domain="smartstore.sholok.com" desc="Every seller, their own storefront" icon={Store}>
        <Button asChild variant="outline" className="rounded-full"><Link to="/smartstore/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Seller dashboard</Link></Button>
      </PageHeader>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label htmlFor="store-q" className="sr-only">Search stores</label>
          <Input id="store-q" placeholder="Search stores…" value={q} onChange={(e) => setQ(e.target.value)} className="h-10 sm:max-w-xs" />
          <div className="flex gap-2 overflow-x-auto">{["All", "Fashion", "Sports", "Electronics", "Home"].map((c) => <Pill key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Pill>)}</div>
        </div>
        {list.length === 0 && <EmptyState title="No stores found" />}
        <div className="grid gap-5 md:grid-cols-3">
          {list.map((s) => (
            <Link key={s.slug} to="/smartstore/$slug" params={{ slug: s.slug }} className="card-surface lift overflow-hidden">
              <div className="h-24" style={tileDark(s.hue)} />
              <div className="-mt-8 px-4 pb-4">
                <span className="grid h-16 w-16 place-items-center rounded-2xl border-4 border-card font-logo text-2xl text-primary-foreground" style={tileDark(s.hue + 20)}>{s.name[0]}</span>
                <p className="mt-2 text-lg font-bold">{s.name}</p>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground"><Stars value={s.rating} /><span>{s.followers} followers</span><span>/{s.slug}</span></div>
              </div>
            </Link>
          ))}
        </div>
        <h2 className="mb-4 mt-10 text-lg font-bold">Featured products</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">{products.slice(0, 12).filter((_, i) => i % 2 === 0).map((p) => <ProductCard key={p.id} p={p} compact />)}</div>
      </div>
    </div>
  );
}
