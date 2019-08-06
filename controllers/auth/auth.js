const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Profile=require('../../models/Profile');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    const { name, contactInfo, password, dob, gender } = req.body;
    let newUser;
    User.find({
        $or: [
            { 'email': contactInfo },
            { 'contactNumber': contactInfo }
        ]
    })
        .then(user => {
            if (user && user.length > 0) {
                console.log(user)
                return res.json({ message: 'User already exists' })
            }
            let userName = name.split(' ').join('.').toLowerCase();
            User.find({ 'name': name }).countDocuments()
                .then(count => {
                    if (count > 0)
                        userName += "." + count;
                })
                .catch(err => {
                    console.log(err)
                })
            newUser = {
                name: name,
                dob: dob,
                gender: gender,
                userName: userName
            }
            if (isNaN(contactInfo)) {
                newUser.email = contactInfo;
            }
            else {
                newUser.contactNumber = contactInfo;
            }
            return bcrypt.hash(password, 12)
        })
        .then(hashedPassword => {
            newUser.password = hashedPassword;
            return User.create(newUser)
        })
        .then(user => {
            const profile={user:user._id}
            return Profile.create(profile);
        })
        .then(result=>{
            return res.status(200).json({message:'User\'s profile created successfully '});
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json(err);
        })
}

exports.login = (req, res, next) => {
    const { contactInfo, password } = req.body;
    let authUser;
    User.find({
        $or: [
            { 'email': contactInfo },
            { 'contactNumber': contactInfo }
        ]
    })
        .then(user => {
            if (!user) {
                return res.json({ message: 'User not found' })
            }
            authUser = user;
            return bcrypt.compare(password, user[0].password)
        })
        .then(isMatch => {
            if (!isMatch) {
                return res.json({ message: 'Password incorrect' })
            }
            const payload = {
                id: authUser[0]._id,
                name: authUser[0].name,
                userName:authUser[0].userName,
                profileImage:authUser[0].profileImage,
            };

            jwt.sign(
                payload,
                'secret',
                { expiresIn: 7200 },
                (err, token) => {
                    if (err) {
                        return res.json(err)
                    }
                    return res.status(200).json({ token: 'Bearer ' + token })
                })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json(err);
        })
}
