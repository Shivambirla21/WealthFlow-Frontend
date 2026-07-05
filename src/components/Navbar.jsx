import React, { useEffect, useState } from 'react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: '#contact' },
  { label: 'Career', href: '#career' },
];

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedMode = window.localStorage.getItem('wf-theme');
    const initialDark = storedMode === 'dark' || (!storedMode && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(initialDark);
    document.documentElement.classList.toggle('dark', initialDark);
  }, []);

  const toggleTheme = () => {
    setIsDark((current) => {
      const next = !current;
      window.localStorage.setItem('wf-theme', next ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  return (
    <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-5 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <span className="text-3xl font-extrabold tracking-tight text-sky-600 drop-shadow-[0_0_18px_rgba(56,189,248,0.28)]">
          WealthFlow
        </span>
      </div>
      <div className="flex flex-1 items-center justify-end gap-6 text-sm font-semibold text-slate-600">
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition hover:text-slate-900"
            >
              {item.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          aria-label="Toggle dark mode"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-700 shadow-inner">
            {isDark ? '🌙' : '☀️'}
          </span>
          {isDark ? 'Dark' : 'Light'}
        </button>
      </div>
    </nav>
  );
}
