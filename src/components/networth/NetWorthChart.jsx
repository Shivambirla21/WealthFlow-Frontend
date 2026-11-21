import { useState } from 'react';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function NetWorthChart({ currency = '₹' }) {
  const [range, setRange] = useState('1Y');
  const [scope, setScope] = useState('n');
  const [hoverPoint, setHoverPoint] = useState(null);

  const generateData = (r) => {
    const configs = {
      '1M': [30, 82100, 22000, 'd'],
      '6M': [26, 68500, 26500, 'w'],
      '1Y': [52, 62200, 30000, 'w'],
      '5Y': [60, 9000, 52000, 'm'],
      'All': [84, 1500, 60000, 'm']
    };
    const c = configs[r];
    const n = c[0];
    const E = 84620;
    const LE = 21200;
    const data = [];
    const e = new Date(2026, 8, 30);

    for (let i = 0; i < n; i++) {
      const u = i / (n - 1);
      const ns = Math.sin(i * 1.7) * 0.015 + Math.sin(i * 0.6) * 0.02;
      const nw = i === n - 1 ? E : c[1] + (E - c[1]) * (Math.pow(u, 1.15) + ns * (1 - u * 0.2));
      const L = i === n - 1 ? LE : LE + (c[2] - LE) * (1 - u) + (i < n - 1 ? Math.sin(i) * 300 : 0);
      const d = new Date(e);
      if (c[3] === 'd') d.setDate(e.getDate() - (n - 1 - i));
      else if (c[3] === 'w') d.setDate(e.getDate() - 7 * (n - 1 - i));
      else d.setMonth(e.getMonth() - (n - 1 - i));
      data.push({
        nw,
        l: L,
        a: nw + L,
        d,
        t: c[3] === 'm' ? `${monthNames[d.getMonth()]} '${String(d.getFullYear()).slice(2)}` : `${monthNames[d.getMonth()]} ${d.getDate()}`
      });
    }
    return data;
  };

  const P = generateData(range);
  const W = 1000;
  const H = 320;
  const pt = 20;
  const pb = 34;
  const key = scope;
  const vals = P.map(p => p[key]);
  const all = scope === 'n' ? P.map(p => p.a).concat(vals) : vals;
  const mx = Math.max(...all) * 1.06;
  const mn = scope === 'n' ? 0 : Math.min(...vals) * 0.85;
  const n = P.length;

  const X = (i) => (i * W) / (n - 1);
  const Y = (v) => pt + (H - pb - pt) * (v - mn) / (mx - mn);

  const renderChart = () => {
    const elements = [];

    // Grid lines
    for (let g = 0; g < 4; g++) {
      const y = pt + (H - pb - pt) * g / 3;
      elements.push(
        <line key={`grid-${g}`} x1={0} x2={W} y1={y} y2={y} stroke="var(--border)" vectorEffect="non-scaling-stroke" />
      );
    }

    const path = (k) => P.map((p, i) => `${i === 0 ? 'M' : 'L'}${X(i).toFixed(1)} ${Y(p[k]).toFixed(1)}`).join(' ');

    if (scope === 'n') {
      elements.push(
        <path key="assets-dash" d={path('a')} fill="none" stroke="var(--success)" strokeWidth="1.5" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" opacity={0.8} />
      );
      elements.push(
        <path key="liabilities-dash" d={path('l')} fill="none" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" opacity={0.8} />
      );
    }

    const col = scope === 'l' ? 'var(--danger)' : scope === 'a' ? 'var(--success)' : 'var(--primary)';
    elements.push(
      <path key="area" d={`${path(key)} L${W} ${H - pb} L0 ${H - pb}Z`} fill="url(#gradient)" />
    );
    elements.push(
      <path key="line" d={path(key)} fill="none" stroke={col} strokeWidth={3} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    );

    // X-axis labels
    const tickPositions = [0, 0.25, 0.5, 0.75, 1];
    tickPositions.forEach(u => {
      const i = Math.round(u * (n - 1));
      elements.push(
        <span key={`label-${i}`} style={{ position: 'absolute', bottom: '2px', left: `${u * 100}%`, transform: u === 0 ? 'none' : u === 1 ? 'translateX(-100%)' : 'translateX(-50%)', fontSize: '11px', color: '#9CA3AF' }}>
          {P[i].t}
        </span>
      );
    });

    // Vertical line on hover
    if (hoverPoint !== null) {
      const u = hoverPoint / (n - 1);
      elements.push(
        <line key="vline" x1={u * 1000} x2={u * 1000} y1={pt} y2={H - pb} stroke="var(--primary)" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
      );
    }

    return elements;
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const u = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const i = Math.round(u * (P.length - 1));
    setHoverPoint(i);
  };

  const handleMouseLeave = () => setHoverPoint(null);

  const formatCurrency = (v) => `${currency}${Math.round(v).toLocaleString('en-IN')}`;

  return (
    <div className="networth-chart" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={scope === 'l' ? '#F26B5B' : scope === 'a' ? '#10B981' : '#635BFF'} stopOpacity="0.32" />
            <stop offset="1" stopColor="#635BFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {renderChart()}
      </svg>

      {hoverPoint !== null && (
        <div className="tooltip" style={{ left: `${(hoverPoint / (P.length - 1)) * 100}%` }}>
          <span className="label">{P[hoverPoint].d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span><br />
          Assets <span style={{ color: 'var(--success)' }}>{formatCurrency(P[hoverPoint].a)}</span><br />
          Liabilities <span style={{ color: 'var(--danger)' }}>{formatCurrency(P[hoverPoint].l)}</span><br />
          Net worth <span>{formatCurrency(P[hoverPoint].nw)}</span>
        </div>
      )}

      <div className="legend">
        <span><i className="dot" style={{ background: 'var(--primary)' }}></i>Net worth</span>
        <span><i className="dot" style={{ background: 'var(--success)' }}></i>Assets</span>
        <span><i className="dot" style={{ background: 'var(--danger)' }}></i>Liabilities</span>
      </div>

      <style>{`
        .networth-chart {
          position: relative;
          margin-top: 18px;
        }

        .tooltip {
          position: absolute;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 12px;
          line-height: 1.7;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.24);
          min-width: 170px;
          pointer-events: none;
        }

        .tooltip span:first-child {
          color: var(--text-muted);
        }

        .tooltip span {
          color: var(--text);
        }

        .tooltip b {
          float: right;
          margin-left: 16px;
        }

        .legend {
          display: flex;
          gap: 18px;
          font-size: 12px;
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

        @media (max-width: 768px) {
          .networth-chart svg {
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
}
