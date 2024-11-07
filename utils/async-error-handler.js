class AsyncErrorHandler extends Error {
  constructor(code, message) {
    super(message);
    this.statusCode = code;
    this.message = message || "Internal Server Error";
    this.status = `${this.statusCode}`.startsWith("4") ? "error" : "fail";
  }
}

module.exports = { AsyncErrorHandler };
