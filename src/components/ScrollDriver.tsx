import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "@/lib/scrollState";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smoothly drives `scrollState.p` (0 → 1) from raw scroll position — no
 * snapping, no section triggers. The 3D scene morphs continuously while
 * each section fades/slides in from alternating sides.
 */
const ScrollDriver = () => {
  useEffect(() => {
    // Continuous progress mapping (smooth, no snap)
    const tween = gsap.to(scrollState, {
      p: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      },
    });

    // Side-wise fade in/out for each section — alternating left/right
    const sections = gsap.utils.toArray<HTMLElement>("main > section");
    const reveals: ScrollTrigger[] = [];

    sections.forEach((section, i) => {
      const fromX = i % 2 === 0 ? -80 : 80;
      gsap.fromTo(
        section,
        { autoAlpha: 0, x: fromX },
        {
          autoAlpha: 1,
          x: 0,
          ease: "power2.out",
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      reveals.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("load", refresh);
    };
  }, []);

  return null;
};

export default ScrollDriver;
