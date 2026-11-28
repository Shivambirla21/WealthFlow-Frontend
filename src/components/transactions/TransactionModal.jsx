import { useState } from 'react';

const categories = [
  { id: 'food', icon: '🍔', label: 'Food' },
  { id: 'housing', icon: '🏠', label: 'Housing' },
  { id: 'transport', icon: '🚗', label: 'Transport' },
  { id: 'shopping', icon: '🛍', label: 'Shopping' },
  { id: 'fun', icon: '🎬', label: 'Fun' },
  { id: 'utilities', icon: '💡', label: 'Utilities' },
  { id: 'health', icon: '❤️', label: 'Health' },
  { id: 'other', icon: '➕', label: 'Other' }
];

const typeTabs = [
  { id: 'expense', label: 'Expense' },
  { id: 'income', label: 'Income' },
  { id: 'transfer', label: 'Transfer' }
];

export default function TransactionModal({ isOpen, onClose, onSave }) {
  const [amount, setAmount] = useState('1250.00');
  const [selectedCategory, setSelectedCategory] = useState('food');
  const [selectedType, setSelectedType] = useState('expense');
  const [merchant, setMerchant] = useState('Swiggy');
  const [date, setDate] = useState('Oct 2, 2026');
  const [account, setAccount] = useState('HDFC Card');
  const [notes, setNotes] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);

  if (!isOpen) return null;

  const formatAmount = (val) => {
    const num = parseFloat(val) || 0;
    return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add transaction</h2>
          <span className="close-btn" onClick={onClose}>✕</span>
        </div>

        <div className="type-tabs">
          {typeTabs.map((tab) => (
            <button
              key={tab.id}
              className={`type-tab ${selectedType === tab.id ? 'active' : ''}`}
              onClick={() => setSelectedType(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="amount-display">{formatAmount(amount)}</div>
        <div className="amount-label">Amount</div>
        <input
          type="number"
          className="form-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ textAlign: 'center', fontSize: '20px', marginBottom: '16px' }}
        />

        <label>Category</label>
        <div className="category-grid">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`category-item ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </div>
          ))}
        </div>

        <div className="form-grid">
          <div>
            <label>Merchant</label>
            <input
              className="form-input"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
            />
          </div>
          <div>
            <label>Date</label>
            <input
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <label>Account</label>
        <input
          className="form-input"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />

        <label>Notes</label>
        <input
          className="form-input"
          placeholder="Add a note"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <label>Attachment</label>
        <div className="attachment-input">📎 Drop receipt or browse</div>

        <div className="recurring-toggle">
          <span>Recurring payment</span>
          <div className={`toggle ${isRecurring ? 'active' : ''}`} onClick={() => setIsRecurring(!isRecurring)}>
            <span className="toggle-circle"></span>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={() => { onSave(); onClose(); }}>Save transaction</button>
        </div>

        <style>{`
          .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(5, 6, 10, 0.65);
            display: grid;
            place-items: center;
            z-index: 20;
          }

          .modal-content {
            width: 460px;
            max-height: 94vh;
            overflow: auto;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 22px;
            padding: 26px;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          }

          .modal-header h2 {
            font-size: 20px;
            margin: 0;
          }

          .close-btn {
            cursor: pointer;
            color: var(--text-muted);
            font-size: 20px;
          }

          .type-tabs {
            display: flex;
            gap: 2px;
            background: var(--bg);
            padding: 3px;
            border-radius: 10px;
            margin-bottom: 6px;
          }

          .type-tab {
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

          .type-tab:hover {
            color: var(--text);
          }

          .type-tab.active {
            background: var(--surface);
            color: var(--text);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          }

          .amount-display {
            text-align: center;
            font-size: 44px;
            font-weight: 700;
            letter-spacing: -1.5px;
            margin: 18px 0 6px;
          }

          .amount-label {
            text-align: center;
            color: var(--text-muted);
            font-size: 13px;
          }

          .category-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin: 8px 0 16px;
          }

          .category-item {
            text-align: center;
            padding: 10px 4px;
            border: 1px solid var(--border);
            border-radius: 12px;
            font-size: 11px;
            color: var(--text-muted);
            cursor: pointer;
            transition: all 0.15s ease;
          }

          .category-item span {
            display: block;
            font-size: 20px;
            margin-bottom: 2px;
          }

          .category-item:hover {
            border-color: var(--border-strong);
          }

          .category-item.active {
            border-color: var(--primary);
            background: var(--primary-soft);
            color: var(--text);
          }

          .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .form-input {
            width: 100%;
            padding: 9px 14px;
            border: 1px solid var(--border);
            border-radius: 10px;
            background: var(--bg);
            color: var(--text);
            font: inherit;
            margin-bottom: 12px;
            outline: none;
            transition: border-color 0.15s ease;
          }

          .form-input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.25);
          }

          .attachment-input {
            padding: 9px 14px;
            border: 1px solid var(--border);
            border-radius: 10px;
            background: var(--bg);
            color: var(--text-muted);
            border-style: dashed;
            cursor: pointer;
            margin-bottom: 12px;
          }

          .recurring-toggle {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 4px 0 18px;
          }

          .toggle {
            width: 38px;
            height: 22px;
            border-radius: 20px;
            background: var(--border);
            position: relative;
            cursor: pointer;
            transition: background 0.15s ease;
          }

          .toggle::after {
            content: '';
            position: absolute;
            left: 3px;
            top: 3px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #fff;
            transition: transform 0.15s ease;
          }

          .toggle.active {
            background: var(--primary);
          }

          .toggle.active::after {
            transform: translateX(16px);
          }

          .modal-actions {
            display: flex;
            gap: 10px;
          }

          .btn-secondary,
          .btn-primary {
            padding: 9px 14px;
            border-radius: 10px;
            font-weight: 500;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.15s ease;
          }

          .btn-secondary {
            flex: 1;
            background: var(--surface);
            border: 1px solid var(--border);
            color: var(--text);
          }

          .btn-secondary:hover {
            background: var(--surface-hover);
          }

          .btn-primary {
            flex: 2;
            background: var(--primary);
            border: 1px solid var(--primary);
            color: #fff;
            font-weight: 600;
          }

          .btn-primary:hover {
            background: #7468FF;
          }

          @media (max-width: 480px) {
            .modal-content {
              width: 90%;
              padding: 20px;
            }

            .category-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .form-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

TransactionModal.defaultProps = {
  isOpen: false,
  onClose: () => {},
  onSave: () => {}
};
