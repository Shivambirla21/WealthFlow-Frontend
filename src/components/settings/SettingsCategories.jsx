export default function SettingsCategories() {
  const categories = [
    { icon: '🏠', name: 'Housing', color: '#635BFF' },
    { icon: '🍔', name: 'Food', color: '#14B8A6' },
    { icon: '🚗', name: 'Transport', color: '#F59E0B' },
    { icon: '🛍', name: 'Shopping', color: '#F26B5B' },
    { icon: '🎬', name: 'Entertainment', color: '#A78BFA' },
    { icon: '💡', name: 'Utilities', color: '#60A5FA' },
    { icon: '❤️', name: 'Health', color: '#34D399' },
    { icon: '➕', name: 'Other', color: '#9CA3AF' },
  ];

  return (
    <div className="settings-card">
      <h2>Categories</h2>
      <div className="subtitle">Organize how your transactions are grouped.</div>
      <div className="category-grid">
        {categories.map((cat, i) => (
          <div key={i} className="category-card">
            <span className="icon" style={{ background: `${cat.color}33` }}>{cat.icon}</span>
            <span>{cat.name}</span>
            <i style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color }}></i>
            <small>✎</small>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <button type="button" className="btn primary">+ New category</button>
      </div>
      <style>{`
        .settings-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 26px; max-width: 820px; }
        .settings-card h2 { font-size: 20px; letter-spacing: -0.4px; margin-bottom: 4px; }
        .subtitle { color: var(--text-muted); font-size: 13px; }
        .settings-card > .subtitle { margin-bottom: 18px; }
        .category-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .category-card { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border: 1px solid var(--border); border-radius: 12px; }
        .category-card .icon { width: 34px; height: 34px; }
        .category-card span { flex: 1; font-weight: 600; }
        .category-card small { color: var(--text-muted); }
        .btn { padding: 10px 16px; border: 1px solid var(--border); border-radius: 10px; background: var(--surface); color: var(--text); font: 600 14px inherit; cursor: pointer; }
        .btn.primary { background: var(--primary); border-color: var(--primary); color: #fff; }
      `}</style>
    </div>
  );
}
