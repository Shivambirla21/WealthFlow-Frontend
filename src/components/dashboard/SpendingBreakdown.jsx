import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const spendingData = [
  { name: 'Housing', value: 1460, color: 'var(--color-primary)', percent: 28, change: 2, changeType: 'positive' },
  { name: 'Food', value: 1040, color: 'var(--color-secondary)', percent: 20, change: 18, changeType: 'negative' },
  { name: 'Transport', value: 730, color: 'var(--color-warning)', percent: 14, change: 5, changeType: 'positive' },
  { name: 'Shopping', value: 625, color: 'var(--color-danger)', percent: 12, change: 8, changeType: 'positive' },
  { name: 'Entertainment', value: 520, color: 'var(--color-chart-info)', percent: 10, change: 0, changeType: 'neutral' },
  { name: 'Utilities', value: 415, color: 'var(--color-chart-violet)', percent: 8, change: 0, changeType: 'neutral' },
  { name: 'Other', value: 380, color: 'var(--color-text-muted)', percent: 8, change: 0, changeType: 'neutral' }
];

export default function SpendingBreakdown({ currency = '₹', month = 'Sep 2026' }) {
  const total = spendingData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Spending Breakdown</h3>
        <span className="chart-subtitle">{month}</span>
      </div>

      <div className="breakdown-content">
        <div className="pie-chart-container">
          <ResponsiveContainer width="100%" height={190}>
            <PieChart>
              <Pie
                data={spendingData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                stroke="none"
              >
                {spendingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${currency}${value.toFixed(0)}`}
                contentStyle={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  fontSize: 12
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-center">
            <div className="pie-center-label">Total</div>
            <div className="pie-center-value">{currency}{total.toLocaleString()}</div>
          </div>
        </div>

        <div className="category-list">
          {spendingData.map((item) => (
            <div key={item.name} className="category-item">
              <div className="category-left">
                <span className="category-dot" style={{ background: item.color }}></span>
                <span className="category-name">{item.name}</span>
              </div>
              <div className="category-right">
                <span className="category-value">
                  {currency}{item.value.toLocaleString()} · {item.percent}%
                </span>
                {item.change !== 0 && (
                  <span className={`category-change ${item.changeType}`}>
                    {item.changeType === 'positive' ? '↑' : item.changeType === 'negative' ? '↑' : ''}{item.change}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
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

        .chart-subtitle {
          color: var(--text-muted);
          font-weight: 500;
          font-size: 12px;
        }

        .breakdown-content {
          display: flex;
          gap: 28px;
          align-items: center;
        }

        .pie-chart-container {
          width: 190px;
          height: 190px;
          flex-shrink: 0;
          position: relative;
        }

        .pie-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .pie-center-label {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 2px;
        }

        .pie-center-value {
          font-size: 20px;
          font-weight: 700;
          color: var(--text);
        }

        .category-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .category-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
        }

        .category-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .category-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          display: inline-block;
        }

        .category-name {
          font-weight: 500;
          color: var(--text);
        }

        .category-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .category-value {
          font-weight: 500;
          color: var(--text);
        }

        .category-change {
          font-weight: 600;
          font-size: 13px;
        }

        .category-change.positive {
          color: var(--success);
        }

        .category-change.negative {
          color: var(--danger);
        }

        @media (max-width: 768px) {
          .breakdown-content {
            flex-direction: column;
          }

          .pie-chart-container {
            width: 160px;
            height: 160px;
          }
        }
      `}</style>
    </div>
  );
}
