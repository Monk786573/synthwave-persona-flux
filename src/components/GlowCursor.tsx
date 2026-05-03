import { useEffect, useRef } from "react";

const GlowCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const lerp = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] w-10 h-10 rounded-full mix-blend-screen"
      style={{
        background: "radial-gradient(circle, hsl(190 100% 55% / 0.55) 0%, hsl(280 90% 65% / 0.2) 50%, transparent 75%)",
        boxShadow: "0 0 30px 10px hsl(190 100% 55% / 0.25), 0 0 60px 20px hsl(280 90% 65% / 0.15)",
      }}
    />
  );
};

export default GlowCursor;
