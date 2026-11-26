const money = (value) => '₹' + Math.round(value).toLocaleString('en-IN');

export default function CategoryBreakdown({ items, categories }) {
  const totals = categories.map((category, index) => items
    .filter((item) => item.categoryIndex === index)
    .reduce((sum, item) => sum + (item.billing === 'Yearly' ? item.amount / 12 : item.amount), 0));
  const total = totals.reduce((sum, value) => sum + value, 0);
  const subscriptions = items.filter((item) => item.categoryIndex === 0);
  const largest = subscriptions.reduce((current, item) => item.amount > (current?.amount || 0) ? item : current, null);

  return (
    <section className="recurring-panel category-panel">
      <h3>By category <span>Monthly equivalent</span></h3>
      <div className="category-bar">
        {totals.map((value, index) => <i key={categories[index].name} style={{ width: (total ? value / total * 100 : 0) + '%', background: categories[index].color }} title={categories[index].name + ' ' + money(value)} />)}
      </div>
      <div className="category-legend">
        {categories.map((category, index) => <span key={category.name}><i style={{ background: category.color }} />{category.name}<b>{money(totals[index])}</b></span>)}
      </div>
      <div className="recurring-insight">
        <b>You have {subscriptions.length} recurring subscriptions.</b>
        <small>They cost {money(totals[0])} a month, about {money(Math.round(totals[0]) * 12)} a year.{largest ? ' ' + largest.name + ' is the largest at ' + money(largest.amount) + '.' : ''}</small>
      </div>
      <style>{`
        .category-panel h3{margin-bottom:14px}
        .category-bar{height:12px;border-radius:12px;overflow:hidden;display:flex;gap:3px;margin:14px 0}
        .category-bar i{display:block;height:100%}
        .category-legend{display:flex;gap:12px 16px;flex-wrap:wrap;font-size:12px;color:var(--text-muted)}
        .category-legend span{display:flex;align-items:center;gap:5px}
        .category-legend i{width:9px;height:9px;border-radius:3px}
        .category-legend b{color:var(--text);margin-left:2px}
        .recurring-insight{padding:14px;background:var(--bg);border-radius:12px;margin-top:18px}
        .recurring-insight b,.recurring-insight small{display:block}
        .recurring-insight small{color:var(--text-muted);font-size:12px;margin-top:3px}
      `}</style>
    </section>
  );
}