export default function BudgetFilters({ activeFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'over', label: 'Over' },
    { id: 'on-track', label: 'On track' }
  ];

  return (
    <div className="budget-filters">
      <div className="filter-left">
        <h3>Category budgets</h3>
        <div className="subtitle">Over-budget categories are highlighted.</div>
      </div>

      <div className="filter-pills">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`pill ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => onFilterChange?.(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <style>{`
        .budget-filters {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 6px;
          margin-bottom: 16px;
        }

        .filter-left h3 {
          font-size: 16px;
          margin: 0 0 4px 0;
          color: var(--text);
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
        }

        .filter-pills {
          display: inline-flex;
          gap: 2px;
          background: var(--bg);
          border-radius: 8px;
          padding: 3px;
        }

        .pill {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 600;
          cursor: pointer;
          background: transparent;
          border: none;
          transition: all 0.15s ease;
        }

        .pill:hover {
          color: var(--text);
        }

        .pill.active {
          background: var(--surface);
          color: var(--text);
        }

        @media (max-width: 768px) {
          .budget-filters {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}
