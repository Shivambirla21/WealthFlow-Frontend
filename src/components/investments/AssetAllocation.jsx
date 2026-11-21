import { useState } from 'react';

export default function AssetAllocation({ onFilterChange }) {
  const [selectedClass, setSelectedClass] = useState('All');

  const assets = [
    { name: 'Equity', color: '#635BFF', value: 440000, gain: 72000 },
    { name: 'Mutual Funds', color: '#A78BFA', value: 385000, gain: 58000 },
    { name: 'Debt', color: '#60A5FA', value: 160000, gain: 9000 },
    { name: 'Gold', color: '#F59E0B', value: 100000, gain: 14500 },
    { name: 'Real Estate', color: '#14B8A6', value: 90000, gain: 12000 },
    { name: 'Crypto', color: '#F26B5B', value: 60000, gain: 17500 },
    { name: 'Cash', color: '#9CA3AF', value: 49000, gain: 1000 }
  ];

  const total = 1284000;

  const handleClassClick = (assetClass) => {
    const newSelection = selectedClass === assetClass ? 'All' : assetClass;
    setSelectedClass(newSelection);
    if (onFilterChange) onFilterChange(newSelection);
  };

  const formatValue = (v) => '₹' + Math.round(v).toLocaleString('en-IN');

  let offset = 0;
  const donutSlices = assets.map((a, i) => {
    const pct = a.value / total * 100;
    const slice = (
      <circle
        key={a.name}
        cx="21"
        cy="21"
        r="15.9"
        fill="none"
        stroke={a.color}
        strokeWidth="5"
        strokeDasharray={`${pct - 0.5} ${100 - pct + 0.5}`}
        strokeDashoffset={-offset}
        transform="rotate(-90 21 21)"
        style={{ cursor: 'pointer' }}
        onClick={() => handleClassClick(a.name)}
      >
        <title>{a.name} {pct.toFixed(1)}%</title>
      </circle>
    );
    offset += pct;
    return slice;
  });

  return (
    <div className="asset-allocation">
      <h3>
        Asset allocation
        <span className="subtitle">Click a class to filter holdings</span>
      </h3>
      <div className="allocation-layout">
        <div className="donut-container">
          <svg width="260" height="260" viewBox="0 0 42 42">
            {donutSlices}
            <text x="21" y="19.5" textAnchor="middle" fontSize="2.8" fill="#9CA3AF">Total value</text>
            <text x="21" y="24.5" textAnchor="middle" fontSize="4.6" fontWeight="700" fill="var(--text)">₹12.84L</text>
          </svg>
        </div>
        <table className="allocation-table">
          <thead>
            <tr>
              <th>Asset class</th>
              <th>Current value</th>
              <th>% of portfolio</th>
              <th>Gain / Loss</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(a => {
              const pct = a.value / total * 100;
              return (
                <tr
                  key={a.name}
                  className={selectedClass === a.name ? 'selected' : ''}
                  onClick={() => handleClassClick(a.name)}
                >
                  <td>
                    <span className="swatch" style={{ background: a.color }}></span>
                    {a.name}
                  </td>
                  <td>{formatValue(a.value)}</td>
                  <td>{pct.toFixed(1)}%</td>
                  <td className="up">▲ +{formatValue(a.gain).slice(1).replace(/^/, '₹')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <style>{`
        .asset-allocation {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
        }

        .asset-allocation h3 {
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

        .allocation-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 30px;
          align-items: center;
          margin-top: 10px;
        }

        .donut-container {
          position: relative;
        }

        .allocation-table {
          width: 100%;
          border-collapse: collapse;
        }

        .allocation-table th {
          text-align: right;
          color: var(--text-muted);
          font-weight: 500;
          font-size: 12px;
          padding: 10px 12px;
          border-bottom: 1px solid var(--border);
          white-space: nowrap;
        }

        .allocation-table th:first-child,
        .allocation-table td:first-child {
          text-align: left;
        }

        .allocation-table td {
          padding: 13px 12px;
          border-bottom: 1px solid var(--border);
          text-align: right;
        }

        .allocation-table tr:last-child td {
          border: 0;
        }

        .allocation-table tr {
          cursor: pointer;
          transition: background 0.15s;
        }

        .allocation-table tr:hover td {
          background: rgba(99, 91, 255, 0.07);
        }

        .allocation-table tr.selected td {
          background: rgba(99, 91, 255, 0.12);
        }

        .swatch {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 3px;
          margin-right: 10px;
        }

        .allocation-table .up {
          color: var(--success);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
