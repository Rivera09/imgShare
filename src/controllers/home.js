const {Image} = require('../models');

exports.index = async (req, res) => {
  const images = await Image.find().sort({timestamp:-1}).lean();
  res.render('index',{images});
};
