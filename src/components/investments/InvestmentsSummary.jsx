export default function InvestmentsSummary() {
  return (
    <div className="investments-summary">
      <div className="summary-card large">
        <div className="label">Portfolio value</div>
        <div className="value">₹12,84,000</div>
        <span className="change up">↑ +16.7% all time</span>
      </div>
      <div className="summary-card">
        <div className="label">Today's change</div>
        <div className="value positive">+₹8,240</div>
        <span className="change up">↑ +0.65%</span>
      </div>
      <div className="summary-card">
        <div className="label">Total return</div>
        <div className="value positive">+₹1,84,000</div>
        <span className="label">on ₹11,00,000 invested</span>
      </div>
      <div className="summary-card">
        <div className="label">Return %</div>
        <div className="value positive">+16.7%</div>
        <span className="change up">↑ +1.2 pts this month</span>
      </div>
      <style>{`
        .investments-summary {
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
