import { useState } from 'react';
import GlobalHeader from '../components/layout/GlobalHeader.jsx';
import SettingsNavigation from '../components/settings/SettingsNavigation.jsx';
import SettingsProfile from '../components/settings/SettingsProfile.jsx';
import SettingsAppearance from '../components/settings/SettingsAppearance.jsx';
import SettingsSecurity from '../components/settings/SettingsSecurity.jsx';
import SettingsNotifications from '../components/settings/SettingsNotifications.jsx';
import SettingsAccounts from '../components/settings/SettingsAccounts.jsx';
import SettingsCategories from '../components/settings/SettingsCategories.jsx';
import SettingsBudget from '../components/settings/SettingsBudget.jsx';
import SettingsCurrency from '../components/settings/SettingsCurrency.jsx';
import SettingsPrivacy from '../components/settings/SettingsPrivacy.jsx';
import SettingsExport from '../components/settings/SettingsExport.jsx';
import SettingsDelete from '../components/settings/SettingsDelete.jsx';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');

  const handleThemeToggle = () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  };

  const sectionComponents = {
    profile: SettingsProfile,
    appearance: SettingsAppearance,
    security: SettingsSecurity,
    notifications: SettingsNotifications,
    accounts: SettingsAccounts,
    categories: SettingsCategories,
    budget: SettingsBudget,
    currency: SettingsCurrency,
    privacy: SettingsPrivacy,
    export: SettingsExport,
    delete: SettingsDelete,
  };

  const ActiveComponent = sectionComponents[activeSection];

  return (
    <div className="settings-page">
      <GlobalHeader
        title="Settings"
        subtitle="Manage your account, preferences and data"
        showSearch={false}
        showAddButton={false}
        onThemeToggle={handleThemeToggle}
      />
      <div className="settings-layout">
        <SettingsNavigation activeSection={activeSection} onSectionChange={setActiveSection} />
        <div className="settings-content">
          <ActiveComponent />
        </div>
      </div>
      <style>{`
        .settings-page {
          flex: 1;
          min-width: 0;
          padding: 28px 40px 56px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .settings-page h1 {
          font-size: 28px;
          letter-spacing: -0.5px;
          margin: 0;
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 13px;
        }

        .settings-layout {
          display: grid;
          grid-template-columns: 230px 1fr;
          gap: 28px;
          align-items: start;
        }

        .settings-content {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}
