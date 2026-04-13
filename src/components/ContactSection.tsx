import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail, Instagram } from "lucide-react";

const ContactSection = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="contact" className="relative py-32 z-10">
      <div className="container mx-auto px-6 max-w-2xl text-center" ref={ref}>
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="font-mono text-xs text-primary tracking-[0.4em] mb-4">// REACH OUT</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-glow-red text-primary mb-2">Let's Connect</h2>
          <div className="neon-underline w-32 mx-auto mb-10" />

          <p className="font-body text-lg text-foreground/80 leading-relaxed mb-12">
            I'm always looking for new challenges and opportunities to grow my skill set. If you're
            looking for someone who is resourceful, design-oriented, and tech-savvy, let's connect!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:himonkbavisetti@gmail.com"
              className="glass-red px-8 py-4 rounded-md flex items-center justify-center gap-3 font-mono text-sm text-primary animate-glow-border hover:bg-primary/10 transition-all group"
            >
              <Mail className="w-5 h-5 group-hover:text-glow-red transition-all" />
              himonkbavisetti@gmail.com
            </a>
            <a
              href="https://instagram.com/_technophile_.x"
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-8 py-4 rounded-md flex items-center justify-center gap-3 font-mono text-sm text-foreground hover:text-primary hover:neon-border-red transition-all group"
            >
              <Instagram className="w-5 h-5 group-hover:text-glow-red transition-all" />
              @_technophile_.x
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 text-center">
        <p className="font-mono text-xs text-muted-foreground tracking-wider">
          © 2026 Himank — Built with passion & code
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
