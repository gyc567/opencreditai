/**
 * Platform Configuration
 * Centralized configuration for platform-wide settings
 */

// Platform wallet address (for x402 payments)
export function getPlatformWallet(): string {
  const wallet = process.env.PLATFORM_WALLET;
  if (!wallet) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('PLATFORM_WALLET environment variable is required in production');
    }
    // Use a test wallet for development
    return process.env.NEXT_PUBLIC_PLATFORM_WALLET || '0x742d35Cc6634C0532925a3b844Bc9e7595f0fE12';
  }
  return wallet;
}

// API Keys (should be set via environment variables)
export function getMoltbookApiKey(): string {
  return process.env.MOLTBOOK_API_KEY || '';
}

export function getMoltbookApiUrl(): string {
  return process.env.MOLTBOOK_API_URL || 'https://api.moltbook.com';
}

// Allowed CORS origins
export function getAllowedOrigins(): string[] {
  return process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://openclaw-skills.vercel.app',
      ];
}
