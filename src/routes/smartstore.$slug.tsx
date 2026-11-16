import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, Store } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { EmptyState, ProductCard, Section, Stars, seo } from "@/components/sholok/ui";
import { products, sellers, taka, tileDark } from "@/lib/data";
import { useLocal } from "@/lib/store";

export const Route = createFileRoute("/smartstore/$slug")({
  loader: ({ params }) => {
    const seller = sellers.find((s) => s.slug === params.slug);
    if (!seller) throw notFound();
    return { seller };
  },
  head: ({ loaderData }) => loaderData ? seo(`${loaderData.seller.name} Store`, `${loaderData.seller.desc} Shop the official ${loaderData.seller.name} storefront on SHOLOK Smart Store.`) : { meta: [{ title: "Store unavailable | SHOLOK" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-20 text-center"><Store className="mx-auto h-10 w-10 text-primary" /><h1 className="mt-3 text-xl font-bold">Store not found</h1><p className="mt-1 text-sm text-muted-foreground">This storefront doesn't exist.</p><Button asChild className="mt-5 rounded-full"><Link to="/smartstore">Browse stores</Link></Button></div>
  ),
  component: Storefront,
});

const reviews = [
  { name: "Tasnim R.", stars: 5, text: "Fast delivery and the quality is exactly as shown." },
  { name: "Mahmud H.", stars: 4, text: "Great value. Packaging could be a bit better." },
  { name: "Ayesha K.", stars: 5, text: "Second order from this store — always reliable." },
];

function Storefront() {
  const { seller } = Route.useLoaderData();
  const own = products.filter((p) => p.seller === seller.slug);
  const max = Math.max(...own.map((p) => p.price));
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("popular");
  const [limit, setLimit] = useState(max);
  const [following, setFollowing] = useLocal<string[]>("following", []);
  const isF = following.includes(seller.slug);
  const list = own.filter((p) => p.price <= limit && p.name.toLowerCase().includes(q.toLowerCase())).sort((a, b) => (sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : b.reviews - a.reviews));
  return (
    <div>
      <div className="h-40 md:h-56" style={tileDark(seller.hue)} />
      <div className="mx-auto max-w-7xl px-4">
        <div className="-mt-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-end gap-4">
            <span className="grid h-24 w-24 place-items-center rounded-3xl border-4 border-card font-logo text-4xl text-primary-foreground shadow-lift" style={tileDark(seller.hue + 25)}>{seller.name[0]}</span>
            <div className="pb-1"><h1 className="text-2xl font-extrabold md:text-3xl">{seller.name}</h1><p className="text-sm text-muted-foreground">{seller.tagline}</p></div>
          </div>
          <div className="flex items-center gap-3"><Stars value={seller.rating} /><span className="text-sm text-muted-foreground">{seller.followers} followers</span><Button className="rounded-full" variant={isF ? "secondary" : "default"} onClick={() => { setFollowing(isF ? following.filter((x) => x !== seller.slug) : [...following, seller.slug]); toast(isF ? "Unfollowed" : `Following ${seller.name}`); }}>{isF ? "Following" : "Follow store"}</Button></div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">smartstore.sholok.com/{seller.slug}</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-5">
            <Section title="Filter">
              <label htmlFor="sq" className="text-xs font-semibold">Search this store</label>
              <Input id="sq" value={q} onChange={(e) => setQ(e.target.value)} className="mt-1 h-9" />
              <p className="mt-4 text-xs font-semibold">Max price: {taka(limit)}</p>
              <Slider className="mt-3" min={0} max={max} step={Math.max(100, Math.round(max / 50))} value={[limit]} onValueChange={(v) => setLimit(v[0] ?? max)} aria-label="Maximum price" />
              <label htmlFor="ss" className="mt-4 block text-xs font-semibold">Sort</label>
              <select id="ss" value={sort} onChange={(e) => setSort(e.target.value)} className="mt-1 h-9 w-full rounded-md border bg-card px-2 text-sm"><option value="popular">Most popular</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select>
            </Section>
            <Section title="Store info">
              <p className="text-sm text-muted-foreground">{seller.desc}</p>
              <ul className="mt-3 space-y-1 text-sm"><li><MapPin className="mr-1 inline h-3.5 w-3.5 text-primary" />{seller.location}</li><li>Selling since {seller.since}</li><li>Categories: {seller.cats.join(", ")}</li></ul>
            </Section>
          </aside>
          <div>
            {list.length === 0 ? <EmptyState title="No products match these filters" /> : <div className="grid grid-cols-2 gap-4 md:grid-cols-3">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>}
            <h2 className="mb-3 mt-10 text-lg font-bold">Customer reviews</h2>
            <div className="grid gap-3 md:grid-cols-3">{reviews.map((r) => <div key={r.name} className="card-surface p-4"><p className="text-hot">{"★".repeat(r.stars)}<span className="text-border">{"★".repeat(5 - r.stars)}</span></p><p className="mt-2 text-sm">{r.text}</p><p className="mt-2 text-xs text-muted-foreground">{r.name}</p></div>)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
