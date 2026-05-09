import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Send, Sparkles } from "lucide-react";
import { z } from "zod";
import type { AuthUser } from "./AuthModal";

const schema = z.object({
  subject: z.string().trim().min(2, "Subject required").max(120),
  message: z.string().trim().min(10, "Tell me a bit more (10+ chars)").max(2000),
});

const ProjectModal = ({
  open,
  onOpenChange,
  user,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  user: AuthUser | null;
}) => {
  const [subject, setSubject] = useState("New project enquiry");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse({ subject, message });
    if (!r.success) {
      setErr(r.error.issues[0].message);
      return;
    }
    setErr(null);
    const body = `From: ${user?.name ?? ""} <${user?.email ?? ""}>%0D%0A%0D%0A${encodeURIComponent(r.data.message)}`;
    window.location.href = `mailto:himonkbavisetti@gmail.com?subject=${encodeURIComponent(r.data.subject)}&body=${body}`;
    toast.success("Opening your mail app — message ready to send.");
    onOpenChange(false);
    setMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bento-tile border-white/10 bg-[#0a0a0a] text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-bento-amber" />
            Start a project
          </DialogTitle>
          <DialogDescription className="text-white/60">
            {user ? `Signed in as ${user.name}` : "Tell me about your idea — I usually reply within 24h."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4 mt-2">
          <div>
            <label className="text-xs uppercase tracking-widest text-white/50 mb-1 block">Subject</label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={120} />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-white/50 mb-1 block">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={2000}
              rows={6}
              placeholder="Goal, scope, timeline, budget range…"
            />
            <p className="text-xs text-white/40 mt-1">{message.length}/2000</p>
          </div>
          {err && <p className="text-sm text-red-400">{err}</p>}
          <Button
            type="submit"
            className="w-full bg-bento-amber text-black hover:bg-bento-amber/90 font-semibold rounded-full inline-flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Send via mail
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
