import { useEffect, useState } from "react";
import profileImg from "@/assets/profile.png";

const HeroSection = () => {
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setVisible(true);
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (n: number) => String(n).padStart(2, "0");

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Radial glow behind profile */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] animate-neon-pulse" />

      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 z-10">
        {/* Text */}
        <div
          className={`flex-1 text-center lg:text-left transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* System clock */}
          <div className="font-mono text-xs text-muted-foreground tracking-[0.3em] mb-6">
            SYS://{fmt(time.getHours())}:{fmt(time.getMinutes())}:{fmt(time.getSeconds())} — ACTIVE
          </div>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider text-glow-red text-primary mb-4">
            Himank
          </h1>
          <p className="font-mono text-sm md:text-base text-muted-foreground tracking-[0.2em] mb-8">
            Tech Enthusiast&nbsp;|&nbsp;Solutions Architect&nbsp;|&nbsp;Web Designer
          </p>

          <p className="font-body text-lg md:text-xl text-foreground/80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            "Crafting digital experiences. Solving real-world problems through technology."
          </p>

          <div className="mt-10 flex gap-4 justify-center lg:justify-start">
            <a
              href="#about"
              className="glass-red px-8 py-3 font-mono text-sm text-primary animate-glow-border rounded-md hover:bg-primary/10 transition-colors tracking-wider"
            >
              Explore →
            </a>
            <a
              href="#contact"
              className="glass px-8 py-3 font-mono text-sm text-foreground rounded-md hover:text-primary hover:neon-border-red transition-all tracking-wider"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Profile image */}
        <div
          className={`flex-1 flex justify-center transition-all duration-1000 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/30 via-transparent to-accent/20 blur-2xl animate-neon-pulse" />
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden neon-border-red animate-glow-border">
              <img
                src={profileImg}
                alt="Himank"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
