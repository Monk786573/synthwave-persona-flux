import { useEffect, useRef, useState } from "react";

const skills = [
  { title: "UI/UX Design", level: 5 },
  { title: "System UI", level: 4 },
  { title: "Web Design", level: 5 },
  { title: "Research", level: 4 },
  { title: "Content", level: 3 },
  { title: "Troubleshoot", level: 4 },
  { title: "Prototyping", level: 4 },
  { title: "Branding", level: 3 },
  { title: "Mobile UX", level: 4 },
];

/**
 * The visual "city" rises in the persistent Three.js canvas behind.
 * Here we render minimal scroll-reactive labels: each skill card fades
 * in + lifts as the section scrolls through the viewport.
 */
const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when section bottom enters viewport, 1 when section top leaves
      const p = 1 - (r.bottom - vh * 0.2) / (r.height + vh * 0.6);
      setProgress(Math.max(0, Math.min(1, p)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, rgba(3,21,13,0.55) 0%, rgba(5,42,28,0.55) 50%, rgba(3,21,13,0.7) 100%)" }}
    >
      <div className="container mx-auto relative">
        <div
          className="text-center mb-20 transition-all duration-700"
          style={{ opacity: Math.min(1, progress * 2), transform: `translateY(${(1 - Math.min(1, progress * 2)) * 30}px)` }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-iso-2 mb-3">// Capabilities</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-iso-1">What I do best</h2>
          <p className="text-iso-1/60 mt-4 max-w-md mx-auto">
            Towers rise behind — taller blocks mean deeper expertise.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {skills.map((s, i) => {
            // staggered reveal driven by scroll progress
            const start = i / (skills.length + 4);
            const local = Math.max(0, Math.min(1, (progress - start) * 3));
            const lift = (1 - local) * 40;
            return (
              <div
                key={s.title}
                className="rounded-2xl p-5 backdrop-blur-md border border-white/10"
                style={{
                  opacity: local,
                  transform: `translateY(${lift}px) scale(${0.96 + local * 0.04})`,
                  background: "linear-gradient(145deg, rgba(255,107,44,0.08), rgba(108,99,255,0.06))",
                  boxShadow: `0 10px 40px -10px rgba(255,107,44,${0.15 * local})`,
                  transition: "opacity .25s, transform .35s",
                }}
              >
                <p className="font-heading text-lg text-white mb-2">{s.title}</p>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <span
                      key={k}
                      className="h-1.5 flex-1 rounded-full"
                      style={{
                        background:
                          k < s.level
                            ? "linear-gradient(90deg, hsl(var(--bento-amber)), #ff9358)"
                            : "rgba(255,255,255,0.1)",
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
