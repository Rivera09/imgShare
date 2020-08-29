const { Comment, Image } = require("../models");

module.exports = {
  async newest() {
    // return (await Comment.find().limit(5).sort({ timestamp: -1 }))
    //   .lean()
    //   .forEach((comment) => {
    //     const image = Image.findOne({ _id: comment.imageId });
    //     comment.image = image;
    //   });
    const comments = await Comment.find().limit(5).sort({timestamp:-1}).lean();


    for (const comment of comments){
        const image = await Image.findOne({_id: comment.imageId}).lean();
        comment.image = image;
    }

    return comments;
  },
};
