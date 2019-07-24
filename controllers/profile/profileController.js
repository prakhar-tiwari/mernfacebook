const express = require('express');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getUser = (req, res, next) => {
    const { userName } = req.params;
    User.aggregate([
        {
            $match: {
                userName: userName
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                userName: 1,
                profileImage: 1,
            }
        },
        {
            $lookup: {
                from: 'posts',
                localField: '_id',
                foreignField: 'createdBy',
                as: 'posts'
            }
        },
        {
            $lookup: {
                from: 'profiles',
                let: { id: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$user', '$$id']
                            }
                        }
                    },
                    {
                        $unwind: '$friends'
                    }
                ],
                as: 'profile'
            }
        },
        {
            $group: {
                _id: '$_id',
                name: { $first: '$name' },
                userName: { $first: '$userName' },
                profileImage: { $first: '$profileImage' },
                posts: { $first: '$posts' },
                friends: { $first: '$profile.friends' }
            }
        },
        {
            $lookup: {
                from: 'users',
                let: { user: '$friends.user' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: ['$_id', '$$user']
                            }
                        }
                    },
                    {
                        $project: {
                            name: 1,
                            userName: 1
                        }
                    }
                ],
                as: 'friends'
            }
        },

        {
            $unwind: {
                path: '$friends',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'posts',
                let: { friendsId: '$friends._id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$createdBy', '$$friendsId'],
                            }
                        }
                    },
                    {
                        $match: {
                                'tags':{$elemMatch:{user:ObjectId("5d21dcd23785d83d948e32c7")}}
                        }
                    },
                ],
                as: 'friends.posts'
            }
        },
        {
            $group: {
                _id: '$_id',
                name: { $first: '$name' },
                userName: { $first: '$userName' },
                profileImage: { $first: '$profileImage' },
                posts: { $first: '$posts' },
                friends: { $push: '$friends' }
            }
        }
    ])
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: 'User does not exist' })
            }
            return res.status(200).json(user);
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json(err);
        })
}

exports.getAllUsers = (req, res, next) => {
    const { searchText } = req.body;
    User.find({
        "name": { "$regex": searchText, "$options": "i" }
    })
        .select('name userName profileImage')
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(err => {
            return res.status(500).json(err);
        })

}

exports.getFriends = (req, res, next) => {
    const { userId, searchText } = req.body;
    Profile.find({ 'user': userId })
        .select('friends')
        .populate({
            path: 'friends.user',
            match: { "name": { "$regex": searchText, "$options": "i" } },
            select: 'name userName profileImage'
        })
        .then(friends => {
            const sFriends = friends[0].friends.filter(friend => friend.user !== null);
            return res.status(200).json(sFriends);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
}

exports.getFriendsChat = (req, res, next) => {
    const { userId } = req.body;
    Profile.find({ 'user': userId })
        .select('friends')
        .populate({
            path: 'friends.user',
            select: 'name userName profileImage'
        })
        .then(friends => {
            const sFriends = friends[0].friends.filter(friend => friend.user !== null);
            return res.status(200).json(sFriends);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
}

exports.uploadPhoto = (req, res, next) => {
    const { userId } = req.body;
    const images = req.files;
    if (!images) {
        return res.status(400).json({ message: 'Attached file is not a valid image' })
    }
    const imagePath = images[0].path;
    User.updateOne(
        { '_id': userId },
        { $set: { 'profileImage': imagePath } }
    )
        .then(result => {
            return User.findById(userId).select('name userName profileImage');
        })
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json(err)
        })
}