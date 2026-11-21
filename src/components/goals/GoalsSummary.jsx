const goals = [
  { name: 'Emergency Fund', icon: '🛟', current: 145000, target: 200000, monthly: 10000 },
  { name: 'Vacation', icon: '🏝', current: 60000, target: 150000, monthly: 15000 },
  { name: 'New Laptop', icon: '💻', current: 60000, target: 120000, monthly: 12000 },
  { name: 'Car', icon: '🚗', current: 180000, target: 800000, monthly: 25000 },
  { name: 'House', icon: '🏠', current: 400000, target: 5000000, monthly: 50000 },
  { name: 'Investment', icon: '📈', current: 130000, target: 300000, monthly: 12000 }
];

export default function GoalsSummary({ currency = '₹' }) {
  const totalCurrent = goals.reduce((sum, g) => sum + g.current, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
  const totalMonthly = goals.reduce((sum, g) => sum + g.monthly, 0);
  const onTrackCount = goals.length; // Simplified for now

  return (
    <div className="goals-summary">
      <div className="summary-card">
        <div className="label">Total saved toward goals</div>
        <div className="value">{currency}{totalCurrent.toLocaleString()}</div>
        <span className="label">of {currency}{totalTarget.toLocaleString()}</span>
      </div>

      <div className="summary-card">
        <div className="label">Active goals</div>
        <div className="value">{goals.length}</div>
        <span className="label">4 on track or ahead</span>
      </div>

      <div className="summary-card">
        <div className="label">Monthly contributions</div>
        <div className="value">{currency}{totalMonthly.toLocaleString()}</div>
        <span className="label">across all goals</span>
      </div>

      <style>{`
        .goals-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
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

        @media (max-width: 1200px) {
          .goals-summary {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .goals-summary {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
