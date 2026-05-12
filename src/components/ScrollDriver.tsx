import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "@/lib/scrollState";

gsap.registerPlugin(ScrollTrigger);

/**
 * 4D scroll-driven animation system.
 * - Lerped scroll progress (0 → 1) shared via `scrollState.p` for the WebGL/liquid scene.
 * - Each <section> gets a unique 3D entry/exit transform (rotateX/Y, translateZ, skew).
 * - Parallax layers driven by [data-parallax="0.2|0.5|1"] attributes.
 * - Thin scroll-progress bar at top of viewport.
 * - Respects prefers-reduced-motion.
 */
const ScrollDriver = () => {
  useEffect(() => {
    // ---- progress bar element ----
    const bar = document.createElement("div");
    bar.className = "scroll-progress-bar";
    document.body.appendChild(bar);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- lerped global progress (0 → 1) ----
    let target = 0;
    let current = 0;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let raf = 0;
    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    );

    const tick = () => {
      current += (target - current) * (reduced ? 1 : 0.08); // lerp
      scrollState.p = current;
      bar.style.width = `${Math.min(100, current * 100)}%`;

      // parallax layers
      for (const el of parallaxEls) {
        const speed = parseFloat(el.dataset.parallax || "0.5");
        const y = (current - 0.5) * window.innerHeight * speed * -0.6;
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // ---- per-section 4D entry transforms ----
    const triggers: ScrollTrigger[] = [];
    if (!reduced) {
      const sections = gsap.utils.toArray<HTMLElement>("main > section");
      const variants = [
        { rotationY: -25, rotationX: 8, z: -300, x: -120, opacity: 0 },
        { rotationY: 25, rotationX: -6, z: -260, x: 140, opacity: 0 },
        { rotationX: 30, z: -340, y: 160, opacity: 0 },
        { rotationY: -18, skewX: 6, z: -220, x: -160, opacity: 0 },
        { rotationX: -22, z: -300, y: -140, opacity: 0 },
        { scale: 0.7, z: -400, opacity: 0 },
      ];

      sections.forEach((section, i) => {
        const from = variants[i % variants.length];
        gsap.set(section, { transformPerspective: 1100, transformOrigin: "50% 50%" });
        const tw = gsap.fromTo(
          section,
          from,
          {
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            x: 0,
            y: 0,
            z: 0,
            scale: 1,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              end: "top 35%",
              scrub: 1,
            },
          }
        );
        if (tw.scrollTrigger) triggers.push(tw.scrollTrigger);
      });
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", refresh);
      triggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
      bar.remove();
    };
  }, []);

  return null;
};

export default ScrollDriver;
