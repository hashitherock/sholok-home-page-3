import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { UserCircle, ShieldCheck, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PageHeader, Section, seo } from "@/components/sholok/ui";
import { services } from "@/lib/data";
import { useLocal, type User } from "@/lib/store";

export const Route = createFileRoute("/account")({
  head: () => seo("Account", "One SHOLOK account for search, shopping, community and every service."),
  component: Account,
});

function Account() {
  const [user, setUser] = useLocal<User>("user", null);
  const [prefs, setPrefs] = useLocal("prefs", { news: true, deals: true, weather: false });
  const [mode, setMode] = useState<"in" | "up">("in");
  const [f, setF] = useState({ name: "", email: "", pw: "" });
  const [err, setErr] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (mode === "up" && f.name.trim().length < 2) x.name = "Enter your name (2+ characters).";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = "Enter a valid email address.";
    if (f.pw.length < 6) x.pw = "Password must be at least 6 characters.";
    setErr(x);
    if (Object.keys(x).length) return;
    setUser({ name: mode === "up" ? f.name.trim() : f.email.split("@")[0], email: f.email });
    toast.success(mode === "up" ? "Account created (demo)" : "Signed in (demo)");
  };

  return (
    <div>
      <PageHeader title="Account" domain="account.sholok.com" desc="One login for every SHOLOK service" icon={UserCircle} />
      <div className="mx-auto max-w-5xl px-4 py-8">
        {!user ? (
          <div className="mx-auto max-w-md card-surface p-6">
            <div className="mb-5 grid grid-cols-2 rounded-full bg-muted p-1 text-sm font-semibold">
              {(["in", "up"] as const).map((m) => <button key={m} onClick={() => { setMode(m); setErr({}); }} className={mode === m ? "rounded-full bg-card py-2 text-primary shadow-soft" : "py-2 text-muted-foreground"}>{m === "in" ? "Sign in" : "Create account"}</button>)}
            </div>
            <form onSubmit={submit} className="space-y-4" noValidate>
              {mode === "up" && <Field id="name" label="Full name" value={f.name} onChange={(v) => setF({ ...f, name: v })} error={err.name} />}
              <Field id="email" label="Email" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} error={err.email} />
              <Field id="pw" label="Password" type="password" value={f.pw} onChange={(v) => setF({ ...f, pw: v })} error={err.pw} />
              <Button type="submit" className="w-full rounded-full" size="lg">{mode === "in" ? "Sign in" : "Create account"}</Button>
            </form>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-primary" />Demo only — your details stay in this browser.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
            <Section title="Profile">
              <div className="flex items-center gap-3"><span className="grid h-14 w-14 place-items-center rounded-full bg-brand text-xl font-bold text-primary-foreground">{user.name[0]?.toUpperCase()}</span><div><p className="font-bold">{user.name}</p><p className="text-sm text-muted-foreground">{user.email}</p></div></div>
              <Button variant="outline" className="mt-5 w-full rounded-full" onClick={() => { setUser(null); toast("Signed out"); }}><LogOut className="mr-2 h-4 w-4" />Sign out</Button>
            </Section>
            <div className="space-y-6">
              <Section title="Preferences">
                {([["news", "Personalised news on homepage"], ["deals", "Shopping deal alerts"], ["weather", "Severe weather notifications"]] as const).map(([k, l]) => (
                  <div key={k} className="flex items-center justify-between border-b py-3 last:border-0"><Label htmlFor={k}>{l}</Label><Switch id={k} checked={prefs[k]} onCheckedChange={(v) => { setPrefs({ ...prefs, [k]: v }); toast.success("Preference saved"); }} /></div>
                ))}
              </Section>
              <Section title="Connected services">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{services.slice(2, 14).map((s) => <Link key={s.id} to={s.to} className="flex items-center gap-2 rounded-lg border p-2 text-sm hover:border-primary"><s.icon className="h-4 w-4 text-primary" />{s.name}</Link>)}</div>
              </Section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ id, label, value, onChange, error, type = "text" }: { id: string; label: string; value: string; onChange: (v: string) => void; error?: string; type?: string }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} className="h-11" />
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
