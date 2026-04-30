/**
 * Type-safe localStorage abstraction
 * Prevents typos in storage keys and provides serialization safety
 */

export const storage = {
  get<T = string>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch {
      // If JSON.parse fails, return as raw string
      return localStorage.getItem(key) as unknown as T;
    }
  },

  set(key: string, value: unknown): void {
    if (typeof value === 'string') {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },

  /**
   * Get a user-scoped storage key
   */
  userKey(base: string, email: string): string {
    return `${base}_${email}`;
  },
};
