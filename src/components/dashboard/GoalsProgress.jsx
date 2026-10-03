const goals = [
  { name: 'Emergency Fund', current: 145000, target: 200000, color: 'var(--color-secondary)' },
  { name: 'New Laptop', current: 60000, target: 120000, color: 'var(--color-primary)' },
  { name: 'Vacation', current: 30000, target: 150000, color: 'var(--color-warning)' }
];

export default function GoalsProgress({ currency = '₹' }) {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Goals Progress</h3>
        <span className="view-all">View all →</span>
      </div>

      <div className="goals-list">
        {goals.map((goal) => {
          const percent = (goal.current / goal.target) * 100;
          return (
            <div key={goal.name} className="goal-item">
              <div className="goal-row">
                <strong>{goal.name}</strong>
                <span className="goal-info">
                  {currency}{goal.current.toLocaleString()} / {currency}{goal.target.toLocaleString()} · {percent.toFixed(1)}%
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${percent}%`, background: goal.color }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .chart-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
          box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .chart-header h3 {
          font-size: 16px;
          margin: 0;
          color: var(--text);
        }

        .view-all {
          color: var(--text-muted);
          font-weight: 500;
          font-size: 12px;
          cursor: pointer;
          transition: color 0.15s ease;
        }

        .view-all:hover {
          color: var(--primary);
        }

        .goals-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .goal-item {
          display: flex;
          flex-direction: column;
        }

        .goal-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
        }

        .goal-row strong {
          font-weight: 600;
          color: var(--text);
        }

        .goal-info {
          font-weight: 500;
          color: var(--text-muted);
        }

        .progress-bar {
          height: 8px;
          background: var(--bg);
          border-radius: 8px;
          overflow: hidden;
          margin: 6px 0 0;
        }

        .progress-fill {
          height: 100%;
          border-radius: 8px;
          transition: width 0.3s ease;
        }
      `}</style>
    </div>
  );
}
