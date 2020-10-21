class ServerError extends Error {
  constructor(message, ...other) {
    super(...other);
    this.status = 500;
    this.message = message;
  }
}

module.exports = ServerError;
