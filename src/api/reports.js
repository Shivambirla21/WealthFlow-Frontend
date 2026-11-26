import { getStoredToken } from './auth.js';

const API_BASE = import.meta.env.VITE_API_BASE || import.meta.env.VITE_BACKEND_URL || '';

const REPORTS_ENDPOINT = '/api/reports';

async function request(path, options = {}) {
  const token = getStoredToken();
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body && !(options.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  if (!response.ok) {
    const text = await response.text();
    let message = 'Unable to complete the reports request.';
    try {
      message = JSON.parse(text)?.message || message;
    } catch {
      if (text) message = text;
    }
    throw new Error(message);
  }

  return response;
}

// These service methods are ready for the reports backend integration.
// Expected routes are centralized here so the page does not depend on URLs.
export async function fetchReports(params = {}) {
  const query = new URLSearchParams(params).toString();
  const response = await request(`${REPORTS_ENDPOINT}${query ? `?${query}` : ''}`);
  return response.json();
}

export async function fetchReport(reportId) {
  const response = await request(`${REPORTS_ENDPOINT}/${encodeURIComponent(reportId)}`);
  return response.json();
}

export async function generateReport(reportId, payload = {}) {
  const response = await request(`${REPORTS_ENDPOINT}/${encodeURIComponent(reportId)}/generate`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return response.json();
}

export async function downloadReportPdf(reportId, params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(`${REPORTS_ENDPOINT}/${encodeURIComponent(reportId)}/pdf${query ? `?${query}` : ''}`);
}

export async function exportReportCsv(reportId, params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(`${REPORTS_ENDPOINT}/${encodeURIComponent(reportId)}/csv${query ? `?${query}` : ''}`);
}
