const money = value => '₹' + Math.round(value).toLocaleString('en-IN');
export default function RecurringSummary({ items, categories }) {
  const monthly = items.filter(x => categories[x.categoryIndex].variable).reduce((sum,x)=>sum+(x.billing==='Yearly'?x.amount/12:x.amount),0);
  const fixed = items.filter(x => !categories[x.categoryIndex].variable).reduce((sum,x)=>sum+(x.billing==='Yearly'?x.amount/12:x.amount),0);
  const due = items.filter(x=>x.status!=='Paid' && x.daysUntil>=0 && x.daysUntil<=7);
  const dueTotal = due.reduce((sum,x)=>sum+x.amount,0);
  const cards = [
    ['Monthly recurring total',money(monthly),'Subscriptions, utilities, insurance & memberships'],
    ['Annual recurring total',money(monthly*12),money(monthly)+' × 12'],
    ['Rent & loan EMIs',money(fixed),'per month · fixed commitments'],
    ['Due in next 7 days',money(dueTotal),due.length+' payments due']
  ];
  return <section className="recurring-summary">{cards.map(([label,value,note],i)=><article className="recurring-card" key={label}><span>{label}</span><strong className={i===0?'large':''}>{value}</strong><small className={i===3?'warning':''}>{note}</small></article>)}
    <style>{`.recurring-summary{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:16px}.recurring-card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:16px;padding:18px 20px;min-width:0}.recurring-card span,.recurring-card small{display:block;color:var(--color-text-muted);font-size:12px}.recurring-card strong{display:block;font-size:28px;letter-spacing:-1px;margin:4px 0}.recurring-card strong.large{font-size:36px}.recurring-card small.warning{color:var(--color-warning);font-weight:600}@media(max-width:1000px){.recurring-summary{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:520px){.recurring-summary{grid-template-columns:1fr}.recurring-card strong,.recurring-card strong.large{font-size:26px}}`}</style>
  </section>;
}