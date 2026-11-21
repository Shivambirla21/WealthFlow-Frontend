import { useState, useEffect } from 'react';

export default function AssetModal({ isOpen, onClose, onSave, categories, editAsset }) {
  const [name, setName] = useState('');
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [value, setValue] = useState('');
  const [purchaseValue, setPurchaseValue] = useState('');

  useEffect(() => {
    if (editAsset) {
      setName(editAsset.name);
      setCategoryIndex(editAsset.categoryIndex);
      setValue(editAsset.value.toLocaleString('en-IN'));
      setPurchaseValue(editAsset.purchaseValue.toLocaleString('en-IN'));
    } else {
      setName('');
      setCategoryIndex(0);
      setValue('');
      setPurchaseValue('');
    }
  }, [editAsset, isOpen]);

  const parseNumber = (str) => parseInt(String(str).replace(/[^0-9]/g, '')) || 0;

  const handleSave = () => {
    const v = parseNumber(value);
    const p = parseNumber(purchaseValue) || v;
    const n = name.trim() || 'New asset';

    onSave({
      name: n,
      categoryIndex,
      value: v,
      purchaseValue: p,
      status: 'Manual'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>
          <span>{editAsset ? 'Edit asset' : 'Add asset'}</span>
          <span onClick={onClose} style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>✕</span>
        </h2>
        <label>Asset name</label>
        <input
          type="text"
          className="input"
          placeholder="e.g. ICICI Savings"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Category</label>
        <div className="category-chips">
          {categories.map((cat, i) => (
            <button
              key={i}
              type="button"
              className={categoryIndex === i ? 'on' : ''}
              onClick={() => setCategoryIndex(i)}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
        <div className="form-row">
          <div>
            <label>Current value (₹)</label>
            <input
              type="text"
              className="input"
              inputMode="numeric"
              placeholder="1,25,000"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div>
            <label>Purchase value (₹)</label>
            <input
              type="text"
              className="input"
              inputMode="numeric"
              placeholder="1,19,800"
              value={purchaseValue}
              onChange={(e) => setPurchaseValue(e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="btn cancel" style={{ flex: 1 }} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn primary" style={{ flex: 2 }} onClick={handleSave}>
            Save asset
          </button>
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

          .modal {
            width: 440px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 22px;
            padding: 26px;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.1);
          }

          .modal h2 {
            font-size: 20px;
            margin-bottom: 16px;
            display: flex;
            justify-content: space-between;
          }

          .modal label {
            font-size: 12px;
            font-weight: 600;
            color: var(--text-muted);
            display: block;
            margin: 0 0 6px;
          }

          .input {
            width: 100%;
            padding: 11px 14px;
            border: 1px solid var(--border);
            border-radius: 11px;
            background: var(--bg);
            color: var(--text);
            font: inherit;
            margin-bottom: 14px;
            outline: none;
          }

          .input:focus {
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
            font-size: 12.5px;
            color: var(--text-muted);
            cursor: pointer;
            font-weight: 500;
            background: transparent;
            font-family: inherit;
          }

          .category-chips button.on {
            background: var(--primary-soft);
            border-color: var(--primary);
            color: #A5A0FF;
          }

          .btn {
            padding: 9px 14px;
            border: 1px solid var(--border);
            border-radius: 10px;
            background: var(--surface);
            color: var(--text);
            font: 500 14px inherit;
            cursor: pointer;
          }

          .btn.cancel:hover {
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
        `}</style>
      </div>
    </div>
  );
}
