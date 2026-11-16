import { useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { trending, products, news, services } from "@/lib/data";
import { useLocal } from "@/lib/store";

const pool = [...trending, ...products.map((p) => p.name), ...news.map((n) => n.title), ...services.map((s) => s.name)];

export function SearchBar({ size = "lg", initial = "", cat = "all" }: { size?: "lg" | "md"; initial?: string; cat?: string }) {
  const [q, setQ] = useState(initial);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(-1);
  const [recent, setRecent] = useLocal<string[]>("recent", []);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [...recent.slice(0, 5).map((v) => ({ v, kind: "recent" as const })), ...trending.slice(0, 6).map((v) => ({ v, kind: "trend" as const }))];
    return Array.from(new Set(pool.filter((s) => s.toLowerCase().includes(t)))).slice(0, 8).map((v) => ({ v, kind: "suggest" as const }));
  }, [q, recent]);

  const go = (term: string) => {
    const t = term.trim();
    if (!t) return inputRef.current?.focus();
    setRecent((r) => [t, ...r.filter((x) => x !== t)].slice(0, 8));
    setOpen(false);
    setQ(t);
    navigate({ to: "/search", search: { q: t, cat } });
  };

  return (
    <div className="relative w-full" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}>
      <form
        role="search"
        onSubmit={(e) => { e.preventDefault(); go(idx >= 0 && items[idx] ? items[idx].v : q); }}
        className={cn("flex items-center gap-2 rounded-full border-2 border-primary bg-card pl-5 pr-1.5 shadow-lift transition-shadow focus-within:shadow-[0_0_0_6px_color-mix(in_oklab,var(--color-primary)_14%,transparent)]", size === "lg" ? "h-16" : "h-12")}
      >
        <span className="hidden font-logo text-sm text-primary sm:inline" aria-hidden>S</span>
        <label htmlFor={`sb-${size}`} className="sr-only">Search SHOLOK</label>
        <input
          id={`sb-${size}`} ref={inputRef} value={q} autoComplete="off"
          onChange={(e) => { setQ(e.target.value); setOpen(true); setIdx(-1); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setIdx((i) => Math.min(i + 1, items.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, -1)); }
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder="Search anything on SHOLOK..."
          className={cn("min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground", size === "lg" ? "text-lg" : "text-base")}
        />
        {q && <button type="button" onClick={() => { setQ(""); inputRef.current?.focus(); }} className="rounded-full p-1.5 text-muted-foreground hover:bg-muted" aria-label="Clear search"><X className="h-4 w-4" /></button>}
        <button type="submit" className={cn("grid place-items-center rounded-full bg-hot text-hot-foreground transition-transform hover:scale-105", size === "lg" ? "h-12 w-12" : "h-9 w-9")} aria-label="Search"><Search className="h-5 w-5" /></button>
      </form>
      {open && items.length > 0 && (
        <div className="absolute inset-x-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border bg-popover p-2 shadow-lift" role="listbox">
          {!q && recent.length > 0 && (
            <div className="flex items-center justify-between px-3 py-1 text-[11px] font-semibold uppercase text-muted-foreground">
              Recent <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => setRecent([])} className="normal-case text-primary hover:underline">Clear all</button>
            </div>
          )}
          {items.map((it, i) => (
            <button key={it.kind + it.v} type="button" role="option" aria-selected={i === idx}
              onMouseDown={(e) => e.preventDefault()} onClick={() => go(it.v)}
              className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm", i === idx ? "bg-secondary text-secondary-foreground" : "hover:bg-muted")}>
              {it.kind === "recent" ? <Clock className="h-4 w-4 text-muted-foreground" /> : it.kind === "trend" ? <TrendingUp className="h-4 w-4 text-hot" /> : <Search className="h-4 w-4 text-muted-foreground" />}
              <span className="line-clamp-1">{it.v}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
