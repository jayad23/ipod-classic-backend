const { getAllDataOfCollection } = require("../../db/get.method");
const { AsyncCatcher } = require("../../utils/async-catcher");
const { AsyncErrorHandler } = require("../../utils/async-error-handler");

const getSettings = AsyncCatcher(async (req, res, next) => {
  const settings = await getAllDataOfCollection({ document_name: "settings" });

  if (settings.status !== 200) {
    return next(new AsyncErrorHandler(settings.message, settings.status));
  }

  res.status(settings.status).json({
    status: "success",
    data: settings.data[0],
  });
});

module.exports = { getSettings };
