const metrics = [
  { label: 'Savings', value: 90, color: '#14B8A6' },
  { label: 'Spending', value: 76, color: '#635BFF' },
  { label: 'Debt', value: 68, color: '#F59E0B' },
  { label: 'Emergency fund', value: 72, color: '#60A5FA' },
  { label: 'Investments', value: 88, color: '#A78BFA' },
  { label: 'Goals', value: 74, color: '#34D399' },
];

export default function FinancialHealth() {
  return (
    <section className="insights-panel health-panel">
      <div className="insights-panel-heading"><h2>Financial health</h2><span>Updated today</span></div>
      <div className="health-content">
        <div className="health-ring" role="img" aria-label="Financial health score 78 out of 100">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="48" className="ring-track" />
            <circle cx="60" cy="60" r="48" className="ring-progress" />
          </svg>
          <div><strong>78</strong><span>out of 100</span></div>
        </div>
        <div className="health-metrics">
          {metrics.map((metric) => (
            <div className="health-metric" key={metric.label}>
              <span>{metric.label}</span>
              <div className="health-track"><i style={{ width: metric.value + '%', background: metric.color }} /></div>
              <b>{metric.value}</b>
            </div>
          ))}
        </div>
      </div>
      <div className="health-note">Your savings rate is strong, but your emergency fund is below your target.</div>
      <style>{`
        .health-content{display:flex;align-items:center;gap:28px;margin-top:16px}
        .health-ring{width:148px;height:148px;position:relative;flex:none;display:grid;place-items:center}
        .health-ring svg{width:100%;height:100%;transform:rotate(-90deg)}
        .health-ring circle{fill:none;stroke-width:8}
        .ring-track{stroke:var(--border)}
        .ring-progress{stroke:var(--primary);stroke-linecap:round;stroke-dasharray:235 302}
        .health-ring>div{position:absolute;display:flex;flex-direction:column;align-items:center}
        .health-ring strong{font-size:38px;line-height:1;letter-spacing:-1.5px;color:var(--text)}
        .health-ring span{font-size:12px;color:var(--text-muted);margin-top:5px}
        .health-metrics{flex:1;min-width:0}
        .health-metric{display:flex;align-items:center;gap:10px;margin:10px 0;font-size:12px;color:var(--text-muted)}
        .health-metric>span{width:96px;flex:none}
        .health-track{height:7px;flex:1;background:var(--bg);border-radius:8px;overflow:hidden}
        .health-track i{display:block;height:100%;border-radius:8px}
        .health-metric b{width:24px;text-align:right;color:var(--text)}
        .health-note{margin-top:16px;padding:12px 14px;background:var(--bg);border-radius:12px;font-size:13px;line-height:1.5;color:var(--text)}
        @media(max-width:560px){.health-content{gap:16px}.health-ring{width:112px;height:112px}.health-ring strong{font-size:30px}.health-metric>span{width:82px}}
      `}</style>
    </section>
  );
}
