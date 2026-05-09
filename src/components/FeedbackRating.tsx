import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const KEY = "himank_portfolio_feedback";

type Stored = { rating: number; comment: string; at: string };

const FeedbackRating = () => {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState<Stored | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSubmitted(JSON.parse(raw));
    } catch {/* ignore */}
  }, []);

  const submit = () => {
    if (rating === 0) {
      toast.error("Pick a star rating first");
      return;
    }
    const trimmed = comment.trim().slice(0, 500);
    const data: Stored = { rating, comment: trimmed, at: new Date().toISOString() };
    localStorage.setItem(KEY, JSON.stringify(data));
    setSubmitted(data);
    toast.success("Thanks for the feedback!");
  };

  const reset = () => {
    localStorage.removeItem(KEY);
    setSubmitted(null);
    setRating(0);
    setComment("");
  };

  return (
    <section id="feedback" className="relative py-20" style={{ background: "rgba(13,13,13,0.65)" }}>
      <div className="container mx-auto max-w-xl">
        <div className="bento-tile p-8 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-bento-amber mb-3">// Feedback</p>
          <h3 className="font-heading text-3xl text-white mb-2">Rate this experience</h3>
          <p className="text-white/60 mb-6 text-sm">Your honest take helps me sharpen the craft.</p>

          {submitted ? (
            <div className="space-y-4">
              <div className="flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-7 h-7 ${i < submitted.rating ? "fill-bento-amber text-bento-amber" : "text-white/20"}`}
                  />
                ))}
              </div>
              <p className="text-white/70 italic">
                {submitted.comment ? `"${submitted.comment}"` : "Thanks for rating!"}
              </p>
              <button
                onClick={reset}
                className="text-xs uppercase tracking-widest text-bento-amber hover:underline"
              >
                Edit feedback
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex justify-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => {
                  const v = i + 1;
                  const active = v <= (hover || rating);
                  return (
                    <button
                      key={i}
                      type="button"
                      onMouseEnter={() => setHover(v)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(v)}
                      aria-label={`Rate ${v} stars`}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-9 h-9 ${active ? "fill-bento-amber text-bento-amber drop-shadow-[0_0_10px_hsl(var(--bento-amber))]" : "text-white/30"}`}
                      />
                    </button>
                  );
                })}
              </div>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={500}
                rows={3}
                placeholder="Optional — what stood out, what didn't?"
                className="bg-white/5 border-white/10 text-white"
              />
              <Button
                onClick={submit}
                className="bg-bento-amber text-black hover:bg-bento-amber/90 font-semibold rounded-full px-8"
              >
                Submit feedback
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeedbackRating;
