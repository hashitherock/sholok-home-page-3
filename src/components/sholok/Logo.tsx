import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function SholokLogo({ className, sub }: { className?: string; sub?: string }) {
  return (
    <Link to="/" className={cn("inline-flex items-baseline gap-2 font-logo text-primary tracking-tight", className)} aria-label="SHOLOK home">
      <span>SHOLOK</span>
      {sub && <span className="font-sans text-[0.55em] font-bold tracking-normal text-foreground">{sub}</span>}
    </Link>
  );
}
