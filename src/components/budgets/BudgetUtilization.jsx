export default function BudgetUtilization({ currency = '₹' }) {
  const usedPercentage = 70.6;
  const totalBudget = 60000;

  return (
    <div className="budget-utilization">
      <h3>Budget utilization</h3>
      <div className="subtitle">Overall this month</div>

      <div className="chart-container">
        <svg width="190" height="190" viewBox="0 0 42 42">
          <g fill="none" strokeWidth="4" transform="rotate(-90 21 21)">
            <circle cx="21" cy="21" r="15.9" stroke="var(--border)" />
            <circle
              cx="21"
              cy="21"
              r="15.9"
              stroke="#635BFF"
              strokeLinecap="round"
              strokeDasharray={`${usedPercentage} ${100 - usedPercentage}`}
            />
          </g>
          <text x="21" y="22.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="var(--text)">
            {usedPercentage}%
          </text>
          <text x="21" y="27" textAnchor="middle" fontSize="2.6" fill="var(--text-muted)">
            of {currency}{totalBudget.toLocaleString()}
          </text>
        </svg>
      </div>

      <style>{`
        .budget-utilization {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
        }

        .budget-utilization h3 {
          font-size: 16px;
          margin: 0 0 4px 0;
          color: var(--text);
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
        }

        .chart-container {
          display: grid;
          place-items: center;
          margin-top: 16px;
        }

        @media (max-width: 768px) {
          .chart-container svg {
            width: 150px;
            height: 150px;
          }
        }
      `}</style>
    </div>
  );
}
