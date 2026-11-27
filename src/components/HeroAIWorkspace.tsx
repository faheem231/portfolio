import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

type ArtifactKind = "knot" | "cube" | "crystal";

function Artifact({
  kind,
  position,
  scale,
  speed,
  active,
  onActive,
  reduceMotion,
}: {
  kind: ArtifactKind;
  position: [number, number, number];
  scale: number;
  speed: number;
  active: boolean;
  onActive: (kind: ArtifactKind | null) => void;
  reduceMotion: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    const target = active ? 1.13 : 1;
    const nextScale = THREE.MathUtils.damp(mesh.current.scale.x, target, 5, delta);
    mesh.current.scale.setScalar(nextScale * scale);
    if (!reduceMotion) {
      mesh.current.rotation.x += delta * speed * 0.32;
      mesh.current.rotation.y += delta * speed * 0.48;
    }
  });

  let geometry: ReactNode;
  if (kind === "knot") {
    geometry = <torusKnotGeometry args={[0.72, 0.19, 180, 24, 2, 3]} />;
  } else if (kind === "cube") {
    geometry = <octahedronGeometry args={[0.66, 1]} />;
  } else {
    geometry = <icosahedronGeometry args={[0.64, 1]} />;
  }

  return (
    <Float
      speed={reduceMotion ? 0 : speed}
      rotationIntensity={reduceMotion ? 0 : 0.16}
      floatIntensity={reduceMotion ? 0 : 0.22}
    >
      <mesh
        ref={mesh}
        position={position}
        onPointerOver={(event) => {
          event.stopPropagation();
          onActive(kind);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onActive(null);
          document.body.style.cursor = "auto";
        }}
        castShadow
      >
        {geometry}
        <meshPhysicalMaterial
          color={active ? "#a9caff" : "#c8d0dc"}
          metalness={0.88}
          roughness={active ? 0.16 : 0.24}
          clearcoat={1}
          clearcoatRoughness={0.12}
          emissive={active ? "#183f83" : "#07101f"}
          emissiveIntensity={active ? 0.48 : 0.12}
        />
      </mesh>
    </Float>
  );
}

function Orbit({ reduceMotion }: { reduceMotion: boolean }) {
  const orbitA = useRef<THREE.Mesh>(null);
  const orbitB = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (reduceMotion) return;
    if (orbitA.current) {
      orbitA.current.rotation.x += delta * 0.12;
      orbitA.current.rotation.y += delta * 0.2;
    }
    if (orbitB.current) {
      orbitB.current.rotation.x -= delta * 0.16;
      orbitB.current.rotation.z += delta * 0.11;
    }
  });

  return (
    <>
      <mesh ref={orbitA} rotation={[0.85, 0.2, -0.28]}>
        <torusGeometry args={[1.55, 0.012, 8, 180]} />
        <meshBasicMaterial color="#8bb8ff" transparent opacity={0.58} />
      </mesh>
      <mesh ref={orbitB} rotation={[1.18, -0.55, 0.45]}>
        <torusGeometry args={[1.82, 0.008, 8, 180]} />
        <meshBasicMaterial color="#d8e5ff" transparent opacity={0.32} />
      </mesh>
    </>
  );
}

function SculptureScene() {
  const [active, setActive] = useState<ArtifactKind | null>(null);
  const group = useRef<THREE.Group>(null);
  const reduceMotion = useReducedMotion();

  useFrame(({ pointer }, delta) => {
    if (!group.current || reduceMotion) return;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      pointer.x * 0.2,
      2.8,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -pointer.y * 0.12,
      2.8,
      delta,
    );
  });

  return (
    <>
      <ambientLight intensity={1.25} />
      <directionalLight position={[3, 4, 5]} intensity={3.2} color="#e7f0ff" />
      <pointLight position={[-3, 1, 2]} intensity={18} color="#3c83ff" distance={8} />
      <pointLight position={[3, -2, -1]} intensity={12} color="#a8c8ff" distance={7} />
      <pointLight position={[0, 0, 4]} intensity={8} color="#ffffff" distance={6} />
      <group ref={group}>
        <Orbit reduceMotion={Boolean(reduceMotion)} />
        <Artifact
          kind="knot"
          position={[0, 0, 0.15]}
          scale={1.05}
          speed={0.55}
          active={active === "knot"}
          onActive={setActive}
          reduceMotion={Boolean(reduceMotion)}
        />
        <Artifact
          kind="cube"
          position={[-1.72, 0.3, -0.25]}
          scale={0.72}
          speed={0.8}
          active={active === "cube"}
          onActive={setActive}
          reduceMotion={Boolean(reduceMotion)}
        />
        <Artifact
          kind="crystal"
          position={[1.72, -0.24, -0.3]}
          scale={0.78}
          speed={0.68}
          active={active === "crystal"}
          onActive={setActive}
          reduceMotion={Boolean(reduceMotion)}
        />
      </group>
    </>
  );
}

export default function HeroAIWorkspace() {
  return (
    <div className="hero-scene" aria-label="Interactive chrome and glass 3D sculpture">
      <div className="hero-scene-aura" />
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7.4], fov: 39 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <SculptureScene />
      </Canvas>

      <div className="hero-glass-label hero-glass-label-left" aria-hidden="true">
        <span className="hero-glass-kicker">OBJECT / 001</span>
        <strong>FORM IN MOTION</strong>
        <span className="hero-glass-meta">INTERACTIVE STUDY</span>
      </div>
      <div className="hero-glass-label hero-glass-label-right" aria-hidden="true">
        <span className="hero-glass-kicker">SYSTEM STATUS</span>
        <strong><i /> LIVE / RESPONSIVE</strong>
        <span className="hero-glass-meta">MOVE TO EXPLORE</span>
      </div>
    </div>
  );
}
