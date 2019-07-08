const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const postSchema=new Schema({
    text:{
        type:String
    },
    images:[
        {
            imageUrl:{
                type:String
            }
        }
    ],
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    createdDate:{
        type:Date
    },
    modifiedDate:{
        type:Date
    },
    like:[
        {
            likedBy:{
                type:mongoose.Types.ObjectId,
                ref:'User'
            }
        }
    ],
    tags:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:'User'
            }
        }
    ]
})

module.exports=mongoose.model('Post',postSchema);