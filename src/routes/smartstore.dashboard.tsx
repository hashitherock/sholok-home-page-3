import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutDashboard, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState, PageHeader, Section, seo } from "@/components/sholok/ui";
import { products, taka } from "@/lib/data";
import { useLocal } from "@/lib/store";

export const Route = createFileRoute("/smartstore/dashboard")({
  head: () => seo("Seller Dashboard", "Manage products, inventory, orders and sales in the SHOLOK Smart Store seller dashboard demo."),
  component: Dashboard,
});

type Item = { id: string; name: string; price: number; stock: number };
const seed: Item[] = products.filter((p) => p.seller === "abc-fashion").map((p) => ({ id: p.id, name: p.name, price: p.price, stock: p.stock }));
const sales = [["Mon", 18], ["Tue", 24], ["Wed", 21], ["Thu", 32], ["Fri", 41], ["Sat", 55], ["Sun", 38]].map(([d, v]) => ({ day: d, orders: v }));
const orders = [
  { id: "#SH-10432", buyer: "Tasnim R.", total: 4100, status: "Processing" },
  { id: "#SH-10431", buyer: "Mahmud H.", total: 2450, status: "Shipped" },
  { id: "#SH-10429", buyer: "Ayesha K.", total: 8900, status: "Delivered" },
];

function Dashboard() {
  const [items, setItems] = useLocal<Item[]>("seller-items", seed);
  const [profile, setProfile] = useLocal("seller-profile", { name: "ABC Fashion", tagline: "Heritage craft, modern fit" });
  const [form, setForm] = useState({ id: "", name: "", price: "", stock: "" });
  const [ost, setOst] = useLocal("seller-orders", orders);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const price = Number(form.price), stock = Number(form.stock);
    if (form.name.trim().length < 3 || !(price > 0) || !Number.isInteger(stock) || stock < 0) return toast.error("Enter a name (3+), price above 0 and a whole-number stock");
    if (form.id) setItems(items.map((i) => (i.id === form.id ? { ...i, name: form.name.trim(), price, stock } : i)));
    else setItems([{ id: "n" + Date.now(), name: form.name.trim(), price, stock }, ...items]);
    toast.success(form.id ? "Product updated" : "Product added");
    setForm({ id: "", name: "", price: "", stock: "" });
  };
  const revenue = ost.reduce((s, o) => s + o.total, 0);

  return (
    <div>
      <PageHeader title="Seller Dashboard" domain="smartstore.sholok.com/dashboard" desc="Demo — changes are saved only in this browser" icon={LayoutDashboard}>
        <Button asChild variant="outline" className="rounded-full"><Link to="/smartstore/$slug" params={{ slug: "abc-fashion" }}>View public store</Link></Button>
      </PageHeader>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[["Revenue (week)", taka(revenue)], ["Orders", String(ost.length)], ["Products", String(items.length)], ["Low stock", String(items.filter((i) => i.stock < 15).length)]].map(([k, v]) => <div key={k} className="card-surface p-4"><p className="text-xs text-muted-foreground">{k}</p><p className="mt-1 text-2xl font-extrabold">{v}</p></div>)}
        </div>
        <Tabs defaultValue="products">
          <TabsList><TabsTrigger value="products">Products</TabsTrigger><TabsTrigger value="orders">Orders</TabsTrigger><TabsTrigger value="analytics">Analytics</TabsTrigger><TabsTrigger value="profile">Store profile</TabsTrigger></TabsList>
          <TabsContent value="products" className="mt-4 grid gap-6 lg:grid-cols-[320px_1fr]">
            <Section title={form.id ? "Edit product" : "Add product"}>
              <form onSubmit={save} className="space-y-3" noValidate>
                <div><Label htmlFor="pn">Name</Label><Input id="pn" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-2"><div><Label htmlFor="pp">Price (৳)</Label><Input id="pp" inputMode="numeric" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div><div><Label htmlFor="ps">Stock</Label><Input id="ps" inputMode="numeric" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></div></div>
                <div className="flex gap-2"><Button type="submit" className="flex-1">{form.id ? "Save" : "Add"}</Button>{form.id && <Button type="button" variant="outline" onClick={() => setForm({ id: "", name: "", price: "", stock: "" })}>Cancel</Button>}</div>
              </form>
            </Section>
            <Section title="Inventory">
              {items.length === 0 ? <EmptyState title="No products" hint="Add your first product." /> : (
                <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-xs text-muted-foreground"><th className="py-2">Product</th><th>Price</th><th>Stock</th><th className="text-right">Actions</th></tr></thead>
                  <tbody>{items.map((i) => <tr key={i.id} className="border-t"><td className="py-2.5 font-medium">{i.name}</td><td>{taka(i.price)}</td><td><span className={i.stock < 15 ? "font-semibold text-hot" : ""}>{i.stock}</span></td>
                    <td className="text-right"><button aria-label="Edit" className="rounded p-1.5 hover:bg-muted" onClick={() => setForm({ id: i.id, name: i.name, price: String(i.price), stock: String(i.stock) })}><Pencil className="h-4 w-4" /></button><button aria-label="Delete" className="rounded p-1.5 text-destructive hover:bg-muted" onClick={() => { setItems(items.filter((x) => x.id !== i.id)); toast("Product deleted"); }}><Trash2 className="h-4 w-4" /></button></td></tr>)}</tbody></table></div>
              )}
            </Section>
          </TabsContent>
          <TabsContent value="orders" className="mt-4"><Section title="Recent orders"><ul className="divide-y">{ost.map((o) => <li key={o.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"><span className="font-semibold">{o.id}</span><span>{o.buyer}</span><span>{taka(o.total)}</span><select aria-label={`Status for ${o.id}`} value={o.status} onChange={(e) => { setOst(ost.map((x) => (x.id === o.id ? { ...x, status: e.target.value } : x))); toast.success("Order status updated"); }} className="h-8 rounded-md border bg-card px-2 text-xs">{["Processing", "Shipped", "Delivered", "Cancelled"].map((s) => <option key={s}>{s}</option>)}</select></li>)}</ul></Section></TabsContent>
          <TabsContent value="analytics" className="mt-4"><Section title="Orders this week (demo)"><div className="h-64"><ResponsiveContainer><BarChart data={sales}><XAxis dataKey="day" tickLine={false} axisLine={false} /><Tooltip cursor={{ fill: "var(--color-secondary)" }} /><Bar dataKey="orders" fill="var(--color-primary)" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div></Section></TabsContent>
          <TabsContent value="profile" className="mt-4"><Section title="Store profile"><form className="max-w-md space-y-3" onSubmit={(e) => { e.preventDefault(); toast.success("Profile saved"); }}><div><Label htmlFor="sn">Store name</Label><Input id="sn" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></div><div><Label htmlFor="st">Tagline</Label><Input id="st" value={profile.tagline} onChange={(e) => setProfile({ ...profile, tagline: e.target.value })} /></div><Button type="submit">Save profile</Button></form></Section></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
