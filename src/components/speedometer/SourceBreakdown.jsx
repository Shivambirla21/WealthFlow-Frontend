const sourceRows = [
  { name: 'Income', icon: '💼', amount: 87000, type: 'accrual' },
  { name: 'Spending', icon: '🛍️', amount: -58580, type: 'accrual' },
  { name: 'Loan interest', icon: '🏦', amount: -16590, type: 'accrual' },
  { name: 'Investments', icon: '📈', amount: 9100, type: 'live' },
  { name: 'Property', icon: '🏠', amount: 9250, type: 'estimate' },
  { name: 'Vehicle', icon: '🛵', amount: -650, type: 'estimate' },
  { name: 'Gold & other', icon: '💎', amount: 700, type: 'live' },
];

const formatAmount = (value, digits = 0) =>
  Math.abs(value).toLocaleString('en-IN', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export default function SourceBreakdown({ multiplier, unit, digits }) {
  const maxAmount = Math.max(...sourceRows.map((row) => Math.abs(row.amount)));

  return (
    <section className="speed-card">
      <div className="speed-heading">
        <h2>Where it comes from</h2>
        <span className="muted">₹ per {unit}</span>
      </div>

      <div className="source-list">
        {sourceRows.map((row) => {
          const value = row.amount * multiplier;
          const label =
            row.type === 'live'
              ? '● LIVE'
              : row.type === 'estimate'
                ? '◐ ESTIMATE'
                : '◆ ACCRUAL';

          return (
            <div className="source-row" key={row.name}>
              <div className="source-icon">{row.icon}</div>

              <div>
                <div className="source-name">
                  <b>{row.name}</b>
                  <span className={`source-badge ${row.type}`}>{label}</span>
                </div>
                <div className="source-track">
                  <i
                    style={{
                      width: `${(Math.abs(row.amount) / maxAmount) * 100}%`,
                      background: row.amount >= 0 ? 'var(--success)' : 'var(--danger)',
                    }}
                  />
                </div>
              </div>

              <strong className={`source-amount ${value >= 0 ? 'positive' : 'negative'}`}>
                {value >= 0 ? '▲ +' : '▼ −'}₹{formatAmount(value, digits)}
              </strong>
            </div>
          );
        })}
      </div>

      <div className="source-legend">
        <span>● LIVE market prices</span>
        <span>◐ ESTIMATE average growth</span>
        <span>◆ ACCRUAL spread evenly</span>
      </div>

      <style>{`
        .source-list {
          margin-top: 8px;
        }

        .source-row {
          display: grid;
          grid-template-columns: 34px minmax(0, 1fr) 118px;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-top: 1px solid var(--border);
        }

        .source-row:first-child {
          border-top: 0;
        }

        .source-icon {
          display: grid;
          width: 34px;
          height: 34px;
          place-items: center;
          border-radius: 10px;
          background: var(--primary-soft);
        }

        .source-name {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 7px;
          font-size: 13px;
        }

        .source-badge {
          padding: 2px 7px;
          border-radius: 12px;
          font-size: 9px;
          font-weight: 750;
          white-space: nowrap;
        }

        .source-badge.live {
          background: #10b98124;
          color: var(--success);
        }

        .source-badge.estimate {
          background: #f59e0b24;
          color: var(--warning);
        }

        .source-badge.accrual {
          background: #635bff29;
          color: #a5a0ff;
        }

        .source-track {
          height: 6px;
          margin-top: 6px;
          overflow: hidden;
          border-radius: 6px;
          background: var(--bg);
        }

        .source-track i {
          display: block;
          height: 100%;
          border-radius: 6px;
        }

        .source-amount {
          font-size: 12px;
          text-align: right;
          white-space: nowrap;
        }

        .source-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 12px;
          color: var(--text-muted);
          font-size: 10px;
        }

        @media (max-width: 768px) {
          .source-row {
            grid-template-columns: 32px minmax(0, 1fr) auto;
            gap: 8px;
          }

          .source-amount {
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  );
}
