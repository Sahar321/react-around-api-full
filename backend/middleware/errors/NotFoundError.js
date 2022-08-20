class NotFoundError extends Error {
  constructor(message) {
    super(message || 'Resource not found');
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
