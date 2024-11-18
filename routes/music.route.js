const express = require("express");
const musicRoutes = express.Router();

const { AuthorityMiddleware } = require("../middlewares/authority.middleware");

const {
  getPlaylists,
  getSinglePlaylist,
} = require("../controllers/music/playlists.get");
const { createPlaylist } = require("../controllers/music/playlist.create");
const { updatePlaylist } = require("../controllers/music/playlist.update");

musicRoutes.get("/playlists", AuthorityMiddleware, getPlaylists);
musicRoutes.post("/playlists", createPlaylist);
musicRoutes.put("/playlists/:id", updatePlaylist);
musicRoutes.get("/playlists/:id", AuthorityMiddleware, getSinglePlaylist);

module.exports = { musicRoutes };
