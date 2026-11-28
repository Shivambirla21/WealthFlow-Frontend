import { useState } from 'react';

const transactions = [
  { id: 1, merchant: 'Salary', icon: '💼', category: 'Income', account: 'HDFC Savings', date: 'Sep 27', amount: 75000, status: 'ok', type: 'inc', recurring: false },
  { id: 2, merchant: 'Apple', icon: '🍎', category: 'Technology', account: 'HDFC Card', date: 'Sep 28', amount: -1299, status: 'ok', type: 'exp', recurring: false },
  { id: 3, merchant: 'Swiggy', icon: '🍔', category: 'Food', account: 'ICICI Card', date: 'Sep 26', amount: -620, status: 'ok', type: 'exp', recurring: false },
  { id: 4, merchant: 'Zomato', icon: '🍕', category: 'Food', account: 'ICICI Card', date: 'Sep 25', amount: -480, status: 'ok', type: 'exp', recurring: false },
  { id: 5, merchant: 'Electricity', icon: '💡', category: 'Utilities', account: 'SBI Bank', date: 'Sep 24', amount: -2150, status: 'ok', type: 'exp', recurring: false },
  { id: 6, merchant: 'Netflix', icon: '🎬', category: 'Entertainment', account: 'HDFC Card', date: 'Sep 23', amount: -649, status: 'ok', type: 'exp', recurring: true },
  { id: 7, merchant: 'Transfer to Savings', icon: '⇄', category: 'Transfer', account: 'Axis → HDFC', date: 'Sep 22', amount: 10000, status: 'ok', type: 'tr', recurring: false },
  { id: 8, merchant: 'Rent', icon: '🏠', category: 'Housing', account: 'SBI Bank', date: 'Oct 5', amount: -18000, status: 'pe', type: 'exp', recurring: true },
  { id: 9, merchant: 'SIP — Nifty 50', icon: '📈', category: 'Investments', account: 'Axis Bank', date: 'Sep 20', amount: -5000, status: 'ok', type: 'exp', recurring: true },
  { id: 10, merchant: 'Amazon', icon: '🛍', category: 'Shopping', account: 'ICICI Card', date: 'Sep 19', amount: -3400, status: 'ok', type: 'exp', recurring: false },
  { id: 11, merchant: 'Freelance', icon: '💼', category: 'Income', account: 'HDFC Savings', date: 'Sep 18', amount: 12000, status: 'ok', type: 'inc', recurring: false },
  { id: 12, merchant: 'Uber', icon: '🚗', category: 'Transport', account: 'Credit Card', date: 'Sep 17', amount: -340, status: 'ok', type: 'exp', recurring: false }
];

export default function TransactionTable({ currency = '₹', activeTab }) {
  const [menuOpen, setMenuOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = transactions.filter(tx => {
    if (activeTab === 'all') return true;
    return tx.type === activeTab;
  });

  const formatAmount = (amount, type) => {
    if (type === 'tr') return `${currency}${Math.abs(amount).toLocaleString('en-IN')}`;
    const sign = amount < 0 ? '−' : '+';
    return `${sign}${currency}${Math.abs(amount).toLocaleString('en-IN')}`;
  };

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setMenuOpen(menuOpen === id ? null : id);
  };

  return (
    <div className="transaction-table-container">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Merchant</th>
            <th>Category</th>
            <th>Account</th>
            <th>Date</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((tx) => (
            <tr key={tx.id} className="table-row">
              <td>
                <div className="merchant-cell">
                  <div className="icon">{tx.icon}</div>
                  <strong>{tx.merchant}</strong>
                  {tx.recurring && <span className="recurring">↻ Recurring</span>}
                </div>
              </td>
              <td>{tx.category}</td>
              <td>{tx.account}</td>
              <td>{tx.date}</td>
              <td>
                <span className={`status ${tx.status}`}>
                  {tx.status === 'ok' ? 'Completed' : 'Pending'}
                </span>
              </td>
              <td className={`amount ${tx.amount > 0 && tx.type !== 'tr' ? 'positive' : ''}`}>
                {formatAmount(tx.amount, tx.type)}
              </td>
              <td>
                <span className="dots" onClick={(e) => toggleMenu(tx.id, e)}>
                  ⋯
                  <div className={`menu ${menuOpen === tx.id ? 'open' : ''}`}>
                    <div>✎ Edit</div>
                    <div>⑂ Split</div>
                    <div>◫ Categorize</div>
                    <div>↻ Mark recurring</div>
                    <div className="delete">🗑 Delete</div>
                  </div>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <span>Showing {filteredTransactions.length} of 128 transactions</span>
        <div className="page-numbers">
          <span>‹</span>
          <span className="active">1</span>
          <span>2</span>
          <span>3</span>
          <span>›</span>
        </div>
      </div>

      <style>{`
        .transaction-table-container {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
        }

        .transaction-table {
          width: 100%;
          border-collapse: collapse;
        }

        .transaction-table th {
          text-align: left;
          color: var(--text-muted);
          font-weight: 500;
          font-size: 12px;
          padding: 12px 20px;
          border-bottom: 1px solid var(--border);
        }

        .transaction-table td {
          padding: 13px 20px;
          border-bottom: 1px solid var(--border);
        }

        .table-row:hover td {
          background: rgba(99, 91, 255, 0.06);
        }

        .merchant-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icon {
          width: 36px;
          height: 36px;
          border-radius: 11px;
          background: var(--primary-soft);
          display: grid;
          place-items: center;
          font-size: 16px;
        }

        .amount {
          text-align: right;
          font-weight: 600;
        }

        .amount.positive {
          color: var(--success);
        }

        .status {
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .status.ok {
          background: rgba(16, 185, 129, 0.14);
          color: var(--success);
        }

        .status.pe {
          background: rgba(245, 158, 11, 0.14);
          color: var(--warning);
        }

        .recurring {
          font-size: 11px;
          color: #8B85FF;
          margin-left: 6px;
        }

        .dots {
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px 10px;
          border-radius: 8px;
          position: relative;
        }

        .dots:hover {
          background: var(--bg);
        }

        .menu {
          position: absolute;
          right: 0;
          top: 30px;
          z-index: 5;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 6px;
          width: 170px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.24);
          display: none;
          text-align: left;
        }

        .menu.open {
          display: block;
        }

        .menu div {
          padding: 8px 10px;
          border-radius: 8px;
          color: var(--text);
          font-size: 13px;
          cursor: pointer;
        }

        .menu div:hover {
          background: var(--primary-soft);
        }

        .menu .delete {
          color: var(--danger);
        }

        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
          color: var(--text-muted);
          font-size: 13px;
        }

        .page-numbers {
          display: flex;
          gap: 4px;
        }

        .page-numbers span {
          padding: 5px 11px;
          border: 1px solid var(--border);
          border-radius: 8px;
          margin-left: 4px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .page-numbers span:hover {
          border-color: var(--border-strong);
        }

        .page-numbers span.active {
          background: var(--primary);
          border-color: var(--primary);
          color: #fff;
        }

        @media (max-width: 768px) {
          .transaction-table th,
          .transaction-table td {
            padding: 10px 12px;
            font-size: 12px;
          }

          .icon {
            width: 28px;
            height: 28px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
