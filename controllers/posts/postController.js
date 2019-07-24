const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const ObjectId = require('mongoose').Types.ObjectId;


exports.getFeed = (req, res, next) => {
    const { userId } = req.body;
    let userPosts = [];
    Post.find({ 'createdBy': ObjectId(userId) })
        .populate({
            path: 'createdBy',
            select: 'name userName profileImage'
        })
        .populate({
            path: 'tags.user',
            select: 'name userName profileImage'
        })
        .then(posts => {
            userPosts = posts;
            return Profile.find({ 'user': ObjectId(userId) })
        })
        .then(profile => {
            const profileIds = profile[0].friends.map(friend => friend.user);
            return Post.find({
                'createdBy': {
                    $in: profileIds
                  },
                })
                .populate({
                    path: 'createdBy',
                    select: 'name userName profileImage'
                })
                .populate({
                    path: 'tags.user',
                    select: 'name userName profileImage'
                })
        })
        .then(friendsPosts => {
            const postFeed = userPosts.concat(friendsPosts);
            return res.status(200).json(postFeed);
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json(err);
        })
}

exports.getAllPosts = (req, res, next) => {
    const { userId } = req.body;
    Post.find({ 'user': userId })
        .populate({
            path: 'createdBy',
            select: 'name userName'
        })
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
}

exports.getPost = (req, res, next) => {
    const { postId } = req.body;
    Post.findById(postId)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(err => {
            return res.status(500).json(err);
        })
}

exports.submitPost = (req, res, next) => {
    const { postText, userId, taggedFriends } = req.body;
    let tFriend = JSON.parse(taggedFriends);
    tFriend = tFriend.map(id => {
        return {
            user:ObjectId(id)
        }
    });
    const images = req.files;
    if (!images) {
        return res.status(400).json({ message: 'Attached file is not a valid image' })
    }
    const imagesPath = images.map(image => {
        return insertImage = {
            imageUrl: image.path
        }
    });
    const newPost = {
        text: (postText) ? postText : '',
        images: imagesPath,
        createdBy: userId,
        tags: tFriend,
        createdDate: Date.now()
    }

    Post.create(newPost)
        .then(savedPost => {
            return Post.findById(savedPost._id).populate({
                path: 'createdBy',
                select: 'name userName profileImage'
            })
                .populate({
                    path: 'tags.user',
                    select: 'name userName profileImage'
                })
        })
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json(err);
        })

}

exports.likePost = (req, res, next) => {
    const { postId, userId } = req.body;
    Post.findById(postId)
        .then(post => {
            if (post.like.filter(like => like.user == userId).length > 0) {
                return res.status(400).json({ message: 'user already liked the post' })
            }
            post.like.unshift({
                user:ObjectId(userId)
            });
            return post.save()
        })
        .then(like => {
            return res.status(200).json(like);
        })
        .catch(err => {
            console.log(err)
            return res.status(200).json(err);
        })
}