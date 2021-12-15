import  mongoose from "mongoose";
import postData from '../models/posts.js';

export const getPosts = async(req,res) => {
    try {
        const posts = await postData.find();

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({message : error.message})
    }
};

export const feedPosts = async(req,res) => {
    const { feeds } = req.params;
    const skip = feeds - 5 ; 
   if(feeds == 5) {
    try {
        const feed = await postData.find().sort({date: -1}).limit(5);

        res.status(200).json(feed)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
   } else {
    try {
        const feed = await postData.find().sort({date: -1}).limit(feeds).skip(skip);

        res.status(200).json(feed)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
   }
}

export const createPost = async(req,res) => {
    const { userId, userName, userProfile , postedFile, caption } = req.body;
    const newPost = new postData({userId, userName, userProfile, postedFile, caption })
    try {
        await newPost.save();

        res.status(200).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
} ;

export const likePost = async (req,res) => {
    const { id } = req.params;
    const { likes , likedby } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

   await postData.findOne({_id: id})
   .then(async(res) => {
       if(!res.likedby.includes(likedby)) {
           const updatedInfo = res.likedby.push(likedby)
          await postData.findOneAndUpdate({_id : id}, {likes: likes, likedby: res.likedby})
       } else {
           const updatedInfo = res.likedby.filter((id) => id != likedby)
           await postData.findByIdAndUpdate({_id : id}, {likes: likes, likedby : updatedInfo})
       }
   })
};

export const postThumbs = async(req,res) => {
    const { id } = req.params;
    await postData.find({ userId: id})
    .then((data) => {
       res.json(data)
    }).catch((err) => console.log(err))
}