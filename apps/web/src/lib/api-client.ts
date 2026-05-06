/**
 * Centralized API Client
 * Provides authenticated fetch wrapper with error handling
 */

import { API_BASE_URL } from '../config/api.config';
import { AUTH_CONFIG } from '../config/auth.config';

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

/**
 * Get the stored auth token
 */
function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
}

/**
 * Build headers with optional auth token
 */
function buildHeaders(options?: RequestOptions): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };

  if (!options?.skipAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

/**
 * Generic API request handler
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options?: RequestOptions
): Promise<T> {
  const { skipAuth, ...fetchOptions } = options || {};

  const response = await fetch(endpoint, {
    ...fetchOptions,
    headers: buildHeaders(options),
  });

  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.message || `Request failed with status ${response.status}`);
    }
    return data as T;
  } else {
    const text = await response.text();
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
    }
    return { message: text } as T;
  }
}

/**
 * Convenience methods
 */
export const api = {
  get: <T = any>(url: string, options?: RequestOptions) =>
    apiRequest<T>(url, { ...options, method: 'GET' }),

  post: <T = any>(url: string, body?: any, options?: RequestOptions) =>
    apiRequest<T>(url, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T = any>(url: string, body?: any, options?: RequestOptions) =>
    apiRequest<T>(url, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T = any>(url: string, body?: any, options?: RequestOptions) =>
    apiRequest<T>(url, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T = any>(url: string, options?: RequestOptions) =>
    apiRequest<T>(url, { ...options, method: 'DELETE' }),

  /**
   * Upload a file (multipart/form-data — no JSON Content-Type)
   */
  upload: async <T = any>(url: string, formData: FormData, options?: RequestOptions): Promise<T> => {
    const token = getAuthToken();
    const headers: Record<string, string> = {};
    if (token && !options?.skipAuth) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(error.error || 'Upload failed');
    }

    return response.json();
  },
};
