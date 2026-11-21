export default function BudgetSummary({ currency = '₹' }) {
  const budgetData = {
    monthlyBudget: 60000,
    usedPercentage: 70.6,
    spent: 42350,
    spentChange: 3.8,
    remaining: 17650,
    dailyLeft: 630,
    overBudgetCount: 2,
    daysIn: 28
  };

  return (
    <div className="budget-summary">
      <div className="summary-card main">
        <div className="label">Monthly budget</div>
        <div className="value">{currency}{budgetData.monthlyBudget.toLocaleString()}</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${budgetData.usedPercentage}%` }}></div>
        </div>
        <div className="label" style={{ marginTop: '8px' }}>
          {budgetData.usedPercentage}% used · {budgetData.daysIn} days in
        </div>
      </div>

      <div className="summary-card">
        <div className="label">Spent</div>
        <div className="value">{currency}{budgetData.spent.toLocaleString()}</div>
        <span className="label">↑ {budgetData.spentChange}% under last month</span>
      </div>

      <div className="summary-card">
        <div className="label">Remaining</div>
        <div className="value" style={{ color: 'var(--success)' }}>
          {currency}{budgetData.remaining.toLocaleString()}
        </div>
        <span className="label">≈ {currency}{budgetData.dailyLeft} / day left</span>
      </div>

      <div className="summary-card">
        <div className="label">Status</div>
        <div className="value" style={{ fontSize: '20px' }}>
          {budgetData.overBudgetCount} over budget
        </div>
        <span className="status-badge over">▲ Needs attention</span>
      </div>

      <style>{`
        .budget-summary {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 28px;
          align-items: center;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
          margin-bottom: 20px;
        }

        .summary-card {
          display: flex;
          flex-direction: column;
        }

        .summary-card.main {
          gap: 4px;
        }

        .label {
          color: var(--text-muted);
          font-size: 13px;
        }

        .value {
          font-size: 30px;
          font-weight: 700;
          letter-spacing: -1px;
          margin: 4px 0;
        }

        .summary-card.main .value {
          font-size: 36px;
        }

        .progress-bar {
          height: 9px;
          background: var(--bg);
          border-radius: 9px;
          overflow: hidden;
        }

        .progress-fill {
          display: block;
          height: 100%;
          border-radius: 9px;
          transition: width 0.6s ease;
          background: var(--primary);
        }

        .status-badge {
          font-size: 11px;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 20px;
        }

        .status-badge.over {
          background: rgba(242, 107, 91, 0.15);
          color: var(--danger);
        }

        @media (max-width: 1200px) {
          .budget-summary {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
        }

        @media (max-width: 768px) {
          .budget-summary {
            grid-template-columns: 1fr;
          }

          .value {
            font-size: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
