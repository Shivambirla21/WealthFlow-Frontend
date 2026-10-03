export default function StatCards({ currency = '₹' }) {
  const stats = [
    {
      label: 'Net Worth',
      value: 84620,
      change: 8.4,
      changeType: 'positive',
      changeLabel: 'vs last month',
      color: 'var(--color-primary)',
      isHero: true,
      sparkline: 'M0 28C30 26 50 22 80 20S130 14 160 9 190 5 200 3'
    },
    {
      label: 'Cash Flow',
      value: 3240,
      change: null,
      changeType: 'positive',
      changeLabel: 'Income − expenses',
      color: 'var(--color-secondary)',
      isHero: false,
      sparkline: 'M0 24C40 10 60 26 100 16S160 22 200 8'
    },
    {
      label: 'Income',
      value: 8450,
      change: 6.2,
      changeType: 'positive',
      changeLabel: null,
      color: 'var(--color-success)',
      isHero: false,
      sparkline: 'M0 26C50 22 90 24 130 14S180 8 200 6'
    },
    {
      label: 'Expenses',
      value: 5210,
      change: 3.8,
      changeType: 'negative',
      changeLabel: null,
      color: 'var(--color-danger)',
      isHero: false,
      sparkline: 'M0 8C40 14 80 6 120 18S170 22 200 26'
    }
  ];

  return (
    <div className="stat-cards-row">
      {stats.map((stat) => (
        <div key={stat.label} className={`stat-card ${stat.isHero ? 'hero' : ''}`}>
          <div className="stat-label">{stat.label}</div>
          <div className="stat-value">
            {currency}{stat.value.toLocaleString()}
          </div>

          <div className="stat-change">
            {stat.change !== null && (
              <span className={`change-indicator ${stat.changeType}`}>
                {stat.changeType === 'positive' ? '↑ +' : '↓ −'}{stat.change}%
              </span>
            )}
            {stat.changeLabel && (
              <span className="change-label"> {stat.changeLabel}</span>
            )}
          </div>

          <svg
            width="100%"
            height={stat.isHero ? 34 : 34}
            viewBox="0 0 200 34"
            className="sparkline"
          >
            <path
              d={stat.sparkline}
              fill="none"
              stroke={stat.color}
              strokeWidth="2"
            />
          </svg>
        </div>
      ))}

      <style>{`
        .stat-cards-row {
          display: grid;
          gap: 20px;
          grid-template-columns: 1.3fr 1fr 1fr 1fr;
          margin-bottom: 20px;
        }

        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
          box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
        }

        .stat-card.hero .stat-value {
          font-size: 38px;
        }

        .stat-label {
          color: var(--text-muted);
          font-size: 13px;
          font-weight: 500;
        }

        .stat-value {
          font-size: 30px;
          font-weight: 700;
          letter-spacing: -1px;
          margin: 6px 0;
        }

        .stat-change {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .change-indicator.positive {
          color: var(--success);
        }

        .change-indicator.negative {
          color: var(--danger);
        }

        .change-label {
          color: var(--text-muted);
          font-weight: 500;
        }

        .sparkline {
          display: block;
        }

        @media (max-width: 1200px) {
          .stat-cards-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .stat-cards-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
