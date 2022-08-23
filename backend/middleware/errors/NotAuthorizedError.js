class NotAuthorizedError extends Error {
  constructor(message) {
    super(message || 'You do not have permissions to perform this action.');
    this.statusCode = 403;
  }
}

module.exports = NotAuthorizedError;
