export default function SettingsExport() {
  const exports = [
    { icon: '📄', name: 'Transactions (CSV)', desc: 'All transactions with categories and accounts' },
    { icon: '🗂', name: 'Full data export (JSON)', desc: 'Accounts, budgets, goals, assets and liabilities' },
    { icon: '📊', name: 'Annual summary (PDF)', desc: 'A printable summary of your financial year' },
  ];

  return (
    <div className="settings-card">
      <h2>Export data</h2>
      <div className="subtitle">Download a copy of your WealthFlow data.</div>
      {exports.map((exp, i) => (
        <div key={i} className="list-item">
          <div>
            <span className="icon">{exp.icon}</span>
            <span>
              <b>{exp.name}</b>
              <span className="subtitle">{exp.desc}</span>
            </span>
          </div>
          <button type="button" className="btn">Export</button>
        </div>
      ))}
      <style>{`
        .settings-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 26px; max-width: 820px; }
        .settings-card h2 { font-size: 20px; letter-spacing: -0.4px; margin-bottom: 4px; }
        .subtitle { color: var(--text-muted); font-size: 13px; }
        .settings-card > .subtitle { margin-bottom: 18px; }
        .list-item { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-top: 1px solid var(--border); }
        .list-item:first-of-type { border-top: 0; }
        .list-item > div { display: flex; align-items: center; gap: 12px; }
        .icon { width: 38px; height: 38px; border-radius: 11px; background: var(--primary-soft); display: grid; place-items: center; font-size: 17px; }
        .list-item b { display: block; }
        .btn { padding: 10px 16px; border: 1px solid var(--border); border-radius: 10px; background: var(--surface); color: var(--text); font: 600 14px inherit; cursor: pointer; }
      `}</style>
    </div>
  );
}
