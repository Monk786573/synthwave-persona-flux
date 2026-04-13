import { useScrollReveal } from "@/hooks/useScrollReveal";

const PhilosophySection = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="relative py-32 z-10">
      <div className="container mx-auto px-6 max-w-3xl text-center" ref={ref}>
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="font-mono text-xs text-primary tracking-[0.4em] mb-4">// PHILOSOPHY</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-glow-red text-primary mb-2">My Belief</h2>
          <div className="neon-underline w-32 mx-auto mb-10" />

          <blockquote className="font-body text-xl md:text-2xl text-foreground/80 leading-relaxed italic">
            "I believe that no problem is too small to ignore and no data is too hidden to find.
            My goal is to bridge the gap between complex technology and a seamless user experience."
          </blockquote>

          <div className="mt-8 neon-underline w-48 mx-auto animate-neon-pulse" />
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
