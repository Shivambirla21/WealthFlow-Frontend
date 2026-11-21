export default function LiabilitiesSummary({ liabilities }) {
  const totalOutstanding = liabilities.reduce((sum, l) => sum + l.outstanding, 0);
  const monthlyPayments = liabilities.reduce((sum, l) => sum + l.minPayment, 0);
  const weightedRate = liabilities.length > 0 && totalOutstanding > 0
    ? liabilities.reduce((sum, l) => sum + l.outstanding * l.rate, 0) / totalOutstanding
    : 0;

  const today = 3;
  const nextPayment = liabilities.length > 0 ? liabilities
    .slice()
    .sort((a, b) => ((a.dueDay - today + 31) % 31) - ((b.dueDay - today + 31) % 31))[0] : null;

  const daysUntilDue = nextPayment ? (nextPayment.dueDay - today + 31) % 31 : 0;

  const formatValue = (v) => '₹' + Math.round(Math.abs(v)).toLocaleString('en-IN');

  return (
    <div className="liabilities-summary">
      <div className="summary-card large">
        <div className="label">Total outstanding</div>
        <div className="value">{formatValue(totalOutstanding)}</div>
        <span className="change down">▼ −₹26,000 this month</span>
      </div>
      <div className="summary-card">
        <div className="label">Monthly minimum payments</div>
        <div className="value">{formatValue(monthlyPayments)}</div>
        <span className="label">across {liabilities.length} liabilities</span>
      </div>
      <div className="summary-card">
        <div className="label">Weighted interest rate</div>
        <div className="value">{weightedRate.toFixed(1)}%</div>
        <span className="label">per year</span>
      </div>
      <div className="summary-card">
        <div className="label">Next payment due</div>
        <div className="value" style={{ fontSize: '22px' }}>{nextPayment ? nextPayment.name : 'None scheduled'}</div>
        <span className="warning">{nextPayment ? `▲ ${formatValue(nextPayment.minPayment)} · Oct ${nextPayment.dueDay} (in ${daysUntilDue} days)` : 'Add a liability to get started'}</span>
      </div>
      <style>{`
        .liabilities-summary {
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

        .warning {
          color: var(--warning);
          font-weight: 600;
          font-size: 12.5px;
        }
      `}</style>
    </div>
  );
}
