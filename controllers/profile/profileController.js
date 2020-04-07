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
            $lookup: {                  // finding posts created by current user
                from: 'posts',
                let: { id: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$createdBy', '$$id']
                            }
                        },
                    },
                    {
                        $lookup: {                               // populating tagged users
                            from: 'users',
                            let: { user: '$tags.user' },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $in: ['$_id', '$$user']
                                        }
                                    },
                                },
                                {                               // grouping required parameters of users
                                    $group: {
                                        _id: '$_id',
                                        'user': {
                                            $first: {
                                                name: '$name',
                                                userName: '$userName',
                                                profileImage: '$profileImage'
                                            }
                                        }
                                    }
                                }
                            ],
                            as: 'tags'
                        }
                    },
                    {
                        $lookup: {
                            from: 'comments',
                            let: { postId: '$_id' },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ['$post', '$$postId']
                                        }
                                    }
                                },
                                {
                                    $project: {
                                        post: 0
                                    }
                                },
                                {
                                    $lookup: {
                                        from: 'users',
                                        let: { userId: '$from' },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ['$_id', '$$userId']
                                                    }
                                                }
                                            },
                                            {                               // grouping required parameters of users
                                                $group: {
                                                    _id:'$_id',
                                                    name:{$first:'$name'},
                                                    userName:{$first:'$userName'},
                                                    profileImage:{$first:'$profileImage'}
                                                }
                                            },
                                        ],
                                        as: 'from'
                                    }
                                },
                                {
                                    $unwind:'$from'
                                }
                            ],
                            as: 'comments'
                        }
                    },
                ],
                as: 'posts'
            }
        },
        {
            $lookup: {                                  // finding user's friends
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
                        $unwind: '$friends'          // unwinding as it gave array of array, we need only friends array
                    },
                    // {
                    //     $match: {
                    //         $expr: {
                    //             $eq: [1, '$friends.status']
                    //         }
                    //     }
                    // },
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
                friends: { $first: '$profile.friends' }     // grouping user's friends from profile
            }
        },
        {
            $unwind: {
                path: '$friends',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $unwind: {
                path: '$friends.user',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {                                      // populating user's friends with required parameters
                from: 'users',
                let: { user: '$friends.user', status: '$friends.status' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$_id', '$$user']
                            }
                        }
                    },
                    {
                        $project: {
                            name: 1,
                            userName: 1,
                            profileImage: 1
                        }
                    }
                ],
                as: 'friends.user'
            }
        },
        {
            $unwind: {
                path: '$friends.user',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'posts',
                let: { friendsId: '$friends.user._id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$createdBy', '$$friendsId'],
                            }
                        }
                    },
                    {
                        $match: {  // filtering out posts in which only current user is tagged
                            'tags': { $elemMatch: { user: ObjectId("5d21dcd23785d83d948e32c7") } }
                        }
                    },
                    {
                        $lookup: {         // populating tagged users
                            from: 'users',
                            let: { user: '$tags.user' },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $in: ['$_id', '$$user']
                                        }
                                    },
                                },
                                {                               // grouping required parameters of users
                                    $group: {
                                        _id: '$_id',
                                        'user': {
                                            $first: {
                                                name: '$name',
                                                userName: '$userName',
                                                profileImage: '$profileImage'
                                            }
                                        }
                                    }
                                }
                            ],
                            as: 'tags'
                        }
                    },
                    {
                        $lookup: {
                            from: 'comments',
                            let: { postId: '$_id' },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ['$post', '$$postId']
                                        }
                                    }
                                },
                                {
                                    $project: {
                                        post: 0
                                    }
                                },
                                {
                                    $lookup: {
                                        from: 'users',
                                        let: { userId: '$from' },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ['$_id', '$$userId']
                                                    }
                                                }
                                            },
                                            {                               // grouping required parameters of users
                                                $group: {
                                                    _id:'$_id',
                                                    name:{$first:'$name'},
                                                    userName:{$first:'$userName'},
                                                    profileImage:{$first:'$profileImage'}
                                                }
                                            },
                                        ],
                                        as: 'from'
                                    }
                                },
                                {
                                    $unwind:'$from'
                                }
                            ],
                            as: 'comments'
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
    if (searchText !== '') {
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
    else {
        return res.status(200).json([]);
    }
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

exports.getChatFriends = (req, res, next) => {
    const { userId } = req.body;
    Profile.aggregate([
        {
            $match: {
                user: ObjectId(userId)
            }
        },
        {
            $unwind: '$friends'
        },
        {
            $match: {
                $expr: {
                    $eq: [1, '$friends.status']
                }
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
                                $eq: ['$_id', '$$user']
                            }
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            userName: 1,
                            profileImage: 1
                        },
                    },

                ],
                as: 'friends.user'
            }
        },
        {
            $unwind: {
                path: '$friends.user',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: '$_id',
                friends: { $push: '$friends' }
            }
        }
    ])
        .then(friends => {
            sFriends = friends[0].friends.filter(friend => friend.user !== null);
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
    const imagePath = images[0].location;
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

exports.sendFriendRequest = (req, res, next) => {
    const { userId, tlUserId } = req.body;
    Profile.updateOne(
        {
            'user': tlUserId,
            'friends.user': { $ne: ObjectId(userId) }
        },
        {
            $push: {
                friends: {
                    user: userId,
                    status: 2
                }
            }
        }
    )
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: 'User not found' })
            }
            return Profile.updateOne(
                {
                    'user': userId,
                    'friends.user': { $ne: ObjectId(tlUserId) }
                },
                {
                    $push: {
                        friends: {
                            user: tlUserId,
                            status: 3
                        }
                    }
                }
            )
        })
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }
            return res.status(200).json(user)
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json(err);
        })
}

exports.acceptFriend = (req, res, next) => {
    const { userId, tlUserId } = req.body;
    Profile.updateOne(
        {
            'user': tlUserId,
            'friends.user': ObjectId(userId)
        },
        {
            $set: { 'friends.$.status': 1 }
        }
    )
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }
            return Profile.updateOne(
                {
                    'user': userId,
                    'friends.user': ObjectId(tlUserId)
                },
                {
                    $set: { 'friends.$.status': 1 }
                }
            )
        })
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json(err);
        })
}

exports.friendRequests = (req, res, next) => {
    const { userId } = req.body;
    Profile.aggregate([
        {
            $match: {
                user: ObjectId(userId)
            }
        },
        {
            $unwind: '$friends'
        },
        {
            $match: {
                $expr: {
                    $eq: [2, '$friends.status']
                }
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
                                $eq: ['$_id', '$$user']
                            }
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            userName: 1,
                            profileImage: 1
                        },
                    },

                ],
                as: 'friends.user'
            }
        },
        {
            $unwind: {
                path: '$friends.user',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: '$_id',
                friends: { $push: '$friends' }
            }
        }
    ])
        .then(friends => {
            sFriends = friends[0].friends.filter(friend => friend.user !== null);
            return res.status(200).json(sFriends);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
}