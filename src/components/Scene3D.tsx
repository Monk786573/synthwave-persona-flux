import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Persistent full-screen Three.js canvas driven by scroll progress (0 → 1).
 * Camera follows a CatmullRom spline; particles morph through 5 target
 * formations (galaxy → helix → city → screens grid → bento cube).
 */
const Scene3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ---------- renderer ----------
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // ---------- camera path ----------
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 6),
      new THREE.Vector3(2.2, 1.2, 4),
      new THREE.Vector3(-1.6, -1.2, 3),
      new THREE.Vector3(0.4, 2.4, 2),
      new THREE.Vector3(0, 0, 1.2),
    ]);

    // ---------- particles + morph targets ----------
    const COUNT = 18000;
    const positions = new Float32Array(COUNT * 3);
    const targets: Float32Array[] = [
      new Float32Array(COUNT * 3), // 0 galaxy
      new Float32Array(COUNT * 3), // 1 helix
      new Float32Array(COUNT * 3), // 2 city
      new Float32Array(COUNT * 3), // 3 screens grid
      new Float32Array(COUNT * 3), // 4 bento cube
    ];
    const colors = new Float32Array(COUNT * 3);

    const palette = [
      new THREE.Color("#FF6B2C"), // amber
      new THREE.Color("#6C63FF"), // indigo
      new THREE.Color("#34D399"), // emerald
      new THREE.Color("#D4BAFF"), // lavender
      new THREE.Color("#FFDCE1"), // coral
    ];

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;

      // 0 — Galaxy spiral
      const armR = Math.pow(Math.random(), 0.6) * 4;
      const armA = Math.random() * Math.PI * 2 + armR * 1.4;
      targets[0][i3] = Math.cos(armA) * armR + (Math.random() - 0.5) * 0.3;
      targets[0][i3 + 1] = (Math.random() - 0.5) * 0.6;
      targets[0][i3 + 2] = Math.sin(armA) * armR + (Math.random() - 0.5) * 0.3;

      // 1 — DNA double helix
      const t = (i / COUNT) * Math.PI * 14;
      const strand = i % 2 === 0 ? 1 : -1;
      targets[1][i3] = Math.cos(t) * 1.2 * strand;
      targets[1][i3 + 1] = (i / COUNT - 0.5) * 8;
      targets[1][i3 + 2] = Math.sin(t) * 1.2 * strand;

      // 2 — Isometric city blocks (random towers)
      const cx = (Math.floor(Math.random() * 10) - 5) * 0.6;
      const cz = (Math.floor(Math.random() * 10) - 5) * 0.6;
      const ch = Math.random() * 3;
      targets[2][i3] = cx + (Math.random() - 0.5) * 0.4;
      targets[2][i3 + 1] = (Math.random() - 0.5) * ch;
      targets[2][i3 + 2] = cz + (Math.random() - 0.5) * 0.4;

      // 3 — Floating screen grid
      const col = (i % 60) - 30;
      const row = Math.floor(i / 60) % 60 - 30;
      targets[3][i3] = col * 0.12;
      targets[3][i3 + 1] = row * 0.12;
      targets[3][i3 + 2] = Math.sin(col * 0.4) * 0.5;

      // 4 — Bento cube (hollow box surface)
      const face = Math.floor(Math.random() * 6);
      const u = (Math.random() - 0.5) * 2;
      const v = (Math.random() - 0.5) * 2;
      const s = 1.6;
      const set = [
        [s, u * s, v * s], [-s, u * s, v * s],
        [u * s, s, v * s], [u * s, -s, v * s],
        [u * s, v * s, s], [u * s, v * s, -s],
      ][face];
      targets[4][i3] = set[0];
      targets[4][i3 + 1] = set[1];
      targets[4][i3 + 2] = set[2];

      // initial positions
      positions[i3] = targets[0][i3];
      positions[i3 + 1] = targets[0][i3 + 1];
      positions[i3 + 2] = targets[0][i3 + 2];

      const c = palette[i % palette.length];
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ambient bloom-ish glow via fog hint
    scene.fog = new THREE.FogExp2(0x000000, 0.05);

    // ---------- scroll handling ----------
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ---------- resize ----------
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ---------- render loop ----------
    let raf = 0;
    let smoothP = 0;
    const clock = new THREE.Clock();
    const tmp = new THREE.Vector3();
    const lookAt = new THREE.Vector3(0, 0, 0);

    const tick = () => {
      const time = clock.getElapsedTime();
      smoothP += (progressRef.current - smoothP) * 0.06; // smooth scrub

      // camera along path
      const cp = path.getPoint(Math.min(0.999, smoothP));
      camera.position.lerp(cp, 0.12);
      camera.lookAt(lookAt);

      // segment morph: 5 targets across 4 segments
      const seg = Math.min(3, Math.floor(smoothP * 4));
      const local = smoothP * 4 - seg;
      const a = targets[seg];
      const b = targets[seg + 1];
      const pos = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < pos.length; i += 3) {
        const tx = a[i] + (b[i] - a[i]) * local;
        const ty = a[i + 1] + (b[i + 1] - a[i + 1]) * local;
        const tz = a[i + 2] + (b[i + 2] - a[i + 2]) * local;
        // gentle drift
        tmp.set(tx + Math.sin(time + i) * 0.01, ty + Math.cos(time * 0.8 + i) * 0.01, tz);
        pos[i] += (tmp.x - pos[i]) * 0.08;
        pos[i + 1] += (tmp.y - pos[i + 1]) * 0.08;
        pos[i + 2] += (tmp.z - pos[i + 2]) * 0.08;
      }
      geometry.attributes.position.needsUpdate = true;
      points.rotation.y = smoothP * Math.PI * 0.6 + time * 0.02;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-0 pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    />
  );
};

export default Scene3D;
