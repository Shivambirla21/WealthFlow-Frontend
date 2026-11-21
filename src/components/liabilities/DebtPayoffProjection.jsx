import { useState } from 'react';

export default function DebtPayoffProjection({ liabilities }) {
  const [extraPayment, setExtraPayment] = useState(0);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const simulatePayoff = (extra) => {
    const debts = liabilities.map(l => ({
      balance: l.outstanding,
      rate: l.rate / 1200,
      minPayment: l.minPayment
    }));

    const totalBalance = [debts.reduce((sum, d) => sum + d.balance, 0)];
    let totalInterest = 0;
    let months = 0;

    while (totalBalance[totalBalance.length - 1] > 1 && months < 400) {
      months++;
      let pool = extra;

      debts.forEach((d) => {
        if (d.balance <= 0) return;
        const interest = d.balance * d.rate;
        totalInterest += interest;
        d.balance += interest;
        const payment = Math.min(d.minPayment, d.balance);
        d.balance -= payment;
      });

      if (pool > 0) {
        const ordered = debts
          .map((d, i) => i)
          .filter(i => debts[i].balance > 1)
          .sort((a, b) => debts[b].rate - debts[a].rate);

        for (let j = 0; j < ordered.length && pool > 0; j++) {
          const amount = Math.min(pool, debts[ordered[j]].balance);
          debts[ordered[j]].balance -= amount;
          pool -= amount;
        }
      }

      totalBalance.push(Math.max(debts.reduce((sum, d) => sum + Math.max(d.balance, 0), 0), 0));
    }

    return { totalBalance, totalInterest, months };
  };

  const baseline = simulatePayoff(0);

  const formatDate = (months) => {
    const d = new Date(2026, 9 + months, 1);
    return `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
  };

  const formatValue = (v) => '₹' + Math.round(Math.abs(v)).toLocaleString('en-IN');

  const current = simulatePayoff(extraPayment);

  const W = 1000;
  const H = 250;
  const N = Math.max(baseline.months, 1) + 1;
  const mx = baseline.totalBalance[0] * 1.05;
  const X = (i) => i * W / Math.max(N - 1, 1);
  const Y = (a) => H - 30 - (H - 50) * a / (mx || 1);

  const pathFn = (t) => t.map((a, i) => `${i === 0 ? 'M' : 'L'}${X(i).toFixed(1)} ${Y(a).toFixed(1)}`).join(' ');

  return (
    <div className="debt-payoff-projection">
      <h3>
        Debt payoff projection
        <span className="subtitle">Extra payment goes to the highest-rate debt first</span>
      </h3>
      <div className="projection-display">
        <div>
          <div className="subtitle">Debt-free date</div>
          <div className="big">{formatDate(current.months)}</div>
        </div>
        <div className="key-values">
          <div>
            <span className="subtitle">Time to debt-free</span>
            <b>{Math.floor(current.months / 12)} yrs {current.months % 12} mo</b>
          </div>
          <div>
            <span className="subtitle">Total interest to pay</span>
            <b>{formatValue(current.totalInterest)}</b>
          </div>
          <div>
            <span className="subtitle">vs minimums only</span>
            <b className={extraPayment > 0 ? 'up' : 'subtitle'}>
              {extraPayment > 0
                ? `▼ Saves ${formatValue(baseline.totalInterest - current.totalInterest)} · ${baseline.months - current.months} mo sooner`
                : 'Baseline'}
            </b>
          </div>
        </div>
      </div>
      <div className="slider-row">
        <span className="subtitle">Extra monthly payment</span>
        <b id="ex" style={{ color: 'var(--text)' }}>{formatValue(extraPayment)}</b>
      </div>
      <input
        type="range"
        min="0"
        max="30000"
        step="1000"
        value={extraPayment}
        onChange={(e) => setExtraPayment(parseInt(e.target.value))}
        style={{ width: '100%', accentColor: '#635BFF', margin: '8px 0 2px' }}
      />
      <div className="chart">
        <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="gp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#635BFF" stopOpacity="0.3" />
              <stop offset="1" stopColor="#635BFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 0.25, 0.5, 0.75, 1].map(g => {
            const y = 10 + (H - 50) * g / 3;
            return <line key={g} x1="0" x2={W} y1={y} y2={y} stroke="var(--border)" vectorEffect="non-scaling-stroke" />;
          })}
          <path
            d={pathFn(baseline.totalBalance)}
            fill="none"
            stroke="#6B7280"
            strokeWidth="1.8"
            strokeDasharray="5 5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`${pathFn(current.totalBalance)} L${X(current.totalBalance.length - 1)} ${H - 30} L0 ${H - 30} Z`}
            fill="url(#gp)"
          />
          <path
            d={pathFn(current.totalBalance)}
            fill="none"
            stroke="#635BFF"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="xlabels">
          <span style={{ position: 'absolute', left: 0 }}>Now</span>
          <span style={{ position: 'absolute', left: `${current.months / (N - 1) * 100}%`, transform: 'translateX(-100%)', color: '#A5A0FF', fontWeight: 600 }}>
            ★ Debt-free · {formatDate(current.months)}
          </span>
          <span style={{ position: 'absolute', right: 0 }}>{formatDate(baseline.months)}</span>
        </div>
      </div>
      <div className="legend">
        <span><i className="dot" style={{ background: '#6B7280' }}></i>Minimum payments only</span>
        <span><i className="dot" style={{ background: '#635BFF' }}></i>With extra payment</span>
      </div>
      <style>{`
        .debt-payoff-projection {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
        }

        .debt-payoff-projection h3 {
          font-size: 16px;
          margin-bottom: 2px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
        }

        .projection-display {
          display: flex;
          gap: 28px;
          align-items: center;
          flex-wrap: wrap;
          margin: 14px 0 6px;
        }

        .big {
          font-size: 40px;
          font-weight: 700;
          letter-spacing: -1.5px;
          color: #A5A0FF;
        }

        .key-values {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .key-values div {
          background: var(--bg);
          border-radius: 12px;
          padding: 10px 14px;
          min-width: 150px;
        }

        .key-values b {
          display: block;
          font-size: 16px;
          margin-top: 2px;
        }

        .slider-row {
          display: flex;
          justify-content: space-between;
        }

        .chart {
          margin-top: 12px;
          position: relative;
        }

        .chart svg {
          display: block;
        }

        .xlabels {
          position: relative;
          height: 18px;
          font-size: 11px;
          color: #9CA3AF;
        }

        .xlabels span {
          position: absolute;
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

        .up {
          color: var(--success);
        }
      `}</style>
    </div>
  );
}
