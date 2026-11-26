export default function ReportsHeader({ period, onPeriodChange, onNewReport, onThemeToggle }) {
  return (
    <header className="reports-header">
      <div>
        <h1>Reports</h1>
        <p>Clear, shareable summaries of your finances.</p>
      </div>
      <div className="reports-header-actions">
        <select className="reports-control" value={period} onChange={(event) => onPeriodChange(event.target.value)} aria-label="Report period">
          <option value="September 2026">September 2026</option>
          <option value="August 2026">August 2026</option>
          <option value="July 2026">July 2026</option>
          <option value="Last 6 months">Last 6 months</option>
          <option value="FY 2025-26">FY 2025-26</option>
        </select>
        <button type="button" className="reports-control" onClick={onThemeToggle}>◐ Theme</button>
        <button type="button" className="reports-control primary" onClick={onNewReport}>+ New report</button>
      </div>
      <style>{`
        .reports-header{display:flex;justify-content:space-between;align-items:center;gap:16px}
        .reports-header h1{font-size:28px;letter-spacing:-.5px;margin:0;color:var(--text)}
        .reports-header p{font-size:13px;color:var(--text-muted);margin:2px 0 0}
        .reports-header-actions{display:flex;gap:10px;align-items:center}
        .reports-control{padding:9px 14px;border:1px solid var(--border);border-radius:10px;background:var(--surface);color:var(--text);font:500 14px inherit;cursor:pointer}
        .reports-control.primary{background:var(--primary);border-color:var(--primary);color:#fff;font-weight:600}
        .reports-control:hover{border-color:var(--border-strong)}
        @media(max-width:760px){.reports-header{align-items:flex-start;flex-direction:column}.reports-header-actions{width:100%;flex-wrap:wrap}.reports-control{flex:1}}
      `}</style>
    </header>
  );
}
