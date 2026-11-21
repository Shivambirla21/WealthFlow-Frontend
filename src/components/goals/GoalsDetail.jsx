import { useState } from 'react';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function GoalsDetail({ goal, currency = '₹', onContribute }) {
  if (!goal) {
    return (
      <div className="goals-detail-placeholder">
        <div className="placeholder-text">Select a goal to view details</div>
        <style>{`
          .goals-detail-placeholder {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 22px;
            min-height: 300px;
            display: grid;
            place-items: center;
          }
          .placeholder-text {
            color: var(--text-muted);
            font-size: 16px;
          }
        `}</style>
      </div>
    );
  }

  const percentage = (goal.current / goal.target) * 100;
  const remaining = Math.max(goal.target - goal.current, 0);
  const monthsToGo = Math.ceil(remaining / goal.monthly);
  const projectedMonth = 9 + monthsToGo;

  const width = 560;
  const height = 240;
  const margin = { top: 30, right: 30, bottom: 40, left: 30 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const maxValue = goal.target * 1.08;

  const getX = (monthIndex) => margin.left + (monthIndex * chartWidth) / (projectedMonth + 1);
  const getY = (value) => margin.top + chartHeight - (value / maxValue) * chartHeight;

  const contributionHistory = [];
  for (let i = 0; i < 5; i++) {
    const month = 9 - i;
    contributionHistory.push({ month, amount: goal.monthly });
  }

  return (
    <div className="goals-detail">
      <h3>
        <span>{goal.icon} {goal.name}</span>
        <button className="action-btn primary" onClick={() => onContribute?.(goal)}>
          + Contribute {currency}{goal.monthly.toLocaleString()}
        </button>
      </h3>

      <div className="detail-layout">
        <div className="ring-container">
          <svg width="210" height="210" viewBox="0 0 42 42">
            <g fill="none" strokeWidth="3.6" transform="rotate(-90 21 21)">
              <circle cx="21" cy="21" r="15.9" stroke="var(--border)" />
              <circle
                cx="21"
                cy="21"
                r="15.9"
                stroke={goal.color}
                strokeLinecap="round"
                strokeDasharray={`${percentage} ${100 - percentage}`}
                style={{ transition: 'stroke-dasharray 0.7s ease' }}
              />
            </g>
            <text x="21" y="23" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="var(--text)">
              {percentage.toFixed(1)}%
            </text>
          </svg>
          <div className="big-amount">
            {currency}{goal.current.toLocaleString()} / {currency}{goal.target.toLocaleString()}
          </div>
          <div className="key-values">
            <div>
              <span className="label">Remaining</span>
              <span>{currency}{remaining.toLocaleString()}</span>
            </div>
            <div>
              <span className="label">Projected</span>
              <span>{monthNames[projectedMonth % 12]} {2026 + Math.floor(projectedMonth / 12)}</span>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <div className="label" style={{ marginBottom: 6 }}>
            {percentage >= 100
              ? `Ahead of your ${goal.targetDate} target`
              : monthsToGo >= 2
              ? `${monthsToGo} months behind target — consider raising your contribution`
              : `On track for ${goal.targetDate}`}
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${percentage}%`, background: goal.color }}></div>
          </div>
          <div className="timeline">
            <span>Start · {monthNames[goal.startMonth % 12]} {2026 + Math.floor(goal.startMonth / 12)}</span>
            <span>Target · {goal.targetDate}</span>
          </div>

          <div style={{ marginTop: 18, fontWeight: 600 }}>Actual vs projected progress</div>
          <svg width="100%" height={height} viewBox={`0 0 ${width + 10} ${height}`}>
            <line
              x1={30}
              x2={width}
              y1={getY(goal.target)}
              y2={getY(goal.target)}
              stroke="#F59E0B"
              strokeDasharray="5 5"
            />
            <text
              x={width}
              y={getY(goal.target) - 6}
              fontSize="11"
              textAnchor="end"
              fill="#F59E0B"
            >
              Target {currency}{goal.target.toLocaleString()}
            </text>
            <path
              d={`M${getX(goal.startMonth)} ${getY(0)} L${getX(35)} ${getY(goal.target)}`}
              fill="none"
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeDasharray="2 4"
            />
            <path
              d={`M${getX(9)} ${getY(goal.current)} L${getX(Math.min(projectedMonth, 35))} ${getY(Math.min(goal.current + goal.monthly * (Math.min(projectedMonth, 35) - 9), goal.target))}`}
              fill="none"
              stroke={goal.color}
              strokeWidth="2.5"
              strokeDasharray="6 5"
            />
            <circle
              cx={getX(9)}
              cy={getY(goal.current)}
              r={6}
              fill="#fff"
              stroke={goal.color}
              strokeWidth={3}
            />
            <text x={getX(9)} y={height - 8} fontSize="11" textAnchor="middle" fill="#9CA3AF">
              Today
            </text>
          </svg>
          <div className="legend">
            <span><i className="dot" style={{ background: goal.color }}></i>Actual</span>
            <span><i className="dot" style={{ background: goal.color, opacity: 0.5 }}></i>Projected</span>
            <span><i className="dot" style={{ background: '#6B7280' }}></i>Planned path</span>
          </div>
        </div>
      </div>

      <div className="bottom-row">
        <div>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Contribution history</div>
          {contributionHistory.map((item, index) => (
            <div key={index} className="list-item">
              <span>{monthNames[item.month % 12]} 1 · Monthly contribution</span>
              <span className="positive">+{currency}{item.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="key-values" style={{ margin: 0, alignContent: 'start' }}>
          <div>
            <span className="label">Monthly plan</span>
            <span>{currency}{goal.monthly.toLocaleString()}</span>
          </div>
          <div>
            <span className="label">Months to go</span>
            <span>{monthsToGo}</span>
          </div>
          <div>
            <span className="label">Target date</span>
            <span>{goal.targetDate}</span>
          </div>
          <div>
            <span className="label">Saved so far</span>
            <span>{currency}{goal.current.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <style>{`
        .goals-detail {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
        }

        .goals-detail h3 {
          font-size: 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 0 16px 0;
          color: var(--text);
        }

        .action-btn {
          padding: 9px 14px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface);
          font-weight: 500;
          color: var(--text);
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease;
          font-size: 14px;
        }

        .action-btn:hover {
          background: var(--surface-hover);
          border-color: var(--border-strong);
        }

        .action-btn.primary {
          background: var(--primary);
          color: #fff;
          border-color: var(--primary);
          font-weight: 600;
        }

        .action-btn.primary:hover {
          background: #7468FF;
        }

        .detail-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 28px;
        }

        .ring-container {
          display: grid;
          place-items: center;
          text-align: center;
        }

        .big-amount {
          font-size: 20px;
          font-weight: 700;
          margin-top: 6px;
        }

        .key-values {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 16px;
          width: 100%;
        }

        .key-values > div {
          background: var(--bg);
          border-radius: 12px;
          padding: 12px;
          text-align: left;
        }

        .key-values span:first-child {
          display: block;
          font-size: 12px;
          color: var(--text-muted);
        }

        .key-values span:last-child {
          display: block;
          font-size: 16px;
          font-weight: 600;
          margin-top: 2px;
          color: var(--text);
        }

        .label {
          color: var(--text-muted);
          font-size: 13px;
        }

        .progress-bar {
          height: 8px;
          background: var(--bg);
          border-radius: 8px;
          overflow: hidden;
        }

        .progress-fill {
          display: block;
          height: 100%;
          border-radius: 8px;
          transition: width 0.7s ease;
        }

        .timeline {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 6px;
        }

        .legend {
          display: flex;
          gap: 16px;
          margin-top: 8px;
          font-size: 12px;
          color: var(--text-muted);
        }

        .dot {
          display: inline-block;
          width: 9px;
          height: 9px;
          border-radius: 3px;
          margin-right: 6px;
        }

        .bottom-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 20px;
          margin-top: 20px;
        }

        .list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 11px 0;
          border-bottom: 1px solid var(--border);
        }

        .list-item:last-child {
          border: 0;
        }

        .positive {
          color: var(--success);
          font-weight: 600;
        }

        @media (max-width: 1200px) {
          .detail-layout {
            grid-template-columns: 1fr;
          }

          .bottom-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .goals-detail h3 {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .ring-container svg {
            width: 150px;
            height: 150px;
          }
        }
      `}</style>
    </div>
  );
}
