export default function DebtComposition({ liabilities, categories }) {
  const totalOutstanding = liabilities.reduce((sum, l) => sum + l.outstanding, 0);

  const categoryTotals = categories.map((cat, i) => {
    const value = liabilities.filter(l => l.categoryIndex === i).reduce((sum, l) => sum + l.outstanding, 0);
    return { ...cat, value, percentage: value / totalOutstanding * 100 };
  }).filter(c => c.value > 0);

  const loansRepaid = liabilities
    .filter(l => l.categoryIndex > 0 && l.categoryIndex < 4)
    .reduce((sum, l) => sum + (l.originalAmount - l.outstanding), 0);
  const loansOriginal = liabilities
    .filter(l => l.categoryIndex > 0 && l.categoryIndex < 4)
    .reduce((sum, l) => sum + l.originalAmount, 0);
  const repaidPct = loansOriginal > 0 ? (loansRepaid / loansOriginal * 100) : 0;

  return (
    <div className="debt-composition">
      <h3>Debt composition</h3>
      <div className="subtitle">Where your balance sits</div>
      <div className="segment-bar">
        {categoryTotals.map(cat => (
          <i
            key={cat.name}
            style={{ width: `${cat.percentage}%`, background: cat.color }}
            title={`${cat.name} ${cat.percentage.toFixed(1)}%`}
          ></i>
        ))}
      </div>
      <div className="legend">
        {categoryTotals.map(cat => (
          <span key={cat.name}>
            <i className="dot" style={{ background: cat.color }}></i>
            {cat.name}
            <b>{cat.percentage.toFixed(1)}%</b>
          </span>
        ))}
        <span style={{ marginLeft: 'auto' }}>
          Loans repaid so far <b>{repaidPct.toFixed(1)}%</b>
        </span>
      </div>
      <style>{`
        .debt-composition {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
        }

        .debt-composition h3 {
          font-size: 16px;
          margin-bottom: 2px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
        }

        .segment-bar {
          display: flex;
          height: 12px;
          border-radius: 12px;
          overflow: hidden;
          gap: 3px;
          margin: 14px 0;
        }

        .segment-bar i {
          display: block;
          height: 100%;
        }

        .legend {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
          font-size: 12.5px;
          color: var(--text-muted);
          margin-top: 8px;
        }

        .dot {
          display: inline-block;
          width: 9px;
          height: 9px;
          border-radius: 3px;
          margin-right: 6px;
        }

        .legend b {
          color: var(--text);
          margin-left: 4px;
        }
      `}</style>
    </div>
  );
}
