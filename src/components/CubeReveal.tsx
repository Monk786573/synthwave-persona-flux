import { useEffect, useRef, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
  axis?: "x" | "y";
}

const CubeReveal = ({ children, axis = "x" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: -1 (below) -> 0 (centered) -> 1 (above)
      const center = rect.top + rect.height / 2;
      const p = (center - vh / 2) / (vh / 2 + rect.height / 2);
      setProgress(Math.max(-1, Math.min(1, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Map progress to rotation. Cube-like: rotate up to 35deg, fade away from center.
  const rot = progress * 35;
  const opacity = 1 - Math.min(1, Math.abs(progress) * 1.1);
  const scale = 1 - Math.abs(progress) * 0.08;
  const transform =
    axis === "x"
      ? `perspective(1400px) rotateX(${-rot}deg) scale(${scale})`
      : `perspective(1400px) rotateY(${rot}deg) scale(${scale})`;

  return (
    <div style={{ perspective: "1400px" }}>
      <div
        ref={ref}
        style={{
          transform,
          opacity: Math.max(0.15, opacity),
          transformStyle: "preserve-3d",
          transition: "transform 0.15s linear, opacity 0.15s linear",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CubeReveal;
