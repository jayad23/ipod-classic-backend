const express = require("express");
const settingsRoutes = express.Router();

const { getSettings } = require("../controllers/settings/get.settings");
const { postSettings } = require("../controllers/settings/post.settings");

settingsRoutes.get("/settings", getSettings);
settingsRoutes.post("/settings", postSettings);

module.exports = { settingsRoutes };
