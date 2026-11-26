export default function InsightsHeader({ period, onPeriodChange, onThemeToggle }) {
  return (
    <header className="insights-header">
      <div>
        <h1>Insights</h1>
        <p>What changed, why it matters, and what to do next.</p>
      </div>
      <div className="insights-header-actions">
        <select value={period} onChange={(event) => onPeriodChange(event.target.value)} aria-label="Insight period">
          <option>September 2026</option>
          <option>August 2026</option>
          <option>July 2026</option>
          <option>Last 6 months</option>
        </select>
        <button type="button" onClick={onThemeToggle}>◐ Theme</button>
      </div>
      <style>{`
        .insights-header{display:flex;justify-content:space-between;align-items:center;gap:16px}
        .insights-header h1{font-size:28px;letter-spacing:-.5px;margin:0;color:var(--text)}
        .insights-header p{font-size:13px;color:var(--text-muted);margin:2px 0 0}
        .insights-header-actions{display:flex;gap:10px;align-items:center}
        .insights-header-actions select,.insights-header-actions button{padding:9px 14px;border:1px solid var(--border);border-radius:10px;background:var(--surface);color:var(--text);font:inherit;cursor:pointer}
        .insights-header-actions button:hover,.insights-header-actions select:hover{border-color:var(--border-strong)}
        @media(max-width:700px){.insights-header{align-items:flex-start;flex-direction:column}.insights-header-actions{width:100%}.insights-header-actions>*{flex:1}}
      `}</style>
    </header>
  );
}
