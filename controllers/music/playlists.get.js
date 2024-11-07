const { getAllDataOfCollection } = require("../../db/get.method");
const { AsyncCatcher } = require("../../utils/async-catcher");
const { AsyncErrorHandler } = require("../../utils/async-error-handler");

const getPlaylists = AsyncCatcher(async (req, res, next) => {
  const request = await getAllDataOfCollection({
    document_name: "iamkikevanegas",
  });

  if (request.status !== 200) {
    return next(new AsyncErrorHandler(request.message, request.status));
  }

  const playlist = request.data.map((item, index) => ({
    ...item,
    id: index + 1,
    uid: item.id,
    cover: item.thumbnail,
    artist: item.author,
    album_title: item.name,
  }));

  res.status(request.status).json({
    status: "success",
    data: playlist,
  });
});

module.exports = { getPlaylists };
