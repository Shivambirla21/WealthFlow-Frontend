export default function InvestmentReturns() {
  const assets = [
    { name: 'Equity', color: '#635BFF', value: 440000, gain: 72000 },
    { name: 'Mutual Funds', color: '#A78BFA', value: 385000, gain: 58000 },
    { name: 'Debt', color: '#60A5FA', value: 160000, gain: 9000 },
    { name: 'Gold', color: '#F59E0B', value: 100000, gain: 14500 },
    { name: 'Real Estate', color: '#14B8A6', value: 90000, gain: 12000 },
    { name: 'Crypto', color: '#F26B5B', value: 60000, gain: 17500 },
    { name: 'Cash', color: '#9CA3AF', value: 49000, gain: 1000 }
  ];

  const returns = assets.map(a => ({
    name: a.name,
    returnPct: a.gain / (a.value - a.gain) * 100,
    color: a.color
  })).sort((a, b) => b.returnPct - a.returnPct);

  const formatPct = (v) => (v >= 0 ? '+' : '−') + Math.abs(v).toFixed(1) + '%';

  return (
    <div className="investment-returns">
      <h3>Investment returns</h3>
      <div className="subtitle">Return % by asset class</div>
      <div className="returns-list">
        {returns.map(r => (
          <div key={r.name} className="return-bar">
            <span>{r.name}</span>
            <span className="track"><i style={{ width: `${r.returnPct / 42 * 100}%`, background: r.color }}></i></span>
            <b className="up">▲ {formatPct(r.returnPct)}</b>
          </div>
        ))}
      </div>
      <style>{`
        .investment-returns {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
        }

        .investment-returns h3 {
          font-size: 16px;
          margin-bottom: 2px;
          font-weight: 600;
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
        }

        .returns-list {
          margin-top: 10px;
        }

        .return-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 13px 0;
          font-size: 13px;
        }

        .return-bar > span:first-child {
          width: 92px;
          color: var(--text-muted);
        }

        .return-bar .track {
          flex: 1;
          height: 10px;
          background: var(--bg);
          border-radius: 10px;
          overflow: hidden;
        }

        .return-bar .track i {
          display: block;
          height: 100%;
          border-radius: 10px;
        }

        .return-bar b {
          width: 58px;
          text-align: right;
        }

        .return-bar b.up {
          color: var(--success);
          font-weight: 600;
        }

        .return-bar b.down {
          color: var(--danger);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
