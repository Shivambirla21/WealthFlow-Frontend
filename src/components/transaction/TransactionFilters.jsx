import { useState } from 'react';

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'inc', label: 'Income' },
  { id: 'exp', label: 'Expense' },
  { id: 'tr', label: 'Transfer' }
];

export default function TransactionFilters({ activeTab, onTabChange, onSearch }) {
  const [search, setSearch] = useState('');

  const handleSearch = (value) => {
    setSearch(value);
    onSearch?.(value);
  };

  return (
    <div className="transaction-filters">
      <div className="filter-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange?.(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="filter-inputs">
        <input
          className="filter-input"
          placeholder="Search merchant, category…"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <select className="filter-select">
          <option>Date ▾</option>
        </select>
        <select className="filter-select">
          <option>Category ▾</option>
        </select>
        <select className="filter-select">
          <option>Account ▾</option>
        </select>
        <select className="filter-select">
          <option>Type ▾</option>
        </select>
      </div>

      <style>{`
        .transaction-filters {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
          gap: 14px;
          flex-wrap: wrap;
        }

        .filter-tabs {
          display: flex;
          gap: 2px;
          background: var(--bg);
          padding: 3px;
          border-radius: 10px;
        }

        .tab-btn {
          padding: 6px 16px;
          border-radius: 8px;
          color: var(--text-muted);
          font-weight: 600;
          cursor: pointer;
          background: transparent;
          border: none;
          font-size: 14px;
          transition: all 0.15s ease;
        }

        .tab-btn:hover {
          color: var(--text);
        }

        .tab-btn.active {
          background: var(--surface);
          color: var(--text);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .filter-inputs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-input {
          padding: 9px 14px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--bg);
          color: var(--text);
          font: inherit;
          width: 230px;
          outline: none;
          transition: border-color 0.15s ease;
        }

        .filter-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.25);
        }

        .filter-select {
          padding: 9px 14px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface);
          color: var(--text);
          font: inherit;
          cursor: pointer;
          transition: border-color 0.15s ease;
        }

        .filter-select:hover {
          border-color: var(--border-strong);
        }

        @media (max-width: 768px) {
          .filter-inputs {
            width: 100%;
          }

          .filter-input,
          .filter-select {
            flex: 1;
            min-width: 140px;
          }
        }
      `}</style>
    </div>
  );
}
