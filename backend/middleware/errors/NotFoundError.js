class NotFoundError extends Error {
  constructor(showError, message) {
    super(message || 'Resource not found');
    this.statusCode = 404;
    this.showError = showError;
    this.error = message || 'Resource not found';
  }
}

module.exports = NotFoundError;
