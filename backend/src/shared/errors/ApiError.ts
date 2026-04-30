/**
 * Standardized API Error Class
 * Provides consistent error responses across all modules
 */
export class ApiError extends Error {
  public statusCode: number;
  public error: string;

  constructor(statusCode: number, message: string, error?: string) {
    super(message);
    this.statusCode = statusCode;
    this.error = error || message;
    this.name = 'ApiError';
  }

  static badRequest(message: string): ApiError {
    return new ApiError(400, message, 'Bad Request');
  }

  static unauthorized(message = 'Unauthorized'): ApiError {
    return new ApiError(401, message, 'Unauthorized');
  }

  static forbidden(message = 'Forbidden'): ApiError {
    return new ApiError(403, message, 'Forbidden');
  }

  static notFound(message = 'Resource not found'): ApiError {
    return new ApiError(404, message, 'Not Found');
  }

  static conflict(message: string): ApiError {
    return new ApiError(409, message, 'Conflict');
  }

  static internal(message = 'Internal server error'): ApiError {
    return new ApiError(500, message, 'Internal Server Error');
  }

  toJSON() {
    return {
      error: this.error,
      message: this.message,
    };
  }
}
