import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useRef, useState } from "react";
import { Mail, Instagram, MapPin, Sparkles } from "lucide-react";
import { useContactFlow } from "./ContactFlowProvider";

const TiltTile = ({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setT({ x: y * -8, y: x * 8 });
  };
  const onLeave = () => setT({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`bento-tile p-6 ${className}`}
      style={{
        transform: `perspective(900px) rotateX(${t.x}deg) rotateY(${t.y}deg)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Counter = ({ to, label, suffix = "" }: { to: number; label: string; suffix?: string }) => {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return (
    <div ref={ref}>
      <div className="font-heading text-4xl md:text-5xl font-bold text-white">
        {n}
        <span className="text-bento-amber">{suffix}</span>
      </div>
      <div className="text-xs uppercase tracking-widest text-white/50 mt-1">{label}</div>
    </div>
  );
};

const ContactSection = () => {
  const { ref, visible } = useScrollReveal();
  const { openProjectFlow } = useContactFlow();

  return (
    <section id="contact" className="relative py-32" style={{ background: "rgba(13,13,13,0.65)" }}>
      <div className="container mx-auto" ref={ref}>
        <div className={`text-center mb-14 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-xs uppercase tracking-[0.4em] text-bento-amber mb-3">// Reach out</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white">
            Let's <span className="text-gradient-amber">connect</span>
          </h2>
        </div>

        {/* 12-column bento */}
        <div className="grid grid-cols-12 gap-4 md:gap-5 max-w-6xl mx-auto">
          {/* Availability — 4x1 */}
          <TiltTile className="col-span-12 md:col-span-4 row-span-1 flex items-center gap-4">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse-amber" />
            <div>
              <p className="text-white font-semibold">Available for work</p>
              <p className="text-white/50 text-sm">Open to UI/UX & web projects</p>
            </div>
          </TiltTile>

          {/* Stat 1 */}
          <TiltTile className="col-span-6 md:col-span-2"><Counter to={20} label="Projects" suffix="+" /></TiltTile>
          {/* Stat 2 */}
          <TiltTile className="col-span-6 md:col-span-2"><Counter to={3} label="Years coding" suffix="+" /></TiltTile>
          {/* Stat 3 */}
          <TiltTile className="col-span-12 md:col-span-4 flex items-center gap-4">
            <Sparkles className="w-8 h-8 text-bento-amber" />
            <div>
              <p className="text-white font-semibold">Designer + Builder</p>
              <p className="text-white/50 text-sm">Concept → ship</p>
            </div>
          </TiltTile>

          {/* Email — 6x2 */}
          <TiltTile className="col-span-12 md:col-span-6 row-span-2 min-h-[220px] flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-bento-amber mb-3">Email</p>
              <a
                href="mailto:himonkbavisetti@gmail.com"
                className="font-heading text-2xl md:text-3xl text-white hover:text-bento-amber transition-colors break-all"
              >
                himonkbavisetti@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bento-amber text-black">
                <Mail className="w-5 h-5" />
              </span>
              <span className="text-white/60 text-sm">Best for project enquiries — replies within 24h</span>
            </div>
          </TiltTile>

          {/* Instagram — 3x1 */}
          <TiltTile className="col-span-6 md:col-span-3 flex flex-col justify-between min-h-[105px]">
            <Instagram className="w-7 h-7 text-bento-amber" />
            <a href="https://instagram.com/himank.co.in" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-bento-amber transition-colors">
              @himank.co.in
            </a>
          </TiltTile>

          {/* Location */}
          <TiltTile className="col-span-6 md:col-span-3 flex flex-col justify-between min-h-[105px]">
            <MapPin className="w-7 h-7 text-bento-amber" />
            <p className="text-white font-semibold">Earth · Remote</p>
          </TiltTile>

          {/* Testimonial */}
          <TiltTile className="col-span-12 md:col-span-6">
            <p className="text-white/80 italic leading-relaxed">
              "Resourceful, design-oriented, and tech-savvy — Himank ships work that feels considered."
            </p>
            <p className="text-xs uppercase tracking-widest text-bento-amber mt-3">— Collaborator</p>
          </TiltTile>

          {/* CTA */}
          <TiltTile
            className="col-span-12 md:col-span-6 flex items-center justify-between"
            style={{ background: "linear-gradient(135deg, hsl(var(--bento-amber)), #ff9358)" }}
          >
            <div>
              <p className="font-heading text-2xl text-black">Have a project?</p>
              <p className="text-black/70 text-sm">Tell me about it.</p>
            </div>
            <button
              type="button"
              onClick={openProjectFlow}
              className="bg-black text-white px-5 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Start →
            </button>
          </TiltTile>
        </div>

        {/* Footer */}
        <p className="text-center text-white/40 text-xs tracking-widest mt-16">
          © 2026 HIMANK — DESIGNED & BUILT WITH CARE
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
