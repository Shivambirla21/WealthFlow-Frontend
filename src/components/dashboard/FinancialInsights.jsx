const insights = [
  {
    title: 'Spending',
    description: 'You spent 18% more on dining this month.'
  },
  {
    title: 'Savings',
    description: "You're saving 24% of your monthly income."
  },
  {
    title: 'Subscriptions',
    description: 'You have 8 recurring subscriptions.'
  }
];

export default function FinancialInsights() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Financial Insights</h3>
      </div>

      <div className="insights-list">
        {insights.map((insight, index) => (
          <div key={insight.title} className={`insight-card ${index === insights.length - 1 ? 'last' : ''}`}>
            <strong>{insight.title}</strong>
            <span className="insight-description">{insight.description}</span>
          </div>
        ))}
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

        .insights-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .insight-card {
          padding: 12px 14px;
          background: var(--bg);
          border-radius: 12px;
          margin-bottom: 10px;
        }

        .insight-card.last {
          margin-bottom: 0;
        }

        .insight-card strong {
          display: block;
          margin-bottom: 2px;
          font-weight: 600;
          color: var(--text);
        }

        .insight-description {
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
