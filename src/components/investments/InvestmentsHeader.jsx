export default function InvestmentsHeader({ onThemeToggle }) {
  return (
    <div className="investments-header">
      <div className="header-content">
        <h1>Investments</h1>
        <div className="subtitle">How are your investments performing?</div>
      </div>
      <div className="header-actions">
        <button type="button" className="theme-toggle" onClick={onThemeToggle}>
          ◐ Theme
        </button>
        <button type="button" className="btn primary">
          + Add investment
        </button>
      </div>
      <style>{`
        .investments-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-content h1 {
          font-size: 28px;
          letter-spacing: -0.5px;
          font-weight: 700;
          margin: 0;
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
          margin-top: 4px;
        }

        .header-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .theme-toggle,
        .btn {
          padding: 9px 14px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface);
          color: var(--text);
          font: 500 14px inherit;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease;
        }

        .theme-toggle:hover,
        .btn:hover {
          background: var(--surface-hover);
        }

        .btn.primary {
          background: var(--primary);
          border-color: var(--primary);
          color: #fff;
          font-weight: 600;
        }

        .btn.primary:hover {
          background: #5a52e6;
        }
      `}</style>
    </div>
  );
}
