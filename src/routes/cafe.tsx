import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Heart, MessageCircle, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader, Pill, Section, seo } from "@/components/sholok/ui";
import { cafePosts, cafes } from "@/lib/data";
import { useLocal } from "@/lib/store";

export const Route = createFileRoute("/cafe")({
  head: () => seo("Cafe", "Join communities about food, travel, tech, sports and more on SHOLOK Cafe."),
  component: Cafe,
});

function Cafe() {
  const [joined, setJoined] = useLocal<string[]>("cafes", []);
  const [liked, setLiked] = useLocal<number[]>("cafe-likes", []);
  const [mine, setMine] = useLocal<typeof cafePosts>("cafe-posts", []);
  const [filter, setFilter] = useState("All");
  const [title, setTitle] = useState("");
  const [where, setWhere] = useState(cafes[0].name);
  const posts = [...mine, ...cafePosts].filter((p) => filter === "All" || p.cafe === filter);
  return (
    <div>
      <PageHeader title="Cafe" domain="cafe.sholok.com" desc="Communities you love, conversations that matter" icon={Users} />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <form className="card-surface flex flex-col gap-2 p-4 sm:flex-row" onSubmit={(e) => { e.preventDefault(); if (title.trim().length < 5) return toast.error("Write at least 5 characters"); setMine([{ id: Date.now(), cafe: where, title: title.trim(), author: "you", comments: 0, likes: 0, time: "now" }, ...mine]); setTitle(""); toast.success("Posted to " + where); }}>
            <label htmlFor="cafe-post" className="sr-only">New post</label>
            <Input id="cafe-post" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Start a discussion…" className="h-10 flex-1" />
            <select aria-label="Choose cafe" value={where} onChange={(e) => setWhere(e.target.value)} className="h-10 rounded-md border bg-card px-2 text-sm">{cafes.map((c) => <option key={c.name}>{c.name}</option>)}</select>
            <Button type="submit">Post</Button>
          </form>
          <div className="flex gap-2 overflow-x-auto pb-1">{["All", ...cafes.map((c) => c.name)].map((c) => <Pill key={c} active={filter === c} onClick={() => setFilter(c)}>{c}</Pill>)}</div>
          {posts.map((p) => (
            <article key={p.id} className="card-surface lift p-4">
              <p className="text-xs font-semibold text-primary">{p.cafe}</p>
              <h3 className="mt-1 font-bold">{p.title}</h3>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span>@{p.author} · {p.time}</span>
                <button className="flex items-center gap-1 hover:text-hot" onClick={() => setLiked(liked.includes(p.id) ? liked.filter((x) => x !== p.id) : [...liked, p.id])}><Heart className={liked.includes(p.id) ? "h-3.5 w-3.5 fill-hot text-hot" : "h-3.5 w-3.5"} />{p.likes + (liked.includes(p.id) ? 1 : 0)}</button>
                <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" />{p.comments}</span>
              </div>
            </article>
          ))}
        </div>
        <Section title="Popular cafes">
          <ul className="space-y-3">{cafes.map((c) => (
            <li key={c.name} className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary font-bold text-primary">{c.name[0]}</span><span className="flex-1"><span className="block text-sm font-semibold">{c.name}</span><span className="text-xs text-muted-foreground">{c.members} members · {c.topic}</span></span>
              <Button size="sm" variant={joined.includes(c.name) ? "secondary" : "default"} className="h-8 rounded-full" onClick={() => { setJoined(joined.includes(c.name) ? joined.filter((x) => x !== c.name) : [...joined, c.name]); }}>{joined.includes(c.name) ? "Joined" : "Join"}</Button></li>
          ))}</ul>
        </Section>
      </div>
    </div>
  );
}
