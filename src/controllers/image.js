const path = require("path");
const fs = require("fs-extra");

const { Image } = require("../models");
const { randomNumber } = require("../helpers/libs");

exports.getImage = async (req, res) => {
  const image = await Image.findOne({ uniqueId: req.params.img_id }).lean();
  res.render("image",{image});
};

exports.createImage = async (req, res) => {
  const validExtensions = [".png", ".jpg", ".jpeg", ".gif"];
  const ext = path.extname(req.file.originalname).toLocaleLowerCase();
  const imgTempPath = req.file.path;
  if (!validExtensions.includes(ext)) {
    await fs.unlink(imgTempPath);
    res.status(400).send("wrong type of file, please upload an image");
    return;
  }
  let uniqueId;
  let images;
  do {
    uniqueId = randomNumber();
    images = Image.find({ uniqueId });
  } while (images.length > 0);
  const targetPath = path.resolve(`src/public/upload/${uniqueId + ext}`);
  await fs.rename(imgTempPath, targetPath);
  const { title, description } = req.body;
  const newImg = Image({
    title,
    uniqueId,
    ext,
    description,
  });
  await newImg.save();
  res.redirect(`/images/${uniqueId}`);
};

exports.likeImage = (req, res) => {
  res.send("Liking an image");
};

exports.commentImage = (req, res) => {
  res.send("commenting an image");
};

exports.deleteImage = (req, res) => {
  res.send("deleting an image");
};
