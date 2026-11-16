import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Inbox, Star, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type Product, products, taka, tile } from "@/lib/data";
import { useLocal, type CartItem } from "@/lib/store";

export function seo(title: string, description: string) {
  const t = `${title} | SHOLOK`;
  return {
    meta: [
      { title: t },
      { name: "description", content: description },
      { property: "og:title", content: t },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}

export function PageHeader({ title, domain, desc, icon: Icon, children }: { title: string; domain: string; desc: string; icon: React.ComponentType<{ className?: string }>; children?: ReactNode }) {
  return (
    <div className="border-b bg-card bg-hero">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">SHOLOK</Link><ChevronRight className="h-3 w-3" /><span className="text-foreground">{title}</span>
        </nav>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-primary-foreground shadow-lift"><Icon className="h-7 w-7" /></div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl"><span className="font-logo text-primary">SHOLOK</span> {title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{desc} <span className="ml-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-hot bg-hot-soft">{domain}</span></p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function Section({ title, action, children, className }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("card-surface p-5", className)}>
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-base font-bold tracking-tight">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function MoreLink({ to, label = "View all" }: { to: string; label?: string }) {
  return <Link to={to} className="inline-flex items-center text-xs font-semibold text-primary hover:underline">{label}<ChevronRight className="h-3 w-3" /></Link>;
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-10 text-center">
      <Inbox className="mb-3 h-8 w-8 text-muted-foreground" />
      <p className="font-semibold">{title}</p>
      {hint && <p className="mt-1 text-sm text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function Stars({ value }: { value: number }) {
  return <span className="inline-flex items-center gap-0.5 text-xs font-semibold"><Star className="h-3.5 w-3.5 fill-hot text-hot" />{value.toFixed(1)}</span>;
}

export function useCart() {
  const [items, setItems] = useLocal<CartItem[]>("cart", []);
  const add = (id: string) => {
    setItems((prev) => {
      const f = prev.find((i) => i.id === id);
      return f ? prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) : [...prev, { id, qty: 1 }];
    });
    toast.success("Added to cart", { description: products.find((p) => p.id === id)?.name });
  };
  const setQty = (id: string, qty: number) => setItems((prev) => (qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))));
  return { items, add, setQty, clear: () => setItems([]) };
}

export function ProductCard({ p, compact }: { p: Product; compact?: boolean }) {
  const { add } = useCart();
  return (
    <div className="group card-surface lift overflow-hidden">
      <div className="relative grid aspect-square place-items-center text-5xl" style={tile(p.hue)}>
        <span className="transition-transform duration-300 group-hover:scale-110" aria-hidden>{p.emoji}</span>
        {p.was && <span className="absolute left-2 top-2 rounded-full bg-hot px-2 py-0.5 text-[10px] font-bold text-hot-foreground">-{Math.round((1 - p.price / p.was) * 100)}%</span>}
      </div>
      <div className="p-3">
        <Link to="/smartstore/$slug" params={{ slug: p.seller }} className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground hover:text-primary">{p.seller.replace("-", " ")}</Link>
        <p className="line-clamp-1 text-sm font-semibold">{p.name}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-extrabold">{taka(p.price)}</span>
          {p.was && !compact && <span className="text-xs text-muted-foreground line-through">{taka(p.was)}</span>}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <Stars value={p.rating} />
          <Button size="sm" variant="secondary" className="h-7 px-2" onClick={() => add(p.id)} aria-label={`Add ${p.name} to cart`}><ShoppingCart className="h-3.5 w-3.5" /></Button>
        </div>
      </div>
    </div>
  );
}

export function Pill({ active, onClick, children }: { active?: boolean; onClick?: () => void; children: ReactNode }) {
  return (
    <button onClick={onClick} className={cn("whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors", active ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary/40 hover:text-primary")}>
      {children}
    </button>
  );
}
