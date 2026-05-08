import { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowRight, Mail, MapPin, Code2, Palette } from "lucide-react";

const TiltTile = ({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
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
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 bg-bento-base"
    >
      {/* ambient glow */}
      <div className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-30"
           style={{ background: "radial-gradient(circle, hsl(var(--bento-amber)), transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-[480px] h-[480px] rounded-full blur-3xl opacity-25"
           style={{ background: "radial-gradient(circle, hsl(var(--clay-lavender)), transparent 70%)" }} />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-12 gap-4 md:gap-5 max-w-6xl mx-auto animate-spring-in">
          {/* Status — top wide */}
          <TiltTile className="col-span-12 md:col-span-8 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-amber" />
              <span className="text-white/80 text-sm tracking-wider">
                SYS://{fmt(time.getHours())}:{fmt(time.getMinutes())}:{fmt(time.getSeconds())} — Available
              </span>
            </div>
            <span className="text-xs uppercase tracking-[0.4em] text-bento-amber">// Portfolio v3</span>
          </TiltTile>

          {/* Avatar tile */}
          <TiltTile
            className="col-span-12 md:col-span-4 row-span-2 flex items-center justify-center min-h-[260px]"
            style={{ background: "linear-gradient(145deg, hsl(var(--bento-amber)), #ff9358)" }}
          >
            <span className="font-heading text-[8rem] md:text-[9rem] font-bold text-black leading-none drop-shadow-lg">
              H
            </span>
          </TiltTile>

          {/* Main headline — large */}
          <TiltTile className="col-span-12 md:col-span-8 row-span-2 min-h-[260px] flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-bento-amber mb-4">// Hello world</p>
              <h1 className="font-heading text-5xl md:text-7xl font-bold text-white leading-[1.05]">
                I'm <span className="text-gradient-amber">Himank</span>.<br />
                UI/UX designer & tech enthusiast.
              </h1>
            </div>
            <p className="text-white/70 text-base md:text-lg max-w-xl mt-6 leading-relaxed">
              Crafting digital experiences that solve real-world problems through technology.
            </p>
          </TiltTile>

          {/* Role tag */}
          <TiltTile className="col-span-6 md:col-span-4 flex items-center gap-3">
            <Palette className="w-7 h-7 text-bento-amber" />
            <div>
              <p className="text-white font-semibold">UI / UX</p>
              <p className="text-white/50 text-xs">Design systems</p>
            </div>
          </TiltTile>

          {/* Role tag 2 */}
          <TiltTile className="col-span-6 md:col-span-4 flex items-center gap-3">
            <Code2 className="w-7 h-7 text-bento-amber" />
            <div>
              <p className="text-white font-semibold">Builder</p>
              <p className="text-white/50 text-xs">Web · Product</p>
            </div>
          </TiltTile>

          {/* CTA — view work */}
          <TiltTile
            className="col-span-12 md:col-span-4 flex items-center justify-between"
            style={{ background: "linear-gradient(135deg, hsl(var(--bento-amber)), #ff9358)" }}
          >
            <p className="font-heading text-xl text-black font-bold">View my work</p>
            <a
              href="#work"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-black text-white hover:scale-110 transition-transform"
            >
              <ArrowRight className="w-5 h-5" />
            </a>
          </TiltTile>

          {/* Get in touch */}
          <TiltTile className="col-span-6 md:col-span-4 flex items-center gap-3">
            <Mail className="w-6 h-6 text-bento-amber" />
            <a href="#contact" className="text-white font-semibold hover:text-bento-amber transition-colors">
              Get in touch →
            </a>
          </TiltTile>

          {/* Location */}
          <TiltTile className="col-span-6 md:col-span-4 flex items-center gap-3">
            <MapPin className="w-6 h-6 text-bento-amber" />
            <p className="text-white font-semibold">Earth · Remote</p>
          </TiltTile>

          {/* Tagline */}
          <TiltTile className="col-span-12 md:col-span-4 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-bento-amber" />
            <p className="text-white/80 text-sm">Concept → ship</p>
          </TiltTile>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
