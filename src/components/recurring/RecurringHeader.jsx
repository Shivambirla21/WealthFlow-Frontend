export default function RecurringHeader({ onAdd, onThemeToggle }) {
  return (
    <header className="recurring-header">
      <div>
        <h1>Recurring</h1>
        <p>Subscriptions, bills and commitments, all in one place.</p>
      </div>
      <div className="recurring-header-actions">
        <button type="button" className="recurring-action" onClick={onThemeToggle}>◐ Theme</button>
        <button type="button" className="recurring-action primary" onClick={onAdd}>+ Add recurring</button>
      </div>
      <style>{`
        .recurring-header{display:flex;justify-content:space-between;align-items:center;gap:16px}
        .recurring-header h1{font-size:28px;letter-spacing:-.5px;margin:0;color:var(--text)}
        .recurring-header p{font-size:13px;color:var(--text-muted);margin:2px 0 0}
        .recurring-header-actions{display:flex;gap:10px;align-items:center}
        .recurring-action{padding:9px 14px;border:1px solid var(--border);border-radius:10px;background:var(--surface);color:var(--text);font:500 14px inherit;cursor:pointer;transition:background .15s ease,border-color .15s ease}
        .recurring-action:hover{background:var(--surface-hover);border-color:var(--border-strong)}
        .recurring-action.primary{background:var(--primary);border-color:var(--primary);color:#fff;font-weight:600}
        .recurring-action.primary:hover{background:#7468FF}
        @media(max-width:700px){.recurring-header{align-items:flex-start;flex-direction:column}.recurring-header-actions{width:100%}}
      `}</style>
    </header>
  );
}