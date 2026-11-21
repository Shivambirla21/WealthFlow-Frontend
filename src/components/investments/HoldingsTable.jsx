import { useState } from 'react';

export default function HoldingsTable({ assetFilter }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('All');
  const [sortKey, setSortKey] = useState('v');
  const [sortDir, setSortDir] = useState(-1);

  const assets = [
    { name: 'Equity', color: '#635BFF' },
    { name: 'Mutual Funds', color: '#A78BFA' },
    { name: 'Debt', color: '#60A5FA' },
    { name: 'Gold', color: '#F59E0B' },
    { name: 'Real Estate', color: '#14B8A6' },
    { name: 'Crypto', color: '#F26B5B' },
    { name: 'Cash', color: '#9CA3AF' }
  ];

  const colorMap = {};
  assets.forEach(a => colorMap[a.name] = a.color);

  const holdings = [
    { name: 'Reliance Industries', type: 'Equity', qty: 40, avgPrice: 2380, currPrice: 2910 },
    { name: 'HDFC Bank', type: 'Equity', qty: 70, avgPrice: 1420, currPrice: 1688 },
    { name: 'TCS', type: 'Equity', qty: 15, avgPrice: 3400, currPrice: 3820 },
    { name: 'Infosys', type: 'Equity', qty: 30, avgPrice: 1500, currPrice: 1590 },
    { name: 'Nifty 50 Index Fund', type: 'Mutual Funds', qty: 1000, avgPrice: 148, currPrice: 176.4 },
    { name: 'Parag Parikh Flexi Cap', type: 'Mutual Funds', qty: 2200, avgPrice: 62, currPrice: 74.5 },
    { name: 'HDFC Short Term Debt', type: 'Debt', qty: 2200, avgPrice: 52, currPrice: 56.2 },
    { name: 'Sovereign Gold Bond', type: 'Gold', qty: 12, avgPrice: 5800, currPrice: 6900 },
    { name: 'Bitcoin', type: 'Crypto', qty: 0.02, avgPrice: 2100000, currPrice: 2480000 },
    { name: 'Embassy REIT', type: 'Real Estate', qty: 200, avgPrice: 290, currPrice: 310 }
  ];

  const computedHoldings = holdings.map(h => ({
    ...h,
    value: h.qty * h.currPrice,
    gain: h.qty * (h.currPrice - h.avgPrice),
    returnPct: (h.currPrice - h.avgPrice) / h.avgPrice * 100
  }));

  const filteredHoldings = computedHoldings.filter(h => {
    const matchesClass = filterClass === 'All' || h.type === filterClass;
    const matchesSearch = !searchQuery || (h.name + h.type).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const sortedHoldings = [...filteredHoldings].sort((a, b) => {
    const x = a[sortKey];
    const y = b[sortKey];
    const cmp = typeof x === 'string' ? x.localeCompare(y) : x - y;
    return cmp * sortDir * (sortKey === 'n' ? -1 : 1);
  });

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir * -1);
    } else {
      setSortKey(key);
      setSortDir(-1);
    }
  };

  const handleFilterClick = (cls) => {
    setFilterClass(filterClass === cls ? 'All' : cls);
  };

  const formatValue = (v) => '₹' + Math.round(v).toLocaleString('en-IN');
  const formatPrice = (v) => '₹' + v.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  const formatPct = (v) => (v >= 0 ? '+' : '−') + Math.abs(v).toFixed(1) + '%';

  const columns = [
    { key: 'n', label: 'Asset' },
    { key: 'qt', label: 'Quantity' },
    { key: 'av', label: 'Avg price' },
    { key: 'cu', label: 'Current price' },
    { key: 'v', label: 'Value' },
    { key: 'g', label: 'Gain / Loss' },
    { key: 'r', label: 'Return %' }
  ];

  return (
    <div className="holdings-table">
      <h3>
        Holdings
        <span className="subtitle">{sortedHoldings.length} of 24 holdings</span>
      </h3>
      <div className="toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="Search holdings…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="filter-chips">
          <button
            type="button"
            className={filterClass === 'All' ? 'on' : ''}
            onClick={() => handleFilterClick('All')}
          >
            All
          </button>
          {assets.map(a => (
            <button
              key={a.name}
              type="button"
              className={filterClass === a.name ? 'on' : ''}
              onClick={() => handleFilterClick(a.name)}
            >
              {a.name}
            </button>
          ))}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className="sortable"
                onClick={() => handleSort(col.key)}
              >
                {col.label}
                {sortKey === col.key && (sortDir < 0 ? ' ▼' : ' ▲')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedHoldings.map(h => {
            const isPositive = h.gain >= 0;
            return (
              <tr key={h.name}>
                <td>
                  <span className="swatch" style={{ background: colorMap[h.type] }}></span>
                  <b>{h.name}</b>
                  <span className="tag">{h.type}</span>
                </td>
                <td>{h.qty.toLocaleString('en-IN', { maximumFractionDigits: 3 })}</td>
                <td>{formatPrice(h.avgPrice)}</td>
                <td>{formatPrice(h.currPrice)}</td>
                <td><b>{formatValue(h.value)}</b></td>
                <td className={isPositive ? 'up' : 'down'}>
                  {isPositive ? '▲ +' : '▼ −'}{formatValue(Math.abs(h.gain))}
                </td>
                <td className={isPositive ? 'up' : 'down'}>{formatPct(h.returnPct)}</td>
              </tr>
            );
          })}
          {sortedHoldings.length === 0 && (
            <tr>
              <td colSpan="7" className="no-results">
                No holdings match.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <style>{`
        .holdings-table {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
        }

        .holdings-table h3 {
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

        .toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin: 14px 0 6px;
        }

        .search-input {
          padding: 9px 14px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--bg);
          color: var(--text);
          font: inherit;
          width: 240px;
          outline: none;
        }

        .search-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.25);
        }

        .filter-chips {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .filter-chips button {
          padding: 6px 12px;
          border: 1px solid var(--border);
          border-radius: 20px;
          font-size: 12px;
          color: var(--text-muted);
          cursor: pointer;
          background: transparent;
          font-family: inherit;
        }

        .filter-chips button.on {
          background: var(--primary-soft);
          border-color: var(--primary);
          color: #A5A0FF;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          text-align: right;
          color: var(--text-muted);
          font-weight: 500;
          font-size: 12px;
          padding: 10px 12px;
          border-bottom: 1px solid var(--border);
          white-space: nowrap;
          user-select: none;
        }

        th:first-child,
        td:first-child {
          text-align: left;
        }

        td {
          padding: 13px 12px;
          border-bottom: 1px solid var(--border);
          text-align: right;
        }

        tr:last-child td {
          border: 0;
        }

        th.sortable {
          cursor: pointer;
        }

        th.sortable:hover {
          color: var(--text);
        }

        tr {
          cursor: pointer;
          transition: background 0.15s;
        }

        tr:hover td {
          background: rgba(99, 91, 255, 0.07);
        }

        .swatch {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 3px;
          margin-right: 10px;
        }

        .tag {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 12px;
          background: var(--primary-soft);
          color: #A5A0FF;
          margin-left: 8px;
          font-weight: 600;
        }

        .no-results {
          color: var(--text-muted);
          text-align: center;
          padding: 30px;
        }

        .up {
          color: var(--success);
          font-weight: 600;
        }

        .down {
          color: var(--danger);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
