const { AsyncErrorHandler } = require("../../utils/async-error-handler");
const { uploadProcessedData } = require("../../db/create.method");
const { hashPassword } = require("../../utils/password-hasher");
const { AsyncCatcher } = require("../../utils/async-catcher");

const createUser = AsyncCatcher(async (req, res, next) => {
  const { email, password, role, method } = req.body;

  if (!email || !role || !method) {
    return next(new AsyncErrorHandler(401, "Unauthorized"));
  }
  let payload = {};

  if (method === "credentials") {
    if (!password) {
      return next(new AsyncErrorHandler(401, "A password is required"));
    }
    const hashedPassword = await hashPassword(password);
    payload = {
      role,
      email,
      status: "active",
      method: "credentials",
      password: hashedPassword,
    };
  } else if (method === "google-auth") {
    payload = {
      role,
      email,
      status: "inactive",
      method: "google-auth",
    };
  }

  const response = await uploadProcessedData({
    document_name: "users",
    document_id: email,
    document_data: payload,
  });

  res.status(response.status).json({ ...response });
});

module.exports = { createUser };
