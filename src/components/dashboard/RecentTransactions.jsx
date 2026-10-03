const transactions = [
  { merchant: 'Apple', category: 'Technology', account: 'HDFC Card', date: 'Sep 28', amount: -1299 },
  { merchant: 'Salary', category: 'Income', account: 'Bank', date: 'Sep 27', amount: 75000 },
  { merchant: 'Swiggy', category: 'Food', account: 'Credit Card', date: 'Sep 26', amount: -620 },
  { merchant: 'Amazon', category: 'Shopping', account: 'ICICI Card', date: 'Sep 24', amount: -340 }
];

export default function RecentTransactions({ currency = '₹' }) {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Recent Transactions</h3>
        <span className="view-all">View all →</span>
      </div>

      <table className="transactions-table">
        <thead>
          <tr>
            <th>Merchant</th>
            <th>Category</th>
            <th>Account</th>
            <th>Date</th>
            <th style={{ textAlign: 'right' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.merchant + tx.date}>
              <td><strong>{tx.merchant}</strong></td>
              <td>{tx.category}</td>
              <td>{tx.account}</td>
              <td>{tx.date}</td>
              <td style={{ textAlign: 'right', color: tx.amount > 0 ? 'var(--success)' : 'var(--text)' }}>
                {tx.amount > 0 ? '+' : ''}{currency}{Math.abs(tx.amount).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .chart-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
          box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .chart-header h3 {
          font-size: 16px;
          margin: 0;
          color: var(--text);
        }

        .view-all {
          color: var(--text-muted);
          font-weight: 500;
          font-size: 12px;
          cursor: pointer;
          transition: color 0.15s ease;
        }

        .view-all:hover {
          color: var(--primary);
        }

        .transactions-table {
          width: 100%;
          border-collapse: collapse;
        }

        .transactions-table th,
        .transactions-table td {
          text-align: left;
          padding: 11px 0;
          border-bottom: 1px solid var(--border);
        }

        .transactions-table th {
          color: var(--text-muted);
          font-weight: 500;
          font-size: 12px;
        }

        .transactions-table tr:last-child td {
          border-bottom: none;
        }

        .transactions-table td {
          font-size: 14px;
        }

        .transactions-table strong {
          font-weight: 600;
          color: var(--text);
        }

        @media (max-width: 768px) {
          .transactions-table {
            font-size: 12px;
          }

          .transactions-table th,
          .transactions-table td {
            padding: 8px 4px;
          }
        }
      `}</style>
    </div>
  );
}
