import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId: String,
    userName:String,
    userProfile:String,
    likedby:[String],
    postedFile: String,
    caption: String,
    likes: {
        type: Number,
        default: 0
    },
    comments: [String],
    createdAt: {
        type : Date,
        default: new Date()
    }
});

const postData = mongoose.model('postData', postSchema);

export default postData;

