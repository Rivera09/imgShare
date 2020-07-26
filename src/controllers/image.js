exports.getImage = (req, res) => {
  res.send("Image page");
};

exports.createImage = (req,res) => {
    res.send('something');
}

exports.likeImage = (req,res) => {
    res.send('Liking an image');
}

exports.commentImage = (req,res) => {
    res.send('commenting an image');
}

exports.deleteImage = (req,res) => {
    res.send('deleting an image');
}