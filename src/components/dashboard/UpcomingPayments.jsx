import { useState } from 'react';

const paymentStatuses = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'paid', label: 'Paid' },
  { id: 'overdue', label: 'Overdue' }
];

const payments = [
  { name: 'Netflix', date: 'Tomorrow', amount: 649 },
  { name: 'Rent', date: 'Oct 5', amount: 18000 },
  { name: 'Internet', date: 'Oct 7', amount: 799 },
  { name: 'Insurance', date: 'Oct 12', amount: 12500 }
];

export default function UpcomingPayments({ currency = '₹' }) {
  const [selectedStatus, setSelectedStatus] = useState('upcoming');

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Upcoming Payments</h3>
        <div className="status-selector">
          {paymentStatuses.map((status) => (
            <button
              key={status.id}
              className={`status-btn ${selectedStatus === status.id ? 'active' : ''}`}
              onClick={() => setSelectedStatus(status.id)}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      <div className="payments-list">
        {payments.map((payment) => (
          <div key={payment.name} className="payment-item">
            <div className="payment-left">
              <strong>{payment.name}</strong>
              <span className="payment-date">{payment.date}</span>
            </div>
            <strong className="payment-amount">{currency}{payment.amount.toLocaleString()}</strong>
          </div>
        ))}
      </div>

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

        .status-selector {
          display: inline-flex;
          gap: 2px;
          background: var(--bg);
          border-radius: 8px;
          padding: 3px;
        }

        .status-btn {
          padding: 3px 9px;
          border-radius: 6px;
          font-size: 12px;
          color: var(--text-muted);
          background: transparent;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.15s ease;
        }

        .status-btn:hover {
          color: var(--text);
        }

        .status-btn.active {
          background: var(--surface);
          color: var(--text);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
        }

        .payments-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .payment-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
        }

        .payment-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .payment-left strong {
          font-weight: 600;
          color: var(--text);
        }

        .payment-date {
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 500;
        }

        .payment-amount {
          font-weight: 700;
          color: var(--text);
        }
      `}</style>
    </div>
  );
}
