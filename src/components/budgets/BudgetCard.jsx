const categories = [
  { id: 1, name: 'Housing', icon: '🏠', budget: 20000, spent: 17000 },
  { id: 2, name: 'Food', icon: '🍔', budget: 8000, spent: 6420 },
  { id: 3, name: 'Transport', icon: '🚗', budget: 6000, spent: 3100 },
  { id: 4, name: 'Shopping', icon: '🛍', budget: 6000, spent: 6800 },
  { id: 5, name: 'Entertainment', icon: '🎬', budget: 3000, spent: 3550 },
  { id: 6, name: 'Utilities', icon: '💡', budget: 5000, spent: 2830 },
  { id: 7, name: 'Health', icon: '❤️', budget: 4000, spent: 1650 },
  { id: 8, name: 'Other', icon: '➕', budget: 8000, spent: 1000 }
];

export default function BudgetCard({ currency = '₹', filter = 'all' }) {
  const getBudgetStatus = (budget, spent) => {
    const percentage = (spent / budget) * 100;
    if (percentage > 100) return { status: 'over', label: '▲ Over', color: 'var(--danger)' };
    if (percentage >= 80) return { status: 'near', label: '● Near limit', color: 'var(--warning)' };
    return { status: 'ok', label: '✓ On track', color: 'var(--success)' };
  };

  const getBarColor = (budget, spent) => {
    const percentage = (spent / budget) * 100;
    if (percentage > 100) return 'var(--danger)';
    if (percentage >= 80) return 'var(--warning)';
    return 'var(--primary)';
  };

  const filteredCategories = categories.filter(cat => {
    const status = getBudgetStatus(cat.budget, cat.spent).status;
    if (filter === 'all') return true;
    if (filter === 'over') return status === 'over';
    if (filter === 'on-track') return status === 'ok';
    return true;
  });

  return (
    <div className="budget-cards-grid">
      {filteredCategories.map((cat) => {
        const status = getBudgetStatus(cat.budget, cat.spent);
        const percentage = (cat.spent / cat.budget) * 100;
        const remaining = cat.budget - cat.spent;
        const isOver = cat.spent > cat.budget;

        return (
          <div key={cat.id} className={`budget-card ${isOver ? 'over-budget' : ''}`}>
            <div className="card-header">
              <div className="category-info">
                <span className="icon">{cat.icon}</span>
                {cat.name}
              </div>
              <span className={`status-badge ${status.status}`}>{status.label}</span>
            </div>

            <div className="label">Budget {currency}{cat.budget.toLocaleString()}</div>

            <div className="spent-amount">
              {currency}{cat.spent.toLocaleString()} <span className="label" style={{ fontWeight: 500 }}>spent</span>
            </div>

            <div className="percentage-row">
              <span className="label">{percentage.toFixed(1)}%</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(percentage, 100)}%`, background: getBarColor(cat.budget, cat.spent) }}
              ></div>
            </div>

            <div className="remaining-row">
              <span>{isOver ? 'Over by' : 'Remaining'}</span>
              <span style={{ color: isOver ? 'var(--danger)' : 'var(--text)', fontWeight: 600 }}>
                {currency}{Math.abs(remaining).toLocaleString()}
              </span>
            </div>

            <style>{`
              .budget-card {
                padding: 18px;
                border: 1px solid var(--border);
                border-radius: 16px;
                background: var(--surface);
                cursor: pointer;
                transition: transform 0.15s ease, border-color 0.15s ease;
              }

              .budget-card:hover {
                transform: translateY(-2px);
                border-color: #3A3F50;
              }

              .budget-card.over-budget {
                border-color: rgba(242, 107, 91, 0.55);
              }

              .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 14px;
              }

              .category-info {
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 600;
              }

              .icon {
                width: 34px;
                height: 34px;
                border-radius: 10px;
                background: var(--primary-soft);
                display: grid;
                place-items: center;
                font-size: 16px;
              }

              .status-badge {
                font-size: 11px;
                font-weight: 700;
                padding: 3px 9px;
                border-radius: 20px;
              }

              .status-badge.ok {
                background: rgba(16, 185, 129, 0.14);
                color: var(--success);
              }

              .status-badge.near {
                background: rgba(245, 158, 11, 0.14);
                color: var(--warning);
              }

              .status-badge.over {
                background: rgba(242, 107, 91, 0.15);
                color: var(--danger);
              }

              .label {
                color: var(--text-muted);
                font-size: 13px;
              }

              .spent-amount {
                font-size: 22px;
                font-weight: 700;
                letter-spacing: -0.6px;
                margin: 2px 0;
              }

              .percentage-row {
                display: flex;
                justify-content: space-between;
                margin: 12px 0 6px;
                font-size: 13px;
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
              }

              .remaining-row {
                display: flex;
                justify-content: space-between;
                font-size: 13px;
                margin-top: 12px;
                color: var(--text-muted);
              }
            `}</style>
          </div>
        );
      })}

      <style>{`
        .budget-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        @media (max-width: 1200px) {
          .budget-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .budget-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
