interface InvitationSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}
export default function InvitationSection({
  sectionRef,
}: InvitationSectionProps) {
  return (
    <div
      ref={sectionRef}
      className="section"
      style={{
        overflow: "visible",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "64px 24px",
        boxSizing: "border-box",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div style={{ width: "100%", maxWidth: 640, margin: "0 auto" }}>
        <p
          style={{
            fontSize: 23,
            color: "#B8973C",
            textTransform: "uppercase",
            fontStyle: "italic",
            fontWeight: "bold",
            fontFamily: "'Cormorant Garamond',serif",
          }}
        >
          Құрметті қонақтар!
        </p>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(25px,2.5vw,22px)",
              lineHeight: 1.95,
              color: "#7d6b48",
              fontWeight: 600,
            }}
          >
            Сіздерді аяулы қызымыз{" "}
            <span style={{ fontStyle: "italic" }}> Ақботаның </span> ұзату
            тойына арналған ақ дастарханымыздың ардақты қонағы болып,
            қуанышымызды бөлісуге шақырамыз
          </p>
        </div>

        <div
          style={{
            display: "inline-block",
            padding: "16px 40px",
            position: "relative",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 28,
              fontStyle: "italic",
              color: "#B8973C",
              margin: 0,
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            Сіздерді асыға күтеміз
          </p>
        </div>
      </div>
    </div>
  );
}
