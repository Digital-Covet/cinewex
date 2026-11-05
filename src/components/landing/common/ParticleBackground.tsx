import { memo, useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;

  ox: number;
  oy: number;
  vx: number;
  vy: number;
  size: number;
  peakAlpha: number;
  alpha: number;
  phaseX: number;
  phaseY: number;
  freqScale: number;
  life: number;
  maxLife: number;
  group: "cyan" | "magenta";
}

function gauss(mean: number, std: number): number {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const n = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return mean + Math.min(Math.max(n, -2), 2) * std;
}

function spawnParticle(
  group: "cyan" | "magenta",
  width: number,
  height: number,
): Particle {
  const isCyan = group === "cyan";

  const P0 = { nx: 0.005, ny: 0.05 };

  const P1 = { nx: 0.025, ny: 0.5 };

  const P2 = { nx: 0.18, ny: 0.95 };

  const t = Math.random() ** 0.55;
  const mt = 1 - t;

  const bnx = mt * mt * P0.nx + 2 * mt * t * P1.nx + t * t * P2.nx;
  const bny = mt * mt * P0.ny + 2 * mt * t * P1.ny + t * t * P2.ny;

  const sigX = 0.008 + t * 0.1;

  const sigY = 0.01 + t * 0.045;

  const nx_final = Math.max(0.001, bnx + gauss(0, sigX));
  const ny_final = Math.min(0.999, Math.max(0.001, bny + gauss(0, sigY)));

  const x = isCyan ? nx_final * width : width - nx_final * width;

  const y = ny_final * height;

  const inward = 0.006 + Math.random() * 0.035;
  const upward = 0.004 + Math.random() * 0.04;
  const vx = isCyan ? inward : -inward;
  const vy = -upward;

  const baseness = t;
  const size = 0.12 + Math.random() * 1.5 * (0.25 + baseness * 0.95);
  const peakAlpha = (0.12 + Math.random() * 0.7) * (0.2 + baseness * 0.8);
  const maxLife = Math.floor(200 + Math.random() * 300 + baseness * 180);

  return {
    x,
    y,
    ox: x,
    oy: y,
    vx,
    vy,
    size,
    peakAlpha,
    alpha: 0,
    phaseX: Math.random() * Math.PI * 2,
    phaseY: Math.random() * Math.PI * 2,
    freqScale: 0.5 + Math.random() * 1.0,
    life: 0,
    maxLife,
    group,
  };
}

export const ParticleBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animFrame: number;
    let width = 0;
    let height = 0;
    let frameCount = 0;

    const TARGET = 3200;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      ctx.scale(DPR, DPR);

      particles = [];
      const half = Math.floor(TARGET / 2);
      for (let i = 0; i < TARGET; i++) {
        const group: "cyan" | "magenta" = i < half ? "cyan" : "magenta";
        const p = spawnParticle(group, width, height);

        p.life = Math.floor(Math.random() * p.maxLife);
        particles.push(p);
      }
      frameCount = 0;
    };

    const update = () => {
      const t = frameCount * 0.016;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.life++;
        if (p.life >= p.maxLife) {
          particles[i] = spawnParticle(p.group, width, height);
          continue;
        }

        const ln = p.life / p.maxLife;
        let env = 1.0;
        if (ln < 0.08) env = ln / 0.08;
        else if (ln > 0.9) env = (1 - ln) / 0.1;
        p.alpha = p.peakAlpha * env;

        const flowX =
          Math.sin(t * 0.2 * p.freqScale + p.oy * 0.005 + p.phaseX) * 0.15 +
          Math.sin(t * 0.09 * p.freqScale + p.ox * 0.007 + p.phaseY) * 0.06;

        const flowY =
          Math.cos(t * 0.15 * p.freqScale + p.ox * 0.006 + p.phaseX) * 0.11 +
          Math.cos(t * 0.07 * p.freqScale + p.oy * 0.005 + p.phaseY) * 0.05;

        const shimX = Math.sin(t * 1.1 + p.phaseX * 4.1) * 0.03;
        const shimY = Math.cos(t * 1.3 + p.phaseY * 3.3) * 0.03;

        const pullX = (p.ox - p.x) * 0.00014;
        const pullY = (p.oy - p.y) * 0.00007;

        p.vx = (p.vx + pullX) * 0.97;
        p.vy = (p.vy + pullY) * 0.97;

        p.x += p.vx + flowX + shimX;
        p.y += p.vy + flowY + shimY;
      }
    };

    const draw = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(10, 10, 18, 0.20)";
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "screen";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.alpha <= 0.004) continue;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(p.size, 0.1), 0, Math.PI * 2);
        ctx.fillStyle =
          p.group === "cyan"
            ? `rgba(0, 230, 255, ${p.alpha})`
            : `rgba(255, 15, 170, ${p.alpha})`;
        ctx.fill();
      }
    };

    const loop = () => {
      frameCount++;
      update();
      draw();
      animFrame = requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize);
    resize();
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 bg-[#0A0A12] overflow-hidden"
    >
      {}

      {}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "-3%",
          top: "5%",
          width: "32%",
          height: "92%",
          background:
            "radial-gradient(ellipse at 8% 78%, rgba(0,215,255,0.20) 0%, transparent 68%)",
          filter: "blur(72px)",
        }}
      />
      {}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "-2%",
          bottom: "0%",
          width: "25%",
          height: "40%",
          background:
            "radial-gradient(ellipse at 12% 85%, rgba(0,195,235,0.16) 0%, transparent 55%)",
          filter: "blur(50px)",
        }}
      />

      {}
      <div
        className="absolute pointer-events-none"
        style={{
          right: "-3%",
          top: "5%",
          width: "32%",
          height: "92%",
          background:
            "radial-gradient(ellipse at 92% 78%, rgba(255,10,165,0.20) 0%, transparent 68%)",
          filter: "blur(72px)",
        }}
      />
      {}
      <div
        className="absolute pointer-events-none"
        style={{
          right: "-2%",
          bottom: "0%",
          width: "25%",
          height: "40%",
          background:
            "radial-gradient(ellipse at 88% 85%, rgba(215,0,170,0.16) 0%, transparent 55%)",
          filter: "blur(50px)",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
});

ParticleBackground.displayName = "ParticleBackground";
