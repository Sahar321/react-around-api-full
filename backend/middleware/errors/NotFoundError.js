/*eslint-disable*/
class NotFoundError extends Error {
  constructor(message, showErrorToUser = false) {
    super(message);
    const messageText = message || "Resource not found";
    this.statusCode = 404;
    this.message = {
        message: messageText,
        showError: showErrorToUser,
    };
  }
}

module.exports = NotFoundError;
