const money = (value) => '₹' + Math.round(value).toLocaleString('en-IN');

export default function UpcomingPayments({ items, categories }) {
  const upcoming = items
    .filter((item) => item.status !== 'Paid' && item.daysUntil <= 30)
    .sort((a, b) => a.daysUntil - b.daysUntil);

  return (
    <section className="recurring-panel upcoming-panel">
      <h3>Upcoming payments <span>Next 30 days</span></h3>
      {upcoming.length ? upcoming.map((item) => (
        <div className="upcoming-row" key={item.id}>
          <div className="upcoming-date"><b>{item.day}</b><small>{new Date(item.year, item.month - 1, 1).toLocaleString('en-IN', { month: 'short' })}</small></div>
          <i className="upcoming-dot" style={{ background: item.color }} />
          <div className="upcoming-detail">
            <div><b>{item.name}</b><small>{item.account} · {categories[item.categoryIndex].name}</small></div>
            <div className="upcoming-amount">
              <b>{money(item.amount)}</b>
              <small className={item.daysUntil < 0 ? 'overdue' : item.daysUntil <= 3 ? 'soon' : ''}>
                {item.daysUntil < 0 ? Math.abs(item.daysUntil) + ' days overdue' : item.daysUntil === 0 ? 'Today' : item.daysUntil === 1 ? 'Tomorrow' : 'In ' + item.daysUntil + ' days'}
              </small>
            </div>
          </div>
        </div>
      )) : <p className="empty-upcoming">No upcoming payments.</p>}
      <style>{`
        .upcoming-panel h3{margin-bottom:8px}
        .upcoming-row{display:flex;align-items:center;gap:13px;padding:10px 0}
        .upcoming-date{width:42px;text-align:right;flex:none}
        .upcoming-date b,.upcoming-date small,.upcoming-detail small{display:block}
        .upcoming-date b{font-size:15px}
        .upcoming-date small,.upcoming-detail small{font-size:11px;color:var(--text-muted)}
        .upcoming-dot{width:10px;height:10px;border-radius:50%;flex:none}
        .upcoming-detail{display:flex;justify-content:space-between;align-items:center;gap:12px;flex:1;background:var(--bg);border-radius:11px;padding:10px 12px;min-width:0}
        .upcoming-detail b{display:block}
        .upcoming-amount{text-align:right;white-space:nowrap}
        .upcoming-amount small.overdue{color:var(--danger)}
        .upcoming-amount small.soon{color:var(--warning)}
        .empty-upcoming{color:var(--text-muted);padding:20px 0}
        @media(max-width:520px){.upcoming-detail{padding:8px}.upcoming-detail b{font-size:12px}}
      `}</style>
    </section>
  );
}