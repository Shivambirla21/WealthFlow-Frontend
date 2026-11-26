export default function PaymentCalendar({ items, month = 10, year = 2026 }) {
  const days = new Date(year, month, 0).getDate();
  return (
    <section className="recurring-panel recurring-calendar">
      <h3>{new Date(year, month - 1, 1).toLocaleString('en-IN', { month: 'long', year: 'numeric' })}<span>Payment calendar</span></h3>
      <div className="payment-strip">
        {Array.from({ length: days }, (_, index) => index + 1).map((day) => {
          const due = items.filter((item) => item.year === year && item.month === month && item.day === day);
          return (
            <div key={day} className={`calendar-day ${day === 3 && month === 10 && year === 2026 ? 'today' : ''} ${due.length ? 'has-payment' : ''}`} title={due.map((item) => item.name + ' ₹' + item.amount).join(', ')}>
              {day}<div>{due.slice(0, 3).map((item) => <i key={item.id} style={{ background: item.color }} />)}</div>
            </div>
          );
        })}
      </div>
      <style>{`
        .recurring-calendar h3{display:flex;justify-content:space-between;align-items:center;font-size:16px;margin:0;color:var(--text)}
        .recurring-calendar h3 span{font-size:12px;font-weight:400;color:var(--text-muted)}
        .payment-strip{display:grid;grid-template-columns:repeat(31,minmax(0,1fr));gap:4px;margin-top:14px}
        .calendar-day{text-align:center;font-size:10px;color:var(--text-muted);padding:6px 0 4px;border:1px solid transparent;border-radius:8px}
        .calendar-day.today{border-color:var(--primary);color:var(--primary-bright);font-weight:700}
        .calendar-day.has-payment{background:var(--bg);color:var(--text)}
        .calendar-day div{display:flex;justify-content:center;gap:2px;margin-top:4px;min-height:6px}
        .calendar-day i{width:5px;height:5px;border-radius:50%}
        @media(max-width:900px){.payment-strip{grid-template-columns:repeat(16,minmax(0,1fr))}}
        @media(max-width:520px){.payment-strip{grid-template-columns:repeat(8,minmax(0,1fr))}}
      `}</style>
    </section>
  );
}