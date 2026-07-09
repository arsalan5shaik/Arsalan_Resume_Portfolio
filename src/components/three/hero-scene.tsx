"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

// getComputedStyle can resolve modern CSS color functions (oklch, in this
// project's tokens) to "lab(...)" rather than "rgb(...)" depending on the
// browser — a format THREE.Color.setStyle() doesn't understand, silently
// falling back to white. Routing through a 1x1 canvas always normalizes to
// plain sRGB integers regardless of the input color space.
function resolveCssColor(varName: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;

  const probe = document.createElement("span");
  probe.style.color = `var(${varName})`;
  document.body.appendChild(probe);
  const raw = getComputedStyle(probe).color;
  document.body.removeChild(probe);

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return fallback;

  ctx.fillStyle = raw;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return `rgb(${r}, ${g}, ${b})`;
}

function Blob({ reduceMotion }: { reduceMotion: boolean }) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const pointer = React.useRef({ x: 0, y: 0 });
  const [colors] = React.useState(() => ({
    from: resolveCssColor("--stage-accent-from", "#7c3aed"),
    to: resolveCssColor("--stage-accent-to", "#e879f9"),
  }));

  React.useEffect(() => {
    if (reduceMotion) return;
    function onMove(e: PointerEvent) {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    if (!reduceMotion) {
      mesh.rotation.y += delta * 0.18;
      mesh.rotation.x = THREE.MathUtils.lerp(
        mesh.rotation.x,
        pointer.current.y * 0.25,
        0.04
      );
      mesh.rotation.z = THREE.MathUtils.lerp(
        mesh.rotation.z,
        -pointer.current.x * 0.15,
        0.04
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 2, 4]} intensity={0.9} />
      <directionalLight position={[-2, -1, 2]} color={colors.to} intensity={0.6} />
      <Sphere ref={meshRef} args={[1.5, 128, 128]}>
        <MeshDistortMaterial
          color={colors.from}
          emissive={colors.to}
          emissiveIntensity={0.25}
          roughness={0.5}
          metalness={0.1}
          distort={0.38}
          speed={reduceMotion ? 0 : 1.8}
        />
      </Sphere>
    </>
  );
}

export function HeroScene({ reduceMotion = false }: { reduceMotion?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Blob reduceMotion={reduceMotion} />
    </Canvas>
  );
}
