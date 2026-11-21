import { useState } from 'react';

const goals = [
  { id: 1, name: 'Emergency Fund', icon: '🛟', current: 145000, target: 200000, monthly: 10000, startMonth: 9, targetDate: 'Jun 2027', color: '#14B8A6' },
  { id: 2, name: 'Vacation', icon: '🏝', current: 60000, target: 150000, monthly: 15000, startMonth: 6, targetDate: 'Apr 2027', color: '#F59E0B' },
  { id: 3, name: 'New Laptop', icon: '💻', current: 60000, target: 120000, monthly: 12000, startMonth: 3, targetDate: 'Jan 2027', color: '#635BFF' },
  { id: 4, name: 'Car', icon: '🚗', current: 180000, target: 800000, monthly: 25000, startMonth: 0, targetDate: 'Dec 2028', color: '#60A5FA' },
  { id: 5, name: 'House', icon: '🏠', current: 400000, target: 5000000, monthly: 50000, startMonth: 0, targetDate: 'Dec 2032', color: '#A78BFA' },
  { id: 6, name: 'Investment', icon: '📈', current: 130000, target: 300000, monthly: 12000, startMonth: 4, targetDate: 'Dec 2027', color: '#34D399' }
];

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function GoalsGrid({ currency = '₹', onSelectGoal }) {
  const [selectedId, setSelectedId] = useState(null);

  const getGoalStatus = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return { status: 'ahead', label: '★ Ahead', color: 'var(--warning)' };
    if (percentage >= 80) return { status: 'on-track', label: '✓ On track', color: 'var(--success)' };
    return { status: 'behind', label: '▲ Behind', color: 'var(--danger)' };
  };

  const handleSelect = (goal) => {
    setSelectedId(goal.id);
    onSelectGoal?.(goal);
  };

  return (
    <div className="goals-grid">
      {goals.map((goal) => {
        const status = getGoalStatus(goal.current, goal.target);
        const percentage = (goal.current / goal.target) * 100;

        return (
          <div
            key={goal.id}
            className={`goal-card ${selectedId === goal.id ? 'selected' : ''}`}
            onClick={() => handleSelect(goal)}
          >
            <div className="card-header">
              <div className="goal-info">
                <span className="icon">{goal.icon}</span>
                {goal.name}
              </div>
              <span className={`status-badge ${status.status}`}>{status.label}</span>
            </div>

            <div className="label">Target {currency}{goal.target.toLocaleString()}</div>

            <div className="big-amount">
              {currency}{goal.current.toLocaleString()} <span className="label" style={{ fontWeight: 500 }}>· {percentage.toFixed(1)}%</span>
            </div>

            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${percentage}%`, background: goal.color }}></div>
            </div>

            <div className="row">
              <span>Target date</span>
              <span>{goal.targetDate}</span>
            </div>

            <div className="row">
              <span>Monthly contribution</span>
              <span>{currency}{goal.monthly.toLocaleString()}</span>
            </div>

            <style>{`
              .goal-card {
                padding: 20px;
                border: 1px solid var(--border);
                border-radius: 16px;
                background: var(--surface);
                cursor: pointer;
                transition: transform 0.15s ease, border-color 0.15s ease;
              }

              .goal-card:hover {
                transform: translateY(-2px);
                border-color: #3A3F50;
              }

              .goal-card.selected {
                border-color: var(--primary);
                box-shadow: 0 0 0 1px var(--primary);
              }

              .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 14px;
              }

              .goal-info {
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 600;
                font-size: 15px;
              }

              .icon {
                width: 38px;
                height: 38px;
                border-radius: 11px;
                background: var(--primary-soft);
                display: grid;
                place-items: center;
                font-size: 18px;
              }

              .status-badge {
                font-size: 11px;
                font-weight: 700;
                padding: 3px 9px;
                border-radius: 20px;
                white-space: nowrap;
              }

              .status-badge.on-track {
                background: rgba(16, 185, 129, 0.14);
                color: var(--success);
              }

              .status-badge.ahead {
                background: rgba(245, 158, 11, 0.14);
                color: var(--warning);
              }

              .status-badge.behind {
                background: rgba(242, 107, 91, 0.15);
                color: var(--danger);
              }

              .label {
                color: var(--text-muted);
                font-size: 13px;
              }

              .big-amount {
                font-size: 24px;
                font-weight: 700;
                letter-spacing: -0.7px;
              }

              .progress-bar {
                height: 8px;
                background: var(--bg);
                border-radius: 8px;
                overflow: hidden;
                margin: 10px 0;
              }

              .progress-fill {
                display: block;
                height: 100%;
                border-radius: 8px;
                transition: width 0.7s ease;
              }

              .row {
                display: flex;
                justify-content: space-between;
                font-size: 12.5px;
                color: var(--text-muted);
                margin-top: 6px;
              }

              .row span:last-child {
                color: var(--text);
                font-weight: 600;
              }
            `}</style>
          </div>
        );
      })}

      <style>{`
        .goals-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }

        @media (max-width: 1200px) {
          .goals-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .goals-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
