import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { BrainCircuit, Code2, Network, Sparkles } from "lucide-react";

type PanelKind = "python" | "learning" | "generative";

function Panel({
  kind,
  position,
  rotation,
  active,
  onActivate,
}: {
  kind: PanelKind;
  position: [number, number, number];
  rotation: [number, number, number];
  active: boolean;
  onActivate: (kind: PanelKind | null) => void;
}) {
  const config = {
    python: {
      label: "PYTHON / ENVIRONMENT",
      title: "Code workspace",
      Icon: Code2,
      accent: "#A9C8FF",
      detail: "model.fit(X_train, y_train)",
      status: "EXECUTING SCRIPT",
      number: "01",
    },
    learning: {
      label: "ML / MODEL CORE",
      title: "Learning engine",
      Icon: Network,
      accent: "#B8D0FF",
      detail: "accuracy = 0.948",
      status: "MODEL TRAINED",
      number: "02",
    },
    generative: {
      label: "GEN AI / INFERENCE",
      title: "Generative layer",
      Icon: BrainCircuit,
      accent: "#C5B8FF",
      detail: "response.stream()",
      status: "GENERATING",
      number: "03",
    },
  }[kind];

  const Icon = config.Icon;

  return (
    <Float speed={active ? 2.4 : 1.1} rotationIntensity={0.08} floatIntensity={active ? 0.22 : 0.12}>
      <group position={position} rotation={rotation}>
        <RoundedBox args={[2.55, 1.7, 0.09]} radius={0.12} smoothness={4}>
          <meshPhysicalMaterial
            color={active ? "#263D68" : "#101827"}
            metalness={0.35}
            roughness={0.22}
            transparent
            opacity={0.62}
            clearcoat={0.8}
          />
        </RoundedBox>
        <Html transform center distanceFactor={8} zIndexRange={[20, 0]}>
          <div
            className={`ai-workspace-panel ${active ? "is-active" : ""}`}
            onPointerEnter={() => onActivate(kind)}
            onPointerLeave={() => onActivate(null)}
            style={{ "--panel-accent": config.accent } as CSSProperties}
          >
            <div className="ai-panel-topline">
              <span>{config.label}</span>
              <span>{config.number}</span>
            </div>
            <div className="ai-panel-heading">
              <span className="ai-panel-icon"><Icon size={17} strokeWidth={1.7} /></span>
              <strong>{config.title}</strong>
            </div>
            <div className="ai-panel-code">{config.detail}</div>
            <div className="ai-panel-status">
              <span className="ai-status-dot" />
              {config.status}
              <span className="ai-panel-spark"><Sparkles size={12} /></span>
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

function WorkspaceScene() {
  const group = useRef<THREE.Group>(null);
  const [active, setActive] = useState<PanelKind | null>(null);

  useFrame(({ pointer, size }, delta) => {
    if (!group.current) return;
    const targetScale = size.width < 480 ? 0.58 : size.width < 767 ? 0.68 : size.width < 1024 ? 0.84 : 1;
    const scale = THREE.MathUtils.damp(group.current.scale.x, targetScale, 3, delta);
    group.current.scale.setScalar(scale);
    const targetY = pointer.x * 0.12;
    const targetX = -pointer.y * 0.07;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3.2, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3.2, delta);
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <pointLight position={[0, 2, 4]} intensity={22} color="#8DB6FF" distance={9} />
      <pointLight position={[-3, -2, 1]} intensity={9} color="#7567E8" distance={7} />
      <group ref={group}>
        <Panel
          kind="python"
          position={[-2.55, 0.38, 0]}
          rotation={[0.02, 0.13, -0.055]}
          active={active === "python"}
          onActivate={setActive}
        />
        <Panel
          kind="learning"
          position={[0, -0.28, 0.45]}
          rotation={[-0.025, -0.04, 0.025]}
          active={active === "learning"}
          onActivate={setActive}
        />
        <Panel
          kind="generative"
          position={[2.55, 0.34, -0.12]}
          rotation={[0.02, -0.15, 0.055]}
          active={active === "generative"}
          onActivate={setActive}
        />
      </group>
    </>
  );
}

export default function HeroAIWorkspace() {
  return (
    <div className="hero-ai-workspace" aria-label="Interactive 3D AI workspace">
      <div className="ai-workspace-glow" />
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 39 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor("#000000", 0)}
      >
        <WorkspaceScene />
      </Canvas>
      <div className="ai-workspace-footnote">
        <span className="ai-status-dot" /> INTERACTIVE SYSTEMS / LIVE PREVIEW
      </div>
    </div>
  );
}
