const categories = [
  { name: 'Housing', amount: 18000, color: '#635BFF' },
  { name: 'Food', amount: 9400, color: '#14B8A6' },
  { name: 'Shopping', amount: 7800, color: '#F26B5B' },
  { name: 'Transport', amount: 6100, color: '#F59E0B' },
  { name: 'Utilities', amount: 5980, color: '#60A5FA' },
  { name: 'Entertainment', amount: 4200, color: '#A78BFA' },
  { name: 'Other', amount: 4000, color: '#9CA3AF' },
  { name: 'Health', amount: 3100, color: '#34D399' }
];

export default function CashFlowByCategory({ currency = '₹', totalExpenses = 58580 }) {
  const maxAmount = Math.max(...categories.map(c => c.amount));

  const formatCurrency = (value) => {
    return `${currency}${Math.round(value).toLocaleString('en-IN')}`;
  };

  return (
    <div className="cashflow-by-category">
      <h3>Cash flow by category</h3>
      <div className="subtitle">Where your {currency}{totalExpenses.toLocaleString()} went</div>

      <div className="category-bars">
        {categories.map((cat) => (
          <div key={cat.name} className="category-row">
            <span className="category-name">{cat.name}</span>
            <span className="track">
              <i style={{ width: `${(cat.amount / maxAmount) * 100}%`, background: cat.color }}></i>
            </span>
            <span className="amount">{formatCurrency(cat.amount)}</span>
          </div>
        ))}
      </div>

      <style>{`
        .cashflow-by-category {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
        }

        .cashflow-by-category h3 {
          font-size: 16px;
          margin: 0 0 2px 0;
          color: var(--text);
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
        }

        .category-bars {
          margin-top: 8px;
        }

        .category-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 12px 0;
          font-size: 13px;
        }

        .category-name {
          width: 96px;
          color: var(--text-muted);
        }

        .track {
          flex: 1;
          height: 9px;
          background: var(--bg);
          border-radius: 9px;
          overflow: hidden;
        }

        .track i {
          display: block;
          height: 100%;
          border-radius: 9px;
        }

        .amount {
          width: 78px;
          text-align: right;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
