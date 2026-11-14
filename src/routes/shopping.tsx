import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState, PageHeader, Pill, ProductCard, Section, seo, useCart } from "@/components/sholok/ui";
import { products, sellers, taka, tile } from "@/lib/data";
import { cartTotals } from "@/lib/store";

export const Route = createFileRoute("/shopping")({
  head: () => seo("Shopping", "Compare products from trusted SHOLOK Smart Store sellers and check out in one cart."),
  component: Shopping,
});

const priceOf = (id: string) => products.find((p) => p.id === id)?.price ?? 0;

function Shopping() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("popular");
  const cart = useCart();
  const t = cartTotals(cart.items, priceOf);
  const list = products
    .filter((p) => (cat === "All" || p.cat === cat) && p.name.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : b.reviews - a.reviews));
  return (
    <div>
      <PageHeader title="Shopping" domain="shopping.sholok.com" desc="Compare and buy from trusted sellers" icon={ShoppingBag} />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label htmlFor="shop-q" className="sr-only">Search products</label>
            <Input id="shop-q" placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} className="h-10 sm:max-w-xs" />
            <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)} className="h-10 rounded-md border bg-card px-2 text-sm"><option value="popular">Most popular</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select>
          </div>
          <div className="mb-5 flex gap-2 overflow-x-auto pb-1">{["All", "Fashion", "Sports", "Electronics", "Home"].map((c) => <Pill key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Pill>)}</div>
          {list.length === 0 ? <EmptyState title="No products match" hint="Try another category or search term." /> : <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>}
          <h2 className="mb-3 mt-10 text-lg font-bold">Shop by store</h2>
          <div className="grid gap-3 sm:grid-cols-3">{sellers.map((s) => <Link key={s.slug} to="/smartstore/$slug" params={{ slug: s.slug }} className="lift rounded-xl border bg-card p-4"><p className="font-bold">{s.name}</p><p className="text-xs text-muted-foreground">{s.tagline}</p></Link>)}</div>
        </div>
        <div id="cart" className="lg:sticky lg:top-20 lg:self-start">
          <Section title={`Your cart (${t.count})`}>
            {cart.items.length === 0 ? <EmptyState title="Your cart is empty" hint="Add something you love." /> : (
              <>
                <ul className="divide-y">{cart.items.map((i) => { const p = products.find((x) => x.id === i.id)!; return (
                  <li key={i.id} className="flex items-center gap-3 py-3">
                    <span className="grid h-12 w-12 place-items-center rounded-lg text-xl" style={tile(p.hue)}>{p.emoji}</span>
                    <span className="min-w-0 flex-1"><span className="line-clamp-1 text-sm font-semibold">{p.name}</span><span className="text-xs text-muted-foreground">{taka(p.price)}</span></span>
                    <span className="flex items-center gap-1">
                      <button aria-label="Decrease" onClick={() => cart.setQty(i.id, i.qty - 1)} className="rounded-md border p-1 hover:bg-muted">{i.qty === 1 ? <Trash2 className="h-3 w-3" /> : <Minus className="h-3 w-3" />}</button>
                      <span className="w-6 text-center text-sm font-semibold">{i.qty}</span>
                      <button aria-label="Increase" onClick={() => cart.setQty(i.id, i.qty + 1)} className="rounded-md border p-1 hover:bg-muted"><Plus className="h-3 w-3" /></button>
                    </span>
                  </li>); })}</ul>
                <dl className="mt-3 space-y-1 border-t pt-3 text-sm">
                  <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{taka(t.subtotal)}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd>{t.shipping ? taka(t.shipping) : "Free"}</dd></div>
                  <div className="flex justify-between text-base font-extrabold"><dt>Total</dt><dd className="text-primary">{taka(t.total)}</dd></div>
                </dl>
                <p className="mt-1 text-[11px] text-muted-foreground">Free delivery on orders over ৳5,000.</p>
                <Button className="mt-4 w-full rounded-full" size="lg" onClick={() => { cart.clear(); toast.success("Order placed (demo)", { description: `Total ${taka(t.total)} — no payment was taken.` }); }}>Checkout</Button>
              </>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
}
