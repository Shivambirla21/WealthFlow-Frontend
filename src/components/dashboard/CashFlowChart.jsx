import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const periodOptions = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'quarterly', label: 'Qtr' },
  { id: 'yearly', label: 'Year' }
];

// Sample data - in production this would come from props
const generateCashFlowData = () => {
  return [
    { month: 'Apr', income: 7000, expenses: 5000, net: 2000 },
    { month: 'May', income: 7500, expenses: 5500, net: 2000 },
    { month: 'Jun', income: 8000, expenses: 4500, net: 3500 },
    { month: 'Jul', income: 8200, expenses: 5000, net: 3200 },
    { month: 'Aug', income: 8500, expenses: 4800, net: 3700 },
    { month: 'Sep', income: 8450, expenses: 5210, net: 3240 }
  ];
};

export default function CashFlowChart({ currency = '₹' }) {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const data = generateCashFlowData();

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Cash Flow</h3>
        <div className="period-selector">
          {periodOptions.map((option) => (
            <button
              key={option.id}
              className={`period-btn ${selectedPeriod === option.id ? 'active' : ''}`}
              onClick={() => setSelectedPeriod(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <XAxis
              dataKey="month"
              tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
              axisLine={{ stroke: 'var(--border)', strokeWidth: 1 }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
              axisLine={{ stroke: 'var(--border)', strokeWidth: 1 }}
              tickLine={false}
              tickFormatter={(value) => `${currency}${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value, name) => [
                `${currency}${value.toFixed(0)}`,
                name === 'income' ? 'Income' : name === 'expenses' ? 'Expenses' : 'Net'
              ]}
              contentStyle={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                fontSize: 12
              }}
            />
            <Bar dataKey="income" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" fill="var(--color-danger)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: 'var(--color-success)' }}></span>
          <span>Income</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: 'var(--color-danger)' }}></span>
          <span>Expenses</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: 'var(--color-primary)' }}></span>
          <span>Net</span>
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

        .period-selector {
          display: inline-flex;
          gap: 2px;
          background: var(--bg);
          border-radius: 8px;
          padding: 3px;
        }

        .period-btn {
          padding: 3px 9px;
          border-radius: 6px;
          font-size: 12px;
          color: var(--text-muted);
          background: transparent;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.15s ease;
        }

        .period-btn:hover {
          color: var(--text);
        }

        .period-btn.active {
          background: var(--surface);
          color: var(--text);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
        }

        .chart-container {
          margin-bottom: 16px;
        }

        .chart-legend {
          display: flex;
          gap: 10px;
          font-size: 13px;
          color: var(--text-muted);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .legend-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}
