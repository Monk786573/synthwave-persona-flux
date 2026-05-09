import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, User, AtSign } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(60),
  email: z.string().trim().email("Invalid email").max(120),
});

export type AuthUser = { name: string; email: string };

const STORAGE_KEY = "himank_portfolio_user";

export const getStoredUser = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
};

const AuthModal = ({
  open,
  onOpenChange,
  onAuthed,
  intent = "login",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAuthed: (u: AuthUser) => void;
  intent?: "login" | "project";
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const u = getStoredUser();
    if (u) {
      setName(u.name);
      setEmail(u.email);
    }
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse({ name, email });
    if (!r.success) {
      setErr(r.error.issues[0].message);
      return;
    }
    setErr(null);
    const user: AuthUser = { name: r.data.name, email: r.data.email };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    toast.success(`Welcome, ${user.name.split(" ")[0]}`);
    onAuthed(user);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bento-tile border-white/10 bg-[#0a0a0a] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl flex items-center gap-2">
            <Lock className="w-5 h-5 text-bento-amber" />
            {intent === "project" ? "Sign in to start a project" : "Quick sign-in"}
          </DialogTitle>
          <DialogDescription className="text-white/60">
            One step so I know who's reaching out — no password, your info stays on this device.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4 mt-2">
          <div>
            <label className="text-xs uppercase tracking-widest text-white/50 mb-1 flex items-center gap-2">
              <User className="w-3 h-3" /> Name
            </label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" maxLength={60} />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-white/50 mb-1 flex items-center gap-2">
              <AtSign className="w-3 h-3" /> Email
            </label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" maxLength={120} type="email" />
          </div>
          {err && <p className="text-sm text-red-400">{err}</p>}
          <Button
            type="submit"
            className="w-full bg-bento-amber text-black hover:bg-bento-amber/90 font-semibold rounded-full"
          >
            Continue →
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
