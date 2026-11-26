const statusLabels = {
  attention: '▲ Attention',
  important: '▼ Important',
  onTrack: '✓ On track',
  info: 'ⓘ Info',
};

export default function InsightCard({ insight, expanded, onToggleWhy, onAction, onDismiss }) {
  return (
    <article className="insight-card">
      <div className="insight-card-top">
        <span>{insight.categoryIcon} {insight.category}</span>
        <span className={`insight-status ${insight.status}`}>{statusLabels[insight.status]}</span>
      </div>
      <h3>{insight.title}</h3>
      <p className="insight-description">{insight.description}</p>
      <div className="insight-metric"><strong>{insight.metric}</strong><span>{insight.metricLabel}</span></div>
      <button type="button" className="insight-why" onClick={onToggleWhy}>
        {expanded ? 'Hide why it matters ▲' : 'Why it matters ▼'}
      </button>
      {expanded && <p className="insight-explanation">{insight.why}</p>}
      <div className="insight-card-footer">
        <button type="button" className="insight-action" onClick={onAction}>{insight.action} <span>→</span></button>
        <button type="button" className="insight-dismiss" onClick={onDismiss}>Dismiss</button>
      </div>
      <style>{`
        .insight-card{display:flex;flex-direction:column;gap:11px;min-width:0;transition:border-color .15s}
        .insight-card:hover{border-color:var(--border-strong)}
        .insight-card-top{display:flex;justify-content:space-between;align-items:center;gap:8px;color:var(--text-muted);font-size:12px}
        .insight-status{font-size:11px;font-weight:700;padding:4px 9px;border-radius:20px;white-space:nowrap}
        .insight-status.attention{background:rgba(245,158,11,.14);color:var(--warning)}
        .insight-status.important{background:rgba(242,107,91,.15);color:var(--danger)}
        .insight-status.onTrack{background:rgba(16,185,129,.14);color:var(--success)}
        .insight-status.info{background:rgba(99,91,255,.16);color:var(--primary-muted,#A5A0FF)}
        .insight-card h3{font-size:17px;letter-spacing:-.3px;line-height:1.35;margin:0;color:var(--text)}
        .insight-description{color:var(--text-muted);font-size:13px;line-height:1.5;margin:0}
        .insight-metric{display:flex;align-items:baseline;gap:10px;background:var(--bg);border-radius:12px;padding:12px 14px}
        .insight-metric strong{font-size:24px;letter-spacing:-.8px;color:var(--text)}
        .insight-metric span{color:var(--text-muted);font-size:12px}
        .insight-why{border:0;background:none;color:var(--primary-muted,#A5A0FF);font-size:12.5px;font-weight:600;padding:0;text-align:left;cursor:pointer;width:max-content}
        .insight-explanation{color:var(--text-muted);font-size:13px;line-height:1.55;border-left:2px solid var(--primary);padding-left:12px;margin:0}
        .insight-card-footer{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:2px}
        .insight-action{border:1px solid var(--primary);background:var(--primary);color:#fff;padding:9px 13px;border-radius:9px;font:600 12px inherit;cursor:pointer}
        .insight-action:hover{filter:brightness(1.08)}
        .insight-dismiss{border:0;background:none;color:var(--text-muted);font:inherit;font-size:12px;cursor:pointer}
        .insight-dismiss:hover{color:var(--text)}
      `}</style>
    </article>
  );
}
