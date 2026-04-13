import { useScrollReveal } from "@/hooks/useScrollReveal";

const AboutSection = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="about" className="relative py-32 z-10">
      <div className="container mx-auto px-6 max-w-3xl text-center" ref={ref}>
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="font-mono text-xs text-primary tracking-[0.4em] mb-4">// WHO I AM</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-glow-red text-primary mb-2">
            About Me
          </h2>
          <div className="neon-underline w-32 mx-auto mb-10" />

          <p className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed">
            I am an Intermediate 1st Year student with a deep-seated passion for the digital world.
            I don't just use technology; I dissect it, refine it, and use it to solve real-world
            problems. Whether it's building a sleek interface or digging into back-end systems, I
            thrive on making technology work better for everyone.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
