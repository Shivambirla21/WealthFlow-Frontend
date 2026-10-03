import { useState } from 'react';

export default function DashboardHeader({ userName = 'Shivam', onThemeToggle, onSignOut }) {
  const [period, setPeriod] = useState('This month');

  return (
    <div className="dashboard-header">
      <div className="header-left">
        <h1>Good morning, {userName}</h1>
        <p className="header-subtitle">Here's your financial picture.</p>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <span className="search-icon">⌕</span>
          <span>Search</span>
          <small>⌘K</small>
        </div>

        <select
          className="period-select"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option>This month ▾</option>
          <option>Last month</option>
          <option>Last 3 months</option>
          <option>Last 6 months</option>
          <option>This year</option>
        </select>

        <button className="action-btn" onClick={onThemeToggle}>◐ Theme</button>
        <button className="action-btn">Customize</button>
        <button className="action-btn primary">+ Add</button>
      </div>

      <style>{`
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .header-left h1 {
          font-size: 28px;
          letter-spacing: -0.5px;
          margin: 0;
          color: var(--text);
        }

        .header-subtitle {
          color: var(--text-muted);
          margin-top: 4px;
          font-size: 14px;
        }

        .header-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .search-box {
          padding: 9px 14px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface);
          font-weight: 500;
          color: var(--text-muted);
          width: 240px;
          cursor: pointer;
          transition: border-color 0.15s ease;
        }

        .search-box:hover {
          border-color: var(--border-strong);
        }

        .search-icon {
          margin-right: 8px;
        }

        .search-box small {
          float: right;
          font-size: 11px;
          opacity: 0.6;
        }

        .period-select {
          padding: 9px 14px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface);
          font-weight: 500;
          color: var(--text);
          cursor: pointer;
          transition: border-color 0.15s ease;
        }

        .period-select:hover {
          border-color: var(--border-strong);
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
        }

        .action-btn:hover {
          background: var(--surface-hover);
          border-color: var(--border-strong);
        }

        .action-btn.primary {
          background: var(--primary);
          color: #fff;
          border-color: var(--primary);
        }

        .action-btn.primary:hover {
          background: var(--primary-dark);
        }
      `}</style>
    </div>
  );
}
