const ffmpeg = require("fluent-ffmpeg");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const Comment = require("../../models/Comment");
const ObjectId = require("mongoose").Types.ObjectId;
const keys = require("../../config/keys");

exports.getFeed = (req, res, next) => {
  const { userId, start, count } = req.body;
  let userPosts = [];
  Post.aggregate([
    {
      $match: { createdBy: ObjectId(userId) },
    },
    {
      $sort: { createdDate: -1 },
    },
    {
      $lookup: {
        from: "users",
        let: { userId: "$createdBy" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$userId"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              userName: 1,
              profileImage: 1,
            },
          },
        ],
        as: "createdBy",
      },
    },
    {
      $unwind: "$createdBy",
    },
    {
      $lookup: {
        from: "users",
        let: { userId: "$tags.user" },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$_id", "$$userId"],
              },
            },
          },
          {
            $group: {
              _id: "$_id",
              user: {
                $first: {
                  name: "$name",
                  userName: "$userName",
                  profileImage: "$profileImage",
                },
              },
            },
          },
        ],
        as: "tags",
      },
    },
    {
      $lookup: {
        from: "comments",
        let: { postId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$post", "$$postId"],
              },
            },
          },
          {
            $project: {
              post: 0,
            },
          },
          {
            $lookup: {
              from: "users",
              let: { userId: "$from" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$_id", "$$userId"],
                    },
                  },
                },
                {
                  // grouping required parameters of users
                  $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    userName: { $first: "$userName" },
                    profileImage: { $first: "$profileImage" },
                  },
                },
              ],
              as: "from",
            },
          },
          {
            $unwind: "$from",
          },
        ],
        as: "comments",
      },
    },
    {
      $skip: start - 1,
    },
    {
      $limit: Math.ceil(count / 2),
    },
  ])
    .then((posts) => {
      userPosts = posts;
      return Profile.find({ user: ObjectId(userId) });
    })
    .then((profile) => {
      const profileIds = profile[0].friends.map((friend) => friend.user);
      return Post.aggregate([
        {
          $match: {
            createdBy: {
              $in: profileIds,
            },
          },
        },
        {
          $lookup: {
            from: "users",
            let: { userId: "$createdBy" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$userId"],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  name: 1,
                  userName: 1,
                  profileImage: 1,
                },
              },
            ],
            as: "createdBy",
          },
        },
        {
          $unwind: "$createdBy",
        },
        {
          $lookup: {
            from: "users",
            let: { user: "$tags.user" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$_id", "$$user"],
                  },
                },
              },
              {
                $group: {
                  _id: "$_id",
                  user: {
                    $first: {
                      _id: "$_id",
                      name: "$name",
                      userName: "$userName",
                      profileImage: "$profileImage",
                    },
                  },
                },
              },
            ],
            as: "tags",
          },
        },
        {
          $lookup: {
            from: "comments",
            let: { postId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$post", "$$postId"],
                  },
                },
              },
              {
                $project: {
                  post: 0,
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: { userId: "$from" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$userId"],
                        },
                      },
                    },
                    {
                      // grouping required parameters of users
                      $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        userName: { $first: "$userName" },
                        profileImage: { $first: "$profileImage" },
                      },
                    },
                  ],
                  as: "from",
                },
              },
              {
                $unwind: "$from",
              },
            ],
            as: "comments",
          },
        },
        {
          $skip: start - 1,
        },
        {
          $limit: Math.ceil(count / 2),
        },
      ]);
    })
    .then((friendPosts) => {
      const postFeed = userPosts.concat(friendPosts);
      return res.status(200).json(postFeed);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  // Post.find({ 'createdBy': ObjectId(userId) })
  //     .populate({
  //         path: 'createdBy',
  //         select: 'name userName profileImage'
  //     })
  //     .populate({
  //         path: 'tags.user',
  //         select: 'name userName profileImage'
  //     })
  //     .then(posts => {
  //         userPosts = posts;
  //         return Profile.find({ 'user': ObjectId(userId) })
  //     })
  //     .then(profile => {
  //         const profileIds = profile[0].friends.map(friend => friend.user);
  //         return Post.find({
  //             'createdBy': {
  //                 $in: profileIds
  //             },
  //         })
  //             .populate({
  //                 path: 'createdBy',
  //                 select: 'name userName profileImage'
  //             })
  //             .populate({
  //                 path: 'tags.user',
  //                 select: 'name userName profileImage'
  //             })
  //     })
  //     .then(friendsPosts => {
  //         const postFeed = userPosts.concat(friendsPosts);
  //         return res.status(200).json(postFeed);
  //     })
  //     .catch(err => {
  //         console.log(err)
  //         return res.status(500).json(err);
  //     })
};

exports.getAllPosts = (req, res, next) => {
  const { userId } = req.body;
  Post.find({ user: userId })
    .populate({
      path: "createdBy",
      select: "name userName",
    })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.getPost = (req, res, next) => {
  const { postId } = req.body;
  Post.findById(postId)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.submitPost = (req, res, next) => {
  const { postText, userId, taggedFriends } = req.body;
  let tFriend = JSON.parse(taggedFriends);
  tFriend = tFriend.map((id) => {
    return {
      user: ObjectId(id),
    };
  });
  const images = req.files;
  if (!images) {
    return res
      .status(400)
      .json({ message: "Attached file is not a valid image or video" });
  }

  const allImages = images
    .filter((image) => image.mimetype.includes("image"))
    .map((image) => {
      return {
        imageUrl: image.location || image.path,
      };
    });

  const allVideos = images
    .filter((image) => image.mimetype.includes("video"))
    .map((video) => {
      return {
        videoUrl: video.location || video.path,
        thumbnail: `thumbnail_${video.filename}` || `thumbnail_${video.key}`,
      };
    });

  allVideos.map((item) => {
    console.log(item);
  });

  const newPost = {
    text: postText ? postText : "",
    images: allImages,
    videos: allVideos,
    createdBy: userId,
    tags: tFriend,
    createdDate: Date.now(),
  };

  Post.create(newPost)
    .then((savedPost) => {
      return Post.findById(savedPost._id)
        .populate({
          path: "createdBy",
          select: "name userName profileImage",
        })
        .populate({
          path: "tags.user",
          select: "name userName profileImage",
        });
    })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

exports.updateThumbnail = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const post = await Post.findById(postId);
    let posts = post.toJSON();
    let uploadFolder = "";
    if (process.env.NODE_ENV === "production")
      uploadFolder = keys.AWS_S3_BUCKET_PATH;
    else uploadFolder = "images";

    posts.videos.forEach((video) => {
      let filepath = "";
      ffmpeg(video.videoUrl)
        .on("filenames", (filenames) => {
          console.log("generates", filenames.join(", "));
          console.log(filenames);
          filepath = `${uploadFolder}/${filenames[0]}`;
        })
        .on("end", async () => {
          console.log("screenshot taken");
          video.thumbnailPath = filepath;
          await Post.findOneAndUpdate({'videos._id':video._id},{'$set':{'videos.$':video}});
        })
        .on("error", (er) => {
          console.log("error occured", er);
        })
        .screenshot({
          count: 1,
          folder: uploadFolder,
          filename: `thumbnail-%b.jpg`,
        });
    });

    // const result = await post.updateOne(posts);
    // if (result) {
    //   const res = await Post.findById(postId)
    //     .populate({
    //       path: "createdBy",
    //       select: "name userName profileImage",
    //     })
    //     .populate({
    //       path: "tags.user",
    //       select: "name userName profileImage",
    //     });
    //   return res.status(200).json(res);
    // }
  } catch (ex) {
    console.log(ex);
  }
};

exports.likePost = (req, res, next) => {
  const { postId, userId } = req.body;
  Post.findById(postId)
    .then((post) => {
      const likeIndex = post.like.findIndex((like) => like.user == userId);
      if (likeIndex >= 0) {
        post.like.splice(likeIndex, 1);
      } else {
        post.like.unshift({
          user: ObjectId(userId),
        });
      }
      return post.save();
    })
    .then((like) => {
      return res.status(200).json(like);
    })
    .catch((err) => {
      console.log(err);
      return res.status(200).json(err);
    });
};

exports.createComment = (req, res, next) => {
  const { userId, postId, text } = req.body;
  const comment = {
    text: text,
    from: userId,
    post: postId,
  };
  Comment.create(comment)
    .then((com) => {
      return Comment.find({ post: postId, _id: com._id }).populate({
        path: "from",
        select: "name userName profileImage",
      });
    })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};
