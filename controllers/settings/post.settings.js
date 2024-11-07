const { AsyncCatcher } = require("../../utils/async-catcher");
const { uploadProcessedData } = require("../../db/create.method");
const { AsyncErrorHandler } = require("../../utils/async-error-handler");

const postSettings = AsyncCatcher(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new AsyncErrorHandler(400, "Bad Request"));
  }

  const response = await uploadProcessedData({
    collection_name: "settings",
    document_id: "menu_options",
    document_data: req.body,
  });
  res.status(response.status).json(response);
});

module.exports = { postSettings };
