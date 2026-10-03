import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const timeRanges = [
  { id: '1M', label: '1M' },
  { id: '3M', label: '3M' },
  { id: '6M', label: '6M' },
  { id: '1Y', label: '1Y' },
  { id: '5Y', label: '5Y' },
  { id: 'All', label: 'All' }
];

// Sample data - in production this would come from props
const generateNetWorthData = () => {
  const data = [];
  const baseValue = 60000;
  for (let i = 0; i < 12; i++) {
    data.push({
      month: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'][i],
      netWorth: baseValue + (i * 3000) + Math.random() * 5000,
      assets: baseValue + (i * 3500) + Math.random() * 6000,
      liabilities: 20000 + (i * 500) + Math.random() * 2000
    });
  }
  return data;
};

export default function NetWorthChart({ currency = '₹' }) {
  const [selectedRange, setSelectedRange] = useState('1Y');
  const data = generateNetWorthData();

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Net Worth</h3>
        <div className="time-range-selector">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              className={`range-btn ${selectedRange === range.id ? 'active' : ''}`}
              onClick={() => setSelectedRange(range.id)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.22} />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
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
                name === 'netWorth' ? 'Net Worth' : name === 'assets' ? 'Assets' : 'Liabilities'
              ]}
              contentStyle={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                fontSize: 12
              }}
            />
            <Area
              type="monotone"
              dataKey="netWorth"
              stroke="var(--color-primary)"
              strokeWidth={3}
              fill="url(#netWorthGradient)"
            />
            <Area
              type="monotone"
              dataKey="assets"
              stroke="var(--color-success)"
              strokeWidth={1.5}
              fill="none"
              strokeDasharray="4 4"
            />
            <Area
              type="monotone"
              dataKey="liabilities"
              stroke="var(--color-danger)"
              strokeWidth={1.5}
              fill="none"
              strokeDasharray="4 4"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: 'var(--color-primary)' }}></span>
          <span>Net worth</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: 'var(--color-success)' }}></span>
          <span>Assets</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: 'var(--color-danger)' }}></span>
          <span>Liabilities</span>
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

        .time-range-selector {
          display: inline-flex;
          gap: 2px;
          background: var(--bg);
          border-radius: 8px;
          padding: 3px;
        }

        .range-btn {
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

        .range-btn:hover {
          color: var(--text);
        }

        .range-btn.active {
          background: var(--surface);
          color: var(--text);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
        }

        .chart-container {
          margin-bottom: 16px;
        }

        .chart-legend {
          display: flex;
          gap: 14px;
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
