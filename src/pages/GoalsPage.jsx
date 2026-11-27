import { useState } from 'react';
import GlobalHeader from '../components/layout/GlobalHeader.jsx';
import GoalsSummary from '../components/goals/GoalsSummary';
import GoalsGrid from '../components/goals/GoalsGrid';
import GoalsDetail from '../components/goals/GoalsDetail';
import { useAuth } from '../context/AuthContext.jsx';

const allGoals = [
  { id: 1, name: 'Emergency Fund', icon: '🛟', current: 145000, target: 200000, monthly: 10000, startMonth: 9, targetDate: 'Jun 2027', color: '#14B8A6' },
  { id: 2, name: 'Vacation', icon: '🏝', current: 60000, target: 150000, monthly: 15000, startMonth: 6, targetDate: 'Apr 2027', color: '#F59E0B' },
  { id: 3, name: 'New Laptop', icon: '💻', current: 60000, target: 120000, monthly: 12000, startMonth: 3, targetDate: 'Jan 2027', color: '#635BFF' },
  { id: 4, name: 'Car', icon: '🚗', current: 180000, target: 800000, monthly: 25000, startMonth: 0, targetDate: 'Dec 2028', color: '#60A5FA' },
  { id: 5, name: 'House', icon: '🏠', current: 400000, target: 5000000, monthly: 50000, startMonth: 0, targetDate: 'Dec 2032', color: '#A78BFA' },
  { id: 6, name: 'Investment', icon: '📈', current: 130000, target: 300000, monthly: 12000, startMonth: 4, targetDate: 'Dec 2027', color: '#34D399' }
];

export default function GoalsPage() {
  const { toggleTheme } = useAuth();
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleThemeToggle = () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  };

  const handleCreateGoal = () => {
    console.log('Create goal clicked');
  };

  const handleSelectGoal = (goal) => {
    setSelectedGoal(goal);
  };

  const handleContribute = (goal) => {
    const updatedGoal = { ...goal, current: Math.min(goal.current + goal.monthly, goal.target) };
    setSelectedGoal(updatedGoal);
    setToastMessage(`✓ ₹${goal.monthly.toLocaleString()} added to ${goal.name}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  return (
    <div className="goals-page">
      <GlobalHeader
        title="Goals"
        subtitle="Track what you're saving for"
        showSearch={false}
        showAddButton={true}
        addButtonText="Create goal"
        onAddClick={handleCreateGoal}
        onThemeToggle={handleThemeToggle}
      />

      <GoalsSummary />

      <GoalsGrid onSelectGoal={handleSelectGoal} />

      <GoalsDetail goal={selectedGoal} onContribute={handleContribute} />

      {showToast && (
        <div className="toast show">✓ ₹{(selectedGoal?.monthly || 0).toLocaleString()} added to {selectedGoal?.name}</div>
      )}

      <style>{`
        .goals-page {
          flex: 1;
          min-width: 0;
          padding: 28px 40px 56px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .toast {
          position: fixed;
          right: 28px;
          bottom: 28px;
          background: var(--surface);
          border: 1px solid var(--success);
          color: var(--text);
          padding: 12px 18px;
          border-radius: 12px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.24);
          opacity: 0;
          transform: translateY(10px);
          transition: 0.3s ease;
          pointer-events: none;
        }

        .toast.show {
          opacity: 1;
          transform: none;
        }

        @media (max-width: 1400px) {
          .goals-page {
            padding: 20px 24px;
          }
        }

        @media (max-width: 768px) {
          .goals-page {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}
