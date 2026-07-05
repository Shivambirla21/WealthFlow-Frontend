const AUTH_TOKEN_KEY = 'wealthflow:auth_token';
const API_BASE = import.meta.env.VITE_API_BASE || '';

function getAuthToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

function setAuthToken(token) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
}

function clearAuthToken() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
}

async function request(path, body, method = 'POST', token) {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || 'Request failed');
  }
  return data;
}

export async function signUpWithEmail(email, password, name) {
  const data = await request('/api/auth/register', { email, password, name });
  setAuthToken(data.data.token);
  return data.data.user;
}

export async function signInWithEmail(email, password) {
  const data = await request('/api/auth/login', { email, password });
  setAuthToken(data.data.token);
  return data.data.user;
}

export async function fetchCurrentUser() {
  const token = getAuthToken();
  if (!token) return null;
  const data = await request('/api/users/me', null, 'GET', token);
  return data.data;
}

export function getStoredToken() {
  return getAuthToken();
}

export const signOutUser = () => {
  clearAuthToken();
};
