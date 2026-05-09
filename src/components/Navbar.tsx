import { useState, useEffect } from "react";
import { useContactFlow } from "./ContactFlowProvider";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { openProjectFlow } = useContactFlow();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="#hero" className="font-heading text-2xl font-bold tracking-tight text-white">
          Himank<span className="text-bento-amber">.</span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          onClick={openProjectFlow}
          className="hidden md:inline-flex items-center gap-2 bg-bento-amber text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
        >
          Let's talk →
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
