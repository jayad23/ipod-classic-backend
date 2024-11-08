const { getByDocument } = require("../../db/get.method");
const { uploadProcessedData } = require("../../db/create.method");
const { AsyncCatcher } = require("../../utils/async-catcher");
const { AsyncErrorHandler } = require("../../utils/async-error-handler");

const updatePlaylist = AsyncCatcher(async (req, res, next) => {
  const { id } = req.params;
  const { artist } = req.body;

  const request = await getByDocument({
    collection_name: "iamkikevanegas",
    document_name: id,
  });

  const elementFound = request.data;

  // const values = [];

  // for (const song of elementFound.songs) {
  //   const [artist, title] = song.songName.split(" - ");
  //   values.push({
  //     ...song,
  //     artist: artist || "",
  //   });
  // }

  // const payload = {
  //   ...elementFound,
  //   songs: values,
  // };

  console.log("payload", payload);

  const payload = {
    ...elementFound,
    songs: elementFound.songs.map((song) => ({
      ...song,
      artist,
    })),
  };

  const updated = await uploadProcessedData({
    collection_name: "iamkikevanegas",
    document_id: id,
    document_data: payload,
  });

  res.status(200).json({
    status: "success",
    data: updated,
  });
});

module.exports = { updatePlaylist };
