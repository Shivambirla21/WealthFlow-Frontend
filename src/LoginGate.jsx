import React from 'react';

export default function LoginGate({ onLogin, onSignUp, onSocialLogin }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
      <div className="relative max-w-2xl w-full overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/95 shadow-glow shadow-sky-400/20 backdrop-blur-xl">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-r from-sky-500/20 via-violet-500/15 to-emerald-400/15 blur-3xl" />
        <div className="relative grid gap-10 p-8 md:p-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-sky-300/80">WealthFlow</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Modern finance starts here.
              </h1>
              <p className="mt-4 max-w-xl text-slate-300/85 leading-7">
                Securely sign in to your dashboard, track spending, and keep your data in sync with a clean, modern experience.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg shadow-slate-950/40">
              <div className="text-sm uppercase tracking-[0.32em] text-slate-400">Benefits</div>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300">✓</span>
                  <span>Fast onboarding with email or social login.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">✓</span>
                  <span>Modern interface with secure sessions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">✓</span>
                  <span>Connect with Google, Facebook, or local account.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-8 shadow-xl shadow-slate-950/30">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Welcome back</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Sign in to your account</h2>
            </div>
            <LoginSocial onSocialLogin={onSocialLogin} />
            <div className="my-6 border-t border-slate-800" />
            <LoginForm onLogin={onLogin} onSignUp={onSignUp} />
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
        className="w-full inline-flex items-center justify-center gap-3 rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white text-slate-900">G</span>
        Continue with Google
      </button>
      <button
        type="button"
        onClick={() => onSocialLogin('facebook')}
        className="w-full inline-flex items-center justify-center gap-3 rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800"
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
      <label className="block text-sm font-medium text-slate-200">
        Email address
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
          placeholder="you@example.com"
        />
      </label>

      <label className="block text-sm font-medium text-slate-200">
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
          className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
          placeholder="Enter your password"
        />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-w-[10rem] items-center justify-center rounded-3xl bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:scale-[1.01] hover:shadow-sky-500/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Signing in...' : 'Log in'}
        </button>
        <button
          type="button"
          onClick={() => onSignUp(email, password)}
          className="inline-flex min-w-[10rem] items-center justify-center rounded-3xl border border-slate-700 bg-slate-800/95 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-600 hover:bg-slate-800"
        >
          Create account
        </button>
      </div>

      <p className="text-center text-sm text-slate-400">
        By continuing, you agree to manage your personal finance data securely with WealthFlow.
      </p>
    </form>
  );
}
