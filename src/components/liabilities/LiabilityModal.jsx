import { useState } from 'react';

export default function LiabilityModal({ isOpen, onClose, onSave, categories, editLiability }) {
  const [name, setName] = useState(editLiability?.name || '');
  const [categoryIndex, setCategoryIndex] = useState(editLiability?.categoryIndex ?? 0);
  const [outstanding, setOutstanding] = useState(editLiability ? editLiability.outstanding.toLocaleString('en-IN') : '');
  const [originalAmount, setOriginalAmount] = useState(editLiability ? (editLiability.creditLimit || editLiability.originalAmount || '').toString() : '');
  const [rate, setRate] = useState(editLiability ? editLiability.rate.toString() : '');
  const [minPayment, setMinPayment] = useState(editLiability ? editLiability.minPayment.toLocaleString('en-IN') : '');
  const [dueDay, setDueDay] = useState(editLiability ? editLiability.dueDay.toString() : '15');

  const parseNumber = (value) => parseInt(String(value).replace(/[^0-9]/g, ''), 10) || 0;
  const parseDecimal = (value) => parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;

  const handleSave = () => {
    const amount = parseNumber(outstanding);
    const limitOrOriginal = parseNumber(originalAmount) || amount;
    onSave({
      name: name.trim() || 'New liability',
      categoryIndex,
      outstanding: amount,
      ...(categoryIndex === 0 ? { creditLimit: limitOrOriginal } : { originalAmount: limitOrOriginal }),
      rate: parseDecimal(rate),
      minPayment: parseNumber(minPayment),
      dueDay: Math.min(31, Math.max(1, parseNumber(dueDay) || 1)),
      status: categoryIndex === 0
        ? `Credit limit ₹${limitOrOriginal.toLocaleString('en-IN')}`
        : 'Manual liability'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="liability-modal-overlay" onClick={onClose}>
      <div className="liability-modal" onClick={(event) => event.stopPropagation()}>
        <h2>
          <span>{editLiability ? 'Edit liability' : 'Add liability'}</span>
          <button type="button" className="close" onClick={onClose}>✕</button>
        </h2>
        <label>Liability name</label>
        <input className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. HDFC Credit Card" />
        <label>Category</label>
        <div className="category-chips">
          {categories.map((category, index) => (
            <button type="button" key={category.name} className={categoryIndex === index ? 'on' : ''} onClick={() => setCategoryIndex(index)}>
              {category.icon} {category.name}
            </button>
          ))}
        </div>
        <div className="form-row">
          <div>
            <label>Outstanding (₹)</label>
            <input className="field" inputMode="numeric" value={outstanding} onChange={(e) => setOutstanding(e.target.value)} placeholder="38,400" />
          </div>
          <div>
            <label>{categoryIndex === 0 ? 'Credit limit (₹)' : 'Original amount (₹)'}</label>
            <input className="field" inputMode="numeric" value={originalAmount} onChange={(e) => setOriginalAmount(e.target.value)} placeholder="2,00,000" />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label>Interest rate (%)</label>
            <input className="field" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="8.75" />
          </div>
          <div>
            <label>Minimum payment (₹)</label>
            <input className="field" inputMode="numeric" value={minPayment} onChange={(e) => setMinPayment(e.target.value)} placeholder="5,000" />
          </div>
        </div>
        <label>Due day</label>
        <input className="field" type="number" min="1" max="31" value={dueDay} onChange={(e) => setDueDay(e.target.value)} />
        <div className="modal-actions">
          <button type="button" className="cancel" onClick={onClose}>Cancel</button>
          <button type="button" className="save" onClick={handleSave}>Save liability</button>
        </div>
      </div>
      <style>{`
        .liability-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 20;
          display: grid;
          place-items: center;
          background: rgba(5, 6, 10, 0.65);
        }
        .liability-modal {
          width: 440px;
          max-width: calc(100vw - 32px);
          padding: 26px;
          border: 1px solid var(--border);
          border-radius: 22px;
          background: var(--surface);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
        }
        .liability-modal h2 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 0 16px;
          font-size: 20px;
        }
        .liability-modal .close {
          border: 0;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
        }
        .liability-modal label {
          display: block;
          margin: 0 0 6px;
          color: var(--text-muted);
          font-size: 12px;
          font-weight: 600;
        }
        .liability-modal .field {
          width: 100%;
          margin-bottom: 14px;
          padding: 11px 14px;
          border: 1px solid var(--border);
          border-radius: 11px;
          background: var(--bg);
          color: var(--text);
          outline: none;
        }
        .liability-modal .field:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.25);
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .category-chips {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .category-chips button {
          padding: 7px 14px;
          border: 1px solid var(--border);
          border-radius: 20px;
          background: transparent;
          color: var(--text-muted);
          font-size: 12.5px;
          font-weight: 500;
          cursor: pointer;
        }
        .category-chips button.on {
          border-color: var(--primary);
          background: var(--primary-soft);
          color: #A5A0FF;
        }
        .modal-actions {
          display: flex;
          gap: 10px;
        }
        .modal-actions button {
          height: 42px;
          border: 1px solid var(--border);
          border-radius: 10px;
          cursor: pointer;
        }
        .modal-actions .cancel {
          flex: 1;
          background: var(--surface);
          color: var(--text);
        }
        .modal-actions .save {
          flex: 2;
          border-color: var(--primary);
          background: var(--primary);
          color: #fff;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
