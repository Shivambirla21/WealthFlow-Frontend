import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import GlobalHeader from '../components/layout/GlobalHeader.jsx';
import RecurringSummary from '../components/recurring/RecurringSummary.jsx';
import PaymentCalendar from '../components/recurring/PaymentCalendar.jsx';
import UpcomingPayments from '../components/recurring/UpcomingPayments.jsx';
import CategoryBreakdown from '../components/recurring/CategoryBreakdown.jsx';
import RecurringList from '../components/recurring/RecurringList.jsx';
import RecurringModal from '../components/recurring/RecurringModal.jsx';

const categories = [
  { name: 'Subscriptions', icon: '🔁', color: '#635BFF', variable: true },
  { name: 'Utilities', icon: '💡', color: '#14B8A6', variable: true },
  { name: 'Insurance', icon: '🛡', color: '#60A5FA', variable: true },
  { name: 'Memberships', icon: '🏋', color: '#F59E0B', variable: true },
  { name: 'Rent', icon: '🏠', color: '#A78BFA', variable: false },
  { name: 'Loans', icon: '🏦', color: '#F26B5B', variable: false }
];

const referenceDate = new Date(2026, 9, 3);
const seed = [
  ['Netflix', 0, 649, 'Monthly', 10, 4, 'HDFC Card', 'Upcoming'],
  ['Spotify', 0, 119, 'Monthly', 10, 1, 'HDFC Card', 'Paid'],
  ['YouTube Premium', 0, 149, 'Monthly', 10, 2, 'ICICI Card', 'Paid'],
  ['Amazon Prime', 0, 1499, 'Yearly', 12, 3, 'ICICI Card', 'Upcoming'],
  ['iCloud+', 0, 219, 'Monthly', 10, 11, 'HDFC Card', 'Upcoming'],
  ['Hotstar', 0, 299, 'Monthly', 10, 9, 'ICICI Card', 'Upcoming'],
  ['Notion', 0, 400, 'Monthly', 10, 14, 'HDFC Card', 'Upcoming'],
  ['Audible', 0, 199, 'Monthly', 10, 16, 'ICICI Card', 'Upcoming'],
  ['Electricity', 1, 2150, 'Monthly', 10, 8, 'SBI Bank', 'Upcoming', true],
  ['Internet', 1, 799, 'Monthly', 10, 7, 'HDFC Card', 'Upcoming'],
  ['Mobile recharge', 1, 349, 'Monthly', 10, 1, 'UPI', 'Paid'],
  ['Piped gas (PNG)', 1, 500, 'Monthly', 9, 30, 'SBI Bank', 'Overdue'],
  ['Health insurance', 2, 12500, 'Yearly', 10, 12, 'HDFC Bank', 'Upcoming'],
  ['Bike insurance', 2, 1600, 'Yearly', 11, 20, 'HDFC Bank', 'Upcoming'],
  ['Gym membership', 3, 1288, 'Monthly', 10, 6, 'UPI', 'Upcoming'],
  ['Rent', 4, 18000, 'Monthly', 10, 5, 'SBI Bank', 'Upcoming'],
  ['SBI Personal Loan EMI', 5, 9800, 'Monthly', 10, 5, 'SBI Bank', 'Upcoming'],
  ['HDFC Home Loan EMI', 5, 22100, 'Monthly', 10, 7, 'HDFC Bank', 'Upcoming'],
  ['Activa Loan EMI', 5, 3200, 'Monthly', 10, 10, 'HDFC Bank', 'Upcoming']
];

const initialItems = seed.map((row, index) => {
  const dueDate = new Date(2026, row[4] - 1, row[5]);
  return {
    id: index + 1,
    name: row[0],
    categoryIndex: row[1],
    amount: row[2],
    billing: row[3],
    month: row[4],
    day: row[5],
    year: 2026,
    account: row[6],
    status: row[7],
    variable: Boolean(row[8]),
    color: categories[row[1]].color,
    daysUntil: Math.round((dueDate - referenceDate) / 86400000)
  };
});

export default function RecurringPage() {
  const { toggleTheme } = useAuth();
  const [items, setItems] = useState(initialItems);
  const [activeTab, setActiveTab] = useState('All');
  const [activeCategory, setActiveCategory] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 2500);
  };

  const markPaid = (id) => {
    const item = items.find((entry) => entry.id === id);
    setItems((current) => current.map((entry) => (
      entry.id === id ? { ...entry, status: 'Paid' } : entry
    )));
    showToast((item?.name || 'Payment') + ' marked as paid');
  };

  const addRecurring = (data) => {
    const item = {
      ...data,
      id: Math.max(0, ...items.map((entry) => entry.id)) + 1,
      color: categories[data.categoryIndex].color
    };
    setItems((current) => [...current, item]);
    setIsModalOpen(false);
    showToast(item.name + ' added');
  };

  const handleThemeToggle = () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  return (
    <main className="recurring-page">
      <GlobalHeader
        title="Recurring"
        subtitle="Track your subscriptions and recurring payments"
        showSearch={false}
        showAddButton={true}
        addButtonText="Add recurring"
        onAddClick={handleAdd}
        onThemeToggle={handleThemeToggle}
      />
      <RecurringSummary items={items} categories={categories} />
      <PaymentCalendar items={items} />
      <div className="recurring-overview">
        <UpcomingPayments items={items} categories={categories} />
        <CategoryBreakdown items={items} categories={categories} />
      </div>
      <RecurringList
        items={items}
        categories={categories}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onMarkPaid={markPaid}
      />
      <RecurringModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={addRecurring} categories={categories} />
      {toast && <div className="recurring-toast" role="status">✓ {toast}</div>}
      <style>{`
        .recurring-page{flex:1;min-width:0;padding:28px 40px 56px;display:flex;flex-direction:column;gap:20px}
        .recurring-panel{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:22px;color:var(--text)}
        .recurring-panel h3{display:flex;justify-content:space-between;align-items:center;font-size:16px;margin:0;color:var(--text)}
        .recurring-panel h3 span{font-size:12px;font-weight:400;color:var(--text-muted)}
        .recurring-overview{display:grid;grid-template-columns:1.25fr 1fr;gap:20px;align-items:start}
        .recurring-toast{position:fixed;right:28px;bottom:28px;z-index:1100;background:var(--surface);border:1px solid var(--success);color:var(--text);padding:12px 18px;border-radius:12px;box-shadow:0 12px 30px #0005}
        @media(max-width:1200px){.recurring-page{padding:22px 24px 44px}.recurring-overview{grid-template-columns:1fr}}
        @media(max-width:768px){.recurring-page{padding:16px;gap:16px}.recurring-panel{padding:16px}}
      `}</style>
    </main>
  );
}