const { Image, Comment } = require("../models");

async function imagesCounter() {
  return await Image.countDocuments();
}

async function commentsCounter() {
  return await Comment.countDocuments();
}

async function totalViewsCounter() {
  //   return await Image.aggregate([
  //     {
  //       $group: {
  //         _id: "1",
  //         totalViews: { $sum: "$views" },
  //       },
  //     },
  //   ])[0].totalViews;
  const result = await Image.aggregate([
    {
      $group: {
        _id: "1",
        totalViews: { $sum: "$views" },
      },
    },
  ]);

  return result[0].totalViews;
}

async function totalLikesCounter() {
  //   return await Image.aggregate([
  //     {
  //       $group: {
  //         _id: "1",
  //         totalLikes: { $sum: "$likes" },
  //       },
  //     },
  //   ])[0].totalLikes;
  const result = await Image.aggregate([
    {
      $group: {
        _id: "1",
        totalLikes: { $sum: "$likes" },
      },
    },
  ]);
  return result[0].totalLikes;
}
module.exports = async () => {
  //   return await Promise.all([
  //     imagesCounter(),
  //     commentsCounter(),
  //     totalViewsCounter(),
  //     totalLikesCounter(),
  //   ]);
  const results = await Promise.all([
    imagesCounter(),
    commentsCounter(),
    totalViewsCounter(),
    totalLikesCounter(),
  ]);

  return {
    images: results[0],
    comments: results[1],
    views: results[2],
    likes: results[3],
  };
};
