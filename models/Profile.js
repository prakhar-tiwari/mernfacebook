const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    profileImage:{
        type:String
    },
    friends: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            status: {
                type: Number
            }
        }
    ],
    bio: {
        type: String
    },
    geoLocation: {
        type: String
    },
    locations:[
        {
            title:{
                type:String
            },
            status:{
                type:String     // current city or hometown
            },
            address:{
                type:String
            }
        }
    ],
    education:[
        {
            school:{
                type:String
            },
            from:{
                type:Date
            },
            to:{
                type:Date
            },
            graduated:{
                type:Boolean
            },
            description:{
                type:String
            }
        }
    ],
    work:[
        {
            company:{
                type:String
            },
            position:{
                type:String
            },
            location:{
                type:String
            },
            description:{
                ttype:String
            },
            from:{
                type:Date
            },
            to:{
                type:Date
            }
        }
    ]
})

module.exports = mongoose.model('Profile', profileSchema);