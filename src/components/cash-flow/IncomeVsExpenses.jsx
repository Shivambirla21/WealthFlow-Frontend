import { useState } from 'react';

const data = {
  m: {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    income: [78000, 80000, 82000, 84500, 85000, 87000],
    expenses: [52000, 55500, 53000, 60000, 57500, 58580]
  },
  q: {
    labels: ["Q3 '25", "Q4 '25", "Q1 '26", "Q2 '26", "Q3 '26"],
    income: [228000, 236000, 241000, 240000, 256500],
    expenses: [160000, 168000, 164000, 160500, 176080]
  },
  y: {
    labels: ['2023', '2024', '2025', '2026 YTD'],
    income: [780000, 880000, 960000, 496500],
    expenses: [560000, 610000, 650000, 336580]
  }
};

export default function IncomeVsExpenses({ currency = '₹' }) {
  const [period, setPeriod] = useState('m');

  const currentData = data[period];
  const width = 1000;
  const height = 300;
  const margin = { top: 34, right: 34, bottom: 40, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const maxValue = Math.max(...currentData.income) * 1.1;

  const formatCurrency = (value) => {
    return `${currency}${Math.round(value).toLocaleString('en-IN')}`;
  };

  const formatShort = (value) => {
    return `${currency}${(value / 1000).toFixed(0)}k`;
  };

  const barWidth = 30;
  const spacing = chartWidth / currentData.labels.length;

  const renderChart = () => {
    const elements = [];

    // Grid lines
    for (let i = 0; i < 4; i++) {
      const y = margin.top + (chartHeight * i) / 3;
      elements.push(
        <line
          key={`grid-${i}`}
          x1={0}
          x2={width}
          y1={y}
          y2={y}
          stroke="var(--border)"
        />
      );
      elements.push(
        <text
          key={`label-${i}`}
          x={0}
          y={y - 5}
          fontSize="11"
          fill="#9CA3AF"
        >
          {formatShort(maxValue * i / 3 / 1000)}
        </text>
      );
    }

    // Bars and line
    const netPoints = [];
    currentData.labels.forEach((label, i) => {
      const x = i * spacing + spacing / 2;
      const incomeHeight = (currentData.income[i] / maxValue) * chartHeight;
      const expenseHeight = (currentData.expenses[i] / maxValue) * chartHeight;
      const netHeight = (currentData.income[i] - currentData.expenses[i]) / maxValue * chartHeight;

      // Income bar
      elements.push(
        <rect
          key={`income-${i}`}
          x={x - 34}
          y={margin.top + chartHeight - incomeHeight}
          width={barWidth}
          height={incomeHeight}
          rx={6}
          fill="#10B981"
        >
          <title>{label} income {formatCurrency(currentData.income[i])}</title>
        </rect>
      );

      // Expense bar
      elements.push(
        <rect
          key={`expense-${i}`}
          x={x + 4}
          y={margin.top + chartHeight - expenseHeight}
          width={barWidth}
          height={expenseHeight}
          rx={6}
          fill="#F26B5B"
        >
          <title>{label} expenses {formatCurrency(currentData.expenses[i])}</title>
        </rect>
      );

      // Label
      elements.push(
        <text
          key={`label-bar-${i}`}
          x={x}
          y={height - 10}
          fontSize="12"
          textAnchor="middle"
          fill="#9CA3AF"
        >
          {label}
        </text>
      );

      netPoints.push([x, margin.top + chartHeight - netHeight - 0]);
    });

    // Net cash flow line
    const pathD = netPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]} ${p[1]}`).join(' ');
    elements.push(
      <path
        d={pathD}
        fill="none"
        stroke="#635BFF"
        strokeWidth={3}
      />
    );

    // Net cash flow points
    netPoints.forEach((p, i) => {
      elements.push(
        <circle
          key={`net-${i}`}
          cx={p[0]}
          cy={p[1]}
          r={5}
          fill="#fff"
          stroke="#635BFF"
          strokeWidth={3}
        >
          <title>{currentData.labels[i]} net {formatCurrency(currentData.income[i] - currentData.expenses[i])}</title>
        </circle>
      );
    });

    // Alert annotation for monthly view
    if (period === 'm') {
      const alertX = 3 * spacing + spacing / 2 + 36;
      elements.push(
        <rect
          key="alert"
          x={alertX + 8}
          y={14}
          width={190}
          height={26}
          rx={8}
          fill="var(--surface)"
          stroke="var(--border)"
        />
      );
      elements.push(
        <text
          key="alert-text"
          x={alertX + 18}
          y={31}
          fontSize="12"
          fill="var(--text)"
        >
          ▲ Large increase in expenses
        </text>
      );
    }

    return elements;
  };

  return (
    <div className="income-vs-expenses">
      <h3>
        Income vs Expenses
        <span className="period-pills">
          <button
            className={`pill ${period === 'm' ? 'active' : ''}`}
            onClick={() => setPeriod('m')}
          >
            Monthly
          </button>
          <button
            className={`pill ${period === 'q' ? 'active' : ''}`}
            onClick={() => setPeriod('q')}
          >
            Quarterly
          </button>
          <button
            className={`pill ${period === 'y' ? 'active' : ''}`}
            onClick={() => setPeriod('y')}
          >
            Yearly
          </button>
        </span>
      </h3>
      <div className="subtitle">Net cash flow is the line.</div>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ marginTop: 12 }}>
        {renderChart()}
      </svg>

      <div className="legend">
        <span><i className="dot" style={{ background: 'var(--success)' }}></i>Income</span>
        <span><i className="dot" style={{ background: 'var(--danger)' }}></i>Expenses</span>
        <span><i className="dot" style={{ background: 'var(--primary)' }}></i>Net cash flow</span>
      </div>

      <style>{`
        .income-vs-expenses {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
        }

        .income-vs-expenses h3 {
          font-size: 16px;
          margin: 0 0 2px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
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
          padding: 4px 11px;
          border-radius: 6px;
          font-size: 12px;
          color: var(--text-muted);
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
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
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
          .income-vs-expenses h3 {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .income-vs-expenses svg {
            height: 200px;
          }

          .legend {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
}
