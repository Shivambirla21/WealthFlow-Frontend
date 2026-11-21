import { useState } from 'react';

export default function PortfolioPerformance() {
  const [range, setRange] = useState('1Y');
  const [hoverIndex, setHoverIndex] = useState(null);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const rangeConfig = {
    '1M': { n: 30, v: 1240000, i: 1090000, unit: 'd' },
    '6M': { n: 26, v: 1120000, i: 1040000, unit: 'w' },
    '1Y': { n: 52, v: 980000, i: 860000, unit: 'w' },
    'All': { n: 60, v: 300000, i: 280000, unit: 'm' }
  };

  const generateData = (r) => {
    const c = rangeConfig[r];
    const n = c.n;
    const e = new Date(2026, 8, 30);
    const data = [];

    for (let i = 0; i < n; i++) {
      const u = i / (n - 1);
      const ns = Math.sin(i * 1.9) * 0.018 + Math.sin(i * 0.5) * 0.025;
      const v = i === n - 1 ? 1284000 : c.v + (1284000 - c.v) * Math.pow(u, 1.1) + 1284000 * ns * (1 - u * 0.5);
      const iv = c.i + (1100000 - c.i) * u;
      const d = new Date(e);
      if (c.unit === 'd') d.setDate(e.getDate() - (n - 1 - i));
      else if (c.unit === 'w') d.setDate(e.getDate() - 7 * (n - 1 - i));
      else d.setMonth(e.getMonth() - (n - 1 - i));
      data.push({ v, i: iv, d, t: c.unit === 'm' ? `${monthNames[d.getMonth()]} '${String(d.getFullYear()).slice(2)}` : `${monthNames[d.getMonth()]} ${d.getDate()}` });
    }
    return data;
  };

  const data = generateData(range);
  const W = 1000;
  const H = 280;
  const pt = 14;
  const pb = 32;
  const n = data.length;
  const mx = Math.max(...data.map(p => p.v)) * 1.05;
  const mn = Math.min(...data.map(p => Math.min(p.v, p.i))) * 0.9;

  const X = (i) => (i * W) / (n - 1);
  const Y = (v) => H - pb - (H - pb - pt) * (v - mn) / (mx - mn);

  const formatValue = (v) => '₹' + Math.round(v).toLocaleString('en-IN');

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const u = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverIndex(Math.round(u * (n - 1)));
  };

  const handleMouseLeave = () => setHoverIndex(null);

  const hoverData = hoverIndex !== null ? data[hoverIndex] : null;
  const gain = hoverData ? hoverData.v - hoverData.i : 0;

  return (
    <div className="portfolio-performance">
      <h3>
        Portfolio performance
        <span className="pill">
          {['1M', '6M', '1Y', 'All'].map(r => (
            <button
              key={r}
              type="button"
              className={range === r ? 'on' : ''}
              onClick={() => setRange(r)}
            >
              {r}
            </button>
          ))}
        </span>
      </h3>
      <div className="subtitle">Portfolio value vs amount invested</div>
      <div className="chart-container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#635BFF" stopOpacity="0.32" />
              <stop offset="1" stopColor="#635BFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 0.25, 0.5, 0.75, 1].map(g => (
            <line
              key={g}
              x1="0"
              x2={W}
              y1={pt + (H - pb - pt) * g}
              y2={pt + (H - pb - pt) * g}
              stroke="var(--border)"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <path
            d={data.map((p, i) => `${i === 0 ? 'M' : 'L'}${X(i).toFixed(1)} ${Y(p.i).toFixed(1)}`).join(' ')}
            fill="none"
            stroke="#6B7280"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`${data.map((p, i) => `${i === 0 ? 'M' : 'L'}${X(i).toFixed(1)} ${Y(p.v).toFixed(1)}`).join(' ')} L${W} ${H - pb} L0 ${H - pb} Z`}
            fill="url(#pg)"
          />
          <path
            d={data.map((p, i) => `${i === 0 ? 'M' : 'L'}${X(i).toFixed(1)} ${Y(p.v).toFixed(1)}`).join(' ')}
            fill="none"
            stroke="#635BFF"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          />
          {hoverIndex !== null && (
            <line
              x1={X(hoverIndex)}
              x2={X(hoverIndex)}
              y1={pt}
              y2={H - pb}
              stroke="#635BFF"
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
            />
          )}
        </svg>
        {hoverData && (
          <div className="tooltip" style={{ left: `${(hoverIndex / (n - 1)) * 100}%` }}>
            <span className="l">{hoverData.d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <br />
            Value <b>{formatValue(hoverData.v)}</b>
            <br />
            Invested <b>{formatValue(hoverData.i)}</b>
            <br />
            Return <b style={{ color: gain >= 0 ? 'var(--success)' : 'var(--danger)' }}>
              {gain >= 0 ? '▲ +' : '▼ −'}{formatValue(Math.abs(gain))}
            </b>
          </div>
        )}
        <div className="xlabels">
          {[0, 0.25, 0.5, 0.75, 1].map(u => {
            const i = Math.round(u * (n - 1));
            return (
              <span key={u} style={{ left: `${u * 100}%` }}>
                {data[i].t}
              </span>
            );
          })}
        </div>
      </div>
      <div className="legend">
        <span><i className="dot" style={{ background: '#635BFF' }}></i>Portfolio value</span>
        <span><i className="dot" style={{ background: '#6B7280' }}></i>Invested</span>
      </div>
      <style>{`
        .portfolio-performance {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
        }

        .portfolio-performance h3 {
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

        .pill {
          display: inline-flex;
          gap: 2px;
          background: var(--bg);
          border-radius: 8px;
          padding: 3px;
        }

        .pill button {
          padding: 4px 11px;
          border-radius: 6px;
          font-size: 12px;
          color: var(--text-muted);
          cursor: pointer;
          background: transparent;
          border: none;
          font-family: inherit;
        }

        .pill button.on {
          background: var(--surface);
          color: var(--text);
          box-shadow: 0 1px 2px rgba(0,0,0,0.25);
        }

        .chart-container {
          position: relative;
          margin-top: 14px;
        }

        .tooltip {
          position: absolute;
          pointer-events: none;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 12px;
          line-height: 1.7;
          box-shadow: 0 12px 30px rgba(0,0,0,0.25);
          min-width: 180px;
          z-index: 3;
          transform: translateX(-50%);
          top: 14px;
        }

        .tooltip b {
          float: right;
          margin-left: 16px;
        }

        .xlabels {
          display: flex;
          gap: 16px;
          margin-top: 8px;
          font-size: 12px;
          color: var(--text-muted);
          position: relative;
          height: 20px;
        }

        .xlabels span {
          position: absolute;
          bottom: 2px;
          transform: translateX(-50%);
        }

        .legend {
          display: flex;
          gap: 16px;
          margin-top: 8px;
          font-size: 12px;
          color: var(--text-muted);
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
