import { useRef, useEffect, useId } from "react";
import type { CSSProperties } from "react";
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&display=swap');
 
  @keyframes petalFall {
    0%   { transform: translateY(-60px) translateX(0px) rotate(0deg) scale(1);    opacity: 0; }
    8%   { opacity: 0.85; }
    80%  { opacity: 0.6; }
    100% { transform: translateY(110vh) translateX(var(--drift,40px)) rotate(var(--spin,360deg)) scale(0.7); opacity: 0; }
  }
  @keyframes petalSway {
    0%,100% { margin-left: 0; }
    50%     { margin-left: var(--sway, 18px); }
  }
  @keyframes bloomIn {
    0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
    60%  { transform: scale(1.12) rotate(4deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  @keyframes petalspin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes floralPulse {
    0%, 100% { transform: scale(1);    opacity: 0.85; }
    50%      { transform: scale(1.04); opacity: 1; }
  }
  @keyframes shimmerGold {
    0%   { stop-color: #C9A84C; }
    50%  { stop-color: #F2D27A; }
    100% { stop-color: #C9A84C; }
  }
  @keyframes borderFlow {
    0%   { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: -200; }
  }
  @keyframes leafWave {
    0%,100% { transform: rotate(-6deg) scale(1); }
    50%     { transform: rotate(6deg) scale(1.05); }
  }
  @keyframes floatBob {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-6px); }
  }
  @keyframes kazakhSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes starPop {
    0%   { transform: scale(0) rotate(0deg);   opacity: 0; }
    60%  { transform: scale(1.2) rotate(180deg); opacity: 1; }
    100% { transform: scale(1) rotate(360deg);  opacity: 1; }
  }
  @keyframes dividerGlow {
    0%,100% { opacity: 0.6; }
    50%     { opacity: 1; }
  }
  @keyframes burstIn {
    0%   { transform: scale(0); opacity: 0; }
    70%  { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
.ko-golden {
  font-size: 6rem;         
  font-family: 'Cinzel', serif;
  fill: #B8973C;          
}
  .ko-petal {
    position: absolute;
    top: -60px;
    pointer-events: none;
    animation: petalFall linear infinite, petalSway ease-in-out infinite;
    will-change: transform;
  }
  .ko-bloom { animation: bloomIn .8s cubic-bezier(.34,1.56,.64,1) forwards; }
  .ko-float { animation: floatBob 3s ease-in-out infinite; }
  .ko-pulse { animation: floralPulse 4s ease-in-out infinite; }
  .ko-leafwave { animation: leafWave 3.5s ease-in-out infinite; }
  .ko-starpop { animation: starPop .7s cubic-bezier(.34,1.56,.64,1) forwards; }
`;
function injectStyles() {
  if (document.getElementById("ko-styles")) return;

  const s = document.createElement("style");
  s.id = "ko-styles";
  s.textContent = STYLES;
  document.head.appendChild(s);
}

const PETAL_SHAPES = [
  // Rose petal
  ({ color }: { color: string }) => (
    <svg width="14" height="18" viewBox="0 0 14 18">
      <path
        d="M7 1 Q13 5 12 11 Q10 17 7 17 Q4 17 2 11 Q1 5 7 1Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M7 2 Q7 9 7 17"
        stroke="white"
        strokeWidth="0.4"
        opacity="0.4"
        fill="none"
      />
    </svg>
  ),
  // Sakura petal
  ({ color }: { color: string }) => (
    <svg width="16" height="14" viewBox="0 0 16 14">
      <path
        d="M8 1 Q14 2 14 7 Q14 12 8 13 Q2 12 2 7 Q2 2 8 1Z"
        fill={color}
        opacity="0.8"
      />
      <path
        d="M8 1 Q8 7 8 13"
        stroke="white"
        strokeWidth="0.3"
        opacity="0.5"
        fill="none"
      />
      <path
        d="M2 7 Q8 6 14 7"
        stroke="white"
        strokeWidth="0.3"
        opacity="0.3"
        fill="none"
      />
    </svg>
  ),
  // Tulip petal (Kazakh symbol)
  ({ color }: { color: string }) => (
    <svg width="12" height="20" viewBox="0 0 12 20">
      <path
        d="M6 1 Q11 4 10 10 Q9 16 6 19 Q3 16 2 10 Q1 4 6 1Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M6 3 Q6 10 6 18"
        stroke="white"
        strokeWidth="0.5"
        opacity="0.4"
        fill="none"
      />
    </svg>
  ),
];

const PETAL_COLORS = [
  "#E8D0A0",
  "#F5C8C0",
  "#F0D9B5",
  "#DFC4A8",
  "#FAEAD0",
  "#E8B8A0",
  "#F2D9C4",
];

export default function FallingPetals({ count = 24 }) {
  useEffect(() => {
    injectStyles();
  }, []);

  const petals = Array.from({ length: count }, (_, i) => {
    const ShapeComp = PETAL_SHAPES[i % PETAL_SHAPES.length];
    const color = PETAL_COLORS[i % PETAL_COLORS.length];
    const left = `${3 + (i / count) * 94}%`;
    const delay = `${(i * 0.71) % 14}s`;
    const duration = `${10 + ((i * 1.3) % 14)}s`;
    const drift = `${-30 + (i % 5) * 18}px`;
    const spin = `${180 + (i % 3) * 90}deg`;
    const sway = `${8 + (i % 4) * 7}px`;
    const swayDur = `${3 + (i % 4)}s`;

    const style: CSSProperties & Record<string, string> = {
      left,
      animationDelay: delay,
      animationDuration: `${duration}, ${swayDur}`,
      "--drift": drift,
      "--spin": spin,
      "--sway": sway,
    };

    return (
      <span key={i} className="ko-petal" style={style}>
        <ShapeComp color={color} />
      </span>
    );
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9,
        overflow: "hidden",
      }}
    >
      {petals}
    </div>
  );
}

interface CurvedLoopProps {
  imageSrc: string;
  imageWidth?: number;
  imageHeight?: number;
  count?: number;
  gap: number;
  speed?: number;
  curveAmount?: number;
  direction?: "left" | "right";
}

export const CurvedLoop = ({
  imageSrc,
  imageWidth = 60,
  imageHeight = 60,
  gap,
  count = 12,
  speed = 1,
  curveAmount = 300,
  direction = "left",
}: CurvedLoopProps) => {
  const uid = useId();
  const pathId = `curve-${uid}`;
  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  const totalPathLength = 1800;
  const spacing = imageWidth + gap;

  const offsetRef = useRef(0);
  const frameRef = useRef(0);
  const imagesRef = useRef<SVGImageElement[]>([]);

  useEffect(() => {
    const step = () => {
      offsetRef.current += direction === "right" ? speed : -speed;

      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        let pos = (offsetRef.current + i * spacing) % totalPathLength;
        if (pos < 0) pos += totalPathLength;
        img.setAttribute("data-offset", String(pos));
      });

      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [speed, direction, spacing]);

  return (
    <svg
      style={{ overflow: "visible", display: "block", width: "100%" }}
      viewBox="0 0 1440 300"
    >
      <defs>
        <path id={pathId} d={pathD} fill="none" />
      </defs>

      {Array.from({ length: count }).map((_, i) => (
        <AnimatedImageOnPath
          key={i}
          pathId={pathId}
          imageSrc={imageSrc}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
          initialOffset={(i * spacing) % totalPathLength}
          speed={speed}
          direction={direction}
          spacing={spacing}
          totalPathLength={totalPathLength}
        />
      ))}
    </svg>
  );
};

function AnimatedImageOnPath({
  pathId,
  imageSrc,
  imageWidth,
  imageHeight,
  initialOffset,
  speed,
  direction,
}: {
  pathId: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  initialOffset: number;
  speed: number;
  direction: "left" | "right";
  spacing: number;
  totalPathLength: number;
}) {
  const imgRef = useRef<SVGImageElement>(null);
  const offsetRef = useRef(initialOffset);
  const frameRef = useRef(0);

  useEffect(() => {
    const pathEl = document.getElementById(pathId) as SVGPathElement | null;
    if (!pathEl) return;

    const pathLength = pathEl.getTotalLength();

    const step = () => {
      offsetRef.current += direction === "right" ? speed : -speed;

      let t = offsetRef.current % pathLength;
      if (t < 0) t += pathLength;

      const point = pathEl.getPointAtLength(t);

      const delta = 2;
      const p1 = pathEl.getPointAtLength(Math.max(0, t - delta));
      const p2 = pathEl.getPointAtLength(Math.min(pathLength, t + delta));
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

      if (imgRef.current) {
        imgRef.current.setAttribute(
          "transform",
          `translate(${point.x - imageWidth / 2}, ${point.y - imageHeight / 2}) rotate(${angle}, ${imageWidth / 2}, ${imageHeight / 2})`,
        );
      }

      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [pathId, speed, direction, imageWidth, imageHeight]);

  return (
    <image
      ref={imgRef}
      href={imageSrc}
      width={imageWidth}
      height={imageHeight}
    />
  );
}
