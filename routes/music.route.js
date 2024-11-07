const express = require("express");
const musicRoutes = express.Router();

const { getPlaylists } = require("../controllers/music/playlists.get");

musicRoutes.get("/playlists", getPlaylists);

module.exports = { musicRoutes };
