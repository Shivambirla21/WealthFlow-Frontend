import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Logo from '../components/Logo.jsx';

export default function LoginPage({ mode = 'login' }) {
  const isSignUp = mode === 'signup';
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const switchMode = (nextMode) => {
    setError('');
    navigate(nextMode === 'signup' ? '/signup' : '/login');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError('Email and password are required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      if (isSignUp) {
        await signUp(trimmedEmail, password, name.trim());
      } else {
        await signIn(trimmedEmail, password);
      }
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err?.message || (isSignUp ? 'Sign-up failed' : 'Sign-in failed'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <header>
        <div className="w">
          <button type="button" className="logo" onClick={() => navigate('/')}>
            <Logo height={36} />
          </button>
          <button type="button" className="btn" onClick={() => navigate('/')}>Back to home</button>
        </div>
      </header>

      <main className="auth-main">
        <form className="auth-card" onSubmit={handleSubmit}>
          <span className="tag">{isSignUp ? 'Create your account' : 'Welcome back'}</span>
          <h1>{isSignUp ? 'Get started free' : 'Log in'}</h1>
          <p className="lead">
            {isSignUp
              ? 'Track spending, net worth, and goals in one calm place.'
              : 'Sign in to see your money in one clear picture.'}
          </p>

          {error ? <div className="auth-error" role="alert">{error}</div> : null}

          {isSignUp ? (
            <label>
              Name
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          ) : null}

          <label>
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <button type="submit" className="btn p lg" disabled={submitting}>
            {submitting ? 'Please wait…' : isSignUp ? 'Create free account' : 'Log in'}
          </button>

          <button
            type="button"
            className="btn lg"
            disabled={submitting}
            onClick={signInWithGoogle}
          >
            Continue with Google
          </button>

          <p className="switch">
            {isSignUp ? 'Already have an account?' : 'New to WealthFlow?'}{' '}
            <button type="button" onClick={() => switchMode(isSignUp ? 'login' : 'signup')}>
              {isSignUp ? 'Log in' : 'Create free account'}
            </button>
          </p>
        </form>
      </main>

      <style>{`
        .auth-page {
          min-height: 100vh;
          background: var(--color-bg);
          color: var(--color-text);
          font: 16px/1.5 Inter, Manrope, system-ui, sans-serif;
        }

        .auth-page .w {
          max-width: 1180px;
          margin: auto;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
        }

        .auth-page header {
          position: sticky;
          top: 0;
          z-index: 5;
          background: var(--color-header);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--color-border);
        }

        .auth-page .logo {
          font-size: 19px;
          background: none;
          border: 0;
          color: inherit;
          cursor: pointer;
          padding: 0;
        }

        .auth-page .btn {
          padding: 10px 18px;
          border-radius: 10px;
          border: 1px solid var(--color-border);
          font-weight: 600;
          font-size: 15px;
          background: transparent;
          color: var(--color-text);
          display: inline-block;
          cursor: pointer;
          text-decoration: none;
        }

        .auth-page .btn:hover {
          background: var(--color-surface);
        }

        .auth-page .btn.p {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: var(--color-primary-foreground);
        }

        .auth-page .btn.p:hover {
          background: var(--color-primary-hover);
        }

        .auth-page .btn.lg {
          width: 100%;
          padding: 14px 24px;
          font-size: 16px;
          border-radius: 12px;
        }

        .auth-page .btn:disabled {
          opacity: 0.7;
          cursor: wait;
        }

        .auth-main {
          display: grid;
          place-items: center;
          padding: 48px 20px 72px;
        }

        .auth-card {
          width: min(440px, 100%);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 20px;
          padding: 32px 28px;
          display: grid;
          gap: 14px;
          box-shadow: var(--shadow-primary);
        }

        .auth-card .tag {
          justify-self: start;
          padding: 6px 12px;
          border-radius: 20px;
          background: var(--color-primary-soft);
          color: var(--color-primary-bright);
          font-size: 13px;
          font-weight: 600;
        }

        .auth-card h1 {
          font-size: 36px;
          line-height: 1.1;
          letter-spacing: -1px;
          margin: 0;
        }

        .auth-card .lead {
          color: var(--color-text-muted);
          margin: 0 0 6px;
        }

        .auth-card label {
          display: grid;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-muted);
        }

        .auth-card input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid var(--color-border);
          background: var(--color-bg);
          color: var(--color-text);
          font-size: 15px;
        }

        .auth-card input:focus {
          outline: 2px solid var(--color-primary);
          border-color: transparent;
        }

        .auth-error {
          background: color-mix(in srgb, var(--color-danger) 12%, transparent);
          color: var(--color-danger);
          border: 1px solid color-mix(in srgb, var(--color-danger) 35%, transparent);
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 14px;
        }

        .switch {
          margin: 4px 0 0;
          text-align: center;
          color: var(--color-text-muted);
          font-size: 14px;
        }

        .switch button {
          background: none;
          border: 0;
          color: var(--color-primary-bright);
          font-weight: 700;
          cursor: pointer;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
