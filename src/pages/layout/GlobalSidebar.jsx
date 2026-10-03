import { flushSync } from 'react-dom';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Logo from '../../components/Logo.jsx';

const navItems = [
  { to: '/dashboard', label: 'Overview' },
  { to: '/transactions', label: 'Transactions' },
  { to: '/budgets', label: 'Budgets' },
  { to: '/cash-flow', label: 'Cash Flow' },
  { to: '/goals', label: 'Goals' },
  { to: '/net-worth', label: 'Net Worth' },
  { to: '/investments', label: 'Investments' },
  { to: '/assets', label: 'Assets' },
  { to: '/liabilities', label: 'Liabilities' },
  { to: '/recurring', label: 'Recurring' },
  { to: '/reports', label: 'Reports' },
  { to: '/insights', label: 'Insights' },
];

export default function GlobalSidebar() {
  const { userName, signOut } = useAuth();
  const navigate = useNavigate();
  const initials = userName.split(' ').map((word) => word[0]).join('').toUpperCase().slice(0, 2);

  const handleSignOut = () => {
    flushSync(() => signOut());
    navigate('/', { replace: true });
  };

  return (
    <aside className="global-sidebar">
      <div className="sidebar-logo">
        <Logo height={40} />
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/help" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>Help</NavLink>
        <NavLink to="/settings" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>Settings</NavLink>
        <button type="button" className="nav-item sign-out" onClick={handleSignOut}>Sign out</button>
        <div className="user-profile">
          <div className="user-avatar">{initials}</div>
          <span className="user-name">{userName}</span>
        </div>
      </div>

      <style>{`
        .global-sidebar {
          width: 240px;
          flex: none;
          padding: 24px 16px;
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
        }

        .sidebar-logo {
          font-size: 16px;
          padding: 0 4px 24px;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .nav-item {
          display: block;
          width: 100%;
          padding: 9px 12px;
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
        }

        .nav-item:hover {
          background: var(--surface-hover);
          color: var(--text);
        }

        .nav-item.active {
          background: var(--primary-soft);
          color: #8B85FF;
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
          padding: 9px 12px;
          border-radius: 10px;
          margin-top: 8px;
        }

        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--primary);
          color: #fff;
          display: grid;
          place-items: center;
          font-size: 12px;
          font-weight: 600;
        }

        .user-name {
          font-weight: 500;
          font-size: 14px;
        }
      `}</style>
    </aside>
  );
}
