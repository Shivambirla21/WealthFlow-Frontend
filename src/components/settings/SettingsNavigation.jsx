export default function SettingsNavigation({ activeSection, onSectionChange }) {
  const sections = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'accounts', label: 'Accounts', icon: '🏦' },
    { id: 'categories', label: 'Categories', icon: '🏷' },
    { id: 'budget', label: 'Budget preferences', icon: '🎯' },
    { id: 'currency', label: 'Currency', icon: '💱' },
    { id: 'privacy', label: 'Data & Privacy', icon: '🛡' },
    { id: 'export', label: 'Export data', icon: '⬇' },
    { id: 'delete', label: 'Delete account', icon: '⚠' },
  ];

  return (
    <div className="settings-nav">
      {sections.map((section, i) => {
        if (i === 9) return <hr key="divider" />;
        return (
          <div
            key={section.id}
            className={`nav-item ${activeSection === section.id ? 'active' : ''} ${section.id === 'delete' ? 'danger' : ''}`}
            onClick={() => onSectionChange(section.id)}
          >
            <span>{section.icon}</span>
            {section.label}
          </div>
        );
      })}
      <style>{`
        .settings-nav {
          position: sticky;
          top: 20px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .nav-item {
          padding: 10px 12px;
          border-radius: 10px;
          color: var(--text-muted);
          font-weight: 500;
          cursor: pointer;
          display: flex;
          gap: 10px;
        }

        .nav-item:hover {
          background: var(--surface);
        }

        .nav-item.active {
          background: var(--primary-soft);
          color: #A5A0FF;
        }

        .nav-item.danger {
          color: var(--danger);
        }

        hr {
          border: 0;
          border-top: 1px solid var(--border);
          margin: 8px 0;
        }
      `}</style>
    </div>
  );
}
