import { useEffect, useRef } from "react";

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const ripplesRef = useRef<{ x: number; y: number; radius: number; maxRadius: number; alpha: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Node count and distance thresholds
    const nodeCount = isMobile ? 24 : 65;
    const maxDistance = isMobile ? 100 : 150;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      baseRadius: number;
    }

    const nodes: Node[] = Array.from({ length: nodeCount }, () => {
      const r = Math.random() * 1.6 + 1.2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: r,
        baseRadius: r,
        alpha: Math.random() * 0.4 + 0.5,
      };
    });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleClick = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: 220,
        alpha: 0.5,
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    mouseRef.current.targetX = width / 2;
    mouseRef.current.targetY = height / 3;

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp mouse tracking
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Render Click Ripples
      const ripples = ripplesRef.current;
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 4;
        rip.alpha *= 0.96;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${rip.alpha * 0.3})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (rip.radius >= rip.maxRadius || rip.alpha < 0.02) {
          ripples.splice(r, 1);
        }
      }

      // Spotlight Glow behind cursor
      if (mouse.x > 0 && mouse.y > 0 && !isMobile) {
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 650);
        glow.addColorStop(0, "rgba(255, 255, 255, 0.12)");
        glow.addColorStop(0.4, "rgba(255, 255, 255, 0.035)");
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      // Render Nodes & Dynamic Interactive Connections
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          // Mouse Repulsion & Glow Effect
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const mouseDist = Math.sqrt(dx * dx + dy * dy);

          if (mouseDist < 180 && mouseDist > 0) {
            const force = (1 - mouseDist / 180) * 1.8;
            node.x += (dx / mouseDist) * force;
            node.y += (dy / mouseDist) * force;

            // Connect mouse to nearby nodes
            if (!isMobile) {
              const mouseLineAlpha = (1 - mouseDist / 180) * 0.4;
              ctx.beginPath();
              ctx.moveTo(mouse.x, mouse.y);
              ctx.lineTo(node.x, node.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${mouseLineAlpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }

          // Ripple Physics Interaction
          for (let r = 0; r < ripples.length; r++) {
            const rip = ripples[r];
            const rdx = node.x - rip.x;
            const rdy = node.y - rip.y;
            const rDist = Math.sqrt(rdx * rdx + rdy * rdy);

            if (Math.abs(rDist - rip.radius) < 30 && rDist > 0) {
              node.x += (rdx / rDist) * 2;
              node.y += (rdy / rDist) * 2;
            }
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${node.alpha * 0.75})`;
        ctx.fill();

        // Connect node-to-node
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const ldx = other.x - node.x;
          const ldy = other.y - node.y;
          const dist = Math.sqrt(ldx * ldx + ldy * ldy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.32;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    }

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {/* Interactive Neural Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* SVG Film Grain Noise Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.045] mix-blend-overlay">
        <filter id="neuralNoiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#neuralNoiseFilter)" />
      </svg>
    </div>
  );
}
