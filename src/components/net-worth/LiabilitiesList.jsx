const liabilities = [
  { name: 'Credit cards', icon: '💳', value: 6450, change: -12.5, description: 'HDFC, ICICI', color: '#F26B5B', isMonthly: true },
  { name: 'Loans', icon: '🏦', value: 12000, change: -3.2, description: 'Personal loan, EMI ₹2,000/mo', color: '#F59E0B', isMonthly: true },
  { name: 'Other debt', icon: '🧾', value: 2750, change: -8.0, description: 'Friends & family', color: '#9CA3AF', isMonthly: false }
];

export default function LiabilitiesList({ currency = '₹', total = 21200 }) {
  const formatCurrency = (value) => `${currency}${value.toLocaleString('en-IN')}`;

  return (
    <div className="liabilities-list">
      {liabilities.map((liability) => (
        <div key={liability.name} className="item">
          <div className="icon">{liability.icon}</div>
          <div>
            <b>{liability.name}</b>
            <span className="label">{liability.description}</span>
            <div className="bar">
              <i style={{ width: `${(liability.value / total) * 100}%`, background: liability.color }}></i>
            </div>
          </div>
          <div className="right">
            <b>{formatCurrency(liability.value)}</b>
            <span className={liability.change >= 0 ? 'up' : 'dn'} style={{ fontSize: 12 }}>
              {liability.change >= 0 ? '↑ +' : '↓ −'}{Math.abs(liability.change)}%
            </span>
          </div>
        </div>
      ))}

      <style>{`
        .liabilities-list {
          margin-top: 8px;
        }

        .item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 0;
          border-bottom: 1px solid var(--border);
        }

        .item:last-child {
          border: 0;
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

        .item > div:nth-child(2) {
          flex: 1;
        }

        .item b {
          display: block;
        }

        .right {
          text-align: right;
        }

        .label {
          color: var(--text-muted);
          font-size: 13px;
        }

        .bar {
          height: 6px;
          background: var(--bg);
          border-radius: 6px;
          overflow: hidden;
          margin-top: 6px;
        }

        .bar i {
          display: block;
          height: 100%;
          border-radius: 6px;
        }

        .up {
          color: var(--success);
        }

        .dn {
          color: var(--danger);
        }
      `}</style>
    </div>
  );
}
