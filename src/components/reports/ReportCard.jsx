export default function ReportCard({ report, onGenerate, onPreview, onDownload, onExport, busy }) {
  return (
    <article className="reports-panel report-card">
      <div className="report-chart" aria-hidden="true">
        {report.bars.map((height, index) => <i key={index} style={{ height: height + '%', background: report.color }} />)}
      </div>
      <h3><span>{report.icon}</span>{report.title}</h3>
      <p>{report.description}</p>
      <div className="report-generated">Last generated · {report.lastGenerated}</div>
      <div className="report-card-actions">
        <button type="button" className="report-primary" onClick={onGenerate} disabled={busy}>{busy ? 'Generating…' : 'Generate'}</button>
        <button type="button" onClick={onPreview}>Preview</button>
        <button type="button" onClick={onDownload}>Download PDF</button>
        <button type="button" className="report-wide" onClick={onExport}>Export CSV</button>
      </div>
      <style>{`
        .report-card{display:flex;flex-direction:column;gap:12px;transition:transform .15s,border-color .15s}
        .report-card:hover{transform:translateY(-2px);border-color:var(--border-strong)}
        .report-chart{height:86px;border-radius:12px;background:var(--bg);border:1px solid var(--border);padding:10px 12px 0;display:flex;align-items:flex-end;gap:5px;overflow:hidden}
        .report-chart i{flex:1;display:block;border-radius:4px 4px 0 0;opacity:.85}
        .report-card h3{display:flex;align-items:center;gap:8px;font-size:15px;margin:0;color:var(--text)}
        .report-card p{color:var(--text-muted);font-size:12.5px;line-height:1.45;min-height:36px;margin:0}
        .report-generated{color:var(--text-muted);font-size:12px}
        .report-card-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px}
        .report-card-actions button{padding:8px 6px;border-radius:9px;border:1px solid var(--border);background:transparent;color:var(--text);font:600 12px inherit;cursor:pointer}
        .report-card-actions button:hover{border-color:var(--primary);color:var(--primary-bright)}
        .report-card-actions button:disabled{opacity:.6;cursor:wait}
        .report-card-actions .report-primary{grid-column:1/3;background:var(--primary);border-color:var(--primary);color:#fff}
        .report-card-actions .report-primary:hover{background:var(--primary-hover);color:#fff}
        .report-card-actions .report-wide{grid-column:1/3}
      `}</style>
    </article>
  );
}
