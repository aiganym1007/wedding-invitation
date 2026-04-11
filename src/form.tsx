import { useState, useEffect } from "react";

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
    fontSize: "clamp(13px, 3.5vw, 16px)",
    color: "#3D2012",
    boxSizing: "border-box",
    fontFamily: "'Jost',sans-serif",
    fontWeight: 300,
    borderRadius: 0,
    outline: "none",
  });

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Jost',sans-serif",
    fontSize: "clamp(9px, 2.5vw, 11px)",
    letterSpacing: "0.2em",
    color: "#B8973C",
    textTransform: "uppercase",
    display: "block",
    marginBottom: 6,
  };

  const errorStyle: React.CSSProperties = {
    fontFamily: "'Jost',sans-serif",
    fontSize: "clamp(11px, 3vw, 13px)",
    color: "#b03030",
    marginTop: 4,
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  if (!isMobile) return null;

  return (
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
          alignItems: "center", // ← центрирование по горизонтали
          zIndex: 10,
          padding: "64px 0",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {/* Заголовок */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 36,
            width: "100%",
            padding: "0 24px",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(28px, 7vw, 50px)",
              fontWeight: 300,
              color: "#3D2012",
              margin: "0 0 8px",
              fontStyle: "italic",
            }}
          >
            Келесіз бе?
          </h2>
        </div>

        {/* Контейнер формы — занимает всю ширину минус отступы */}
        <div
          style={{
            width: "100%",
            maxWidth: 480, // ← не растягивается на планшетах
            padding: "0 16px", // ← боковые отступы адаптивные
            boxSizing: "border-box",
          }}
        >
          {status === "success" ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 24px",
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
                  fontSize: "clamp(22px, 6vw, 28px)",
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
                  fontSize: "clamp(13px, 3.5vw, 15px)",
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
                padding: "clamp(20px, 5vw, 40px) clamp(16px, 5vw, 32px)", // ← адаптивный padding
                boxSizing: "border-box",
                width: "100%",
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
                <div style={{ display: "flex", gap: 10 }}>
                  {[
                    ["yes", "✓ Мен қуанышпен келемін"],
                    ["no", "✗  Келе алмаймын"],
                  ].map(([v, l]) => (
                    <button
                      key={v}
                      onClick={() => set("attend", v)}
                      style={{
                        flex: 1,
                        padding: "12px 6px",
                        border: `1px solid ${form.attend === v ? "#B8973C" : "#E8D5A0"}`,
                        background:
                          form.attend === v ? "#B8973C" : "rgba(255,255,255)",
                        color: form.attend === v ? "white" : "#7A6245",
                        fontFamily: "'Jost',sans-serif",
                        fontSize: "clamp(11px, 3vw, 13px)",
                        cursor: "pointer",
                        letterSpacing: "0.05em",
                        transition: "all .25s",
                        lineHeight: 1.4,
                        minHeight: 48, // ← удобно нажимать на маленьких экранах
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
                    fontSize: "clamp(12px, 3vw, 14px)",
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
                    padding: "14px clamp(32px, 10vw, 48px)",
                    fontFamily: "'Jost',sans-serif",
                    fontSize: "clamp(12px, 3.5vw, 14px)",
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all .3s",
                    minWidth: "60%", // ← кнопка не слишком узкая
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
      </div>
    </>
  );
}
