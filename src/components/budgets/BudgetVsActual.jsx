const categories = [
  { name: 'Housing', budget: 20000, actual: 17000 },
  { name: 'Food', budget: 8000, actual: 6420 },
  { name: 'Transport', budget: 6000, actual: 3100 },
  { name: 'Shopping', budget: 6000, actual: 6800 },
  { name: 'Entertainment', budget: 3000, actual: 3550 },
  { name: 'Utilities', budget: 5000, actual: 2830 },
  { name: 'Health', budget: 4000, actual: 1650 },
  { name: 'Other', budget: 8000, actual: 1000 }
];

export default function BudgetVsActual({ currency = '₹' }) {
  const width = 640;
  const height = 240;
  const margin = { top: 30, right: 30, bottom: 40, left: 10 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const maxValue = 22000;

  const barWidth = 26;
  const barGap = 14;
  const groupWidth = barWidth * 2 + barGap;
  const startX = margin.left + 14;

  const renderBars = () => {
    return categories.map((cat, i) => {
      const x = startX + i * (groupWidth + 4);
      const budgetHeight = (cat.budget / maxValue) * chartHeight;
      const actualHeight = (cat.actual / maxValue) * chartHeight;
      const isOver = cat.actual > cat.budget;

      return (
        <g key={cat.name}>
          {/* Budget bar */}
          <rect
            x={x}
            y={margin.top + chartHeight - budgetHeight}
            width={barWidth}
            height={budgetHeight}
            rx={5}
            fill="#3A3F5C"
          />
          {/* Actual bar */}
          <rect
            x={x + barWidth + 2}
            y={margin.top + chartHeight - actualHeight}
            width={barWidth}
            height={actualHeight}
            rx={5}
            fill={isOver ? '#F26B5B' : '#635BFF'}
          />
          {/* Label */}
          <text
            x={x + barWidth + 1}
            y={height - 10}
            fontSize="10"
            textAnchor="middle"
            fill="#9CA3AF"
          >
            {cat.name.slice(0, 8)}
          </text>
        </g>
      );
    });
  };

  const renderGridLines = () => {
    const lines = [];
    for (let i = 0; i < 4; i++) {
      const y = margin.top + (chartHeight * i) / 3;
      lines.push(
        <line
          key={i}
          x1="0"
          x2={width}
          y1={y}
          y2={y}
          stroke="var(--border)"
        />
      );
    }
    return lines;
  };

  return (
    <div className="budget-vs-actual">
      <h3>Budget vs Actual</h3>
      <div className="subtitle">Where are you above or below plan?</div>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ marginTop: 12 }}>
        {renderGridLines()}
        {renderBars()}
      </svg>

      <div className="legend">
        <span><i className="dot" style={{ background: '#3A3F5C' }}></i>Budget</span>
        <span><i className="dot" style={{ background: 'var(--primary)' }}></i>Actual</span>
        <span><i className="dot" style={{ background: 'var(--danger)' }}></i>Over budget</span>
      </div>

      <style>{`
        .budget-vs-actual {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
        }

        .budget-vs-actual h3 {
          font-size: 16px;
          margin: 0 0 4px 0;
          color: var(--text);
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
        }

        .legend {
          display: flex;
          gap: 16px;
          margin-top: 10px;
          font-size: 12px;
          color: var(--text-muted);
        }

        .dot {
          display: inline-block;
          width: 9px;
          height: 9px;
          border-radius: 3px;
          margin-right: 6px;
        }

        @media (max-width: 768px) {
          .budget-vs-actual svg {
            height: 180px;
          }

          .legend {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
}
