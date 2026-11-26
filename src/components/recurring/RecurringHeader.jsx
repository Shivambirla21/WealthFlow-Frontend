export default function RecurringHeader({ onAdd, onThemeToggle }) {
  return (
    <header className="recurring-header">
      <div><h1>Recurring</h1><p>Subscriptions, bills and commitments, all in one place.</p></div>
      <div className="recurring-actions">
        <button type="button" className="recurring-button" onClick={onThemeToggle}>◐ Theme</button>
        <button type="button" className="recurring-button primary" onClick={onAdd}>+ Add recurring</button>
      </div>
      <style>{`
        .recurring-header{display:flex;justify-content:space-between;align-items:center;gap:16px}
        .recurring-header h1{font-size:28px;letter-spacing:-.5px;margin:0;color:var(--color-text)}
        .recurring-header p{font-size:13px;color:var(--color-text-muted);margin:2px 0 0}
        .recurring-actions{display:flex;gap:10px;align-items:center}
        .recurring-button{padding:9px 14px;border:1px solid var(--color-border);border-radius:10px;background:var(--color-surface);color:var(--color-text);font:500 14px inherit;cursor:pointer}
        .recurring-button.primary{background:var(--color-primary);border-color:var(--color-primary);color:#fff;font-weight:600}
        @media(max-width:700px){.recurring-header{align-items:flex-start;flex-direction:column}.recurring-actions{width:100%}}
      `}</style>
    </header>
  );
}