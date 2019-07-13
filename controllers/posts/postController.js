const Post = require('../../models/Post');
const ObjectId = require('mongoose').Types.ObjectId;


exports.getFeed = (req, res, next) => {
    const { userId } = req.body;
    Post.aggregate([
        {
            $match:{
                createdBy:ObjectId(userId)
            }
        },
        {
            $lookup:{
                from:'profiles',
                localField:'createdBy',
                foreignField:'user',
                as:'profile'
            }
        },
        {
            $unwind:'$profile'
        },
        {
            $group:{
                _id:'$_id',
                text:{$first:'$text'},
                images:{$first:'$images'},
                tags:{$first:'$tags'},
                createdBy:{$first:'$createdBy'},
                createdDate:{$first:'$createdDate'},
                like:{$first:'$like'},
                friends:{$first:'$profile.friends'}
            }
        },
        {
            $unwind:'$friends'
        },
        {
           $lookup:{
               from:'posts',
               localField:'friends.user',
               foreignField:'createdBy',
               as:'posts'
           }
        },
        {
            $unwind:'$posts'
        },
        {
            $group:{
                _id:'$_id',
                text:{$first:'$text'},
                images:{$first:'$images'},
                tags:{$first:'$tags'},
                createdDate:{$first:'$createdDate'},
                like:{$first:'$like'},
                friendsposts:{$push:'$posts'}
            }
        }
    ])
    .then(result=>{
        return res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
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