import React from 'react';

const polar = (angle, radius = 150) => ({
  x: 200 + radius * Math.sin((angle * Math.PI) / 180),
  y: 200 - radius * Math.cos((angle * Math.PI) / 180),
});

const arc = (startAngle, endAngle) => {
  const start = polar(startAngle);
  const end = polar(endAngle);

  return `M ${start.x} ${start.y} A 150 150 0 0 1 ${end.x} ${end.y}`;
};

export default function VelocityGauge({ value, max, calm }) {
  const angle = Math.max(-90, Math.min(90, (value / max) * 90));

  return (
    <div className={`speed-gauge${calm ? ' calm' : ''}`}>
      <svg viewBox="0 0 400 230" role="img" aria-label="Net worth velocity gauge">
        <path
          d={arc(-90, 0)}
          fill="none"
          stroke="var(--danger)"
          strokeOpacity=".28"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d={arc(0, 90)}
          fill="none"
          stroke="var(--success)"
          strokeOpacity=".28"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d={value >= 0 ? arc(0, Math.max(angle, 1)) : arc(Math.min(angle, -1), 0)}
          fill="none"
          stroke={value >= 0 ? 'var(--success)' : 'var(--danger)'}
          strokeWidth="16"
          strokeLinecap="round"
        />

        {Array.from({ length: 11 }, (_, index) => -90 + index * 18).map((tick) => {
          const start = polar(tick, 126);
          const end = polar(tick, tick % 90 === 0 ? 112 : 118);

          return (
            <line
              key={tick}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="var(--text-muted)"
              strokeWidth="2"
            />
          );
        })}

        <text x="40" y="222" fontSize="11" fill="var(--danger)" textAnchor="middle">
          LOSING
        </text>
        <text x="360" y="222" fontSize="11" fill="var(--success)" textAnchor="middle">
          GROWING
        </text>
        <text x="200" y="40" fontSize="11" fill="var(--text-muted)" textAnchor="middle">
          STEADY
        </text>

        <g className="speed-needle" style={{ transform: `rotate(${angle}deg)` }}>
          <path d="M196 200 L200 70 L204 200 Z" fill="var(--text)" />
        </g>
        <circle cx="200" cy="200" r="11" fill="var(--surface)" stroke="var(--text)" strokeWidth="3" />
      </svg>

      <style>{`
        .speed-gauge {
          max-width: 520px;
          margin: 6px auto 0;
        }

        .speed-gauge svg {
          display: block;
          width: 100%;
          overflow: visible;
        }

        .speed-needle {
          transform-origin: 200px 200px;
          transition: transform 0.7s cubic-bezier(0.3, 1.4, 0.5, 1);
        }

        .speed-gauge.calm .speed-needle {
          transition: none;
        }
      `}</style>
    </div>
  );
}
