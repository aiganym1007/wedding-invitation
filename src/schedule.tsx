import { ScreenWidth } from "./introduction";
interface DetailsProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}
export default function WeddingSchedule({ sectionRef }: DetailsProps) {
  const schedule = [
    {
      time: "16:30",
      lines: ["ҚОНАҚТАРДЫҢ", "ЖИНАЛУЫ"],
      cx: ScreenWidth(13),
      textY: [188, 208, 222],
    },
    {
      time: "17:00",
      lines: ["ТОЙДЫҢ", "БАСТАЛУЫ"],
      cx: 260,
      textY: [288, 308, 322],
    },
    {
      time: "22:00",
      lines: ["ШЫҒАРЫП", "САЛУ"],
      cx: 70,
      textY: [398, 418, 432],
    },
  ];

  const dates = ["04", "05", "06", "07", "08"];
  const boxSize = 28;
  const gap = 8;
  const totalWidth = dates.length * boxSize + (dates.length - 1) * gap;
  return (
    <div
      ref={sectionRef}
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "2rem 0",
        minHeight: "100vh",
      }}
    >
      <svg
        viewBox="0 0 320 600"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          maxWidth: 360,
          display: "block",
          fontFamily: "Georgia, serif",
        }}
      >
        <text
          x="160"
          y="44"
          textAnchor="middle"
          fontSize="28"
          fontStyle="italic"
          fill="#7a5c3a"
        >
          Тамыз
        </text>

        <g transform="translate(160,80)">
          {dates.map((label, i) => {
            const x = i * (boxSize + gap) - totalWidth / 2;
            const isActive = label === "06";

            return (
              <g key={label} transform={`translate(${x + boxSize / 2}, 0)`}>
                <g
                  transform={isActive ? "scale(1.25)" : "scale(1)"}
                  style={{ transition: "all 0.3s ease" }}
                >
                  <rect
                    x={-boxSize / 2}
                    y={-boxSize / 2}
                    width={boxSize}
                    height={boxSize}
                    rx="6"
                    fill={isActive ? "#7a5c3a" : "none"}
                    stroke={isActive ? "none" : "#c9b49a"}
                    strokeWidth="1.2"
                  />
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={isActive ? "16" : "13"}
                    fontWeight={isActive ? "bold" : "normal"}
                    fill={isActive ? "white" : "#b0a090"}
                  >
                    {label}
                  </text>
                </g>
              </g>
            );
          })}
        </g>

        <text
          x="160"
          y="128"
          textAnchor="middle"
          fontSize="11"
          fill="#b0a090"
          letterSpacing="2"
        >
          Бейсенбі
        </text>

        <path
          d="M160,142 C160,180 100,200 100,240 C100,280 220,300 220,340 C220,390 100,410 100,450 C100,490 220,510 220,545"
          fill="none"
          stroke="#c9a96e"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="160" cy="142" r="5" fill="#c9a96e" />
        {schedule.map(({ time, lines, cx, textY }) => (
          <g key={time}>
            <text
              x={cx}
              y={textY[0]}
              textAnchor="middle"
              fontSize="20"
              fontStyle="italic"
              fill="#7a5c3a"
            >
              {time}
            </text>
            {lines.map((line, i) => (
              <text
                key={i}
                x={cx}
                y={textY[i + 1]}
                textAnchor="middle"
                fontSize="11"
                fill="#555"
                letterSpacing="1.5"
              >
                {line}
              </text>
            ))}
          </g>
        ))}

        <circle
          cx="220"
          cy="550"
          r="4"
          fill="none"
          stroke="#c9a96e"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
