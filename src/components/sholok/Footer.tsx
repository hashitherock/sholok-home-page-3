import { Link } from "@tanstack/react-router";
import { services } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_2fr]">
        <div>
          <p className="font-logo text-3xl text-primary">SHOLOK</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">Everything you need, all in one place. Search, connect, shop and explore with one account.</p>
          <p className="mt-4 text-xs text-muted-foreground">This is a demo portal. Content, prices and scores are sample data.</p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
          {services.map((s) => <Link key={s.id} to={s.to} className="text-sm text-muted-foreground hover:text-primary">{s.name}</Link>)}
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground">
          <span>© 2026 SHOLOK Corp. All rights reserved.</span>
          <span className="flex gap-4"><Link to="/account" className="hover:text-primary">Account & privacy</Link><Link to="/knowledge" className="hover:text-primary">Help center</Link></span>
        </div>
      </div>
    </footer>
  );
}
