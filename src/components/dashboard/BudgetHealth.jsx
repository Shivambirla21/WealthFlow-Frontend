const budgetData = [
  { category: 'Housing', spent: 1200, budget: 1500, color: 'var(--color-primary)' },
  { category: 'Food', spent: 620, budget: 800, color: 'var(--color-warning)' },
  { category: 'Transport', spent: 310, budget: 500, color: 'var(--color-secondary)' },
  { category: 'Entertainment', spent: 240, budget: 300, color: 'var(--color-danger)', warning: true }
];

export default function BudgetHealth({ currency = '₹', totalBudget = 6000 }) {
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
  const remaining = totalBudget - totalSpent;
  const overallPercent = (totalSpent / totalBudget) * 100;

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Budget Health</h3>
        <span className="chart-subtitle">Monthly · {currency}{totalBudget.toLocaleString()}</span>
      </div>

      <div className="budget-overview">
        <div className="budget-label">
          Spent {currency}{totalSpent.toLocaleString()} · Remaining {currency}{remaining.toLocaleString()}
        </div>
        <div className="budget-percent">{overallPercent.toFixed(1)}%</div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${overallPercent}%`, background: 'var(--color-primary)' }}
          ></div>
        </div>
      </div>

      <div className="budget-categories">
        {budgetData.map((item) => {
          const percent = (item.spent / item.budget) * 100;
          return (
            <div key={item.category} className="budget-category">
              <div className="category-row">
                <span className="category-name">
                  {item.category}
                  {item.warning && <span className="warning-icon">⚠</span>}
                </span>
                <span className="category-spent">
                  {currency}{item.spent.toLocaleString()} / {currency}{item.budget.toLocaleString()}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${percent}%`, background: item.color }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .chart-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
          box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .chart-header h3 {
          font-size: 16px;
          margin: 0;
          color: var(--text);
        }

        .chart-subtitle {
          color: var(--text-muted);
          font-weight: 500;
          font-size: 12px;
        }

        .budget-overview {
          margin-bottom: 20px;
        }

        .budget-label {
          color: var(--text-muted);
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 6px;
        }

        .budget-percent {
          font-size: 26px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 6px;
        }

        .progress-bar {
          height: 8px;
          background: var(--bg);
          border-radius: 8px;
          overflow: hidden;
          margin: 6px 0 14px;
        }

        .progress-fill {
          height: 100%;
          border-radius: 8px;
          transition: width 0.3s ease;
        }

        .budget-categories {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .budget-category {
          display: flex;
          flex-direction: column;
        }

        .category-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
        }

        .category-name {
          font-weight: 500;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .warning-icon {
          color: var(--danger);
          font-size: 12px;
        }

        .category-spent {
          font-weight: 500;
          color: var(--text-muted);
        }

        .budget-categories .progress-bar {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}
