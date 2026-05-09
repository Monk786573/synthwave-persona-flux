import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "@/lib/scrollState";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives `scrollState.p` (0 → 1) so the 3D scene's camera path + particle
 * morphs land exactly on hero / about / skills / work / contact sections.
 */
const SECTIONS = ["#hero", "#about", "#skills", "#work", "#contact"];

const ScrollDriver = () => {
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    const tweenTo = (target: number) =>
      gsap.to(scrollState, { p: target, duration: 1.1, ease: "power2.inOut", overwrite: true });

    SECTIONS.forEach((sel, i) => {
      const target = i / (SECTIONS.length - 1);
      const t = ScrollTrigger.create({
        trigger: sel,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => tweenTo(target),
        onEnterBack: () => tweenTo(target),
      });
      triggers.push(t);
    });

    // Optional snap to nearest section for a premium "stop on each scene" feel
    const snapper = ScrollTrigger.create({
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      snap: {
        snapTo: (value) => {
          const steps = SECTIONS.length;
          return Math.round(value * (steps - 1)) / (steps - 1);
        },
        duration: { min: 0.25, max: 0.6 },
        delay: 0.12,
        ease: "power2.inOut",
      },
    });
    triggers.push(snapper);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      triggers.forEach((t) => t.kill());
      window.removeEventListener("load", refresh);
    };
  }, []);

  return null;
};

export default ScrollDriver;
