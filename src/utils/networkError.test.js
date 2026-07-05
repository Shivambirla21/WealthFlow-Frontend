import test from 'node:test';
import assert from 'node:assert/strict';
import { getConnectionErrorMessage } from './networkError.js';

test('returns a clear message for backend connection failures', () => {
  assert.equal(
    getConnectionErrorMessage(new Error('Failed to fetch')),
    'Unable to reach the server. Please check your connection or try again later.'
  );
});

test('returns a clear message for database-related errors', () => {
  assert.equal(
    getConnectionErrorMessage(new Error('Database connection failed')),
    'The server is currently unavailable. Please try again later.'
  );
});
