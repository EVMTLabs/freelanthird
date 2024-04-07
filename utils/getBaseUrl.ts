export function getBaseURL() {
  if (typeof window !== 'undefined') {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL ?? 'freelanthird.com'}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
}
