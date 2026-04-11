export default function CornerOrnament({ flip = false }) {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      style={{
        position: "absolute",
        top: flip ? "auto" : 24,
        bottom: flip ? 24 : "auto",
        left: flip ? "auto" : 24,
        right: flip ? 24 : "auto",
        transform: flip ? "rotate(180deg)" : "none",
        opacity: 0.35,
      }}
      className="wi-ornament"
    >
      <path
        d="M8 8 L8 60"
        stroke="#C9A84C"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <path
        d="M8 8 L60 8"
        stroke="#C9A84C"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <path
        d="M8 8 Q30 8 30 30"
        stroke="#C9A84C"
        strokeWidth="0.5"
        fill="none"
      />
      <path
        d="M8 8 Q8 30 30 30"
        stroke="#C9A84C"
        strokeWidth="0.5"
        fill="none"
      />
      <circle cx="8" cy="8" r="2" fill="#C9A84C" />
      <circle cx="30" cy="30" r="1.5" fill="#C9A84C" opacity=".6" />
      <path d="M14 8 L14 22" stroke="#C9A84C" strokeWidth="0.3" opacity=".5" />
      <path d="M8 14 L22 14" stroke="#C9A84C" strokeWidth="0.3" opacity=".5" />
    </svg>
  );
}
