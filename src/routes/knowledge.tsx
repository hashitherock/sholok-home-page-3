import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState, PageHeader, Pill, seo } from "@/components/sholok/ui";
import { questions } from "@/lib/data";
import { useLocal } from "@/lib/store";

export const Route = createFileRoute("/knowledge")({
  head: () => seo("Knowledge", "Ask questions and get answers from the SHOLOK Knowledge community."),
  component: Knowledge,
});

type Q = (typeof questions)[number];
function Knowledge() {
  const [mine, setMine] = useLocal<Q[]>("questions", []);
  const [answers, setAnswers] = useLocal<Record<number, string[]>>("answers", {});
  const [text, setText] = useState("");
  const [tag, setTag] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const [reply, setReply] = useState("");
  const all = [...mine, ...questions];
  const list = all.filter((q) => tag === "All" || q.tag === tag);
  return (
    <div>
      <PageHeader title="Knowledge" domain="kin.sholok.com" desc="Ask anything, answer what you know" icon={HelpCircle} />
      <div className="mx-auto max-w-4xl space-y-4 px-4 py-8">
        <form className="card-surface p-4" onSubmit={(e) => { e.preventDefault(); if (text.trim().length < 10 || !text.includes("?")) return toast.error("Write a full question (10+ characters) ending with ?"); setMine([{ id: Date.now(), q: text.trim(), tag: "General", answers: 0, views: 1, solved: false }, ...mine]); setText(""); toast.success("Question posted"); }}>
          <label htmlFor="ask" className="mb-2 block font-bold">Ask a question</label>
          <Textarea id="ask" rows={2} value={text} onChange={(e) => setText(e.target.value)} placeholder="What would you like to know?" />
          <Button type="submit" className="mt-3">Post question</Button>
        </form>
        <div className="flex flex-wrap gap-2">{["All", ...Array.from(new Set(all.map((q) => q.tag)))].map((t) => <Pill key={t} active={tag === t} onClick={() => setTag(t)}>{t}</Pill>)}</div>
        {list.length === 0 && <EmptyState title="No questions yet" />}
        {list.map((q) => { const extra = answers[q.id] ?? []; return (
          <article key={q.id} className="card-surface p-4">
            <button onClick={() => { setOpen(open === q.id ? null : q.id); setReply(""); }} className="flex w-full gap-2 text-left"><span className="font-logo text-primary">Q.</span><span className="flex-1 font-semibold">{q.q}</span>{q.solved && <CheckCircle2 className="h-5 w-5 text-success" aria-label="Solved" />}</button>
            <p className="ml-6 mt-1 text-xs text-muted-foreground">{q.tag} · {q.answers + extra.length} answers · {q.views.toLocaleString()} views</p>
            {open === q.id && <div className="ml-6 mt-3 space-y-2">
              {extra.map((a, i) => <p key={i} className="rounded-lg bg-muted p-3 text-sm"><b className="text-hot">A.</b> {a}</p>)}
              <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (reply.trim().length < 3) return; setAnswers({ ...answers, [q.id]: [...extra, reply.trim()] }); setReply(""); toast.success("Answer added"); }}>
                <label htmlFor={`r${q.id}`} className="sr-only">Your answer</label>
                <input id={`r${q.id}`} value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Write an answer…" className="h-9 flex-1 rounded-md border bg-card px-3 text-sm" />
                <Button size="sm" type="submit">Answer</Button>
              </form>
            </div>}
          </article>); })}
      </div>
    </div>
  );
}
