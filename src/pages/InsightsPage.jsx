import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import GlobalHeader from '../components/layout/GlobalHeader.jsx';
import FinancialHealth from '../components/insights/FinancialHealth.jsx';
import InsightCard from '../components/insights/InsightCard.jsx';

const categories = [
  { name: 'Spending patterns', icon: '🛍' },
  { name: 'Savings opportunities', icon: '💰' },
  { name: 'Budget alerts', icon: '🎯' },
  { name: 'Recurring payment alerts', icon: '🔁' },
  { name: 'Goal progress', icon: '🏁' },
  { name: 'Investment observations', icon: '📈' },
  { name: 'Cash-flow observations', icon: '💧' },
];

const initialInsights = [
  { id: 1, category: 0, status: 'attention', title: 'Dining spending increased 18% this month', description: 'You spent 18% more on dining than in August, mostly on food delivery.', metric: '+18%', metricLabel: 'vs August', why: 'Food is your second-largest category and now takes 20% of all spending. Small, frequent orders add up quickly.', action: 'Review transactions', route: '/transactions', priority: 1 },
  { id: 2, category: 0, status: 'info', title: 'Weekends drive your discretionary spending', description: '42% of your shopping, dining and entertainment spend happens from Friday to Sunday.', metric: '42%', metricLabel: 'on weekends', why: 'Predictable spikes are easier to plan for. A weekend limit can keep the rest of the month on track.', action: 'Create budget', route: '/budgets' },
  { id: 3, category: 1, status: 'info', title: 'Your 8 subscriptions cost ₹25,908 a year', description: 'Subscriptions total ₹2,159 a month, with Netflix the largest at ₹649.', metric: '₹25,908', metricLabel: 'per year', why: 'Subscriptions are easy to forget. A quick review often finds services you no longer use.', action: 'Review recurring', route: '/recurring' },
  { id: 4, category: 1, status: 'info', title: '₹32,420 is sitting in low-interest cash', description: 'Most of your cash is in savings accounts and a wallet that earn little.', metric: '₹32,420', metricLabel: 'in cash', why: 'Money beyond your emergency fund and near-term bills may work harder elsewhere. Compare options that fit your risk comfort.', action: 'View accounts', route: '/assets' },
  { id: 5, category: 2, status: 'important', title: 'Entertainment is ₹550 over budget', description: 'You\'ve spent ₹3,550 of your ₹3,000 entertainment budget with the month nearly done.', metric: '118%', metricLabel: 'of budget used', why: 'Overspending in one category quietly reduces what\'s left for savings and goals.', action: 'Adjust budget', route: '/budgets', priority: 1 },
  { id: 6, category: 2, status: 'attention', title: 'Shopping is ₹800 over budget', description: 'Shopping reached 113% of its ₹6,000 budget, mostly from two large purchases.', metric: '113%', metricLabel: 'of budget used', why: 'Larger one-off purchases are the most common reason a budget slips.', action: 'Review transactions', route: '/transactions' },
  { id: 7, category: 3, status: 'attention', title: '₹27,800 in payments are due in 2 days', description: 'Rent (₹18,000) and your SBI personal loan EMI (₹9,800) are both due on Oct 5.', metric: '₹27,800', metricLabel: 'due Oct 5', why: 'Missing a loan EMI can add late fees and affect your credit score. Make sure the account is funded.', action: 'View upcoming', route: '/recurring', priority: 1 },
  { id: 8, category: 3, status: 'important', title: 'Your piped gas bill is overdue', description: 'The ₹500 PNG bill was due on Sep 30 and hasn\'t been marked as paid.', metric: '3 days', metricLabel: 'overdue', why: 'Utility bills left unpaid can lead to late charges or a service pause.', action: 'Mark as paid', route: '/recurring' },
  { id: 9, category: 4, status: 'onTrack', title: 'Your emergency fund is ahead of schedule', description: 'At ₹10,000 a month you\'ll reach ₹2,00,000 by Mar 2027, 3 months before your June target.', metric: '72.5%', metricLabel: 'funded', why: 'A fully funded emergency fund protects your other goals from unexpected expenses.', action: 'View goal', route: '/goals' },
  { id: 10, category: 4, status: 'attention', title: 'Your New Laptop goal is 2 months behind', description: 'At the current ₹12,000 a month, you\'ll finish in Mar 2027 instead of Jan 2027.', metric: '2 months', metricLabel: 'behind', why: 'Small increases now close the gap more easily than catching up later.', action: 'Add contribution', route: '/goals', priority: 0 },
  { id: 11, category: 5, status: 'onTrack', title: 'Your portfolio is up 16.7% overall', description: 'Crypto is your best performer at +41%, but it\'s only 4.7% of your portfolio.', metric: '+₹1,84,000', metricLabel: 'total return', why: 'Strong returns from a small slice lift growth but also add volatility. Check that your mix matches your goals.', action: 'View investments', route: '/investments' },
  { id: 12, category: 5, status: 'info', title: 'Equity and mutual funds are 64% of your portfolio', description: 'Together they hold ₹8,25,000, while debt and gold make up 20%.', metric: '64%', metricLabel: 'in equity-linked', why: 'Concentration raises both potential growth and short-term swings in value.', action: 'See allocation', route: '/investments' },
  { id: 13, category: 6, status: 'onTrack', title: 'Net cash flow was +₹28,420 this month', description: 'Income grew 2.4% while spending rose 1.9%, your second-strongest month this year.', metric: '+₹28,420', metricLabel: 'net cash flow', why: 'Positive cash flow is what funds your goals, investments and debt payoff.', action: 'View cash flow', route: '/cash-flow' },
];

export default function InsightsPage() {
  const { toggleTheme } = useAuth();
  const navigate = useNavigate();
  const [period, setPeriod] = useState('September 2026');
  const [activeCategory, setActiveCategory] = useState(-1);
  const [insights, setInsights] = useState(initialInsights);
  const [expanded, setExpanded] = useState({});
  const [dismissedId, setDismissedId] = useState(null);
  const [toast, setToast] = useState('');

  const visibleInsights = useMemo(() => insights.filter((item) => !item.dismissed), [insights]);
  const filteredInsights = useMemo(
    () => visibleInsights.filter((item) => activeCategory === -1 || item.category === activeCategory),
    [visibleInsights, activeCategory],
  );
  const priorities = visibleInsights.filter((item) => item.priority !== undefined)
    .sort((a, b) => b.priority - a.priority).slice(0, 3);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(window.__wealthFlowInsightToast);
    window.__wealthFlowInsightToast = window.setTimeout(() => setToast(''), 2800);
  };

  const dismissInsight = (id) => {
    setInsights((current) => current.map((item) => item.id === id ? { ...item, dismissed: true } : item));
    setDismissedId(id);
    showToast('Insight dismissed');
  };

  const undoDismiss = () => {
    if (dismissedId === null) return;
    setInsights((current) => current.map((item) => item.id === dismissedId ? { ...item, dismissed: false } : item));
    setDismissedId(null);
    setToast('');
  };

  const handleThemeToggle = () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  };

  return (
    <main className="insights-page">
      <GlobalHeader
        title="Insights"
        subtitle="AI-powered analysis of your finances"
        showSearch={false}
        showAddButton={false}
        onThemeToggle={handleThemeToggle}
      />
      <section className="insights-overview">
        <FinancialHealth />
        <section className="insights-panel priorities-panel">
          <div className="insights-panel-heading"><h2>Top priorities</h2><span>Act on these first</span></div>
          {priorities.length ? priorities.map((item, index) => (
            <button type="button" className="priority-row" key={item.id} onClick={() => navigate(item.route)}>
              <span className="priority-number">{index + 1}</span>
              <span className="priority-copy"><b>{item.title}</b><small>{item.metric} {item.metricLabel}</small></span>
              <span className={`insight-status ${item.status}`}>{item.status === 'important' ? 'Important' : 'Attention'}</span>
            </button>
          )) : <p className="insights-empty-priority">Nothing urgent. You’re all caught up.</p>}
        </section>
      </section>

      <div className="insight-filters" aria-label="Filter insights">
        <button type="button" className={activeCategory === -1 ? 'active' : ''} onClick={() => setActiveCategory(-1)}>All <small>{visibleInsights.length}</small></button>
        {categories.map((category, index) => (
          <button type="button" key={category.name} className={activeCategory === index ? 'active' : ''} onClick={() => setActiveCategory(index)}>
            {category.name} <small>{visibleInsights.filter((item) => item.category === index).length}</small>
          </button>
        ))}
      </div>

      <div className="insight-groups">
        {categories.map((category, index) => {
          const items = filteredInsights.filter((item) => item.category === index);
          if (!items.length) return null;
          return (
            <section className="insight-group" key={category.name}>
              <h2><span>{category.icon}</span>{category.name}</h2>
              <div className="insight-grid">
                {items.map((insight) => (
                  <div className="insights-panel" key={insight.id}>
                    <InsightCard
                      insight={{ ...insight, category: category.name, categoryIcon: category.icon }}
                      expanded={Boolean(expanded[insight.id])}
                      onToggleWhy={() => setExpanded((current) => ({ ...current, [insight.id]: !current[insight.id] }))}
                      onAction={() => navigate(insight.route)}
                      onDismiss={() => dismissInsight(insight.id)}
                    />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
        {!filteredInsights.length && <div className="insights-panel insights-empty">No insights here right now. We’ll let you know when something changes.</div>}
      </div>

      <p className="insights-disclaimer">Insights are observations based on your data, not financial advice.</p>
      {toast && <div className="insights-toast" role="status">{toast}{dismissedId !== null && <button type="button" onClick={undoDismiss}>Undo</button>}</div>}

      <style>{`
        .insights-page{flex:1;min-width:0;padding:28px 40px 56px;display:flex;flex-direction:column;gap:20px;color:var(--text)}
        .insights-panel{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:22px;min-width:0}
        .insights-panel-heading{display:flex;justify-content:space-between;align-items:center;gap:12px}
        .insights-panel-heading h2{font-size:16px;margin:0;color:var(--text)}
        .insights-panel-heading>span{font-size:12px;color:var(--text-muted)}
        .insights-overview{display:grid;grid-template-columns:1.1fr 1fr;gap:20px}
        .priorities-panel{padding-bottom:12px}
        .priority-row{width:100%;display:flex;align-items:center;gap:12px;padding:13px 0;border:0;border-bottom:1px solid var(--border);background:none;color:var(--text);text-align:left;cursor:pointer}
        .priority-row:last-child{border-bottom:0}
        .priority-number{width:27px;height:27px;display:grid;place-items:center;flex:none;border-radius:8px;background:var(--primary-soft);color:var(--primary-muted);font-size:12px;font-weight:700}
        .priority-copy{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}
        .priority-copy b{font-size:12.5px;line-height:1.35}
        .priority-copy small{font-size:12px;color:var(--text-muted)}
        .insight-filters{display:flex;gap:7px;flex-wrap:wrap}
        .insight-filters button{padding:7px 13px;border:1px solid var(--border);border-radius:22px;background:transparent;color:var(--text-muted);font:500 12px inherit;cursor:pointer}
        .insight-filters button.active{background:var(--primary-soft);border-color:var(--primary);color:var(--primary-muted)}
        .insight-filters small{margin-left:4px;opacity:.7}
        .insight-group h2{font-size:19px;letter-spacing:-.4px;display:flex;align-items:center;gap:10px;margin:8px 0 12px}
        .insight-group h2 span{width:34px;height:34px;border-radius:10px;background:var(--primary-soft);display:grid;place-items:center;font-size:16px}
        .insight-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
        .insight-grid>.insights-panel{padding:20px}
        .insights-empty{text-align:center;padding:48px 20px;color:var(--text-muted)}
        .insights-empty-priority{padding:24px 0;color:var(--text-muted);font-size:13px}
        .insights-disclaimer{text-align:center;color:var(--text-muted);font-size:12px;margin-top:2px}
        .insights-toast{position:fixed;right:28px;bottom:28px;z-index:1100;display:flex;gap:16px;align-items:center;max-width:calc(100vw - 32px);padding:12px 18px;border:1px solid var(--success);border-radius:12px;background:var(--surface);color:var(--text);box-shadow:0 12px 30px #0005}
        .insights-toast button{border:0;background:none;color:var(--primary-muted);font:600 12px inherit;cursor:pointer}
        @media(max-width:1200px){.insights-page{padding:22px 24px 44px}.insights-overview{grid-template-columns:1fr}.insight-grid{grid-template-columns:1fr}}
        @media(max-width:768px){.insights-page{padding:16px;gap:16px}.insights-panel{padding:16px}.insight-grid>.insights-panel{padding:16px}}
      `}</style>
    </main>
  );
}
