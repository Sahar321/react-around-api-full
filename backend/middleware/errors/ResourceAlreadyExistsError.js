class ResourceAlreadyExistsError extends Error {
  constructor(showError, message) {
    super(message || 'data is already exists on the server');
    this.statusCode = 400;
    this.showError = showError;
    this.error = message || 'data is already exists on the server';
  }
}

module.exports = ResourceAlreadyExistsError;
