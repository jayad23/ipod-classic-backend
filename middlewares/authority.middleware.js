const { AsyncCatcher } = require("../utils/async-catcher");
const { AsyncErrorHandler } = require("../utils/async-error-handler");
const { onComparePassword } = require("../utils/password-hasher");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const AuthorityMiddleware = AsyncCatcher(async (req, res, next) => {
  const headers = req.headers.authorization;
  const cond = !headers || !headers.startsWith("Bearer ");
  if (cond) {
    return next(new AsyncErrorHandler(401, "Unauthorized"));
  }

  const token = headers.split(" ")[1];
  const authorized = await onComparePassword(
    `$2a$10$${token}`,
    process.env.HASHED_KEY,
  );
  if (!authorized) {
    return next(new AsyncErrorHandler(401, "Unauthorized"));
  }
  next();
});

module.exports = { AuthorityMiddleware };
