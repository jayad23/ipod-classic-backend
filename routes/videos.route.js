const express = require("express");
const videoRoutes = express.Router();

const { AuthorityMiddleware } = require("../middlewares/authority.middleware");

const {
  getVideoList,
  getSingleVideoList,
} = require("../controllers/videos/videos.list.get");

videoRoutes.get("/videos", AuthorityMiddleware, getVideoList);
videoRoutes.get("/videos/:id", AuthorityMiddleware, getSingleVideoList);

module.exports = { videoRoutes };
