import Decor from "./decor";
import { useEffect, useState } from "react";
import Visit from "./assets/visit.png";
export function ScreenHeight(percent: number) {
  return (window.innerHeight * percent) / 100;
}
export function ScreenWidth(percent: number) {
  return (window.innerWidth * percent) / 100;
}

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
@keyframes floatBobFlower {
  0%,100% { transform: translateY(0px); }
  50%     { transform: translateY(-14px); }
}
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes shimmerLine {
    0%   { opacity: 0.3; transform: scaleY(0.4); }
    50%  { opacity: 1;   transform: scaleY(1); }
    100% { opacity: 0.3; transform: scaleY(0.4); }
  }
  @keyframes goldPulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 1; }
  }
  @keyframes floatUp {
    0%   { transform: translateY(0)   translateX(0)   rotate(0deg);   opacity: 0; }
    10%  { opacity: 0.6; }
    90%  { opacity: 0.3; }
    100% { transform: translateY(-80vh) translateX(20px) rotate(180deg); opacity: 0; }
  }
@keyframes floatUpRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.element {
  animation: floatUpRotate 5s linear infinite;
  transform-origin: center center;
}
  .wi-eyebrow {
    font-family: 'Cinzel', serif;
    font-size: clamp(9px, 1.1vw, 11px);
    letter-spacing: .35em;
    color: #B8943A;
    text-transform: uppercase;
    animation: fadeUp .9s ease forwards;
    animation-delay: .2s;
    opacity: 0;
  }
  .wi-names {
    font-family: 'Great Vibes', cursive;
    font-size: clamp(64px, 11vw, 128px);
    color: #e3b10e;
    line-height: 1.05;
    animation: fadeUp 1.1s ease forwards;
    animation-delay: .55s;
    opacity: 0;
    text-shadow: 0 0 80px rgba(185,148,58,.18);
  }
  .wi-subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(10px, 9vw, 128px);
    color: #b09551;
    line-height: 1.05;
        font-style: italic;
    animation: fadeUp 1.1s ease forwards;
    animation-delay: .55s;
    opacity: 0;
    text-shadow: 0 0 80px rgba(185,148,58,.18);
  }
  .wi-subtitle2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(10px, 5vw, 128px);
    color: #b09551;
    line-height: 1.05;
        font-style: italic;
    animation: fadeUp 1.1s ease forwards;
    animation-delay: .55s;
    opacity: 0;
    text-shadow: 0 0 80px rgba(185,148,58,.18);
  }
  .wi-ampersand {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: clamp(28px, 4vw, 48px);
    color: #B8943A;
    margin: 0 .5rem;
    animation: fadeUp 1.1s ease forwards;
    animation-delay: .7s;
    opacity: 0;
  }
  .wi-date {
    font-family: 'Cinzel', serif;
    font-size: clamp(11px, 1.4vw, 14px);
    letter-spacing: .3em;
    color: #C4A95A;
    animation: fadeUp .9s ease forwards;
    animation-delay: 1s;
    opacity: 0;
  }
  .wi-scroll-hint {
    font-family: 'Cinzel', serif;
    font-size: 9px;
    letter-spacing: .4em;
    color: #7A6535;
    text-transform: uppercase;
    animation: fadeIn 1s ease forwards;
    animation-delay: 1.6s;
    opacity: 0;
  }
  .wi-line-anim {
    animation: shimmerLine 2.4s ease-in-out infinite;
    animation-delay: 1.8s;
  }
  .wi-ornament {
    animation: fadeIn 1.4s ease forwards;
    animation-delay: .9s;
    opacity: 0;
  }
  .wi-verse {
    font-family: 'Cinzel', serif;
    font-size: 20px;
    letter-spacing: .3em;
    color: #6B5A3A;
    text-transform: uppercase;
    animation: fadeUp .9s ease forwards;
    animation-delay: 1.3s;
    opacity: 0;
  }
  .wi-particle {
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: #a78834;
    pointer-events: none;
    animation: floatUp linear infinite;
    opacity: 0;
  }
  .flower {
    animation: fadeUp .9s ease forwards;
     animation: floatBobFlower 4s ease-in-out infinite;
    animation-delay: 2s;
  }
    .bg-wrapper::before {
  content: '';
  position: fixed;
  inset: 0;
  background: url('/assets/image.png') center/cover no-repeat;
  opacity: 0.18;
  pointer-events: none;
  z-index: 0;
}
`;

const OrnamentDivider = () => (
  <svg
    width="320"
    height="24"
    viewBox="0 0 320 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="wi-ornament"
  >
    <line x1="0" y1="12" x2="132" y2="12" stroke="#5C4A25" strokeWidth="0.5" />
    <path d="M138 12 L143 7 L148 12 L143 17 Z" fill="#B8943A" opacity=".7" />
    <path d="M150 12 L155 7 L160 12 L155 17 Z" fill="#C9A84C" opacity=".9" />
    <path d="M162 12 L167 7 L172 12 L167 17 Z" fill="#B8943A" opacity=".7" />
    <path d="M174 12 L179 7 L184 12 L179 17 Z" fill="#8B7340" opacity=".5" />
    <line
      x1="188"
      y1="12"
      x2="320"
      y2="12"
      stroke="#5C4A25"
      strokeWidth="0.5"
    />
  </svg>
);

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + Math.random() * 90}%`,
  delay: `${Math.random() * 12}s`,
  duration: `${10 + Math.random() * 16}s`,
  size: Math.random() > 1 ? 3 : 2,
}));

interface IntroductionProps {
  closing?: boolean;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

export default function Introduction({
  closing = false,
  sectionRef,
}: IntroductionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <>
      {isMobile ? (
        <>
          <Decor />
          <style>{FONTS}</style>
          <img
            src={Visit}
            alt="Visit"
            style={{
              height: ScreenHeight(40),
              marginBottom: -ScreenHeight(30),
              zIndex: 100,
              position: "fixed",
            }}
          />
          <img
            src={Visit}
            alt="Visit"
            style={{
              height: ScreenHeight(40),
              right: ScreenWidth(1),
              marginBottom: -ScreenHeight(30),
              zIndex: 100,
              position: "fixed",
            }}
          />
          <img
            src={Visit}
            alt="Visit"
            style={{
              height: ScreenHeight(25),
              marginBottom: -ScreenHeight(15),
              zIndex: 100,
              left: ScreenWidth(22),
              position: "fixed",
            }}
          />
          <img
            src={Visit}
            alt="Visit"
            style={{
              position: "fixed",
              height: ScreenHeight(25),
              right: ScreenWidth(22),
              marginBottom: -ScreenHeight(30),
              zIndex: 100,
            }}
          />
          <div
            ref={sectionRef}
            className="bg-wrapper"
            style={{
              marginTop: -ScreenHeight(10),
              position: "relative",
              width: "100%",
              minHeight: "100vh",
              overflowY: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            {PARTICLES.map((p) => (
              <span
                key={p.id}
                className="wi-particle"
                style={{
                  left: p.left,
                  bottom: "-4px",
                  width: p.size,
                  height: p.size,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                }}
              />
            ))}
            <div
              style={{
                marginTop: closing ? ScreenHeight(10) : ScreenHeight(40),
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
              }}
            >
              <p className="wi-eyebrow" style={{ marginBottom: 0 }}>
                {closing ? "Махаббат пен ризашылықпен" : ""}
              </p>
              <OrnamentDivider />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  zIndex: 1,
                  gap: "0.3rem 0",
                  lineHeight: 1,
                }}
              >
                <span className="wi-names">Aqbota</span>

                <span className="wi-names">Qyz Ūzatu</span>
              </div>
              <OrnamentDivider />
              <span
                style={{
                  marginTop: ScreenHeight(10),
                  marginBottom: ScreenHeight(15),
                }}
                className="wi-subtitle"
              >
                Той иесі: Берік пен Алима
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <Decor />
          <style>{FONTS}</style>
          <img
            src={Visit}
            alt="Visit"
            style={{
              height: ScreenHeight(40),
              marginBottom: -ScreenHeight(30),
              zIndex: 100,
              position: "fixed",
            }}
          />
          <img
            src={Visit}
            alt="Visit"
            style={{
              height: ScreenHeight(40),
              right: ScreenWidth(1),
              marginBottom: -ScreenHeight(30),
              zIndex: 100,
              position: "fixed",
            }}
          />
          <img
            src={Visit}
            alt="Visit"
            style={{
              height: ScreenHeight(25),
              marginBottom: -ScreenHeight(15),
              zIndex: 100,
              left: ScreenWidth(22),
              position: "fixed",
            }}
          />
          <img
            src={Visit}
            alt="Visit"
            style={{
              position: "fixed",
              height: ScreenHeight(25),
              right: ScreenWidth(22),
              marginBottom: -ScreenHeight(30),
              zIndex: 100,
            }}
          />
          <div
            ref={sectionRef}
            className="bg-wrapper"
            style={{
              marginTop: -ScreenHeight(10),
              position: "relative",
              width: "100%",
              minHeight: "100vh",
              overflowY: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            {PARTICLES.map((p) => (
              <span
                key={p.id}
                className="wi-particle"
                style={{
                  left: p.left,
                  bottom: "-4px",
                  width: p.size,
                  height: p.size,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                }}
              />
            ))}
            <div
              style={{
                marginTop: closing ? ScreenHeight(10) : ScreenHeight(40),
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
              }}
            >
              <p className="wi-eyebrow" style={{ marginBottom: 0 }}>
                {closing ? "Махаббат пен ризашылықпен" : ""}
              </p>
              <OrnamentDivider />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  zIndex: 1,
                  gap: "0.3rem 0",
                  lineHeight: 1,
                }}
              >
                <span className="wi-names">Aqbota</span>

                <span className="wi-names">Qyz Ūzatu</span>
              </div>
              <OrnamentDivider />
              <span
                style={{
                  marginTop: ScreenHeight(10),
                  marginBottom: ScreenHeight(15),
                }}
                className="wi-subtitle2"
              >
                Той иесі: Берік пен Алима
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
