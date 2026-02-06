/**
 * Global Error Handler
 * 
 * Centralized error handling utilities.
 * Prevents [object Object] errors by normalizing error objects.
 * 
 * KISS: Simple, predictable error handling
 */

/**
 * Normalize any error value to a proper Error instance
 */
export function normalizeError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }

  if (typeof error === "string") {
    return new Error(error);
  }

  if (error && typeof error === "object") {
    // Handle object errors (prevents [object Object])
    try {
      const message = JSON.stringify(error);
      return new Error(message);
    } catch {
      return new Error("Unknown error object");
    }
  }

  return new Error("Unknown error");
}

/**
 * Safely execute a function with error handling
 */
export function safeExecute<T>(fn: () => T, fallback?: T): T | undefined {
  try {
    return fn();
  } catch (error) {
    const normalizedError = normalizeError(error);
    
    if (process.env.NODE_ENV === "development") {
      console.error("SafeExecute caught error:", normalizedError);
    }
    
    return fallback;
  }
}

/**
 * Setup global error handlers
 * Call this once in your app entry point
 */
export function setupGlobalErrorHandlers() {
  if (typeof window === "undefined") return;

  // Handle unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    const normalizedError = normalizeError(event.reason);
    
    if (process.env.NODE_ENV === "development") {
      console.error("Unhandled Promise Rejection:", normalizedError);
    }

    // Prevent [object Object] errors by converting to proper Error
    event.preventDefault();
    throw normalizedError;
  });

  // Handle global errors
  window.addEventListener("error", (event) => {
    if (process.env.NODE_ENV === "development") {
      console.error("Global error:", event.error);
    }
  });
}
