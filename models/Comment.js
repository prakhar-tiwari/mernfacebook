const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: {
        type: String,
        required:true
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    reply: [
        {
            text:{
                type:String,
                required:true
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ]
})

module.exports = mongoose.model('Comment', commentSchema)