import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useRef, useState } from "react";

const projects = [
  { title: "System UI Concept", category: "System UI Design" },
  { title: "Dashboard Interface", category: "System UI Design" },
  { title: "Mobile App Design", category: "System UI Design" },
  { title: "Brand Identity", category: "System UI Design" },
];

const WorkSection = () => {
  const { ref, visible } = useScrollReveal();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = parallaxRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(center * -0.08);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="work"
      className="relative py-32 overflow-hidden"
      style={{ background: "#050507" }}
    >
      <div className="container mx-auto relative" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-xs uppercase tracking-[0.4em] text-bento-amber mb-3">// Portfolio</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white">My Work</h2>
          <p className="text-white/50 mt-4 max-w-md mx-auto">Cinematic, raytraced presentations of select projects.</p>
        </div>

        <div ref={parallaxRef} className="space-y-12 max-w-6xl mx-auto">
          {projects.map((p, i) => (
            <div
              key={i}
              className="cinematic group cursor-pointer"
              style={{ transform: `translateY(${offset * (i % 2 === 0 ? 1 : -1)}px)` }}
            >
              {/* simulated raytraced room */}
              <div className="absolute inset-0">
                {/* marble desk */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3"
                  style={{
                    background: "linear-gradient(180deg, #2a2a2e 0%, #0e0e10 100%)",
                    boxShadow: "inset 0 80px 120px rgba(0,0,0,0.6)",
                  }} />
                {/* glowing screen */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] w-[58%] h-[55%] rounded-md transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--bento-amber) / 0.85), #ff9966)",
                    boxShadow: "0 0 80px hsl(var(--bento-amber) / 0.55), 0 0 160px hsl(var(--bento-amber) / 0.3), inset 0 0 40px rgba(255,255,255,0.1)",
                  }}>
                  <div className="absolute inset-3 rounded-sm bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <span className="font-heading text-2xl md:text-4xl text-white drop-shadow-lg">{p.title}</span>
                  </div>
                </div>
                {/* fog */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 50% 80%, hsl(var(--bento-amber) / 0.18) 0%, transparent 60%)",
                  }} />
              </div>

              {/* meta */}
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between z-10">
                <div>
                  <p className="text-xs uppercase tracking-widest text-bento-amber/80">{p.category}</p>
                  <p className="font-heading text-white text-lg">{p.title}</p>
                </div>
                <span className="text-white/40 text-sm">0{i + 1} / 0{projects.length}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
