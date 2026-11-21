import { useState } from 'react';

export default function LiabilitiesList({ liabilities, categories, filterCategory, onEdit, onDelete }) {
  const [filter, setFilter] = useState(filterCategory || -1);

  const today = 3;

  const formatValue = (v) => '₹' + Math.round(Math.abs(v)).toLocaleString('en-IN');

  const handleFilterClick = (catIndex) => {
    setFilter(catIndex);
  };

  const visibleCategories = filter >= 0
    ? categories.filter((_, i) => i === filter)
    : categories;

  const filteredLiabilities = filter >= 0
    ? liabilities.filter(l => l.categoryIndex === filter)
    : liabilities;

  if (filteredLiabilities.length === 0) {
    return (
      <div className="liabilities-list">
        <div className="no-liabilities">
          No liabilities yet. Add your first liability to start tracking.
        </div>
        <style>{`
          .liabilities-list {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 22px;
          }

          .no-liabilities {
            color: var(--text-muted);
            text-align: center;
            padding: 40px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="liabilities-list">
      <div className="filter-chips">
        <button
          type="button"
          className={filter < 0 ? 'on' : ''}
          onClick={() => handleFilterClick(-1)}
        >
          All
        </button>
        {categories.map((cat, i) => (
          <button
            key={i}
            type="button"
            className={filter === i ? 'on' : ''}
            onClick={() => handleFilterClick(i)}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div className="list-content">
        {visibleCategories.map((cat, i) => {
          const categoryLiabilities = liabilities.filter(l => l.categoryIndex === i);
          if (categoryLiabilities.length === 0) return null;

          const categoryTotal = categoryLiabilities.reduce((sum, l) => sum + l.outstanding, 0);

          return (
            <div key={i} className="category-section">
              <div className="category-header">
                <div>
                  <span className="icon" style={{ background: `${cat.color}33` }}>{cat.icon}</span>
                  {cat.name}
                  <span className="subtitle"> · {categoryLiabilities.length}</span>
                </div>
                <span className="value">{formatValue(categoryTotal)}</span>
              </div>
              <div className="row header">
                <span>Liability</span>
                <span>Outstanding</span>
                <span>{i === 0 ? 'Credit limit' : 'Original amount'}</span>
                <span>Rate</span>
                <span>Min. payment</span>
                <span>Due date</span>
                <span className="actions-heading"></span>
              </div>
              {categoryLiabilities.map((liability, idx) => {
                const progressPct = i === 0
                  ? (liability.outstanding / liability.creditLimit) * 100
                  : ((liability.originalAmount - liability.outstanding) / liability.originalAmount) * 100;
                const daysUntilDue = (liability.dueDay - today + 31) % 31;
                const isSoon = daysUntilDue <= 3;
                const barColor = i === 0
                  ? (progressPct > 30 ? 'var(--warning)' : 'var(--success)')
                  : 'var(--primary)';

                return (
                  <div key={idx} className="row">
                    <span className="name">
                      <span className="icon">{cat.icon}</span>
                      <span className="details">
                        <b>{liability.name}</b>
                        <span className="subtitle">{liability.status}</span>
                        <div className="bar">
                          <i style={{ width: `${progressPct}%`, background: barColor }}></i>
                        </div>
                        <span className="subtitle" style={{ fontSize: '11px' }}>
                          {i === 0 ? `${progressPct.toFixed(1)}% of limit used` : `${progressPct.toFixed(1)}% repaid`}
                        </span>
                      </span>
                    </span>
                    <span><b>{formatValue(liability.outstanding)}</b></span>
                    <span className="subtitle">{formatValue(i === 0 ? liability.creditLimit : liability.originalAmount)}</span>
                    <span>{liability.rate}%</span>
                    <span>{formatValue(liability.minPayment)}</span>
                    <span className={isSoon ? 'warning' : 'up'}>
                      {isSoon ? '▲ Due ' : '✓ '}Oct {liability.dueDay}{liability.dueDay >= 30 ? '' : ''}
                      <br />
                      <span className="subtitle" style={{ fontWeight: 500 }}>
                        {isSoon ? `in ${daysUntilDue} days` : 'on schedule'}
                      </span>
                    </span>
                    <span className="actions">
                      <button type="button" title="Edit" onClick={() => onEdit(liabilities.indexOf(liability))}>✎</button>
                      <button type="button" title="Delete" className="delete" onClick={() => onDelete(liabilities.indexOf(liability))}>🗑</button>
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <style>{`
        .liabilities-list {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
        }

        .filter-chips {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .filter-chips button {
          padding: 7px 14px;
          border: 1px solid var(--border);
          border-radius: 20px;
          font-size: 12.5px;
          color: var(--text-muted);
          cursor: pointer;
          font-weight: 500;
          background: transparent;
          font-family: inherit;
        }

        .filter-chips button.on {
          background: var(--primary-soft);
          border-color: var(--primary);
          color: #A5A0FF;
        }

        .list-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .category-section {
          display: flex;
          flex-direction: column;
        }

        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 0 10px;
        }

        .category-header > div {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          font-size: 15px;
        }

        .category-header .value {
          font-size: 15px;
          font-weight: 700;
        }

        .row {
          display: grid;
          grid-template-columns: 2.6fr 1.1fr 1.1fr 0.7fr 1fr 1.2fr 72px;
          gap: 12px;
          align-items: center;
          padding: 14px 6px;
          border-bottom: 1px solid var(--border);
          border-radius: 10px;
          transition: background 0.15s;
        }

        .row:hover {
          background: rgba(99, 91, 255, 0.06);
        }

        .row:last-child {
          border-bottom: 0;
        }

        .row.header {
          color: var(--text-muted);
          font-size: 12px;
          border-bottom: 1px solid var(--border);
          padding-top: 4px;
        }

        .row.header span:not(:first-child),
        .row > span:not(:first-child) {
          text-align: right;
        }

        .name {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icon {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          background: var(--primary-soft);
          display: grid;
          place-items: center;
          font-size: 17px;
          flex: none;
        }

        .details {
          flex: 1;
        }

        .details b {
          display: block;
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
        }

        .bar {
          height: 6px;
          background: var(--bg);
          border-radius: 6px;
          overflow: hidden;
          margin-top: 7px;
        }

        .bar i {
          display: block;
          height: 100%;
          border-radius: 6px;
          transition: width 0.6s;
        }

        .up {
          color: var(--success);
          font-weight: 600;
        }

        .warning {
          color: var(--warning);
          font-weight: 600;
        }

        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 4px;
          opacity: 0.45;
          transition: opacity 0.15s;
        }

        .row:hover .actions {
          opacity: 1;
        }

        .actions button {
          width: 30px;
          height: 30px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
        }

        .actions button:hover {
          background: var(--bg);
          color: var(--text);
        }

        .actions button.delete:hover {
          color: var(--danger);
        }
      `}</style>
    </div>
  );
}
