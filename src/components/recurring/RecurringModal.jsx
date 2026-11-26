import { useEffect, useState } from 'react';

const initialForm = { name: '', amount: '', categoryIndex: '0', billing: 'Monthly', day: '1', account: '', month: '10' };

export default function RecurringModal({ isOpen, onClose, onSave, categories }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (isOpen) setForm(initialForm);
  }, [isOpen]);

  if (!isOpen) return null;

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    const amount = Number(form.amount);
    if (!form.name.trim() || !Number.isFinite(amount) || amount <= 0) return;

    const month = Number(form.month);
    const day = Number(form.day);
    let year = 2026;
    let dueDate = new Date(year, month - 1, day);
    if (dueDate < new Date(2026, 9, 3)) {
      year += 1;
      dueDate = new Date(year, month - 1, day);
    }

    onSave({
      name: form.name.trim(),
      amount,
      categoryIndex: Number(form.categoryIndex),
      billing: form.billing,
      day,
      month,
      year,
      account: form.account.trim() || 'Not specified',
      status: 'Upcoming',
      variable: false,
      daysUntil: Math.round((dueDate - new Date(2026, 9, 3)) / 86400000)
    });
  };

  return (
    <div className="recurring-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <form className="recurring-modal" onSubmit={submit}>
        <div className="recurring-modal-heading"><h2>Add recurring payment</h2><button type="button" onClick={onClose} aria-label="Close">×</button></div>
        <label>Name<input required value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="e.g. Netflix" /></label>
        <div className="recurring-modal-grid">
          <label>Amount (₹)<input required type="number" min="1" step="1" value={form.amount} onChange={(event) => update('amount', event.target.value)} /></label>
          <label>Category<select value={form.categoryIndex} onChange={(event) => update('categoryIndex', event.target.value)}>{categories.map((category, index) => <option value={index} key={category.name}>{category.name}</option>)}</select></label>
          <label>Billing<select value={form.billing} onChange={(event) => update('billing', event.target.value)}><option>Monthly</option><option>Yearly</option></select></label>
          <label>Due day<input required type="number" min="1" max="31" value={form.day} onChange={(event) => update('day', event.target.value)} /></label>
          <label>Due month<select value={form.month} onChange={(event) => update('month', event.target.value)}>{Array.from({ length: 12 }, (_, index) => <option key={index + 1} value={index + 1}>{new Date(2026, index, 1).toLocaleString('en-IN', { month: 'long' })}</option>)}</select></label>
          <label>Payment account<input value={form.account} onChange={(event) => update('account', event.target.value)} placeholder="e.g. HDFC Card" /></label>
        </div>
        <div className="recurring-modal-actions"><button type="button" onClick={onClose}>Cancel</button><button type="submit">Add payment</button></div>
      </form>
      <style>{`
        .recurring-modal-backdrop{position:fixed;inset:0;background:#0009;z-index:1000;display:grid;place-items:center;padding:18px}
        .recurring-modal{width:min(100%,520px);max-height:90vh;overflow:auto;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:22px;box-shadow:0 24px 70px #0005}
        .recurring-modal-heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
        .recurring-modal-heading h2{font-size:19px;margin:0}
        .recurring-modal-heading button{font-size:24px;border:0;background:transparent;color:var(--text);cursor:pointer}
        .recurring-modal label{display:flex;flex-direction:column;gap:6px;font-size:12px;color:var(--text-muted);margin-bottom:13px}
        .recurring-modal input,.recurring-modal select{width:100%;padding:10px 11px;border:1px solid var(--border);border-radius:9px;background:var(--bg);color:var(--text);font:inherit}
        .recurring-modal-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 12px}
        .recurring-modal-actions{display:flex;justify-content:flex-end;gap:9px;margin-top:8px}
        .recurring-modal-actions button{padding:9px 14px;border:1px solid var(--border);border-radius:9px;background:transparent;color:var(--text);cursor:pointer}
        .recurring-modal-actions button[type=submit]{background:var(--primary);border-color:var(--primary);color:#fff;font-weight:600}
        @media(max-width:480px){.recurring-modal-grid{grid-template-columns:1fr}}
      `}</style>
    </div>
  );
}