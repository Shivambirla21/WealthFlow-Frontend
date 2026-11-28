import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { ActionIcons } from '../Icon.jsx';

export default function GlobalHeader({
  title,
  subtitle,
  showSearch = true,
  showAddButton = true,
  addButtonText = 'Add',
  onAddClick,
  additionalActions,
  onThemeToggle,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="global-header">
      <div className="header-left">
        <h1>{title}</h1>
        {subtitle && <div className="subtitle">{subtitle}</div>}
      </div>

      <div className="header-right">
        {showSearch && (
          <div className={`search-bar ${isSearchFocused ? 'focused' : ''}`}>
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {searchQuery && (
              <button type="button" className="clear-btn" onClick={clearSearch}>
                <X size={16} />
              </button>
            )}
            <span className="shortcut">⌘K</span>
          </div>
        )}
        {additionalActions}
        <button type="button" className="theme-btn" onClick={onThemeToggle || (() => {})}>
          ◐ Theme
        </button>
        {showAddButton && (
          <button type="button" className="btn primary" onClick={onAddClick}>
            + {addButtonText}
          </button>
        )}
      </div>

      <style>{`
        .global-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 20px 0;
        }

        .header-left {
          flex: 1;
          min-width: 0;
        }

        .header-left h1 {
          font-size: 28px;
          letter-spacing: -0.5px;
          font-weight: 700;
          margin: 0;
          color: var(--text);
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
          margin-top: 4px;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface);
          min-width: 280px;
          max-width: 400px;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .search-bar.focused {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.25);
        }

        .search-icon {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .search-bar input {
          flex: 1;
          border: none;
          background: transparent;
          color: var(--text);
          font: inherit;
          font-size: 14px;
          outline: none;
          min-width: 0;
        }

        .search-bar input::placeholder {
          color: var(--text-muted);
        }

        .clear-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }

        .clear-btn:hover {
          background: var(--bg);
          color: var(--text);
        }

        .shortcut {
          font-size: 11px;
          color: var(--text-muted);
          background: var(--bg);
          padding: 2px 6px;
          border-radius: 4px;
          flex-shrink: 0;
        }

        .header-right {
          display: flex;
          gap: 10px;
          align-items: center;
          flex: 0 0 auto;
          justify-content: flex-end;
        }

        .theme-btn,
        .btn {
          padding: 9px 14px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface);
          color: var(--text);
          font: 500 14px inherit;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease;
          white-space: nowrap;
        }

        .theme-btn:hover,
        .btn:hover {
          background: var(--surface-hover);
        }

        .btn.primary {
          background: var(--primary);
          border-color: var(--primary);
          color: #fff;
          font-weight: 600;
        }

        .btn.primary:hover {
          background: #7468FF;
        }

        @media (max-width: 1024px) {
          .global-header {
            flex-wrap: wrap;
            gap: 12px;
          }

          .header-left {
            flex: 1 1 100%;
          }

          .search-bar {
            width: 100%;
            max-width: none;
          }

          .header-right {
            flex: 0 0 auto;
          }
        }
      `}</style>
    </div>
  );
}
