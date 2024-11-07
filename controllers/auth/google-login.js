const { getByDocument } = require("../../db/get.method");
const { AsyncCatcher } = require("../../utils/async-catcher");
const { AsyncErrorHandler } = require("../../utils/async-error-handler");

const GoogleLogin = AsyncCatcher(async (req, res, next) => {
  if (req.body.method === "credentials") {
    return next();
  }

  //req.body,method === "google auth"
  const userInfo = req.body;

  // find user with email in payload
  const response = await getByDocument({
    collection_name: "users",
    document_name: userInfo.email,
  });

  if (response.status === 200) {
    if (response.data.status === "active") {
      res.status(200).json({
        status: "success",
        user: {
          email: response.email,
        },
        token: userInfo.token,
      });
      return;
    } else if (response.data.status === "inactive") {
      return next(new AsyncErrorHandler(401, "Unauthorized"));
    }
  }

  res.status(response.status).json({ ...response });
});

module.exports = { GoogleLogin };
