export default function RecentReports({ reports, onPreview, onDownload }) {
  return (
    <section className="reports-panel recent-reports">
      <h3>Recently generated</h3>
      {reports.map((report) => (
        <div className="recent-report" key={report.id}>
          <div className="recent-report-info">
            <span className="recent-report-icon">📄</span>
            <span><b>{report.title}</b><small>{report.period} · {report.date}</small></span>
          </div>
          <div className="recent-report-actions">
            <button type="button" onClick={() => onPreview(report.index)}>Preview</button>
            <button type="button" onClick={() => onDownload(report.index)}>PDF</button>
          </div>
        </div>
      ))}
      <style>{`
        .recent-reports h3{font-size:16px;margin:0 0 6px;color:var(--text)}
        .recent-report{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border)}
        .recent-report:last-child{border:0}
        .recent-report-info{display:flex;gap:12px;align-items:center;min-width:0}
        .recent-report-icon{width:36px;height:36px;border-radius:10px;background:var(--primary-soft);display:grid;place-items:center;flex:none}
        .recent-report-info b{display:block;font-size:13px;color:var(--text)}
        .recent-report-info small{display:block;color:var(--text-muted);font-size:12px}
        .recent-report-actions{display:flex;gap:6px}
        .recent-report-actions button{padding:7px 10px;border:1px solid var(--border);border-radius:9px;background:transparent;color:var(--text);cursor:pointer;font:500 12px inherit}
        .recent-report-actions button:hover{border-color:var(--primary);color:var(--primary-bright)}
        @media(max-width:520px){.recent-report{align-items:flex-start;flex-direction:column}.recent-report-actions{width:100%}.recent-report-actions button{flex:1}}
      `}</style>
    </section>
  );
}
