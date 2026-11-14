import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PenLine } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EmptyState, PageHeader, Pill, seo } from "@/components/sholok/ui";
import { blogs, tile } from "@/lib/data";
import { useLocal } from "@/lib/store";

export const Route = createFileRoute("/blog")({
  head: () => seo("Blog", "Read and write stories about lifestyle, travel, food, design and finance on SHOLOK Blog."),
  component: Blog,
});

type Post = (typeof blogs)[number];
function Blog() {
  const [mine, setMine] = useLocal<Post[]>("blog-posts", []);
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(false);
  const [reading, setReading] = useState<Post | null>(null);
  const [d, setD] = useState({ title: "", body: "" });
  const all = [...mine, ...blogs];
  const list = all.filter((b) => cat === "All" || b.cat === cat);
  return (
    <div>
      <PageHeader title="Blog" domain="blog.sholok.com" desc="Write, share and discover ideas" icon={PenLine}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="rounded-full"><PenLine className="mr-2 h-4 w-4" />Write a post</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New blog post</DialogTitle></DialogHeader>
            <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); if (d.title.trim().length < 4 || d.body.trim().length < 20) return toast.error("Add a title (4+) and at least 20 characters of text"); setMine([{ id: Date.now(), title: d.title.trim(), author: "You", read: `${Math.max(1, Math.round(d.body.split(" ").length / 200))} min`, cat: "Mine", excerpt: d.body.trim(), hue: 305 }, ...mine]); setD({ title: "", body: "" }); setOpen(false); toast.success("Published (saved in this browser)"); }}>
              <label className="sr-only" htmlFor="bt">Title</label><Input id="bt" placeholder="Title" value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} />
              <label className="sr-only" htmlFor="bb">Story</label><Textarea id="bb" placeholder="Tell your story…" rows={6} value={d.body} onChange={(e) => setD({ ...d, body: e.target.value })} />
              <Button type="submit" className="w-full">Publish</Button>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1">{["All", ...Array.from(new Set(all.map((b) => b.cat)))].map((c) => <Pill key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Pill>)}</div>
        {list.length === 0 && <EmptyState title="No posts here yet" />}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((b) => (
            <button key={b.id} onClick={() => setReading(b)} className="card-surface lift overflow-hidden text-left">
              <div className="aspect-[16/9]" style={tile(b.hue)} />
              <div className="p-4"><span className="text-xs font-semibold text-primary">{b.cat}</span><h3 className="mt-1 font-bold leading-snug">{b.title}</h3><p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{b.excerpt}</p><p className="mt-3 text-xs text-muted-foreground">{b.author} · {b.read} read</p></div>
            </button>
          ))}
        </div>
      </div>
      <Dialog open={!!reading} onOpenChange={(o) => !o && setReading(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle className="text-2xl">{reading?.title}</DialogTitle></DialogHeader>
          <p className="text-xs text-muted-foreground">{reading?.author} · {reading?.read} read</p>
          <p className="leading-relaxed">{reading?.excerpt}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
