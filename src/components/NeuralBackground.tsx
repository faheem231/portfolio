import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  depth: number;
};

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const nodeCount = mobile ? 34 : 78;
    const linkDistance = mobile ? 112 : 158;
    const pointerRadius = mobile ? 0 : 210;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let running = false;

    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.24,
      vy: (Math.random() - 0.5) * 0.24,
      radius: Math.random() * 1.15 + 0.65,
      depth: Math.random() * 0.65 + 0.35,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const movePointer = (event: MouseEvent) => {
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;
    };
    const leavePointer = () => {
      pointerRef.current.x = -1000;
      pointerRef.current.y = -1000;
    };

    const render = () => {
      context.clearRect(0, 0, width, height);
      const pointer = pointerRef.current;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!reducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < -10 || node.x > width + 10) node.vx *= -1;
          if (node.y < -10 || node.y > height + 10) node.vy *= -1;

          const dx = pointer.x - node.x;
          const dy = pointer.y - node.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 1 && distance < pointerRadius) {
            const force = (1 - distance / pointerRadius) * 0.018 * node.depth;
            node.vx += dx * force;
            node.vy += dy * force;
          }
          node.vx *= 0.998;
          node.vy *= 0.998;
          const speed = Math.hypot(node.vx, node.vy);
          if (speed > 0.42) {
            node.vx = (node.vx / speed) * 0.42;
            node.vy = (node.vy / speed) * 0.42;
          }
        }

        context.beginPath();
        context.arc(node.x, node.y, node.radius * node.depth, 0, Math.PI * 2);
        context.fillStyle = `rgba(238, 244, 255, ${0.42 + node.depth * 0.42})`;
        context.shadowBlur = 8;
        context.shadowColor = "rgba(235, 243, 255, 0.62)";
        context.fill();
        context.shadowBlur = 0;

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const distance = Math.hypot(other.x - node.x, other.y - node.y);
          if (distance >= linkDistance) continue;
          const alpha = (1 - distance / linkDistance) * 0.34 * Math.min(node.depth, other.depth);
          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(other.x, other.y);
          context.strokeStyle = `rgba(222, 232, 248, ${alpha})`;
          context.lineWidth = 0.7;
          context.stroke();
        }

        if (pointerRadius && pointer.x > 0) {
          const distance = Math.hypot(pointer.x - node.x, pointer.y - node.y);
          if (distance < pointerRadius) {
            context.beginPath();
            context.moveTo(pointer.x, pointer.y);
            context.lineTo(node.x, node.y);
            context.strokeStyle = `rgba(245, 248, 255, ${(1 - distance / pointerRadius) * 0.48})`;
            context.lineWidth = 0.75;
            context.stroke();
          }
        }
      }

      if (!reducedMotion && running) frame = window.requestAnimationFrame(render);
    };

    const start = () => {
      if (running || document.hidden || reducedMotion) return;
      running = true;
      frame = window.requestAnimationFrame(render);
    };
    const stop = () => {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
    };
    const handleVisibility = () => {
      if (document.hidden) stop();
      else if (reducedMotion) render();
      else start();
    };

    resize();
    if (reducedMotion) render();
    else start();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", movePointer, { passive: true });
    window.addEventListener("blur", leavePointer);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", movePointer);
      window.removeEventListener("blur", leavePointer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,255,255,0.035),transparent_68%)]" />
    </div>
  );
}
