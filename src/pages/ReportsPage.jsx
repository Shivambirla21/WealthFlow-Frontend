import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import GlobalHeader from '../components/layout/GlobalHeader.jsx';
import ReportCard from '../components/reports/ReportCard.jsx';
import RecentReports from '../components/reports/RecentReports.jsx';
import ReportPreview from '../components/reports/ReportPreview.jsx';

const initialReports = [
  { id: 'monthly-summary', title: 'Monthly Financial Summary', icon: '📊', description: 'Your full month at a glance: income, spending, savings and net worth.', lastGenerated: 'Sep 30, 2026', bars: [40, 55, 48, 70, 62, 80], color: '#635BFF' },
  { id: 'income', title: 'Income Report', icon: '💼', description: 'Every source of income, trends and month-over-month change.', lastGenerated: 'Sep 30, 2026', bars: [50, 52, 55, 58, 57, 64], color: '#10B981' },
  { id: 'expenses', title: 'Expense Report', icon: '🧾', description: 'Spending by category and merchant, with unusual changes flagged.', lastGenerated: 'Sep 30, 2026', bars: [60, 56, 62, 52, 58, 54], color: '#F26B5B' },
  { id: 'cash-flow', title: 'Cash Flow Report', icon: '💧', description: 'Income vs expenses and your net cash flow over time.', lastGenerated: 'Sep 30, 2026', bars: [30, 34, 26, 34, 31, 36], color: '#14B8A6' },
  { id: 'net-worth', title: 'Net Worth Report', icon: '📈', description: 'Assets, liabilities and how your wealth has grown.', lastGenerated: 'Aug 31, 2026', bars: [30, 38, 46, 56, 66, 80], color: '#A78BFA' },
  { id: 'budget', title: 'Budget Report', icon: '🎯', description: 'Budget vs actual for every category, with overspending highlighted.', lastGenerated: 'Sep 30, 2026', bars: [70, 64, 80, 76, 72, 70], color: '#F59E0B' },
  { id: 'investments', title: 'Investment Report', icon: '💹', description: 'Portfolio performance, allocation and returns by asset class.', lastGenerated: 'Sep 30, 2026', bars: [34, 40, 38, 52, 60, 72], color: '#60A5FA' },
  { id: 'tax-summary', title: 'Tax Summary', icon: '🏛', description: 'Income, deductions and investments ready for tax filing.', lastGenerated: 'FY 2025-26', bars: [45, 45, 45, 45, 45, 45], color: '#9CA3AF' }
];

const recentReports = [
  { id: 'recent-monthly', title: 'Monthly Financial Summary', period: 'August 2026', date: 'Sep 1, 2026', index: 0 },
  { id: 'recent-budget', title: 'Budget Report', period: 'August 2026', date: 'Sep 1, 2026', index: 5 },
  { id: 'recent-tax', title: 'Tax Summary', period: 'FY 2025-26', date: 'Jul 18, 2026', index: 7 }
];

export default function ReportsPage() {
  const { toggleTheme } = useAuth();
  const [reports, setReports] = useState(initialReports);
  const [period, setPeriod] = useState('September 2026');
  const [previewIndex, setPreviewIndex] = useState(null);
  const [generatingId, setGeneratingId] = useState('');
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);
  const generateTimer = useRef(null);

  useEffect(() => () => {
    window.clearTimeout(toastTimer.current);
    window.clearTimeout(generateTimer.current);
  }, []);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 2600);
  };

  const generate = (index) => {
    const report = reports[index];
    if (!report || generatingId) return;
    setGeneratingId(report.id);
    generateTimer.current = window.setTimeout(() => {
      setReports((current) => current.map((item) => item.id === report.id
        ? { ...item, lastGenerated: 'Just now' }
        : item));
      setGeneratingId('');
      showToast(report.title + ' generated (sample preview)');
    }, 1000);
  };

  const notifyExport = (type, index) => {
    const report = reports[index];
    if (!report) return;
    showToast(type + ' export will be enabled when the reports API is connected.');
  };

  const openPreview = (index) => setPreviewIndex(index);

  const handleThemeToggle = () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  };

  const handleNewReport = () => {
    generate(0);
  };

  return (
    <main className="reports-page">
      {previewIndex === null ? (
        <>
          <GlobalHeader
            title="Reports"
            subtitle="Generate and export financial reports"
            showSearch={false}
            showAddButton={true}
            addButtonText="New report"
            onAddClick={handleNewReport}
            onThemeToggle={handleThemeToggle}
          />
          <section className="reports-grid" aria-label="Available reports">
            {reports.map((report, index) => (
              <ReportCard
                key={report.id}
                report={report}
                busy={generatingId === report.id}
                onGenerate={() => generate(index)}
                onPreview={() => openPreview(index)}
                onDownload={() => notifyExport('PDF', index)}
                onExport={() => notifyExport('CSV', index)}
              />
            ))}
          </section>
          <RecentReports
            reports={recentReports}
            onPreview={openPreview}
            onDownload={(index) => notifyExport('PDF', index)}
          />
        </>
      ) : (
        <ReportPreview
          report={reports[previewIndex]}
          period={period}
          onBack={() => setPreviewIndex(null)}
          onPrint={() => window.print()}
          onDownload={() => notifyExport('PDF', previewIndex)}
          onExport={() => notifyExport('CSV', previewIndex)}
        />
      )}
      {toast && <div className="reports-toast" role="status">✓ {toast}</div>}
      <style>{`
        .reports-page{flex:1;min-width:0;padding:28px 40px 56px;display:flex;flex-direction:column;gap:20px}
        .reports-panel{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:20px;color:var(--text)}
        .reports-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
        .reports-toast{position:fixed;right:28px;bottom:28px;z-index:1100;max-width:min(420px,calc(100vw - 32px));background:var(--surface);border:1px solid var(--success);color:var(--text);padding:12px 18px;border-radius:12px;box-shadow:0 12px 30px #0005}
        @media(max-width:1200px){.reports-page{padding:22px 24px 44px}.reports-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:768px){.reports-page{padding:16px;gap:16px}.reports-grid{grid-template-columns:1fr}.reports-panel{padding:16px}}
      `}</style>
    </main>
  );
}
