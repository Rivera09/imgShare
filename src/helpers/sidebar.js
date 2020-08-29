const Stats = require("./stats");
const Images = require("./images");
const Commetns = require("./comments");
const comments = require("./comments");

module.exports = async (viewModel) => {
  const results = await Promise.all([Stats(), Images.popular(), comments.newest()]);
  viewModel.sidebar = {
    stats: results[0],
    popular: results[1],
    comments: results[2],
  };

  return viewModel;
};
