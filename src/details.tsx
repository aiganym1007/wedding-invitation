import gis from "/gis.png";
const STYLES = `@keyframes floatBobFlower {
  0%,100% { transform: translateY(0px); }
  50%     { transform: translateY(-14px); }
}
.ko-flower-left {
  animation: floatBobFlower 4s ease-in-out infinite;
    animation-delay: 2s;

}
.ko-flower-right {
  animation: floatBobFlower 4s ease-in-out infinite;
  animation-delay: 2s;
}`;
interface DetailsProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

const GIS_URL = "https://2gis.kz/astana/geo/70000001042727082";

export default function DetailsSection({ sectionRef }: DetailsProps) {
  return (
    <>
      <style>{STYLES}</style>
      <div
        ref={sectionRef}
        className="section"
        style={{
          textAlign: "center",
          position: "relative",
          minHeight: "100vh",
          // zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 24px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <h2
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(32px,5vw,52px)",
            fontWeight: 300,
            color: "#3D2012",
            margin: "0 0 32px",
            fontStyle: "italic",
          }}
        >
          Өтетін орны
        </h2>

        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 480,
            margin: "0 auto",
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid #E8D5A0",
            boxShadow: "0 8px 32px rgba(61,32,18,0.12)",
            cursor: "pointer",
            zIndex: 2,
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform =
              "translateY(-3px)";
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              "0 16px 40px rgba(61,32,18,0.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform =
              "translateY(0)";
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              "0 8px 32px rgba(61,32,18,0.12)";
          }}
        >
          <a
            href={GIS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <img
              src={gis}
              style={{
                border: "none",
                display: "block",
                pointerEvents: "none",
                width: "100%",
              }}
              title="map"
            />
            <div
              style={{
                background: "rgba(253,246,236,0.97)",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div style={{ textAlign: "left" }}>
                <p
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 9,
                    letterSpacing: "0.25em",
                    color: "#A89060",
                    textTransform: "uppercase",
                    margin: "0 0 6px",
                  }}
                >
                  Орналасқан жері
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#3D2012",
                    margin: "0 0 4px",
                    lineHeight: 1.2,
                  }}
                >
                  Grand Festival мейрамханасы
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#7A6245",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  пр. Достык, 4 · Астана
                </p>
              </div>
              <div
                style={{
                  background: "#A89060",
                  borderRadius: 8,
                  padding: "8px 14px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 20,
                    fontFamily: "'Jost',sans-serif",
                    color: "#fff",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                  }}
                >
                  2GIS ↗
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
