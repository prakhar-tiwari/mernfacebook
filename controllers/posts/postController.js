const Post = require('../../models/Post');
const Profile=require('../../models/Profile');
const ObjectId = require('mongoose').Types.ObjectId;


exports.getFeed = (req, res, next) => {
    const { userId } = req.body;
    let userPosts=[];
    Post.find({'createdBy':ObjectId(userId)})
    .populate({
        path:'createdBy',
        select:'name'
    })
    .populate({
        path:'tags',
        select:'name'
    })
    .then(posts=>{
        userPosts=posts;
        return Profile.find({'user':ObjectId(userId)})
    })
    .then(profile=>{
        const profileIds=profile[0].friends.map(friend=> friend.user)
        return Post.find({
            'createdBy':{
                $in:profileIds
            }
        })
        .populate({
            path:'createdBy',
            select:'name'
        })
        .populate({
            path:'tags',
            select:'name'
        })
    })
    .then(friendsPosts=>{
        const postFeed=userPosts.concat(friendsPosts);
        return res.status(200).json(postFeed);
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json(err);
    })
}

exports.getAllPosts = (req, res, next) => {
    const { userId } = req.body;
    Post.find({ 'user': userId })
        .populate({
            path: 'createdBy',
            select: 'name'
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
    tFriend = tFriend.map(id => ObjectId(id));
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
        .then(result => {
            return res.status(200).json({ message: 'Post created successfully' });
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json(err);
        })

}