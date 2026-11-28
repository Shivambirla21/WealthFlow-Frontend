export default function CashFlowSummary({ currency = '₹' }) {
  const summary = [
    {
      label: 'Income',
      value: 87000,
      change: 2.4,
      changeType: 'positive',
      comparison: 'vs last month'
    },
    {
      label: 'Expenses',
      value: 58580,
      change: 1.9,
      changeType: 'positive',
      comparison: 'vs last month'
    },
    {
      label: 'Net cash flow',
      value: 28420,
      change: 3.3,
      changeType: 'positive',
      comparison: 'vs last month',
      isNet: true
    },
    {
      label: 'Savings rate',
      value: '32.7%',
      change: 0.3,
      changeType: 'positive',
      comparison: 'pts',
      isPercentage: true
    }
  ];

  return (
    <div className="cashflow-summary">
      {summary.map((item) => (
        <div key={item.label} className="summary-card">
          <div className="label">{item.label}</div>
          <div className={`value ${item.isNet ? 'positive' : ''}`}>
            {item.isNet ? '+' : ''}{item.isPercentage ? '' : currency}{item.value.toLocaleString()}
          </div>
          <span className={`change ${item.changeType}`}>
            {item.changeType === 'positive' ? '↑ +' : '↓ −'}{item.change}% {item.comparison}
          </span>
        </div>
      ))}

      <style>{`
        .cashflow-summary {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
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

        .value.positive {
          color: var(--success);
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

        @media (max-width: 1200px) {
          .cashflow-summary {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .cashflow-summary {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
