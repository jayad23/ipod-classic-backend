const {
  getAllDataOfCollection,
  getByDocument,
} = require("../../db/get.method");
const { AsyncCatcher } = require("../../utils/async-catcher");
const { AsyncErrorHandler } = require("../../utils/async-error-handler");

const getVideoList = AsyncCatcher(async (req, res, next) => {
  const request = await getAllDataOfCollection({
    document_name: "videos",
  });

  if (request.status !== 200) {
    return next(new AsyncErrorHandler(request.message, request.status));
  }

  const playlist = request.data.map((item, index) => ({
    ...item,
    index: index + 1,
    cover: item.thumbnail,
    album_title: item.name,
  }));

  res.status(request.status).json({
    status: "success",
    data: playlist,
  });
});

const getSingleVideoList = AsyncCatcher(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AsyncErrorHandler("Missing required parameter", 400));
  }

  const request = await getByDocument({
    collection_name: "videos",
    document_name: req.params.id,
  });

  if (request.status !== 200) {
    return next(new AsyncErrorHandler(request.message, request.status));
  }

  const modelledSongsCollection = request.data.songs.map((item, index) => ({
    ...item,
    playlistName: request.data.name,
    index,
  }));

  res.status(request.status).json({
    status: "success",
    data: {
      ...request.data,
      songs: modelledSongsCollection,
    },
  });
});

module.exports = { getVideoList, getSingleVideoList };
