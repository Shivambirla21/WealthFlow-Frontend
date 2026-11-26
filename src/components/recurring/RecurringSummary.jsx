const money = (value) => '₹' + Math.round(value).toLocaleString('en-IN');

export default function RecurringSummary({ items, categories }) {
  const monthly = items
    .filter((item) => categories[item.categoryIndex].variable)
    .reduce((sum, item) => sum + (item.billing === 'Yearly' ? item.amount / 12 : item.amount), 0);
  const fixed = items
    .filter((item) => !categories[item.categoryIndex].variable)
    .reduce((sum, item) => sum + (item.billing === 'Yearly' ? item.amount / 12 : item.amount), 0);
  const due = items.filter((item) => item.status !== 'Paid' && item.daysUntil >= 0 && item.daysUntil <= 7);
  const dueTotal = due.reduce((sum, item) => sum + item.amount, 0);
  const cards = [
    ['Monthly recurring total', money(monthly), 'Subscriptions, utilities, insurance & memberships'],
    ['Annual recurring total', money(monthly * 12), money(monthly) + ' × 12'],
    ['Rent & loan EMIs', money(fixed), 'per month · fixed commitments'],
    ['Due in next 7 days', money(dueTotal), due.length + ' payments']
  ];

  return (
    <section className="recurring-summary">
      {cards.map(([label, value, note], index) => (
        <article className="recurring-summary-card" key={label}>
          <span>{label}</span>
          <strong className={index === 0 ? 'large' : ''}>{value}</strong>
          <small className={index === 3 ? 'warning' : ''}>{note}</small>
        </article>
      ))}
      <style>{`
        .recurring-summary{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:16px}
        .recurring-summary-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:18px 20px;min-width:0}
        .recurring-summary-card span,.recurring-summary-card small{display:block;color:var(--text-muted);font-size:12px}
        .recurring-summary-card strong{display:block;font-size:28px;letter-spacing:-1px;margin:4px 0}
        .recurring-summary-card strong.large{font-size:36px}
        .recurring-summary-card small.warning{color:var(--warning);font-weight:600}
        @media(max-width:1000px){.recurring-summary{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:520px){.recurring-summary{grid-template-columns:1fr}.recurring-summary-card strong,.recurring-summary-card strong.large{font-size:26px}}
      `}</style>
    </section>
  );
}