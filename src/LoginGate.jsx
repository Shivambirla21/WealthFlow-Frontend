import React from 'react';
import Navbar from './components/Navbar.jsx';

export default function LoginGate({ onLogin, onSignUp, onSocialLogin }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-r from-sky-300/20 via-violet-200/20 to-emerald-300/20 blur-3xl" />
        <div className="relative grid gap-10 p-8 md:p-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col justify-between gap-6">
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                Modern finance starts here.
              </h1>
              <p className="mt-4 max-w-xl text-slate-500 leading-7">
                Securely sign in to your dashboard, track spending, and keep your data in sync with a clean, modern experience.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="text-sm uppercase tracking-[0.32em] text-slate-500">Benefits</div>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600">✓</span>
                  <span>Fast onboarding with email or social login.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600">✓</span>
                  <span>Modern interface with secure sessions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">✓</span>
                  <span>Connect with Google, Facebook, or local account.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Welcome back</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Sign in to your account</h2>
            </div>
            <LoginSocial onSocialLogin={onSocialLogin} />
            <div className="my-6 border-t border-slate-200" />
            <LoginForm onLogin={onLogin} onSignUp={onSignUp} />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

function LoginSocial({ onSocialLogin }) {
  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => onSocialLogin('google')}
        className="w-full inline-flex items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-sm">G</span>
        Continue with Google
      </button>
      <button
        type="button"
        onClick={() => onSocialLogin('facebook')}
        className="w-full inline-flex items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-blue-600 text-white">f</span>
        Continue with Facebook
      </button>
    </div>
  );
}

function LoginForm({ onLogin, onSignUp }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    await onLogin(email, password);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block text-sm font-medium text-slate-700">
        Email address
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          placeholder="you@example.com"
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
          className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          placeholder="Enter your password"
        />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-w-[10rem] items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Signing in...' : 'Log in'}
        </button>
        <button
          type="button"
          onClick={() => onSignUp(email, password)}
          className="inline-flex min-w-[10rem] items-center justify-center rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
        >
          Create account
        </button>
      </div>

      <p className="text-center text-sm text-slate-500">
        By continuing, you agree to manage your personal finance data securely with WealthFlow.
      </p>
    </form>
  );
}
