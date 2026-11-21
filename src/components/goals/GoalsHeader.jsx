export default function GoalsHeader({ onThemeToggle, onCreateGoal }) {
  return (
    <div className="goals-header">
      <div className="header-left">
        <h1>Goals</h1>
        <div className="header-subtitle">Plan it. Fund it. Reach it.</div>
      </div>

      <div className="header-actions">
        <button className="action-btn" onClick={onThemeToggle}>◐ Theme</button>
        <button className="action-btn primary" onClick={onCreateGoal}>+ Create goal</button>
      </div>

      <style>{`
        .goals-header {
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
          font-size: 13px;
        }

        .header-actions {
          display: flex;
          gap: 10px;
          align-items: center;
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
      `}</style>
    </div>
  );
}
