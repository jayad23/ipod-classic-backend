const express = require("express");
const musicRoutes = express.Router();

const { getPlaylists } = require("../controllers/music/playlists.get");
const { updatePlaylist } = require("../controllers/music/playlist.update");

musicRoutes.get("/playlists", getPlaylists);
musicRoutes.put("/playlists/:id", updatePlaylist);

module.exports = { musicRoutes };
