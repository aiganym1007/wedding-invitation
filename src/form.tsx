import { useState, useEffect } from "react";
import { ScreenWidth } from "./introduction";
const STYLES = `@keyframes floatBobFlower {
  0%,100% { transform: translateY(0px); }
  50%     { transform: translateY(-14px); }
}
.ko-flower-left {
  animation: floatBobFlower 4s ease-in-out infinite;
}
.ko-flower-right {
  animation: floatBobFlower 4s ease-in-out infinite;
  animation-delay: 2s;
}`;
interface FromsProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}
export default function Form({ sectionRef }: FromsProps) {
  const [form, setForm] = useState({
    name: "",
    attend: "yes",
    guests: "0",
    meal: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});

  const set = (k: keyof typeof form, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof typeof form, string>> = {};
    if (!form.name.trim()) newErrors.name = "Атыңызды енгізіңіз";
    if (!form.message.trim()) newErrors.message = "Тілегіңізді жазыңыз";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setStatus("loading");

    try {
      const res = await fetch("https://formspree.io/f/mwvwajkj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          willAttend: form.attend === "yes" ? "Придёт" : "Не придёт",
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const fieldStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "12px 14px",
    border: `1px solid ${hasError ? "#b03030" : "#E8D5A0"}`,
    background: "rgba(255,255,255)",
    fontSize: 15,
    color: "#3D2012",
    boxSizing: "border-box",
    fontFamily: "'Jost',sans-serif",
    fontWeight: 300,
  });

  const labelStyle = {
    fontFamily: "'Jost',sans-serif",
    fontSize: 10,
    letterSpacing: "0.2em",
    color: "#B8973C",
    textTransform: "uppercase",
    display: "block",
    marginBottom: 6,
  };

  const errorStyle: React.CSSProperties = {
    fontFamily: "'Jost',sans-serif",
    fontSize: 12,
    color: "#b03030",
    marginTop: 4,
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  if (!isMobile) return null;
  return (
    <>
      {isMobile && (
        <>
          <style>{STYLES}</style>

          <div
            ref={sectionRef}
            className="section"
            style={{
              position: "relative",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              zIndex: 10,
              padding: "64px 24px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(30px,5vw,50px)",
                  fontWeight: 300,
                  color: "#3D2012",
                  margin: "0 0 8px",
                  alignContent: "center",
                  justifyContent: "center",
                  fontStyle: "italic",
                }}
              >
                Келесіз бе?
              </h2>
            </div>

            {status === "success" ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "48px 32px",
                  border: `1px solid #E8D5A0`,
                  background: "rgba(255,255,255)",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    border: `1px solid #B8973C`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontSize: 22,
                    color: "#B8973C",
                  }}
                >
                  ✓
                </div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 26,
                    fontStyle: "italic",
                    color: "#3D2012",
                    margin: "0 0 8px",
                  }}
                >
                  Спасибо!
                </p>
                <p
                  style={{
                    fontFamily: "'Jost',sans-serif",
                    fontSize: 14,
                    color: "#7A6245",
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {form.attend === "yes"
                    ? "Біз сіздермен кездесуді асыға күтеміз!"
                    : "Өкінішті, сіз келе алмайсыз. Біз скучно боламыз."}
                </p>
              </div>
            ) : (
              <div
                style={{
                  border: `1px solid #E8D5A0`,
                  background: "#fffbf7",
                  padding: "36px 32px",
                  boxSizing: "border-box",
                  alignContent: "center",
                  width: ScreenWidth(80),
                }}
              >
                {/* Имя */}
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Сіздің атыңыз *</label>
                  <input
                    style={fieldStyle(!!errors.name)}
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Аты - жөнізді жазыңыз"
                  />
                  {errors.name && <p style={errorStyle}>{errors.name}</p>}
                </div>

                {/* Посещение */}
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Растау *</label>
                  <div style={{ display: "flex", gap: 12 }}>
                    {[
                      ["yes", "✓ Мен қуанышпен келемін"],
                      ["no", "✗  Келе алмаймын"],
                    ].map(([v, l]) => (
                      <button
                        key={v}
                        onClick={() => set("attend", v)}
                        style={{
                          flex: 1,
                          padding: "12px 8px",
                          border: `1px solid ${form.attend === v ? "#B8973C" : "#E8D5A0"}`,
                          background:
                            form.attend === v ? "#B8973C" : "rgba(255,255,255)",
                          color: form.attend === v ? "white" : "#7A6245",
                          fontFamily: "'Jost',sans-serif",
                          fontSize: 13,
                          cursor: "pointer",
                          letterSpacing: "0.05em",
                          transition: "all .25s",
                        }}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Пожелание */}
                <div style={{ marginBottom: 28 }}>
                  <label style={labelStyle}>Тілек *</label>
                  <textarea
                    style={{
                      ...fieldStyle(!!errors.message),
                      resize: "vertical",
                      minHeight: 80,
                    }}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Тілек немесе құттықтау..."
                  />
                  {errors.message && <p style={errorStyle}>{errors.message}</p>}
                </div>

                {status === "error" && (
                  <p
                    style={{
                      fontFamily: "'Jost',sans-serif",
                      fontSize: 13,
                      color: "#b03030",
                      textAlign: "center",
                      marginBottom: 16,
                    }}
                  >
                    Ошибка отправки. Проверьте подключение к серверу.
                  </p>
                )}

                <div style={{ textAlign: "center" }}>
                  <button
                    style={{
                      background: "#B8973C",
                      color: "white",
                      border: "none",
                      padding: "14px 48px",
                      fontFamily: "'Jost',sans-serif",
                      fontSize: 14,
                      letterSpacing: ".15em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "all .3s",
                    }}
                    onClick={submit}
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Жіберулуі..." : "Жіберу"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
