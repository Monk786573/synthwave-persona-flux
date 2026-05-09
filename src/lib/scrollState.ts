// Shared scroll progress (0 → 1) consumed by the persistent Three.js scene.
// Driven by GSAP ScrollTrigger so it aligns to section anchors rather than raw scrollY.
export const scrollState = { p: 0 };
