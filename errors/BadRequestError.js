class BadRequestError extends Error {
  constructor(message) {
    super(message);
    console.log(message)
    this.statusCode = 400;
  }
}
module.exports = BadRequestError;
