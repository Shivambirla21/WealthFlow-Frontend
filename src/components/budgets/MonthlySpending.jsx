import { useState } from 'react';

const monthlyData = [
  { month: 'Apr', spending: 38000 },
  { month: 'May', spending: 41000 },
  { month: 'Jun', spending: 39500 },
  { month: 'Jul', spending: 44000 },
  { month: 'Aug', spending: 40800 },
  { month: 'Sep', spending: 42350 }
];

const budgetLimit = 60000;
const minSpending = 30000;
const maxSpending = 62000;

export default function MonthlySpending({ currency = '₹' }) {
  const [period, setPeriod] = useState('6M');

  const width = 640;
  const height = 210;
  const margin = { top: 30, right: 40, bottom: 40, left: 40 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const getY = (value) => {
    return margin.top + chartHeight - ((value - minSpending) / (maxSpending - minSpending)) * chartHeight;
  };

  const budgetY = getY(budgetLimit);

  const points = monthlyData.map((d, i) => [
    margin.left + (i * chartWidth) / (monthlyData.length - 1),
    getY(d.spending)
  ]);

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]} ${p[1]}`).join(' ');

  return (
    <div className="monthly-spending">
      <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
        Monthly spending
        <span className="period-pills">
          <button className={`pill ${period === '3M' ? 'active' : ''}`} onClick={() => setPeriod('3M')}>3M</button>
          <button className={`pill ${period === '6M' ? 'active' : ''}`} onClick={() => setPeriod('6M')}>6M</button>
          <button className={`pill ${period === '1Y' ? 'active' : ''}`} onClick={() => setPeriod('1Y')}>1Y</button>
        </span>
      </h3>
      <div className="subtitle">Spending against the {currency}{budgetLimit.toLocaleString()} budget</div>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ marginTop: 12 }}>
        {/* Budget line */}
        <line
          x1={0}
          x2={width}
          y1={budgetY}
          y2={budgetY}
          stroke="#F59E0B"
          strokeDasharray="5 5"
        />
        <text
          x={width - 4}
          y={budgetY - 6}
          fontSize="11"
          textAnchor="end"
          fill="#F59E0B"
        >
          Budget {currency}{budgetLimit.toLocaleString()}
        </text>

        {/* Spending line */}
        <path
          d={pathD}
          fill="none"
          stroke="#635BFF"
          strokeWidth="3"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p[0]}
              cy={p[1]}
              r={i === points.length - 1 ? 6 : 4}
              fill={i === points.length - 1 ? '#fff' : '#635BFF'}
              stroke="#635BFF"
              strokeWidth="3"
            />
            <text
              x={p[0]}
              y={height - 8}
              fontSize="11"
              textAnchor="middle"
              fill="#9CA3AF"
            >
              {monthlyData[i].month}
            </text>
            <text
              x={p[0]}
              y={p[1] - 12}
              fontSize="11"
              textAnchor="middle"
              fill="#9CA3AF"
            >
              {(monthlyData[i].spending / 1000).toFixed(1)}k
            </text>
          </g>
        ))}
      </svg>

      <style>{`
        .monthly-spending {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
        }

        .monthly-spending h3 {
          font-size: 16px;
          margin: 0 0 4px 0;
          color: var(--text);
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
        }

        .period-pills {
          display: inline-flex;
          gap: 2px;
          background: var(--bg);
          border-radius: 8px;
          padding: 3px;
        }

        .pill {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 600;
          cursor: pointer;
          background: transparent;
          border: none;
          transition: all 0.15s ease;
        }

        .pill:hover {
          color: var(--text);
        }

        .pill.active {
          background: var(--surface);
          color: var(--text);
        }

        @media (max-width: 768px) {
          .monthly-spending h3 {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .monthly-spending svg {
            height: 160px;
          }
        }
      `}</style>
    </div>
  );
}
