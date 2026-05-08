import { useEffect, useState } from "react";

const HeroSection = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
      style={{
        background:
          "radial-gradient(ellipse at 20% 20%, hsl(var(--clay-coral)) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, hsl(var(--clay-lavender)) 0%, transparent 55%), radial-gradient(ellipse at 50% 90%, hsl(var(--clay-mint)) 0%, transparent 55%), #FFF7F4",
      }}
    >
      {/* Floating clay blobs */}
      <div className="absolute top-20 left-[8%] w-40 h-40 clay-blob clay-coral animate-float-soft" />
      <div className="absolute top-40 right-[12%] w-56 h-56 clay-blob clay-lavender animate-float-soft" style={{ animationDelay: "1.2s" }} />
      <div className="absolute bottom-24 left-[18%] w-32 h-32 clay-blob clay-mint animate-float-soft" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-10 right-[25%] w-24 h-24 clay-blob clay-coral animate-float-soft" style={{ animationDelay: "0.5s" }} />

      <div className="container mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <div className="animate-spring-in">
          <div className="inline-flex items-center gap-2 clay px-4 py-2 mb-6 text-sm text-neutral-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            SYS://{fmt(time.getHours())}:{fmt(time.getMinutes())}:{fmt(time.getSeconds())} — Available
          </div>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-neutral-900 leading-[1.05] mb-6">
            Hi, I'm <br />
            <span className="text-gradient-amber">Himank.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-700 max-w-md mb-8 leading-relaxed">
            UI/UX designer & tech enthusiast — crafting digital experiences that solve
            real-world problems through technology.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#work"
              className="clay clay-coral px-7 py-4 font-semibold text-neutral-900 hover:scale-[1.04] active:scale-95 transition-transform"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="clay clay-lavender px-7 py-4 font-semibold text-neutral-900 hover:scale-[1.04] active:scale-95 transition-transform"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Right: floating 3D avatar made of clay shapes */}
        <div className="relative h-[420px] md:h-[520px] flex items-center justify-center animate-spring-in" style={{ animationDelay: ".15s" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* big stacked clay disc */}
            <div className="clay clay-mint w-72 h-72 md:w-80 md:h-80 rounded-full animate-float-soft" />
          </div>
          <div className="relative clay clay-coral w-56 h-56 md:w-64 md:h-64 rounded-full flex items-center justify-center animate-float-soft" style={{ animationDelay: ".7s" }}>
            <span className="font-heading text-7xl md:text-8xl font-bold text-neutral-900">H</span>
          </div>
          <div className="absolute -top-4 right-6 clay clay-lavender w-20 h-20 rounded-3xl rotate-12 animate-float-soft" style={{ animationDelay: "1.4s" }} />
          <div className="absolute bottom-2 left-4 clay clay-coral w-16 h-16 rounded-3xl -rotate-6 animate-float-soft" style={{ animationDelay: "2s" }} />
          <div className="absolute top-10 left-2 clay w-14 h-14 rounded-full animate-float-soft" style={{ animationDelay: "1.7s" }} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
