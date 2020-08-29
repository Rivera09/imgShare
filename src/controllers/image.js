const path = require("path");
const fs = require("fs-extra");
const md5 = require("md5");

const { Image, Comment } = require("../models");
const { randomNumber } = require("../helpers/libs");
const sidebar = require('../helpers/sidebar');

exports.getImage = async (req, res) => {
  let viewModel = {image:{}, comments:[]};
  const image = await Image.findOne({
    uniqueId: req.params.img_id,
  }); /* .lean() */
  if (!image) return res.redirect("/");
  image.views++;
  await image.save();
  const comments = await Comment.find({ imageId: image._id }).lean();
  viewModel.image = image.toJSON();
  viewModel.comments = comments;
  viewModel = await sidebar(viewModel);
  res.render("image", viewModel);
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

exports.likeImage = async (req, res) => {
  try {
    const image = await Image.findOne({ uniqueId: req.params.img_id });
    if (!image) return res.status(404).json({ error: "Image not found" });
    image.likes++;
    await image.save();
    res.json({ likes: image.likes });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.commentImage = async (req, res) => {
  const image = await Image.findOne({ uniqueId: req.params.img_id });
  if (!image) return res.redirect("/");
  const newComment = new Comment(req.body);
  newComment.gravatar = md5(newComment.email);
  newComment.imageId = image._id;
  await newComment.save();
  res.redirect(`/images/${image.uniqueId}`);
};

exports.deleteImage = async (req, res) => {
  const image = await Image.findOne({ uniqueId: req.params.img_id });
  if (!image) return res.status(404).json({ error: "Image not found" });
  console.log(image);
  try {
    await fs.unlink(
      path.resolve(`./src/public/upload/${image.uniqueId + image.ext}`)
    );
    await Comment.deleteMany({ imageId: image._id });
    await image.remove();
    res.json(true);
  } catch (e) {
    console.error(e.message);
    res.status(500).json(false);
  }
};