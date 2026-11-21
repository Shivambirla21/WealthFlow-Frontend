export default function AssetAllocation({ assets, categories }) {
  const totalValue = assets.reduce((sum, a) => sum + a.value, 0);

  const categoryTotals = categories.map((cat, i) => {
    const value = assets.filter(a => a.categoryIndex === i).reduce((sum, a) => sum + a.value, 0);
    return { ...cat, value, percentage: value / totalValue * 100 };
  }).filter(c => c.value > 0);

  return (
    <div className="asset-allocation">
      <h3>Asset allocation</h3>
      <div className="subtitle">How your wealth is spread across categories</div>
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
      </div>
      <style>{`
        .asset-allocation {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
        }

        .asset-allocation h3 {
          font-size: 16px;
          margin-bottom: 2px;
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
          margin: 16px 0 14px;
        }

        .segment-bar i {
          display: block;
          height: 100%;
        }

        .legend {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          font-size: 12.5px;
          color: var(--text-muted);
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
