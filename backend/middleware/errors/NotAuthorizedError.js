class NotAuthorizedError extends Error {
  constructor(showError, message) {
    super(message || 'You do not have permissions to perform this action.');
    this.statusCode = 403;
    this.showError = showError;
    this.error = message || 'You do not have permissions to perform this action.';
  }
}

module.exports = NotAuthorizedError;
