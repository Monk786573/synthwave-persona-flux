import { useEffect, useRef } from "react";

/**
 * Abstract liquid effect background — animated SVG metaball blobs
 * with a goo filter, rendered in monochrome (black & white).
 */
const LiquidBackground = () => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    let raf = 0;
    const start = performance.now();

    const blobs = Array.from(svg.querySelectorAll<SVGCircleElement>("[data-blob]")).map(
      (el, i) => ({
        el,
        ox: parseFloat(el.getAttribute("cx") || "0"),
        oy: parseFloat(el.getAttribute("cy") || "0"),
        ax: 80 + i * 40,
        ay: 60 + i * 30,
        sx: 0.0004 + i * 0.0002,
        sy: 0.0005 + i * 0.00015,
        ph: i * 1.7,
      })
    );

    const tick = () => {
      const t = performance.now() - start;
      blobs.forEach((b) => {
        const x = b.ox + Math.sin(t * b.sx + b.ph) * b.ax;
        const y = b.oy + Math.cos(t * b.sy + b.ph) * b.ay;
        b.el.setAttribute("cx", String(x));
        b.el.setAttribute("cy", String(y));
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 0, background: "#000" }}
    >
      <svg
        ref={ref}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
          <radialGradient id="lg1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id="lg2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bdbdbd" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#222222" stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {/* subtle vignette */}
        <rect width="1200" height="800" fill="url(#lg2)" opacity="0.15" />

        <g filter="url(#goo)" opacity="0.55">
          <circle data-blob cx="300" cy="300" r="160" fill="url(#lg1)" />
          <circle data-blob cx="800" cy="250" r="200" fill="url(#lg2)" />
          <circle data-blob cx="500" cy="600" r="180" fill="url(#lg1)" />
          <circle data-blob cx="950" cy="600" r="140" fill="url(#lg2)" />
          <circle data-blob cx="200" cy="650" r="120" fill="url(#lg1)" />
          <circle data-blob cx="650" cy="400" r="150" fill="url(#lg2)" />
        </g>

        {/* film grain via noise overlay */}
        <rect
          width="1200"
          height="800"
          fill="black"
          opacity="0.35"
          style={{ mixBlendMode: "multiply" }}
        />
      </svg>
    </div>
  );
};

export default LiquidBackground;
