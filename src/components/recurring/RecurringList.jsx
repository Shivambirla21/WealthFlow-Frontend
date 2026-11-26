const money = (value) => '₹' + Math.round(value).toLocaleString('en-IN');

export default function RecurringList({ items, categories, activeTab, onTabChange, activeCategory, onCategoryChange, onMarkPaid }) {
  const tabs = ['All', 'Upcoming', 'Paid', 'Overdue'];
  const filtered = items.filter((item) => (activeCategory === -1 || item.categoryIndex === activeCategory) && (activeTab === 'All' || item.status === activeTab));

  return (
    <section className="recurring-panel recurring-list">
      <div className="recurring-list-heading">
        <h3>All recurring payments</h3>
        <div className="recurring-tabs">{tabs.map((tab) => <button type="button" key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => onTabChange(tab)}>{tab}</button>)}</div>
      </div>
      <div className="recurring-chips">
        <button type="button" className={activeCategory === -1 ? 'active' : ''} onClick={() => onCategoryChange(-1)}>All</button>
        {categories.map((category, index) => <button type="button" key={category.name} className={activeCategory === index ? 'active' : ''} onClick={() => onCategoryChange(index)}>{category.icon} {category.name}</button>)}
      </div>
      {categories.map((category, index) => {
        if (activeCategory !== -1 && activeCategory !== index) return null;
        const group = items.filter((item) => item.categoryIndex === index && (activeTab === 'All' || item.status === activeTab));
        if (!group.length) return null;
        const monthly = group.reduce((sum, item) => sum + (item.billing === 'Yearly' ? item.amount / 12 : item.amount), 0);
        return (
          <div key={category.name}>
            <div className="recurring-group-title">
              <b><i style={{ background: category.color + '33' }}>{category.icon}</i>{category.name} <small>· {group.length}</small></b>
              <strong>{money(monthly)} <small>/mo</small></strong>
            </div>
            <div className="recurring-table-head"><span>Name</span><span>Amount</span><span>Billing</span><span>Next payment</span><span>Status</span><span /></div>
            {group.map((item) => (
              <div className="recurring-table-row" key={item.id}>
                <div className="recurring-name"><i>{category.icon}</i><span><b>{item.name}</b><small>{item.account}{item.variable ? ' · variable' : ''}</small></span></div>
                <b>{item.variable ? '~' : ''}{money(item.amount)}</b>
                <span>{item.billing}</span>
                <span>{new Date(item.year, item.month - 1, item.day).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}<small>{item.status === 'Paid' ? 'Paid' : item.daysUntil < 0 ? Math.abs(item.daysUntil) + ' days overdue' : item.daysUntil === 0 ? 'Today' : item.daysUntil === 1 ? 'Tomorrow' : 'In ' + item.daysUntil + ' days'}</small></span>
                <span><em className={item.status.toLowerCase()}>{item.status === 'Paid' ? '✓ Paid' : item.status === 'Overdue' ? '▼ Overdue' : '● Upcoming'}</em></span>
                <span>{item.status !== 'Paid' && <button type="button" className="mark-paid" onClick={() => onMarkPaid(item.id)}>Mark paid</button>}</span>
              </div>
            ))}
          </div>
        );
      })}
      {!filtered.length && <p className="recurring-empty">Nothing here. You're all caught up.</p>}
      <style>{`
        .recurring-list{overflow:hidden}
        .recurring-list-heading{display:flex;justify-content:space-between;align-items:center;gap:12px}
        .recurring-list-heading h3{margin:0}
        .recurring-tabs{display:flex;gap:2px;background:var(--bg);padding:3px;border-radius:10px}
        .recurring-tabs button{border:0;background:transparent;color:var(--text-muted);padding:6px 12px;border-radius:8px;font-weight:600;cursor:pointer}
        .recurring-tabs button.active{background:var(--surface);color:var(--text)}
        .recurring-chips{display:flex;gap:6px;flex-wrap:wrap;margin:14px 0}
        .recurring-chips button{padding:7px 13px;border:1px solid var(--border);border-radius:20px;background:transparent;color:var(--text-muted);font-size:12px;cursor:pointer}
        .recurring-chips button.active{background:var(--primary-soft);border-color:var(--primary);color:var(--primary-bright)}
        .recurring-group-title{display:flex;justify-content:space-between;align-items:center;padding:14px 0 8px}
        .recurring-group-title>b{display:flex;align-items:center;gap:9px}
        .recurring-group-title i,.recurring-name i{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;font-style:normal;background:var(--primary-soft);flex:none}
        .recurring-group-title small{font-size:11px;color:var(--text-muted);font-weight:400}
        .recurring-group-title strong{font-size:14px}
        .recurring-table-head,.recurring-table-row{display:grid;grid-template-columns:2.2fr 1fr 1fr 1.2fr 1.1fr 1fr;gap:12px;align-items:center;padding:11px 6px}
        .recurring-table-head{color:var(--text-muted);font-size:11px;border-bottom:1px solid var(--border)}
        .recurring-table-head span:nth-child(n+2),.recurring-table-row>span:nth-child(n+2),.recurring-table-row>b{text-align:right}
        .recurring-table-row{border-bottom:1px solid var(--border);font-size:12px}
        .recurring-name{display:flex;align-items:center;gap:10px;min-width:0}
        .recurring-name b,.recurring-name small,.recurring-table-row span small{display:block}
        .recurring-name small,.recurring-table-row span small{color:var(--text-muted);font-size:11px}
        .recurring-name span{min-width:0}.recurring-name b{overflow-wrap:anywhere}
        .recurring-table-row em{font-style:normal;font-size:10px;font-weight:700;padding:4px 8px;border-radius:20px;white-space:nowrap}
        .recurring-table-row em.paid{background:#10B98122;color:var(--success)}
        .recurring-table-row em.upcoming{background:#635BFF22;color:var(--primary-bright)}
        .recurring-table-row em.overdue{background:#F26B5B22;color:var(--danger)}
        .mark-paid{font-size:11px;padding:5px 9px;border-radius:8px;border:1px solid var(--border);background:transparent;color:var(--text);cursor:pointer}
        .mark-paid:hover{border-color:var(--primary);color:var(--primary-bright)}
        .recurring-empty{text-align:center;color:var(--text-muted);padding:36px}
        @media(max-width:1000px){.recurring-table-head{display:none}.recurring-table-row{grid-template-columns:2fr 1fr 1fr;gap:8px}.recurring-table-row>:nth-child(3){display:none}.recurring-table-row>:nth-child(4){text-align:left}.recurring-table-row>:nth-child(5),.recurring-table-row>:nth-child(6){text-align:left}}
        @media(max-width:620px){.recurring-list-heading{align-items:flex-start;flex-direction:column}.recurring-tabs{width:100%;justify-content:space-between}.recurring-tabs button{padding:6px 8px}.recurring-table-row{grid-template-columns:1.5fr 1fr;gap:8px}.recurring-table-row>:nth-child(4){display:none}.recurring-table-row>:nth-child(5){text-align:right}.recurring-table-row>:nth-child(6){grid-column:2;justify-self:end}}
      `}</style>
    </section>
  );
}