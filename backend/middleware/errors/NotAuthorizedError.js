class NotAuthorizedError extends Error {
  constructor(message) {
    super(message || 'The request is unauthorized');
    this.statusCode = 401;
  }
}

module.exports = NotAuthorizedError;
