import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass box-glow-red py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <a href="#hero" className="font-heading text-lg tracking-widest text-glow-red text-primary">
          H.
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActive(link.label)}
              className={`font-mono text-sm tracking-wider transition-all duration-300 hover:text-primary hover:text-glow-red ${
                active === link.label ? "text-primary text-glow-red" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="hidden md:block glass-red px-5 py-2 font-mono text-sm text-primary animate-glow-border rounded-md hover:bg-primary/10 transition-colors"
        >
          Connect
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
