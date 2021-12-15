import mongoose from "mongoose";

const userschema = mongoose.Schema({
    userName: {
        type : String
    },
    profile: {
        type: String
    },
    password: {
        type: String
    },
    followers: {
        type: [String]
    },
    following: {
        type: [String]
    }
});



const userInfo = mongoose.model("userInfo", userschema);

export default userInfo;
