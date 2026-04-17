import { useState, useEffect, useRef, useMemo } from "react";
import Introduction, { ScreenHeight } from "./introduction";
import InvitationSection from "./letter";
import Details from "./details";
import Form from "./form";
import Schedule from "./schedule";
import Tore from "./assets/image-Photoroom.png";
import OldPaper from "./assets/image.png";
const FONTS = `
@keyframes floatUpRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.element {
  animation: floatUpRotate 5s linear infinite;
  transform-origin: center center;
}
.bg-wrapper {
  position: relative;
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
.bg-wrapper > * {
  position: relative;
  z-index: 1;
}
`;
function NavDots({
  current,
  total,
  onNav,
}: {
  current: number;
  total: number;
  onNav: (i: number) => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        zIndex: 100,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onNav(i)}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            border: `1px solid ${"#B8973C"}`,
            background: i === current ? "#B8973C" : "transparent",
            cursor: "pointer",
            padding: 0,
            transition: "all .3s",
          }}
        />
      ))}
    </div>
  );
}

export default function WeddingInvitation() {
  const introductionRefs = useRef<HTMLDivElement | null>(null);
  const closingRefs = useRef<HTMLDivElement | null>(null);
  const inviteRefs = useRef<HTMLDivElement | null>(null);
  const detailsRefs = useRef<HTMLDivElement | null>(null);
  const formRefs = useRef<HTMLDivElement | null>(null);
  const dressCode = useRef<HTMLDivElement | null>(null);
  const schedule = useRef<HTMLDivElement | null>(null);

  const refs = useMemo(
    () => [
      introductionRefs,
      inviteRefs,
      schedule,
      dressCode,
      detailsRefs,
      formRefs,
      closingRefs,
    ],
    [],
  );
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = refs.findIndex((r) => r.current === e.target);
            if (i >= 0) setCurrent(i);
          }
        });
      },
      { threshold: 0.5 },
    );
    refs.forEach((r) => r.current && obs.observe(r.current));
    return () => obs.disconnect();
  }, []);

  const navTo = (i: number) =>
    refs[i].current?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {isMobile ? (
        <>
          <style>{FONTS}</style>
          <div
            className="bg-wrapper"
            style={{
              overflowX: "hidden",
              overflowY: "hidden",
              fontFamily: "'Cormorant Garamond',serif",
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, #FDF6EC 0%, #f1e3d2 100%)",
            }}
          >
            <img
              src={OldPaper}
              alt="Old Paper"
              style={{
                position: "fixed",
                height: "100%",
                opacity: 0.4,
                marginBottom: -ScreenHeight(30),
                zIndex: 1,
              }}
            />
            <NavDots current={current} total={5} onNav={navTo} />
            <Introduction sectionRef={introductionRefs} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={Tore}
                style={{
                  marginTop: ScreenHeight(7),
                  height: ScreenHeight(20),
                  opacity: 0.6,
                }}
              />
            </div>
            <InvitationSection sectionRef={inviteRefs} />
            <Schedule sectionRef={schedule} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={Tore}
                style={{
                  height: ScreenHeight(20),
                  opacity: 0.6,
                  zIndex: 100,
                }}
              />
            </div>
            <div ref={dressCode}>
              <p
                style={{
                  marginTop: ScreenHeight(20),
                  marginBottom: -ScreenHeight(5),
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(25px,2.5vw,22px)",
                  lineHeight: 1.95,
                  color: "#B8973C",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Киім үлгісі:
              </p>
              <p
                style={{
                  textAlign: "center",
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(25px,1.5vw,22px)",
                  lineHeight: 1.95,
                  color: "#7d6b48",
                  fontWeight: "bold",
                  marginBottom: ScreenHeight(25),
                }}
              >
                ұлттық нақыштағы киім құпталады{" "}
              </p>
            </div>

            <Details sectionRef={detailsRefs} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={Tore}
                style={{
                  height: ScreenHeight(20),
                  opacity: 0.6,
                  zIndex: 100,
                }}
              />
            </div>
            <Form sectionRef={formRefs} />

            <Introduction closing={true} sectionRef={closingRefs} />
          </div>
        </>
      ) : (
        <>
          <style>{FONTS}</style>
          <div
            className="bg-wrapper"
            style={{
              overflowX: "hidden",
              overflowY: "hidden",
              fontFamily: "'Cormorant Garamond',serif",
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, #FDF6EC 0%, #f1e3d2 100%)",
            }}
          >
            <img
              src={OldPaper}
              alt="Old Paper"
              style={{
                position: "fixed",
                height: "100%",
                width: "100%",
                opacity: 0.4,
                marginBottom: -ScreenHeight(30),
                zIndex: 1,
              }}
            />
            <NavDots current={current} total={5} onNav={navTo} />
            <Introduction sectionRef={introductionRefs} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={Tore}
                style={{
                  marginTop: ScreenHeight(7),
                  height: ScreenHeight(20),
                  opacity: 0.6,
                }}
              />
            </div>
            <InvitationSection sectionRef={inviteRefs} />
            <Schedule sectionRef={schedule} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={Tore}
                style={{
                  height: ScreenHeight(20),
                  opacity: 0.6,
                  zIndex: 100,
                }}
              />
            </div>
            <div ref={dressCode}>
              <p
                style={{
                  marginTop: ScreenHeight(20),
                  marginBottom: -ScreenHeight(5),
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(25px,2.5vw,22px)",
                  lineHeight: 1.95,
                  color: "#B8973C",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Киім үлгісі:
              </p>
              <p
                style={{
                  textAlign: "center",
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(25px,1.5vw,22px)",
                  lineHeight: 1.95,
                  color: "#3D2012",
                  fontWeight: "bold",
                  marginBottom: ScreenHeight(25),
                }}
              >
                ұлттық нақыштағы киім құпталады{" "}
              </p>
            </div>

            <Details sectionRef={detailsRefs} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={Tore}
                style={{
                  height: ScreenHeight(20),
                  opacity: 0.6,
                  zIndex: 100,
                }}
              />
            </div>
            <Form sectionRef={formRefs} />

            <Introduction closing={true} sectionRef={closingRefs} />
          </div>
        </>
      )}
    </>
  );
}
