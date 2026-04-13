import { useEffect, useRef } from "react";

const BinaryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(0).map(() => Math.random() * -100);

    const chars = "01";

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Varying green intensities
        const brightness = Math.random();
        if (brightness > 0.95) {
          ctx.fillStyle = "hsl(120, 100%, 70%)";
          ctx.shadowBlur = 8;
          ctx.shadowColor = "hsl(120, 100%, 50%)";
        } else if (brightness > 0.8) {
          ctx.fillStyle = "hsl(120, 100%, 45%)";
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `hsl(120, 80%, ${15 + brightness * 20}%)`;
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5 + Math.random() * 0.5;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-30"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default BinaryBackground;
