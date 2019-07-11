const Post=require('../../models/Post');
const ObjectId=require('mongoose').Types.ObjectId;


exports.getAllPosts=(req,res,next)=>{
    const {userId} = req.body;
    
}

exports.submitPost=(req,res,next)=>{
    const {postText,userId,taggedFriends}=req.body;
    let tFriend=JSON.parse(taggedFriends);
    tFriend=tFriend.map(id=> ObjectId(id));
    const images = req.files;
    if(!images){
        return res.status(400).json({message:'Attached file is not a valid image'})
    }
    const newPost={
        text:(postText)?postText:'',
        images:(images.length>0)?images.path:null,
        createdBy:userId,
        tags:tFriend,
        createdDate:Date.now()
    }

    Post.create(newPost)
    .then(result=>{
        return res.status(200).json({message:'Post created successfully'});
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json(err);
    })

}