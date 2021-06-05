// Common pattern to use for express errors
class AppError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;  // http status
    }
}

module.exports = AppError;