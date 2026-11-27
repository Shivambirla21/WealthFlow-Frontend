export default function SettingsAccounts() {
  const accounts = [
    { icon: '🏦', name: 'HDFC Bank · Savings', status: 'Synced 12 minutes ago', type: 'ok' },
    { icon: '🏦', name: 'SBI · Salary account', status: 'Synced 12 minutes ago', type: 'ok' },
    { icon: '💳', name: 'ICICI · Amazon Pay card', status: 'Synced 2 days ago', type: 'wa' },
    { icon: '📈', name: 'Zerodha · Demat', status: 'Synced 1 hour ago', type: 'ok' },
    { icon: '💵', name: 'Cash wallet', status: 'Manual account', type: 'ok' },
  ];

  return (
    <div className="settings-card">
      <h2>Accounts</h2>
      <div className="subtitle">Connected institutions and manual accounts.</div>
      {accounts.map((acc, i) => (
        <div key={i} className="list-item">
          <div>
            <span className="icon">{acc.icon}</span>
            <span>
              <b>{acc.name}</b>
              <span className="subtitle">{acc.status}</span>
            </span>
          </div>
          <div className="actions">
            <span className={`status ${acc.type}`}>{acc.type === 'ok' ? '✓ Connected' : '▲ Needs sync'}</span>
            <button type="button" className="btn">Sync</button>
            <button type="button" className="btn">Edit</button>
            <button type="button" className="btn danger">Disconnect</button>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 16 }}>
        <button type="button" className="btn primary">+ Connect account</button>
      </div>
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
        .actions { display: flex; gap: 6px; }
        .actions button { margin-left: 6px; padding: 7px 12px; font-size: 12.5px; }
        .status { font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
        .status.ok { background: rgba(16, 185, 129, 0.14); color: var(--success); }
        .status.wa { background: rgba(245, 158, 11, 0.14); color: var(--warning); }
        .btn { padding: 10px 16px; border: 1px solid var(--border); border-radius: 10px; background: var(--surface); color: var(--text); font: 600 14px inherit; cursor: pointer; }
        .btn.primary { background: var(--primary); border-color: var(--primary); color: #fff; }
        .btn.danger { border-color: var(--danger); color: var(--danger); }
      `}</style>
    </div>
  );
}
