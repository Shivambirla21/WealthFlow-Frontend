export default function DebtAnalytics() {
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const payments = [41200, 42635, 42635, 44900, 42635, 42635];
  const interest = [17400, 17200, 17000, 16900, 16800, 16600];
  const principal = payments.map((p, i) => p - interest[i]);

  const formatK = (v) => '₹' + (v / 1000).toFixed(1) + 'k';

  // Debt balance over time chart
  const N = 13;
  const balanceData = [];
  for (let i = 0; i < N; i++) {
    const u = i / (N - 1);
    const val = 2378000 - (2378000 - 2066200) * u + Math.sin(i * 1.3) * 4000 * (1 - u);
    balanceData.push(i === N - 1 ? 2066200 : val);
  }

  const W1 = 520;
  const H1 = 220;
  const mx1 = 2450000;
  const mn1 = 2000000;
  const X1 = (i) => 20 + i * (W1 - 40) / (N - 1);
  const Y1 = (a) => H1 - 30 - (H1 - 50) * (a - mn1) / (mx1 - mn1);
  const formatValue = (v) => '₹' + Math.round(v).toLocaleString('en-IN');

  const balancePath = balanceData.map((a, i) => `${i === 0 ? 'M' : 'L'}${X1(i)} ${Y1(a)}`).join(' ');

  // Bar chart helper
  const renderBarChart = (data, labels, color, formatFn, stackedData = null) => {
    const W = 520;
    const H = 220;
    const mx = Math.max(...(stackedData ? data.map((a, i) => a + stackedData[i]) : data)) * 1.15;
    const bw = 36;
    const n = data.length;
    const sw = (W - 20) / n;

    let svg = '';
    for (let g = 0; g < 4; g++) {
      const y = 10 + (H - 50) * g / 3;
      svg += `<line x1="0" x2="${W}" y1="${y}" y2="${y}" stroke="var(--border)"/>`;
    }

    data.forEach((a, i) => {
      const x = 10 + i * sw + (sw - bw) / 2;
      const h = (H - 50) * a / mx;
      const y = H - 30 - h;
      svg += `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="6" fill="${color}"><title>${labels[i]}: ${formatFn(a)}</title></rect>`;
      if (stackedData) {
        const h2 = (H - 50) * stackedData[i] / mx;
        svg += `<rect x="${x}" y="${y - h2}" width="${bw}" height="${h2}" rx="6" fill="#F26B5B"><title>${labels[i]} interest: ${formatFn(stackedData[i])}</title></rect>`;
      } else {
        svg += `<text x="${x + bw / 2}" y="${y - 6}" font-size="11" text-anchor="middle" fill="#9CA3AF">${formatFn(a)}</text>`;
      }
      svg += `<text x="${x + bw / 2}" y="${H - 10}" font-size="11" text-anchor="middle" fill="#9CA3AF">${labels[i]}</text>`;
    });

    return svg;
  };

  return (
    <div className="debt-analytics">
      <h2>Debt analytics</h2>
      <div className="two-column">
        <div className="card">
          <h3>Debt balance over time</h3>
          <div className="subtitle">Total outstanding, last 12 months</div>
          <div className="chart">
            <svg width="100%" height={H1} viewBox={`0 0 ${W1} ${H1}`}>
              <defs>
                <linearGradient id="gd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#F26B5B" stopOpacity="0.28" />
                  <stop offset="1" stopColor="#F26B5B" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 0.25, 0.5, 0.75, 1].map(g => {
                const y = 10 + (H1 - 50) * g / 3;
                return <line key={g} x1="0" x2={W1} y1={y} y2={y} stroke="var(--border)" />;
              })}
              <path d={`${balancePath} L${X1(N - 1)} ${H1 - 30} L${X1(0)} ${H1 - 30} Z`} fill="url(#gd)" />
              <path d={balancePath} fill="none" stroke="#F26B5B" strokeWidth="3" />
              <circle cx={X1(N - 1)} cy={Y1(balanceData[N - 1])} r="6" fill="#fff" stroke="#F26B5B" strokeWidth="3" />
              <text x={X1(0)} y={H1 - 8} fontSize="11" fill="#9CA3AF">Oct '25</text>
              <text x={X1(N - 1)} y={H1 - 8} fontSize="11" textAnchor="end" fill="#9CA3AF">Oct '26</text>
              <text x={X1(0)} y={Y1(balanceData[0]) - 10} fontSize="11" fill="#9CA3AF">{formatValue(balanceData[0])}</text>
              <text x={X1(N - 1) - 8} y={Y1(balanceData[N - 1]) - 12} fontSize="11" textAnchor="end" fill="var(--text)">{formatValue(balanceData[N - 1])}</text>
            </svg>
          </div>
        </div>
        <div className="card">
          <h3>Monthly payments</h3>
          <div className="subtitle">Total paid toward debt each month</div>
          <div className="chart">
            <svg width="100%" height="220" viewBox="0 0 520 220" dangerouslySetInnerHTML={{ __html: renderBarChart(payments, months, '#635BFF', formatK) }} />
          </div>
        </div>
        <div className="card">
          <h3>Interest paid</h3>
          <div className="subtitle">Cost of borrowing each month</div>
          <div className="chart">
            <svg width="100%" height="220" viewBox="0 0 520 220" dangerouslySetInnerHTML={{ __html: renderBarChart(interest, months, '#F26B5B', formatK) }} />
          </div>
        </div>
        <div className="card">
          <h3>Principal vs interest</h3>
          <div className="subtitle">What your payments actually reduce</div>
          <div className="chart">
            <svg width="100%" height="220" viewBox="0 0 520 220" dangerouslySetInnerHTML={{ __html: renderBarChart(principal, months, '#635BFF', formatK, interest) }} />
          </div>
          <div className="legend">
            <span><i className="dot" style={{ background: '#635BFF' }}></i>Principal</span>
            <span><i className="dot" style={{ background: '#F26B5B' }}></i>Interest</span>
          </div>
        </div>
      </div>
      <style>{`
        .debt-analytics {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .debt-analytics h2 {
          font-size: 20px;
          letter-spacing: -0.4px;
          margin-top: 10px;
        }

        .two-column {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
        }

        .card h3 {
          font-size: 16px;
          margin-bottom: 2px;
          font-weight: 600;
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
        }

        .chart {
          margin-top: 12px;
        }

        .chart svg {
          display: block;
        }

        .legend {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
          font-size: 12.5px;
          color: var(--text-muted);
          margin-top: 8px;
        }

        .dot {
          display: inline-block;
          width: 9px;
          height: 9px;
          border-radius: 3px;
          margin-right: 6px;
        }
      `}</style>
    </div>
  );
}
