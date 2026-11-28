const comparisonData = [
  { metric: 'Income', august: 85000, september: 87000, change: 2.4, changeType: 'positive' },
  { metric: 'Expenses', august: 57500, september: 58580, change: 1.9, changeType: 'positive' },
  { metric: 'Net cash flow', august: 27500, september: 28420, change: 3.3, changeType: 'positive' },
  { metric: 'Savings rate', august: '32.4%', september: '32.7%', change: 0.3, changeType: 'positive', isPercentage: true }
];

export default function MonthlyComparison({ currency = '₹' }) {
  const formatValue = (value, isPercentage) => {
    if (isPercentage) return value;
    return `${currency}${value.toLocaleString()}`;
  };

  return (
    <div className="monthly-comparison">
      <h3>Monthly comparison</h3>
      <div className="subtitle">September vs August</div>

      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>August</th>
            <th>September</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map((row, index) => (
            <tr key={index}>
              <td>{row.metric}</td>
              <td>{formatValue(row.august, row.isPercentage)}</td>
              <td><b>{formatValue(row.september, row.isPercentage)}</b></td>
              <td className={row.changeType}>
                {row.changeType === 'positive' ? '↑ +' : '↓ −'}{row.change}{row.isPercentage ? ' pts' : '%'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .monthly-comparison {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
        }

        .monthly-comparison h3 {
          font-size: 16px;
          margin: 0 0 2px 0;
          color: var(--text);
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }

        th {
          text-align: left;
          color: var(--text-muted);
          font-weight: 500;
          font-size: 12px;
          padding: 8px 0;
          border-bottom: 1px solid var(--border);
        }

        td {
          padding: 13px 0;
          border-bottom: 1px solid var(--border);
        }

        tr:last-child td {
          border: 0;
        }

        td:not(:first-child),
        th:not(:first-child) {
          text-align: right;
        }

        .positive {
          color: var(--success);
        }

        .negative {
          color: var(--danger);
        }

        @media (max-width: 768px) {
          table {
            font-size: 12px;
          }

          th, td {
            padding: 8px 4px;
          }
        }
      `}</style>
    </div>
  );
}
