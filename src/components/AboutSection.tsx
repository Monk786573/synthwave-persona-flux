import { useScrollReveal } from "@/hooks/useScrollReveal";

const AboutSection = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="about"
      className="relative py-32 z-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0F0C29 0%, #302B63 50%, #24243E 100%)",
      }}
    >
      {/* ambient orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="container mx-auto px-2 max-w-5xl relative" ref={ref}>
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-xs uppercase tracking-[0.4em] text-white/60 mb-3 text-center">// Who I am</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white text-center mb-16">
            About <span className="text-gradient-amber">Me</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-8 md:col-span-2">
              <h3 className="font-heading text-2xl text-white mb-4">The story</h3>
              <p className="text-white/80 leading-relaxed">
                I am an Intermediate 1st Year student with a deep-seated passion for the digital world.
                I don't just use technology; I dissect it, refine it, and use it to solve real-world
                problems. Whether it's building a sleek interface or digging into back-end systems, I
                thrive on making technology work better for everyone.
              </p>
            </div>
            <div className="glass-card p-8">
              <h3 className="font-heading text-2xl text-white mb-4">Belief</h3>
              <p className="text-white/80 leading-relaxed italic">
                "No problem is too small to ignore and no data is too hidden to find."
              </p>
            </div>
            <div className="glass-card p-6">
              <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Role</p>
              <p className="text-white font-semibold">UI/UX Designer</p>
            </div>
            <div className="glass-card p-6">
              <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Focus</p>
              <p className="text-white font-semibold">System UI · Web</p>
            </div>
            <div className="glass-card p-6">
              <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Status</p>
              <p className="text-white font-semibold">Open to projects</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
