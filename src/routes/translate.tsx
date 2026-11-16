import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeftRight, Copy, Languages } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader, Pill, seo } from "@/components/sholok/ui";
import { languages, phrasebook } from "@/lib/data";

export const Route = createFileRoute("/translate")({
  head: () => seo("Translator", "Translate common phrases between English, Bangla, Korean and more with SHOLOK Translator."),
  component: Translate,
});
function Translate() {
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("bn");
  const [text, setText] = useState("hello");
  const key = (() => {
    const t = text.trim().toLowerCase().replace(/[?!.।]/g, "");
    if (from === "en") return phrasebook[t] ? t : null;
    return Object.keys(phrasebook).find((k) => phrasebook[k][from]?.toLowerCase().replace(/[?!.।]/g, "") === t) ?? null;
  })();
  const out = !text.trim() ? "" : key ? (to === "en" ? key[0].toUpperCase() + key.slice(1) : phrasebook[key][to]) : "";
  const sel = (id: string, v: string, set: (s: string) => void) => <select aria-label={id} value={v} onChange={(e) => set(e.target.value)} className="h-10 rounded-md border bg-card px-3 text-sm font-semibold">{languages.map((l) => <option key={l.code} value={l.code}>{l.name}</option>)}</select>;
  return (
    <div>
      <PageHeader title="Translator" domain="translate.sholok.com" desc="Words across languages" icon={Languages} />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-4 flex items-center gap-3">{sel("From language", from, setFrom)}<Button variant="outline" size="icon" aria-label="Swap languages" onClick={() => { setFrom(to); setTo(from); if (out) setText(out); }}><ArrowLeftRight className="h-4 w-4" /></Button>{sel("To language", to, setTo)}</div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card-surface p-4"><label htmlFor="src" className="sr-only">Text to translate</label><Textarea id="src" rows={6} value={text} onChange={(e) => setText(e.target.value)} className="border-0 text-lg shadow-none focus-visible:ring-0" /></div>
          <div className="card-surface bg-secondary p-4">
            <p className="min-h-36 text-lg">{out || <span className="text-sm text-muted-foreground">{text.trim() ? "This demo knows a small phrasebook. Try one of the phrases below." : "Translation appears here."}</span>}</p>
            {out && <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard?.writeText(out); toast.success("Copied"); }}><Copy className="mr-1 h-4 w-4" />Copy</Button>}
          </div>
        </div>
        <p className="mb-2 mt-6 text-sm font-semibold">Try a phrase</p>
        <div className="flex flex-wrap gap-2">{Object.keys(phrasebook).map((k) => <Pill key={k} onClick={() => { setFrom("en"); setText(k); }}>{k}</Pill>)}</div>
      </div>
    </div>
  );
}
