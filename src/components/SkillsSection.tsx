import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useRef } from "react";
import { Palette, Search, Film, Wrench } from "lucide-react";

const skills = [
  { icon: Palette, title: "Web & UI/UX Design", desc: "System UI designing, intuitive and aesthetic interfaces" },
  { icon: Search, title: "Internet Detective", desc: "Deep research specialist for complex solutions" },
  { icon: Film, title: "Digital Content Creation", desc: "Visual storytelling and creative digital design" },
  { icon: Wrench, title: "Technical Troubleshooting", desc: "Mobile optimization, Wi-Fi fixes, performance tuning" },
];

const SkillCard = ({ icon: Icon, title, desc, delay }: { icon: typeof Palette; title: string; desc: string; delay: number }) => {
  const [hover, setHover] = useState(false);
  const { ref, visible } = useScrollReveal();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });
  };

  const handleMouseLeave = () => {
    setHover(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={(el) => {
        (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`glass-red rounded-lg p-6 transition-all duration-500 cursor-pointer ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${hover ? "box-glow-red" : ""}`}
      style={{
        transitionDelay: `${delay}ms`,
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hover ? "scale(1.03)" : "scale(1)"}`,
      }}
    >
      <div className={`inline-flex p-3 rounded-md mb-4 transition-colors ${hover ? "bg-primary/20" : "bg-primary/5"}`}>
        <Icon className={`w-6 h-6 transition-all ${hover ? "text-primary text-glow-red" : "text-primary/70"}`} />
      </div>
      <h3 className="font-heading text-base font-semibold mb-2 text-foreground">{title}</h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">{desc}</p>
      <div className={`neon-underline mt-4 transition-all duration-700 ${hover ? "w-full" : "w-0"}`} />
    </div>
  );
};

const SkillsSection = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="skills" className="relative py-32 z-10">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="font-mono text-xs text-primary tracking-[0.4em] mb-4">// CAPABILITIES</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-glow-red text-primary mb-2">What I Do Best</h2>
          <div className="neon-underline w-32 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {skills.map((s, i) => (
            <SkillCard key={s.title} {...s} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
