export function getConnectionErrorMessage(error) {
  const message = error?.message || '';

  if (/database|db|timeout|service unavailable|unavailable/i.test(message)) {
    return 'The server is currently unavailable. Please try again later.';
  }

  if (/failed to fetch|network|load failed|connection|fetch/i.test(message)) {
    return 'Unable to reach the server. Please check your connection or try again later.';
  }

  return message || 'Something went wrong. Please try again later.';
}
