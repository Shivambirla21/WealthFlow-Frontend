import React from 'react';

export default function LoginGate({ onLogin, onSignUp }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: '#F2F0EC',
      color: '#1C1A14',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        maxWidth: 420,
        width: '100%',
        background: 'white',
        borderRadius: 18,
        padding: 28,
        boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
      }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Welcome to WealthFlow</h1>
        <p style={{ margin: '16px 0 24px', lineHeight: 1.6, color: '#6B6354' }}>
          Use email and password to sign up or log in and keep your finance dashboard saved locally.
        </p>
        <LoginForm onLogin={onLogin} onSignUp={onSignUp} />
      </div>
    </div>
  );
}

function LoginForm({ onLogin, onSignUp }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
      <label style={{ display: 'grid', gap: 6, fontSize: '0.95rem', color: '#4D4A43' }}>
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #D8D2C3' }}
        />
      </label>
      <label style={{ display: 'grid', gap: 6, fontSize: '0.95rem', color: '#4D4A43' }}>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
          style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #D8D2C3' }}
        />
      </label>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button
          type="submit"
          style={{ flex: 1, padding: '12px 14px', borderRadius: 10, background: '#1F6F54', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => onSignUp(email, password)}
          style={{ flex: 1, padding: '12px 14px', borderRadius: 10, background: '#F2F0EC', color: '#1C1A14', border: '1px solid #D8D2C3', cursor: 'pointer' }}
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
