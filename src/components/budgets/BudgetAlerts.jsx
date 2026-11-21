const alerts = [
  {
    type: 'over',
    category: 'Entertainment',
    amount: 550,
    budget: 3000,
    percentage: 118
  },
  {
    type: 'over',
    category: 'Shopping',
    amount: 800,
    budget: 6000,
    percentage: 113
  },
  {
    type: 'near',
    category: 'Food',
    remaining: 1580
  }
];

export default function BudgetAlerts({ currency = '₹' }) {
  return (
    <div className="budget-alerts">
      <h3>Budget alerts</h3>
      <div className="subtitle" style={{ marginBottom: 14 }}>Needs your attention</div>

      {alerts.map((alert, index) => (
        <div key={index} className="alert-item">
          {alert.type === 'over' ? (
            <>
              <b>▲ {alert.category} is {currency}{alert.amount} over</b>
              <span className="label">{alert.percentage}% of {currency}{alert.budget.toLocaleString()} budget.</span>
            </>
          ) : (
            <>
              <b>● {alert.category} is near its limit</b>
              <span className="label">{currency}{alert.remaining.toLocaleString()} left for the rest of the month.</span>
            </>
          )}
        </div>
      ))}

      <style>{`
        .budget-alerts {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
        }

        .budget-alerts h3 {
          font-size: 16px;
          margin: 0 0 4px 0;
          color: var(--text);
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
        }

        .alert-item {
          padding: 12px 14px;
          border-radius: 12px;
          background: var(--bg);
          margin-bottom: 10px;
          font-size: 13px;
        }

        .alert-item b {
          display: block;
          margin-bottom: 2px;
          color: var(--text);
        }

        .label {
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
