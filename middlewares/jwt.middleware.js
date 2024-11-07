const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { getByDocument } = require("../db/get.method");
const { AsyncCatcher } = require("../utils/async-catcher");
const { onComparePassword } = require("../utils/password-hasher");
const { AsyncErrorHandler } = require("../utils/async-error-handler");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const JWTMiddleware = AsyncCatcher(async (req, res, next) => {
  const headers = req.headers.authorization;
  const cond = !headers || !headers.startsWith("Bearer ");

  if (cond) {
    return next(new AsyncErrorHandler(401, "Unauthorized"));
  }

  const token = headers.split(" ")[1];

  if (!token) {
    return next(new AsyncErrorHandler(401, "Unauthorized"));
  }

  const validToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY,
  );

  if (!validToken) {
    return next(new AsyncErrorHandler(401, "Unauthorized"));
  }

  // Verify the user does exist.
  const user = getByDocument({
    collection_name: "users",
    document_name: validToken.email,
  });

  if (!user) {
    return next(new AsyncErrorHandler(401, "Unauthorized"));
  }

  next();
});

module.exports = { JWTMiddleware };
