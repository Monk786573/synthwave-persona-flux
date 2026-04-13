import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";

const projects = [
  { title: "System UI Concept", category: "System UI Design", color: "from-primary/20 to-accent/10" },
  { title: "Dashboard Interface", category: "System UI Design", color: "from-accent/20 to-primary/10" },
  { title: "Mobile App Design", category: "System UI Design", color: "from-primary/15 to-primary/5" },
  { title: "Brand Identity", category: "System UI Design", color: "from-accent/15 to-accent/5" },
];

const WorkSection = () => {
  const { ref, visible } = useScrollReveal();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="work" className="relative py-32 z-10">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="font-mono text-xs text-primary tracking-[0.4em] mb-4">// PORTFOLIO</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-glow-red text-primary mb-2">My Work</h2>
          <div className="neon-underline w-32 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {projects.map((p, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`glass-red rounded-lg overflow-hidden transition-all duration-500 cursor-pointer ${
                hovered === i ? "box-glow-red scale-[1.02]" : ""
              }`}
            >
              <div className={`h-48 bg-gradient-to-br ${p.color} flex items-center justify-center transition-all duration-500 ${hovered === i ? "scale-105 blur-[0.5px]" : ""}`}>
                <span className="font-heading text-lg text-foreground/40 tracking-wider">{p.title}</span>
              </div>
              <div className="p-4">
                <span className="font-mono text-xs text-primary tracking-wider">{p.category}</span>
                <h3 className="font-heading text-sm font-semibold mt-1 text-foreground">{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
