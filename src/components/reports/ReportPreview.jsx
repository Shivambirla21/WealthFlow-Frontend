const categories = [
  ['Housing', 18000, '+2%'], ['Food', 9400, '+18%'], ['Shopping', 7800, '−8%'],
  ['Transport', 6100, '−5%'], ['Utilities', 5980, '+1%'], ['Entertainment', 4200, '+6%'],
  ['Other', 4000, '0%'], ['Health', 3100, '−3%']
];
const colors = ['#635BFF', '#14B8A6', '#F26B5B', '#F59E0B', '#60A5FA', '#A78BFA', '#9CA3AF', '#34D399'];
const money = (value) => '₹' + Math.round(value).toLocaleString('en-IN');

export default function ReportPreview({ report, period, onBack, onPrint, onDownload, onExport }) {
  const income = [78, 80, 82, 84.5, 85, 87];
  const expenses = [52, 55.5, 53, 60, 57.5, 58.6];
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const bars = income.map((value, index) => {
    const x = 20 + index * 80;
    return <g key={months[index]}>
      <rect x={x} y={130 - value * 1.3} width="22" height={value * 1.3} rx="4" fill="#10B981" />
      <rect x={x + 26} y={130 - expenses[index] * 1.3} width="22" height={expenses[index] * 1.3} rx="4" fill="#F26B5B" />
      <text x={x + 24} y="148" fontSize="10" textAnchor="middle" fill="#6B7280">{months[index]}</text>
    </g>;
  });

  return (
    <>
      <div className="report-preview-toolbar no-print">
        <button type="button" onClick={onBack}>← Back to reports</button>
        <div><button type="button" onClick={onPrint}>⎙ Print</button><button type="button" onClick={onExport}>Export CSV</button><button type="button" className="primary" onClick={onDownload}>Download PDF</button></div>
      </div>
      <article className="report-paper">
        <header className="paper-header">
          <div><div className="paper-brand"><i />WealthFlow</div><p>Personal finance report</p></div>
          <div className="paper-title"><h1>{report.title === 'Monthly Financial Summary' ? 'Financial Report' : report.title}</h1><span>{period} · Prepared for your account</span></div>
        </header>
        <h2><span>1</span>Executive summary</h2>
        <div className="paper-kpis">
          <div><small>Net worth</small><b>₹84,620</b><em className="positive">▲ +8.4%</em></div>
          <div><small>Income</small><b>₹87,000</b><em className="positive">▲ +2.4%</em></div>
          <div><small>Expenses</small><b>₹58,580</b><em className="negative">▲ +1.9%</em></div>
          <div><small>Savings rate</small><b>32.7%</b><em className="positive">▲ +0.3 pts</em></div>
        </div>
        <p className="paper-copy">You earned ₹87,000 and spent ₹58,580 in September, leaving a net cash flow of ₹28,420. Your net worth grew by ₹6,570 to ₹84,620. Food spending was the main increase this month, while your emergency fund moved to 72.5% of target.</p>

        <h2><span>2</span>Income</h2>
        <table><thead><tr><th>Source</th><th>Account</th><th>Date</th><th>Amount</th></tr></thead><tbody>
          <tr><td>Salary</td><td>HDFC Savings</td><td>Sep 27</td><td>₹75,000</td></tr>
          <tr><td>Freelance</td><td>HDFC Savings</td><td>Sep 18</td><td>₹12,000</td></tr>
          <tr><td><b>Total income</b></td><td /><td /><td className="positive">₹87,000</td></tr>
        </tbody></table>

        <h2><span>3</span>Expenses</h2>
        <div className="paper-two">
          <div className="paper-donut"><svg viewBox="0 0 42 42" role="img" aria-label="Expense category breakdown">
            {categories.reduce((acc, category, index) => {
              const percentage = category[1] / 58580 * 100;
              acc.offset += percentage;
              acc.nodes.push(<circle key={category[0]} cx="21" cy="21" r="15.9" fill="none" stroke={colors[index]} strokeWidth="5" strokeDasharray={`${percentage - .4} ${100 - percentage + .4}`} strokeDashoffset={-acc.previous} transform="rotate(-90 21 21)" />);
              acc.previous += percentage;
              return acc;
            }, { offset: 0, previous: 0, nodes: [] }).nodes}
            <text x="21" y="20" textAnchor="middle" fontSize="3" fill="#6B7280">Total</text><text x="21" y="25" textAnchor="middle" fontSize="4.8" fontWeight="700" fill="#111827">₹58,580</text>
          </svg></div>
          <table><thead><tr><th>Category</th><th>Amount</th><th>vs Aug</th></tr></thead><tbody>
            {categories.map((category, index) => <tr key={category[0]}><td><i className="paper-dot" style={{ background: colors[index] }} />{category[0]}</td><td>{money(category[1])}</td><td className={category[2].startsWith('−') ? 'positive' : category[2] === '0%' ? '' : 'negative'}>{category[2]}</td></tr>)}
          </tbody></table>
        </div>

        <h2><span>4</span>Savings</h2>
        <div className="paper-kpis three"><div><small>Net cash flow</small><b className="positive">+₹28,420</b></div><div><small>Savings rate</small><b>32.7%</b></div><div><small>Moved to savings</small><b>₹10,000</b></div></div>

        <h2><span>5</span>Net worth</h2>
        <table><thead><tr><th>Item</th><th>Aug 31</th><th>Sep 30</th><th>Change</th></tr></thead><tbody>
          <tr><td>Total assets</td><td>₹98,400</td><td>₹1,05,820</td><td className="positive">▲ +7.5%</td></tr>
          <tr><td>Total liabilities</td><td>₹21,850</td><td>₹21,200</td><td className="positive">▼ −3.0%</td></tr>
          <tr><td><b>Net worth</b></td><td>₹76,550</td><td><b>₹84,620</b></td><td className="positive">▲ +10.5%</td></tr>
        </tbody></table>

        <h2><span>6</span>Investments</h2>
        <div className="paper-kpis three"><div><small>Portfolio value</small><b>₹12,84,000</b></div><div><small>Total return</small><b className="positive">+₹1,84,000</b></div><div><small>Return %</small><b className="positive">▲ 16.7%</b></div></div>

        <h2><span>7</span>Goals</h2>
        {[['Emergency Fund', '₹1,45,000 / ₹2,00,000', 72.5, '#14B8A6'], ['Vacation', '₹60,000 / ₹1,50,000', 40, '#F59E0B'], ['New Laptop', '₹60,000 / ₹1,20,000', 50, '#635BFF']].map((goal) => <div className="paper-goal" key={goal[0]}><div><b>{goal[0]}</b><span>{goal[1]} · {goal[2]}%</span></div><div className="paper-progress"><i style={{ width: goal[2] + '%', background: goal[3] }} /></div></div>)}

        <h2><span>8</span>Charts</h2>
        <div className="paper-two paper-charts"><div><small>Income vs expenses (₹ thousand)</small><svg viewBox="0 0 500 156">{bars}</svg><div className="paper-legend"><span>Income</span><span>Expenses</span></div></div><div><small>Net worth, last 6 months (₹ thousand)</small><svg viewBox="0 0 500 156"><path d="M20 95 L112 86 L204 78 L296 65 L388 48 L480 16 L480 140 L20 140Z" fill="#635BFF" opacity=".12"/><path d="M20 95 L112 86 L204 78 L296 65 L388 48 L480 16" fill="none" stroke="#635BFF" strokeWidth="3" /></svg></div></div>

        <h2><span>9</span>Insights</h2>
        <div className="paper-insight"><b>Dining up 18%</b>You spent 18% more on dining this month. Review Food transactions to see where it came from.</div>
        <div className="paper-insight"><b>Strong savings</b>You saved 32.7% of your income, above your 25% target.</div>
        <div className="paper-insight"><b>Emergency fund 72.5%</b>At ₹10,000 a month you will reach your target about 3 months early.</div>
        <footer className="paper-footer"><span>WealthFlow · {period}</span><span>For personal use only. Figures are illustrative.</span><span>Page 1 of 1</span></footer>
      </article>
      <style>{`
        .report-preview-toolbar{display:flex;justify-content:space-between;align-items:center;gap:12px}
        .report-preview-toolbar>div{display:flex;gap:8px}
        .report-preview-toolbar button{padding:9px 12px;border:1px solid var(--border);border-radius:9px;background:var(--surface);color:var(--text);font:500 13px inherit;cursor:pointer}
        .report-preview-toolbar button.primary{background:var(--primary);border-color:var(--primary);color:#fff}
        .report-paper{width:100%;max-width:860px;margin:0 auto;padding:48px 54px;background:#fff;color:#111827;border-radius:6px;box-shadow:0 24px 70px #0004}
        .paper-header{display:flex;justify-content:space-between;gap:20px;border-bottom:2px solid #635BFF;padding-bottom:20px;margin-bottom:24px}
        .paper-brand{display:flex;align-items:center;gap:9px;font-size:18px;font-weight:700}.paper-brand i{width:26px;height:26px;border-radius:8px;background:#635BFF}
        .paper-header p,.paper-title span,.report-paper small{color:#6B7280;font-size:12px}
        .paper-header p{margin-top:12px}.paper-title{text-align:right}.paper-title h1{font-size:27px;letter-spacing:-.6px;margin:0 0 4px}
        .report-paper h2{font-size:16px;margin:28px 0 12px;display:flex;align-items:center;gap:9px}
        .report-paper h2>span{width:22px;height:22px;border-radius:7px;background:#EEEDFF;color:#635BFF;font-size:12px;display:grid;place-items:center}
        .paper-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:14px 0}
        .paper-kpis>div{border:1px solid #E5E7EB;border-radius:10px;padding:11px;background:#F9FAFB;min-width:0}
        .paper-kpis small{display:block}.paper-kpis b{display:block;font-size:19px;letter-spacing:-.4px;margin:3px 0;white-space:nowrap}
        .paper-kpis em{font-size:11px;font-style:normal}.paper-kpis.three{grid-template-columns:repeat(3,1fr)}
        .positive{color:#059669;font-weight:600}.negative{color:#DC2626;font-weight:600}
        .paper-copy{font-size:13px;line-height:1.65;color:#374151}
        .report-paper table{width:100%;border-collapse:collapse;font-size:12px}
        .report-paper th{text-align:left;color:#6B7280;font-size:11px;padding:8px 4px;border-bottom:1px solid #E5E7EB}
        .report-paper td{padding:8px 4px;border-bottom:1px solid #F3F4F6}
        .report-paper th:not(:first-child),.report-paper td:not(:first-child){text-align:right}
        .paper-two{display:grid;grid-template-columns:.8fr 1.2fr;gap:22px;align-items:center}
        .paper-donut svg{display:block;width:170px;max-width:100%;margin:auto}
        .paper-dot{display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:7px}
        .paper-goal{margin:12px 0}.paper-goal>div:first-child{display:flex;justify-content:space-between;gap:8px;font-size:12px}.paper-goal span{color:#6B7280}
        .paper-progress{height:8px;background:#EEF0F3;border-radius:8px;overflow:hidden;margin-top:5px}.paper-progress i{height:100%;display:block;border-radius:8px}
        .paper-charts>div{min-width:0}.paper-charts svg{width:100%;display:block}.paper-legend{display:flex;gap:14px;font-size:11px;color:#6B7280}.paper-legend span:first-child:before,.paper-legend span:last-child:before{content:'';display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:5px;background:#10B981}.paper-legend span:last-child:before{background:#F26B5B}
        .paper-insight{border-left:3px solid #635BFF;background:#F5F4FF;padding:10px 13px;border-radius:0 9px 9px 0;margin-bottom:9px;font-size:12px;color:#374151}
        .paper-insight b{display:block;margin-bottom:2px;color:#111827}
        .paper-footer{margin-top:34px;padding-top:13px;border-top:1px solid #E5E7EB;display:flex;justify-content:space-between;gap:8px;color:#9CA3AF;font-size:10px}
        @media(max-width:760px){.report-paper{padding:28px 20px}.paper-kpis{grid-template-columns:repeat(2,1fr)}.paper-two{grid-template-columns:1fr}.paper-header{flex-direction:column}.paper-title{text-align:left}.paper-footer{flex-direction:column}.report-preview-toolbar{align-items:flex-start;flex-direction:column}}
        @media print{@page{size:A4;margin:12mm}body{background:#fff!important}.global-sidebar,.reports-header,.no-print,.reports-toast{display:none!important}.reports-page{padding:0!important}.report-paper{max-width:none;box-shadow:none;padding:0;border-radius:0}.paper-header,.report-paper h2{break-after:avoid}.report-paper table,.paper-kpis,.paper-insight,.paper-goal{break-inside:avoid}}
      `}</style>
    </>
  );
}
