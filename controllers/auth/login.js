const jwt = require("jsonwebtoken");
const { getByDocument } = require("../../db/get.method");
const { AsyncCatcher } = require("../../utils/async-catcher");
const { onComparePassword } = require("../../utils/password-hasher");
const { AsyncErrorHandler } = require("../../utils/async-error-handler");

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const onLogin = AsyncCatcher(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const cond_one = !email || !password;
    const cond_two = email === "" || password === "";

    if (cond_one || cond_two) {
      res.status(400).json({
        message: "Credentials are required",
      });
      return next(new AsyncErrorHandler(400, "Credentials required"));
    }

    const { data } = await getByDocument({
      collection_name: "users",
      document_name: email,
    });

    if (!data) {
      return next(new AsyncErrorHandler(404, "Wrong credentials"));
    }

    const passwordsAreTheSame = await onComparePassword(
      password,
      data.password,
    );

    if (!passwordsAreTheSame) {
      return next(new AsyncErrorHandler(401, "Wrong credentials"));
    }

    delete data.password;

    const token = jwt.sign(
      { email: data.email, role: data.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      status: "success",
      user: { ...data, token: token },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = {
  onLogin,
};
