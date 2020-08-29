const { Image } = require("../models");
const sidebar = require("../helpers/sidebar");

exports.index = async (req, res) => {
  const images = await Image.find().sort({ timestamp: -1 }).lean();
  let viewModel = { images };
  viewModel = await sidebar(viewModel);
  res.render("index", viewModel);
};
