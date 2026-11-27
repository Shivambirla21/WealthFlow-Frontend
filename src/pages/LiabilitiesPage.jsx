import { useState } from 'react';
import GlobalHeader from '../components/layout/GlobalHeader.jsx';
import LiabilitiesSummary from '../components/liabilities/LiabilitiesSummary.jsx';
import DebtComposition from '../components/liabilities/DebtComposition.jsx';
import LiabilitiesList from '../components/liabilities/LiabilitiesList.jsx';
import DebtAnalytics from '../components/liabilities/DebtAnalytics.jsx';
import DebtPayoffProjection from '../components/liabilities/DebtPayoffProjection.jsx';
import LiabilityModal from '../components/liabilities/LiabilityModal.jsx';

export default function LiabilitiesPage() {
  const categories = [
    { name: 'Credit cards', icon: '💳', color: '#F26B5B' },
    { name: 'Personal loans', icon: '🏦', color: '#F59E0B' },
    { name: 'Home loans', icon: '🏠', color: '#635BFF' },
    { name: 'Vehicle loans', icon: '🛵', color: '#60A5FA' },
    { name: 'Other debt', icon: '🤝', color: '#9CA3AF' }
  ];

  const [liabilities, setLiabilities] = useState([
    { name: 'HDFC Regalia Card', categoryIndex: 0, outstanding: 38400, creditLimit: 200000, rate: 42, minPayment: 1920, dueDay: 15, status: 'Credit limit ₹2,00,000' },
    { name: 'ICICI Amazon Pay Card', categoryIndex: 0, outstanding: 12300, creditLimit: 100000, rate: 40.8, minPayment: 615, dueDay: 20, status: 'Credit limit ₹1,00,000' },
    { name: 'SBI Personal Loan', categoryIndex: 1, outstanding: 132000, originalAmount: 300000, rate: 11.5, minPayment: 9800, dueDay: 5, status: 'Taken Jan 2025 · 36 months' },
    { name: 'HDFC Home Loan', categoryIndex: 2, outstanding: 1840000, originalAmount: 2500000, rate: 8.75, minPayment: 22100, dueDay: 7, status: 'Taken Mar 2022 · 20 years' },
    { name: 'Honda Activa Loan', categoryIndex: 3, outstanding: 18500, originalAmount: 60000, rate: 9.5, minPayment: 3200, dueDay: 10, status: 'Taken Jun 2024 · 24 months' },
    { name: 'Family loan', categoryIndex: 4, outstanding: 25000, originalAmount: 50000, rate: 0, minPayment: 5000, dueDay: 30, status: 'Interest-free · Pay back by Mar 2027' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [toast, setToast] = useState('');
  const [deleted, setDeleted] = useState(null);

  const handleThemeToggle = () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  };

  const handleAddLiability = () => {
    setEditIndex(null);
    setIsModalOpen(true);
  };

  const handleEditLiability = (index) => {
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(window.__wealthflowLiabilityToast);
    window.__wealthflowLiabilityToast = window.setTimeout(() => setToast(''), 3500);
  };

  const handleSaveLiability = (liability) => {
    if (editIndex !== null) {
      setLiabilities(current => current.map((item, i) => i === editIndex ? liability : item));
      showToast('✓ Liability updated');
    } else {
      setLiabilities(current => [...current, liability]);
      showToast('✓ Liability added');
    }
  };

  const handleDeleteLiability = (index) => {
    setDeleted({ index, liability: liabilities[index] });
    setLiabilities(current => current.filter((_, i) => i !== index));
    showToast('Liability deleted');
  };

  const handleUndo = () => {
    if (!deleted) return;
    setLiabilities(current => {
      const restored = [...current];
      restored.splice(deleted.index, 0, deleted.liability);
      return restored;
    });
    setDeleted(null);
    setToast('');
  };

  return (
    <div className="liabilities-page">
      <GlobalHeader
        title="Liabilities"
        subtitle="Everything you owe, and your path to zero"
        showSearch={false}
        showAddButton={true}
        addButtonText="Add liability"
        onAddClick={handleAddLiability}
        onThemeToggle={handleThemeToggle}
      />
      <LiabilitiesSummary liabilities={liabilities} />
      <DebtComposition liabilities={liabilities} categories={categories} />
      <LiabilitiesList
        liabilities={liabilities}
        categories={categories}
        onEdit={handleEditLiability}
        onDelete={handleDeleteLiability}
      />
      <DebtAnalytics />
      <DebtPayoffProjection liabilities={liabilities} />
      <LiabilityModal
        key={`${isModalOpen}-${editIndex}`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLiability}
        categories={categories}
        editLiability={editIndex !== null ? liabilities[editIndex] : null}
      />
      {toast && (
        <div className="liability-toast">
          <span>{toast}</span>
          {deleted && <button type="button" onClick={handleUndo}>Undo</button>}
        </div>
      )}
      <style>{`
        .liabilities-page {
          flex: 1;
          min-width: 0;
          padding: 28px 40px 56px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .liability-toast {
          position: fixed;
          right: 28px;
          bottom: 28px;
          z-index: 30;
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--surface);
          border: 1px solid var(--success);
          padding: 12px 18px;
          border-radius: 12px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
        }

        .liability-toast button {
          border: 0;
          background: transparent;
          color: #A5A0FF;
          cursor: pointer;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
