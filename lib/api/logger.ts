/**
 * Safe Logging Utility
 * Prevents sensitive information leakage in production logs
 */

const SENSITIVE_FIELDS = [
  'password',
  'passwordHash',
  'secret',
  'apiKey',
  'api_key',
  'token',
  'accessToken',
  'refreshToken',
  'privateKey',
  'private_key',
  'signature',
  'authorization',
  'cookie',
  'creditCard',
  'ssn',
  'address', // wallet address can be logged but partially masked
];

/**
 * Mask sensitive fields in an object
 */
export function maskSensitiveData(data: unknown): unknown {
  if (!data || typeof data !== 'object') {
    return data;
  }

  const masked = { ...data as Record<string, unknown> };
  
  for (const key of Object.keys(masked)) {
    const lowerKey = key.toLowerCase();
    
    // Check if this field is sensitive
    const isSensitive = SENSITIVE_FIELDS.some(field => lowerKey.includes(field.toLowerCase()));
    
    if (isSensitive) {
      // Mask the value
      const value = masked[key];
      if (typeof value === 'string') {
        if (value.length <= 8) {
          masked[key] = '****';
        } else {
          masked[key] = `${value.slice(0, 6)}...${value.slice(-4)}`;
        }
      } else {
        masked[key] = '****';
      }
    } else if (typeof masked[key] === 'object' && masked[key] !== null) {
      // Recursively mask nested objects
      masked[key] = maskSensitiveData(masked[key]);
    }
  }
  
  return masked;
}

/**
 * Safe console logging - only logs in development
 */
export function safeLog(message: string, ...args: unknown[]): void {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message, ...args);
  }
}

/**
 * Safe error logging - logs errors but masks sensitive data
 */
export function safeError(context: string, error: unknown, additionalData?: Record<string, unknown>): void {
  // Always log errors, but sanitize first
  const sanitizedError = error instanceof Error 
    ? { message: error.message, name: error.name, stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined }
    : String(error);
  
  const sanitizedData = additionalData ? maskSensitiveData(additionalData) : undefined;
  
  console.error(`[${context}]`, sanitizedError, sanitizedData);
}

/**
 * Create a logger for a specific module
 */
export function createLogger(module: string) {
  return {
    debug: (message: string, ...args: unknown[]) => {
      if (process.env.NODE_ENV !== 'production') {
        console.debug(`[${module}]`, message, ...args);
      }
    },
    info: (message: string, ...args: unknown[]) => {
      if (process.env.NODE_ENV !== 'production') {
        console.info(`[${module}]`, message, ...args);
      }
    },
    warn: (message: string, ...args: unknown[]) => {
      console.warn(`[${module}]`, message, ...args.map(arg => 
        typeof arg === 'object' ? maskSensitiveData(arg as Record<string, unknown>) : arg
      ));
    },
    error: (message: string, error?: unknown, additionalData?: Record<string, unknown>) => {
      safeError(module, error || message, additionalData);
    },
  };
}
