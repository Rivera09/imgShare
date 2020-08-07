const path = require("path");
const fs = require("fs-extra");

const { randomNumber } = require("../helpers/libs");

exports.getImage = (req, res) => {
  res.send("Image page");
};

exports.createImage = async (req, res) => {
  const validExtensions = [".png", ".jpg", ".jpeg", ".gif"];
  const ext = path.extname(req.file.originalname).toLocaleLowerCase();
  if (!validExtensions.includes(ext)) {
    console.log(`${ext} is not a valid format`);
    console.log(validExtensions);
    res.send("wrong type of file, please upload an image");
    return;
  }
  const imgTempPath = req.file.path;
  const targetPath = path.resolve(`src/public/upload/${randomNumber() + ext}`);
  await fs.rename(imgTempPath, targetPath);
  res.send("works");
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
