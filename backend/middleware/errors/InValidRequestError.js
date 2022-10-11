class InValidRequestError extends Error {
  constructor(showError, message) {
    super(message || 'request is invalid');
    this.statusCode = 400;
    this.showError = showError;
    this.error = message || 'request is invalid';
  }
}

module.exports = InValidRequestError;
