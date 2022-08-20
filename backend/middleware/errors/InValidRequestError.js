class InValidRequestError extends Error {
  constructor(message) {
    super(message || 'request is invalid');
    this.statusCode = 400;
  }
}

module.exports = InValidRequestError;
