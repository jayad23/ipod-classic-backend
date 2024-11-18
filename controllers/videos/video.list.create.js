const { v4 } = require("uuid");
const { getByDocument } = require("../../db/get.method");
const { uploadProcessedData } = require("../../db/create.method");
const { AsyncCatcher } = require("../../utils/async-catcher");
const { AsyncErrorHandler } = require("../../utils/async-error-handler");

const createPlaylist = AsyncCatcher(async (req, res, next) => {
  const { data, collection } = req.body;

  const songsToBeMoved = data.songs.map((song, index) => ({
    id: v4(),
    index,
    videoUrl: song.videoUrl,
    songName: song.songName,
    artist: song.artist,
    img: song.img,
    belongsTo: data.id,
    playlistName: data.name,
  }));

  const payload = {
    ...data,
    songs: songsToBeMoved,
  };

  const uploaded = uploadProcessedData({
    collection_name: collection || "playlists",
    document_id: data.id,
    document_data: payload,
  });

  res.status(200).json({
    status: "success",
    data: uploaded,
  });
});

module.exports = { createPlaylist };
