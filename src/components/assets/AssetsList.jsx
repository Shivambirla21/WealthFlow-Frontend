import { useState } from 'react';

export default function AssetsList({ assets, categories, onEdit, onDelete, filterCategory }) {
  const [filter, setFilter] = useState(filterCategory || -1);

  const formatValue = (v) => '₹' + Math.round(Math.abs(v)).toLocaleString('en-IN');
  const formatPct = (v, p) => p ? ((v - p) / p * 100).toFixed(1) + '%' : '0.0%';

  const handleFilterClick = (catIndex) => {
    setFilter(catIndex);
  };

  const visibleCategories = filter >= 0
    ? categories.filter((_, i) => i === filter)
    : categories;

  const filteredAssets = filter >= 0
    ? assets.filter(a => a.categoryIndex === filter)
    : assets;

  if (filteredAssets.length === 0) {
    return (
      <div className="assets-list">
        <div className="no-assets">
          No assets yet. Add your first asset to start tracking.
        </div>
        <style>{`
          .assets-list {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 22px;
          }

          .no-assets {
            color: var(--text-muted);
            text-align: center;
            padding: 40px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="assets-list">
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
          const categoryAssets = assets.filter(a => a.categoryIndex === i);
          if (categoryAssets.length === 0) return null;

          const categoryTotal = categoryAssets.reduce((sum, a) => sum + a.value, 0);

          return (
            <div key={i} className="category-section">
              <div className="category-header">
                <div>
                  <span className="icon" style={{ background: `${cat.color}33` }}>{cat.icon}</span>
                  {cat.name}
                  <span className="subtitle"> · {categoryAssets.length}</span>
                </div>
                <span>{formatValue(categoryTotal)}</span>
              </div>
              <div className="row header">
                <span>Asset</span>
                <span>Current value</span>
                <span>Purchase value</span>
                <span>Change</span>
                <span>% change</span>
                <span></span>
              </div>
              {categoryAssets.map((asset, idx) => {
                const change = asset.value - asset.purchaseValue;
                const isPositive = change >= 0;
                const assetIndex = assets.indexOf(asset);

                return (
                  <div key={idx} className="row">
                    <span className="name">
                      <span className="icon">{cat.icon}</span>
                      <span>
                        <b>{asset.name}</b>
                        <span className="subtitle">{asset.status}</span>
                      </span>
                    </span>
                    <span><b>{formatValue(asset.value)}</b></span>
                    <span className="subtitle">{formatValue(asset.purchaseValue)}</span>
                    <span className={isPositive ? 'up' : 'down'}>
                      {change === 0 ? '— ' + formatValue(0) : (isPositive ? '▲ +' : '▼ −') + formatValue(Math.abs(change))}
                    </span>
                    <span className={isPositive ? 'up' : 'down'}>
                      {change === 0 ? '0.0%' : (isPositive ? '▲ ' : '▼ ') + Math.abs(formatPct(asset.value, asset.purchaseValue))}
                    </span>
                    <span className="actions">
                      <i title="Edit" onClick={() => onEdit(assetIndex)}>✎</i>
                      <i className="delete" title="Delete" onClick={() => onDelete(assetIndex)}>🗑</i>
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <style>{`
        .assets-list {
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

        .category-header span {
          font-size: 15px;
          font-weight: 700;
        }

        .row {
          display: grid;
          grid-template-columns: 2.4fr 1.2fr 1.2fr 1.3fr 0.8fr 90px;
          gap: 12px;
          align-items: center;
          padding: 13px 6px;
          border-bottom: 1px solid var(--border);
          transition: background 0.15s;
          border-radius: 10px;
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
          padding-top: 6px;
        }

        .row.header span:not(:first-child),
        .row > span:not(:first-child):not(:last-child) {
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
        }

        .name b {
          display: block;
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
        }

        .actions {
          display: flex;
          gap: 4px;
          justify-content: flex-end;
          opacity: 0.45;
          transition: 0.15s;
        }

        .row:hover .actions {
          opacity: 1;
        }

        .actions i {
          font-style: normal;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          cursor: pointer;
          color: var(--text-muted);
        }

        .actions i:hover {
          background: var(--bg);
          color: var(--text);
        }

        .actions i.delete:hover {
          color: var(--danger);
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
