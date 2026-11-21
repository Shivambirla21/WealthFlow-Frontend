export default function AssetsSummary({ assets }) {
  const totalValue = assets.reduce((sum, a) => sum + a.value, 0);
  const purchaseValue = assets.reduce((sum, a) => sum + a.purchaseValue, 0);
  const totalGain = totalValue - purchaseValue;
  const gainPct = purchaseValue > 0 ? ((totalValue - purchaseValue) / purchaseValue) * 100 : 0;
  const categories = new Set(assets.map(a => a.categoryIndex)).size;

  const formatValue = (v) => '₹' + Math.round(Math.abs(v)).toLocaleString('en-IN');
  const formatPct = (v) => v.toFixed(1) + '%';

  return (
    <div className="assets-summary">
      <div className="summary-card large">
        <div className="label">Total asset value</div>
        <div className="value">{formatValue(totalValue)}</div>
        <span className="change up">▲ {formatPct(gainPct)} since purchase</span>
      </div>
      <div className="summary-card">
        <div className="label">Purchase value</div>
        <div className="value">{formatValue(purchaseValue)}</div>
        <span className="label">Total cost basis</span>
      </div>
      <div className="summary-card">
        <div className="label">Total gain</div>
        <div className={`value ${totalGain >= 0 ? 'positive' : 'negative'}`}>
          {totalGain >= 0 ? '+' : '−'}{formatValue(totalGain)}
        </div>
        <span className={`change ${totalGain >= 0 ? 'up' : 'down'}`}>
          {totalGain >= 0 ? '▲' : '▼'} {Math.abs(gainPct).toFixed(1)}%
        </span>
      </div>
      <div className="summary-card">
        <div className="label">Assets tracked</div>
        <div className="value">{assets.length}</div>
        <span className="label">across {categories} categories</span>
      </div>
      <style>{`
        .assets-summary {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 16px;
        }

        .summary-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 18px 20px;
        }

        .summary-card.large .value {
          font-size: 36px;
        }

        .label {
          color: var(--text-muted);
          font-size: 13px;
        }

        .value {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -1px;
          margin: 4px 0;
        }

        .value.positive {
          color: var(--success);
        }

        .value.negative {
          color: var(--danger);
        }

        .change {
          font-weight: 600;
          font-size: 12.5px;
        }

        .change.up {
          color: var(--success);
        }

        .change.down {
          color: var(--danger);
        }
      `}</style>
    </div>
  );
}
