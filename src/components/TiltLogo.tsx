"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { animate, motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// There's no source 3D asset for the logo (no GLTF/mesh) — a real Three.js render would need
// one built from scratch. This gives the emblem genuine depth and interactivity with just CSS
// 3D transforms: a pointer-tracked tilt, a specular highlight that follows the cursor, and a
// slow idle sway so it still feels alive when nobody's touching it (e.g. on mobile).
export default function TiltLogo({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const idleY = useMotionValue(0);
  const pointerX = useMotionValue(0); // rotateX contribution
  const pointerY = useMotionValue(0); // rotateY contribution

  const rotateX = useSpring(pointerX, { stiffness: 150, damping: 15 });
  const rotateYRaw = useTransform([idleY, pointerY], ([a, b]) => (a as number) + (b as number));
  const rotateY = useSpring(rotateYRaw, { stiffness: 150, damping: 15 });

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glossOpacity = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const glossBackground = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.9), transparent 55%)`,
  );

  const shadowX = useTransform(rotateY, [-14, 14], [10, -10]);
  const shadowY = useTransform(rotateX, [-14, 14], [-10, 10]);

  useEffect(() => {
    const controls = animate(idleY, [0, 6, 0, -6, 0], {
      duration: 14,
      repeat: Infinity,
      ease: "easeInOut",
    });
    return () => controls.stop();
  }, [idleY]);

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    pointerY.set((px - 0.5) * 24);
    pointerX.set((0.5 - py) * 24);
    glowX.set(px * 100);
    glowY.set(py * 100);
    glossOpacity.set(0.35);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
    glossOpacity.set(0);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto w-full max-w-xs [perspective:900px]"
    >
      {/* Ambient tricolor glow, drifting slowly on its own */}
      <motion.div
        aria-hidden
        className="absolute -inset-8 rounded-full bg-gradient-to-br from-saffron/25 via-white/10 to-flagGreen/25 blur-2xl"
        animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{ rotateX, rotateY, x: shadowX, y: shadowY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <div
          className="relative rounded-full"
          style={{ filter: "drop-shadow(0 25px 35px rgba(10, 25, 46, 0.45))" }}
        >
          <Image src={src} alt={alt} width={420} height={420} priority className="relative" />

          {/* Specular highlight that tracks the pointer */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full mix-blend-soft-light"
            style={{ opacity: glossOpacity, background: glossBackground }}
          />
        </div>
      </motion.div>
    </div>
  );
}
