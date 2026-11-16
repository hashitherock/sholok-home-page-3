import { useState } from "react";
import { Globe } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Grid3x3, Menu, Search, ShoppingCart, UserCircle, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { services } from "@/lib/data";
import { useLocal, type User } from "@/lib/store";
import { SholokLogo } from "./Logo";
import { useCart } from "./ui";

const nav = [
  { to: "/", label: "Home" }, { to: "/search", label: "Search" }, { to: "/cafe", label: "Cafe" }, { to: "/blog", label: "Blog" },
  { to: "/shopping", label: "Shopping" }, { to: "/news", label: "News" }, { to: "/smartstore", label: "Smart Store" },
] as const;

const initialNotes = [
  { id: 1, text: "Your order from Nike has shipped", time: "5m" },
  { id: 2, text: "Rifat replied to your Cafe post", time: "1h" },
  { id: 3, text: "Weather alert: rain expected in Dhaka tonight", time: "3h" },
];

export function MegaMenuGrid({ onPick }: { onPick?: () => void }) {
  const [q, setQ] = useState("");
  const path = useRouterState({ select: (s) => s.location.pathname });
  const list = services.filter((s) => (s.name + s.desc).toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
    <label htmlFor="svc-q" className="sr-only">Search services</label>
    <input id="svc-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services…" className="mb-3 h-10 w-full rounded-full border bg-muted px-4 text-sm outline-none focus:border-primary" />
    {list.length === 0 && <p className="p-4 text-center text-sm text-muted-foreground">No service matches “{q}”.</p>}
    <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
      {list.map((s, i) => (
        <Link key={s.id} to={s.to} onClick={onPick} className={cn("group flex items-center gap-3 rounded-xl p-2.5 hover:bg-muted", (s.to === "/" ? path === "/" : path.startsWith(s.to)) && "bg-hot-soft")}>
          <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors", i % 2 ? "bg-hot-soft text-hot group-hover:bg-hot group-hover:text-hot-foreground" : "bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground")}><s.icon className="h-4.5 w-4.5" /></span>
          <span className="min-w-0"><span className="block text-sm font-semibold">{s.name}</span><span className="block truncate text-[11px] text-muted-foreground">{s.desc}</span></span>
        </Link>
      ))}
    </div>
    </div>
  );
}

export function Header() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [user] = useLocal<User>("user", null);
  const [notes, setNotes] = useLocal("notes", initialNotes);
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.qty, 0);
  const [mega, setMega] = useState(false);
  const [lang, setLang] = useLocal<"EN" | "BN">("lang", "EN");
  const [mobile, setMobile] = useState(false);
  const active = (to: string) => (to === "/" ? path === "/" : path.startsWith(to));

  return (
    <header className="sticky top-0 z-50 border-b bg-card/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <SholokLogo className="text-2xl" />
        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className={cn("relative rounded-full px-3 py-2 text-sm font-semibold transition-colors hover:text-primary", active(n.to) ? "text-hot" : "text-foreground/80")}>
              {n.label}
              {active(n.to) && <span className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-hot" />}
            </Link>
          ))}
          <Popover open={mega} onOpenChange={setMega}>
            <PopoverTrigger className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-foreground/80 hover:text-primary"><Grid3x3 className="h-4 w-4" />More Services</PopoverTrigger>
            <PopoverContent align="center" className="w-[min(760px,95vw)] rounded-2xl p-4">
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">All SHOLOK services</p>
              <MegaMenuGrid onPick={() => setMega(false)} />
            </PopoverContent>
          </Popover>
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <button onClick={() => setLang(lang === "EN" ? "BN" : "EN")} className="hidden h-10 items-center gap-1 rounded-full px-2.5 text-xs font-bold hover:bg-muted md:flex" aria-label="Switch language"><Globe className="h-4 w-4" />{lang === "EN" ? "English" : "বাংলা"}</button>
          <Link to="/search" search={{ q: "", cat: "all" }} className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted" aria-label="Search"><Search className="h-5 w-5" /></Link>
          <Popover>
            <PopoverTrigger className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-muted" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              {notes.length > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-hot ring-2 ring-card" />}
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 rounded-2xl p-2">
              <div className="flex items-center justify-between px-2 py-1"><p className="text-sm font-bold">Notifications</p>{notes.length > 0 && <button onClick={() => setNotes([])} className="text-xs font-semibold text-primary">Mark all read</button>}</div>
              {notes.length === 0 ? <p className="p-6 text-center text-sm text-muted-foreground">You're all caught up.</p> : notes.map((n) => (
                <button key={n.id} onClick={() => setNotes(notes.filter((x) => x.id !== n.id))} className="flex w-full items-start gap-2 rounded-lg p-2 text-left text-sm hover:bg-muted">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-hot" /><span className="flex-1">{n.text}</span><span className="text-xs text-muted-foreground">{n.time}</span>
                </button>
              ))}
            </PopoverContent>
          </Popover>
          <Link to="/shopping" hash="cart" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-muted" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-hot px-1 text-[10px] font-bold text-hot-foreground">{count}</span>}
          </Link>
          {user ? (
            <Link to="/account" className="ml-1 hidden items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-sm font-semibold hover:border-primary sm:flex">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-xs font-bold text-primary-foreground">{user.name[0]?.toUpperCase()}</span>{user.name.split(" ")[0]}
            </Link>
          ) : (
            <>
              <Link to="/account" className="hidden h-10 w-10 place-items-center rounded-full hover:bg-muted sm:grid" aria-label="My account"><UserCircle className="h-5 w-5" /></Link>
              <Button asChild size="sm" className="ml-1 hidden rounded-full px-4 sm:inline-flex"><Link to="/account">Sign in</Link></Button>
            </>
          )}
          <Sheet open={mobile} onOpenChange={setMobile}>
            <SheetTrigger className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted lg:hidden" aria-label="Open menu"><Menu className="h-5 w-5" /></SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto p-5 [&>button]:hidden">
              <div className="mb-4 flex items-center justify-between"><SheetTitle asChild><span className="font-logo text-2xl text-primary">SHOLOK</span></SheetTitle><button onClick={() => setMobile(false)} aria-label="Close menu" className="rounded-full p-2 hover:bg-muted"><X className="h-5 w-5" /></button></div>
              <Button asChild className="mb-4 w-full rounded-full"><Link to="/account" onClick={() => setMobile(false)}>{user ? `My account · ${user.name}` : "Sign in"}</Link></Button>
              <div className="mb-5 grid grid-cols-2 gap-1">
                {nav.map((n) => <Link key={n.to} to={n.to} onClick={() => setMobile(false)} className={cn("rounded-lg px-3 py-2 text-sm font-semibold", active(n.to) ? "bg-hot-soft text-hot" : "hover:bg-muted")}>{n.label}</Link>)}
              </div>
              <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">All services</p>
              <MegaMenuGrid onPick={() => setMobile(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
