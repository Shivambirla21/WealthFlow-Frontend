import { useState } from 'react';

export default function NetWorthHero({ currency = '₹' }) {
  const [range, setRange] = useState('1Y');
  const [scope, setScope] = useState('n');

  const data = {
    netWorth: 84620,
    change: 8.4,
    changeAmount: 6570,
    totalAssets: 105820,
    totalLiabilities: 21200
  };

  return (
    <div className="networth-hero">
      <div>
        <div className="label">Net Worth</div>
        <div className="big">{currency}{data.netWorth.toLocaleString()}</div>
        <span className="up">↑ +{data.change}%</span> <span className="label">vs last month · +{currency}{data.changeAmount.toLocaleString()}</span>
        <div className="sub">
          <div><span className="label">Total assets</span><span style={{ color: 'var(--success)' }}>{currency}{data.totalAssets.toLocaleString()}</span></div>
          <div><span className="label">Total liabilities</span><span style={{ color: 'var(--danger)' }}>{currency}{data.totalLiabilities.toLocaleString()}</span></div>
        </div>
      </div>

      <div className="controls">
        <div className="pill" id="range">
          <button className={range === '1M' ? 'active' : ''} onClick={() => setRange('1M')}>1M</button>
          <button className={range === '6M' ? 'active' : ''} onClick={() => setRange('6M')}>6M</button>
          <button className={range === '1Y' ? 'active' : ''} onClick={() => setRange('1Y')}>1Y</button>
          <button className={range === '5Y' ? 'active' : ''} onClick={() => setRange('5Y')}>5Y</button>
          <button className={range === 'All' ? 'active' : ''} onClick={() => setRange('All')}>All</button>
        </div>
        <div className="pill" id="scope">
          <button className={scope === 'n' ? 'active' : ''} onClick={() => setScope('n')}>Net Worth</button>
          <button className={scope === 'a' ? 'active' : ''} onClick={() => setScope('a')}>Assets</button>
          <button className={scope === 'l' ? 'active' : ''} onClick={() => setScope('l')}>Liabilities</button>
        </div>
      </div>

      <style>{`
        .networth-hero {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          flex-wrap: wrap;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 26px;
        }

        .label {
          color: var(--text-muted);
          font-size: 13px;
        }

        .big {
          font-size: 56px;
          font-weight: 700;
          letter-spacing: -2.5px;
          line-height: 1.05;
          margin: 6px 0 8px;
        }

        .up {
          color: var(--success);
          font-weight: 600;
          font-size: 14px;
        }

        .dn {
          color: var(--danger);
          font-weight: 600;
          font-size: 13px;
        }

        .sub {
          display: flex;
          gap: 28px;
          margin-top: 6px;
        }

        .sub div span:first-child {
          display: block;
          font-size: 20px;
          letter-spacing: -0.5px;
          margin-top: 2px;
        }

        .controls {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-end;
        }

        .pill {
          display: inline-flex;
          gap: 2px;
          background: var(--bg);
          border-radius: 9px;
          padding: 3px;
        }

        .pill button {
          padding: 5px 12px;
          border-radius: 7px;
          font-size: 12.5px;
          color: var(--text-muted);
          cursor: pointer;
          background: transparent;
          border: none;
          transition: all 0.15s ease;
        }

        .pill button:hover {
          color: var(--text);
        }

        .pill button.active {
          background: var(--surface);
          color: var(--text);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        @media (max-width: 768px) {
          .networth-hero {
            flex-direction: column;
          }

          .controls {
            align-items: stretch;
          }

          .sub {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}
