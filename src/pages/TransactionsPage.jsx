import { useState } from 'react';
import TransactionsHeader from '../components/transaction/TransactionsHeader';
import TransactionSummary from '../components/transaction/TransactionSummary';
import TransactionFilters from '../components/transaction/TransactionFilters';
import TransactionTable from '../components/transaction/TransactionTable';
import TransactionModal from '../components/transaction/TransactionModal';
import { useAuth } from '../context/AuthContext.jsx';

export default function TransactionsPage() {
  const { toggleTheme } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [showModal, setShowModal] = useState(false);

  const handleAddTransaction = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  const handleModalSave = () => {
    console.log('Transaction saved');
    setShowModal(false);
  };

  return (
    <>
      <main className="transactions-main">
        <TransactionsHeader
          onAddTransaction={handleAddTransaction}
          onThemeToggle={toggleTheme}
        />

        <TransactionSummary />

        <div className="transactions-card">
          <TransactionFilters
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onSearch={() => {}}
          />

          <TransactionTable
            activeTab={activeTab}
            currency="₹"
          />
        </div>
      </main>

      <TransactionModal
        isOpen={showModal}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />

      <style>{`
        .transactions-main {
          flex: 1;
          min-width: 0;
          padding: 28px 40px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .transactions-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
        }

        @media (max-width: 1400px) {
          .transactions-main {
            padding: 20px 24px;
          }
        }

        @media (max-width: 768px) {
          .transactions-main {
            padding: 16px;
          }
        }
      `}</style>
    </>
  );
}
