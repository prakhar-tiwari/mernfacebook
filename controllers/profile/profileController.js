const express = require('express');
const User=require('../../models/User');
const Profile = require('../../models/Profile');

exports.getAllUsers = (req, res, next) => {
    const { searchText } = req.body;
    console.log(searchText)
    User.find({
        "name":{"$regex":searchText,"$options":"i"}
    })
    .select('name userName')
    .then(result=>{
        return res.status(200).json(result)
    })
    .catch(err=>{
        return res.status(500).json(err);
    })

}

exports.getFriends = (req, res, next) => {
    const { userId,searchText } = req.body;
    Profile.find({ 'user': userId })
        .select('friends')
        .populate({
            path: 'friends.user',
            match:{"name":{"$regex":searchText,"$options":"i"}},
            select:'name'
        })
        .then(friends => {
            const sFriends=friends[0].friends.filter(friend=> friend.user !== null);
            return res.status(200).json(sFriends);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
}