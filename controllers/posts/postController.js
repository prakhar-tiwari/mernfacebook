const Post=require('../../models/Post');

exports.submitPost=(req,res,next)=>{
    const {postText}=req.body;
    const image = req.files;
    console.log(postText);
    console.log(image)
    if(!image){
        return res.status(400).json({message:'Attached file is not a valid image'})
    }

}