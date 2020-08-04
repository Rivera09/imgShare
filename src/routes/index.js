const express = require("express");
const router = express.Router();

const { index } = require("../controllers/home");
const {
  getImage,
  createImage,
  likeImage,
  deleteImage,
  commentImage,
} = require("../controllers/image");

module.exports = (app) => {
  router.route("/").get(index);
  router.route("/images/:img_id").get(getImage);
  router.route("/images").post(createImage);
  router.route("/images/:img_id/like").post(likeImage);
  router.route("/images/:img_id/like").post(commentImage);
  router.route("/images/:img_id").delete(deleteImage);
  app.use(router);
};
