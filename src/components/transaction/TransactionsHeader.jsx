export default function TransactionsHeader({ onAddTransaction, onThemeToggle }) {
  return (
    <div className="transactions-header">
      <div className="header-left">
        <h1>Transactions</h1>
        <div className="header-subtitle">Every rupee in and out, in one place.</div>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <span className="search-icon">⌕</span>
          <span>Search</span>
          <small>⌘K</small>
        </div>

        <button className="action-btn" onClick={onThemeToggle}>◐ Theme</button>
        <button className="action-btn primary" onClick={onAddTransaction}>+ Add transaction</button>
      </div>

      <style>{`
        .transactions-header {
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

        .search-box {
          padding: 9px 14px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface);
          font-weight: 500;
          color: var(--text-muted);
          width: 200px;
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
