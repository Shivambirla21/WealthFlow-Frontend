import { useState } from 'react';
import { flushSync } from 'react-dom';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Logo from '../../components/Logo.jsx';
import { NavigationIcons, UserIcons, ActionIcons } from '../Icon.jsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: NavigationIcons.Overview },
  { to: '/transactions', label: 'Transactions', icon: NavigationIcons.Transactions },
  { to: '/budgets', label: 'Budgets', icon: NavigationIcons.Budgets },
  { to: '/cash-flow', label: 'Cash Flow', icon: NavigationIcons.CashFlow },
  { to: '/goals', label: 'Goals', icon: NavigationIcons.Goals },
  { to: '/net-worth', label: 'Net Worth', icon: NavigationIcons.NetWorth },
  { to: '/investments', label: 'Investments', icon: NavigationIcons.Investments },
  { to: '/assets', label: 'Assets', icon: NavigationIcons.Assets },
  { to: '/liabilities', label: 'Liabilities', icon: NavigationIcons.Liabilities },
  { to: '/recurring', label: 'Recurring', icon: NavigationIcons.Recurring },
  { to: '/reports', label: 'Reports', icon: NavigationIcons.Reports },
  { to: '/insights', label: 'Insights', icon: NavigationIcons.Insights },
];

export default function GlobalSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { userName, signOut } = useAuth();
  const navigate = useNavigate();
  const initials = userName.split(' ').map((word) => word[0]).join('').toUpperCase().slice(0, 2);

  const handleSignOut = () => {
    flushSync(() => signOut());
    navigate('/', { replace: true });
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`global-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          {!isCollapsed && <Logo height={32} />}
          {isCollapsed && <div className="logo-icon">W</div>}
        </div>
        <button
          type="button"
          className="toggle-btn"
          onClick={toggleSidebar}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              <IconComponent size={20} className="nav-icon" />
              {!isCollapsed && <span className="nav-label">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/help" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} title={isCollapsed ? 'Help' : ''}>
          <NavigationIcons.Help size={20} className="nav-icon" />
          {!isCollapsed && <span className="nav-label">Help</span>}
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} title={isCollapsed ? 'Settings' : ''}>
          <NavigationIcons.Settings size={20} className="nav-icon" />
          {!isCollapsed && <span className="nav-label">Settings</span>}
        </NavLink>
        <button
          type="button"
          className="nav-item sign-out"
          onClick={handleSignOut}
          title={isCollapsed ? 'Sign out' : ''}
        >
          <UserIcons.LogOut size={20} className="nav-icon" />
          {!isCollapsed && <span className="nav-label">Sign out</span>}
        </button>
        {!isCollapsed && (
          <div className="user-profile">
            <div className="user-avatar">{initials}</div>
            <span className="user-name">{userName}</span>
          </div>
        )}
        {isCollapsed && (
          <div className="user-profile collapsed">
            <div className="user-avatar" title={userName}>{initials}</div>
          </div>
        )}
      </div>

      <style>{`
        .global-sidebar {
          width: 240px;
          flex: none;
          padding: 20px 16px;
          background: var(--surface);
          border-right: 1px solid var(--border);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          gap: 2px;
          position: sticky;
          top: 0;
          height: 100vh;
          font-size: 14px;
          line-height: 1.5;
          transition: width 0.3s ease, padding 0.3s ease;
        }

        .global-sidebar.collapsed {
          width: 72px;
          padding: 20px 12px;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding: 0 4px;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          min-height: 32px;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          background: var(--primary);
          color: #fff;
          display: grid;
          place-items: center;
          font-size: 16px;
          font-weight: 700;
        }

        .toggle-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease, color 0.15s ease, transform 0.3s ease;
        }

        .toggle-btn:hover {
          background: var(--surface-hover);
          color: var(--text);
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 10px 12px;
          border: 0;
          background: transparent;
          border-radius: 10px;
          color: var(--text-muted);
          font-family: inherit;
          font-size: 14px;
          line-height: 1.5;
          font-weight: 500;
          text-align: left;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
          white-space: nowrap;
          overflow: hidden;
        }

        .nav-icon {
          flex-shrink: 0;
          min-width: 20px;
        }

        .nav-label {
          opacity: 1;
          transition: opacity 0.2s ease;
        }

        .global-sidebar.collapsed .nav-label {
          opacity: 0;
          width: 0;
        }

        .nav-item:hover {
          background: var(--surface-hover);
          color: var(--text);
        }

        .nav-item.active {
          background: var(--primary-soft);
          color: #8B85FF;
        }

        .global-sidebar.collapsed .nav-item {
          justify-content: center;
          padding: 10px;
        }

        .global-sidebar.collapsed .nav-item .nav-icon {
          margin: 0;
        }

        .sidebar-footer {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .user-profile {
          display: flex;
          gap: 10px;
          align-items: center;
          color: var(--text);
          padding: 10px 12px;
          border-radius: 10px;
          margin-top: 8px;
          transition: opacity 0.2s ease;
        }

        .user-profile.collapsed {
          justify-content: center;
          padding: 10px;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--primary);
          color: #fff;
          display: grid;
          place-items: center;
          font-size: 12px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .user-name {
          font-weight: 500;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .global-sidebar.collapsed .user-name {
          display: none;
        }

        .sign-out {
          justify-content: flex-start;
        }

        .global-sidebar.collapsed .sign-out {
          justify-content: center;
        }
      `}</style>
    </aside>
  );
}
