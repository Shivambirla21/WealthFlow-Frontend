export default function CashFlowHeader({ onThemeToggle, onAdd }) {
  return (
    <div className="cashflow-header">
      <div className="header-left">
        <h1>Cash Flow</h1>
        <div className="header-subtitle">Are you spending more than you earn?</div>
      </div>

      <div className="header-actions">
        <div className="period-selector">This month ▾</div>
        <button className="action-btn" onClick={onThemeToggle}>◐ Theme</button>
        <button className="action-btn primary" onClick={onAdd}>+ Add</button>
      </div>

      <style>{`
        .cashflow-header {
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

        .period-selector {
          padding: 9px 14px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface);
          font-weight: 500;
          color: var(--text);
          cursor: pointer;
          transition: border-color 0.15s ease;
        }

        .period-selector:hover {
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
