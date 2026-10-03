export default function TransactionSummary({ currency = '₹' }) {
  const summary = [
    {
      label: 'Total',
      value: 28420,
      subtitle: '12 transactions · Sep 2026',
      showChange: false
    },
    {
      label: 'Income',
      value: 87000,
      change: 6.2,
      changeType: 'positive',
      showChange: true
    },
    {
      label: 'Expenses',
      value: 58580,
      change: 3.8,
      changeType: 'negative',
      showChange: true
    },
    {
      label: 'Transfers',
      value: 10000,
      subtitle: 'Between accounts',
      showChange: false
    }
  ];

  return (
    <div className="transaction-summary">
      {summary.map((item) => (
        <div key={item.label} className="summary-card">
          <div className="label">{item.label}</div>
          <div className="value">{currency}{item.value.toLocaleString()}</div>
          {item.showChange && (
            <span className={`change ${item.changeType}`}>
              {item.changeType === 'positive' ? '↑ +' : '↓ −'}{item.change}%
            </span>
          )}
          {item.subtitle && (
            <span className="subtitle">{item.subtitle}</span>
          )}
        </div>
      ))}

      <style>{`
        .transaction-summary {
          display: grid;
          grid-template-columns: 1.3fr 1fr 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }

        .summary-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 18px 20px;
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

        .change {
          font-weight: 600;
          font-size: 12px;
        }

        .change.positive {
          color: var(--success);
        }

        .change.negative {
          color: var(--danger);
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
        }

        @media (max-width: 1200px) {
          .transaction-summary {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .transaction-summary {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
