import { useScrollReveal } from "@/hooks/useScrollReveal";

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

const IsoBlock = ({ title, level, idx }: { title: string; level: number; idx: number }) => {
  const height = 30 + level * 22; // px
  return (
    <div className="flex flex-col items-center group" style={{ animation: `spring-in .8s cubic-bezier(.2,1.2,.3,1) ${idx * 60}ms both` }}>
      <div className="iso-block" style={{ width: 90, height: 90 }}>
        {/* top face */}
        <div
          className="absolute inset-0 rounded-md"
          style={{
            background: "linear-gradient(135deg, hsl(var(--iso-1)), hsl(var(--iso-2)))",
            transform: `translateZ(${height}px)`,
            boxShadow: "0 0 0 1px hsl(var(--iso-3) / 0.4)",
          }}
        />
        {/* left face */}
        <div
          className="absolute top-0 left-0 h-full"
          style={{
            width: height,
            background: "linear-gradient(180deg, hsl(var(--iso-2)), hsl(var(--iso-3)))",
            transform: `rotateY(-90deg) translateZ(0)`,
            transformOrigin: "left center",
          }}
        />
        {/* right face */}
        <div
          className="absolute top-0 right-0 h-full"
          style={{
            width: height,
            background: "linear-gradient(180deg, hsl(var(--iso-2) / 0.85), hsl(var(--iso-3)))",
            transform: `rotateX(90deg) translateZ(0)`,
            transformOrigin: "center top",
          }}
        />
      </div>
      <p className="mt-6 text-xs font-semibold text-iso-1 tracking-wide uppercase">{title}</p>
    </div>
  );
};

const SkillsSection = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="skills"
      className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #03150D 0%, #052a1c 50%, #03150D 100%)" }}
    >
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage:
          "linear-gradient(hsl(var(--iso-2)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--iso-2)) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      <div className="container mx-auto relative" ref={ref}>
        <div className={`text-center mb-20 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-xs uppercase tracking-[0.4em] text-iso-2 mb-3">// Capabilities</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-iso-1">What I do best</h2>
          <p className="text-iso-1/60 mt-4 max-w-md mx-auto">An isometric grid — taller blocks mean deeper expertise.</p>
        </div>

        <div className="flex justify-center">
          <div
            className="iso-stage"
            style={{ perspective: 1400 }}
          >
            <div
              className="grid grid-cols-3 gap-10"
              style={{ transform: "rotateX(55deg) rotateZ(-45deg)", transformStyle: "preserve-3d" }}
            >
              {skills.map((s, i) => (
                <IsoBlock key={s.title} {...s} idx={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
