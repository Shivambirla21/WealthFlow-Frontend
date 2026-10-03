import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  fetchCurrentUser,
  setAuthToken,
  signInWithEmail,
  signInWithProvider,
  signOutUser,
  signUpWithEmail,
} from '../api/auth.js';
import { getConnectionErrorMessage } from '../utils/networkError.js';

const AuthContext = createContext(null);
const THEME_KEY = 'wf-dashboard-theme';

function readStoredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  return stored === 'light' || stored === 'dark' ? stored : 'dark';
}

function captureAuthTokenFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const authToken = params.get('auth_token');
  if (!authToken) return;
  setAuthToken(authToken);
  params.delete('auth_token');
  const query = params.toString();
  window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
}

export function AuthProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState(readStoredTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    captureAuthTokenFromUrl();
    let cancelled = false;

    fetchCurrentUser()
      .then((user) => {
        if (!cancelled) setCurrentUser(user);
      })
      .catch(() => {
        if (!cancelled) setCurrentUser(null);
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => {
    const userName = currentUser?.name || currentUser?.email?.split('@')[0] || 'Shivam Birla';

    const signIn = async (email, password) => {
      try {
        const user = await signInWithEmail(email, password);
        setCurrentUser(user);
        return user;
      } catch (error) {
        throw new Error(getConnectionErrorMessage(error));
      }
    };

    const signUp = async (email, password, name) => {
      try {
        const user = await signUpWithEmail(email, password, name);
        setCurrentUser(user);
        return user;
      } catch (error) {
        throw new Error(getConnectionErrorMessage(error));
      }
    };

    const signOut = () => {
      signOutUser();
      setCurrentUser(null);
    };

    const toggleTheme = () => {
      setTheme((current) => {
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, next);
        return next;
      });
    };

    return {
      ready,
      currentUser,
      userName,
      theme,
      toggleTheme,
      signIn,
      signUp,
      signInWithGoogle: () => signInWithProvider('google'),
      signOut,
    };
  }, [ready, currentUser, theme]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
