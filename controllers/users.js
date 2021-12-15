import mongoose from "mongoose";
import userInfo from "../models/user.js";

export const getUsers = async(req,res) => {
    try {
        const users = await userInfo.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message : error.message});
    }
} ;

export const getUser = async(req,res) => {
    const { id } = req.params;

    try {
        const user = await userInfo.findOne({_id: id});

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createUsers = async(req,res) => {
    const { userName , password, profile } = req.body;
    const newUser = new userInfo({ userName , password, profile }) ;
    try {
        await newUser.save();

        res.status(201).json(newUser)
    } catch (error) {
        res.status(409).json({message : error.message})
    }
} ;

export const userAuth = async(req,res) => {
    const {userName , password} = req.body;
    userInfo.findOne({userName: userName})
    .then((data) => {
        if(data==null) {
            res.status(200).json({message: "Username not found"})
        } else if (data.password != password) {
            res.status(200).json({message: "Incorrect password"})
        } else if(data.userName == userName && data.password == password) {
            res.status(200).json({message: "User Authorized",info: data})
        }
    })
};

export const followUser = async(req,res) => {
    const { id } = req.params;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await userInfo.findOne({_id: id})
    .then(async(res) => {
        if(!res.following.includes(userId)) {
            const updatedInfo = res.following.push(userId)
           await userInfo.findByIdAndUpdate({_id : id}, {following: res.following});
        } else {
            const updatedInfo = res.following.filter((id) => id != userId)
            await userInfo.findByIdAndUpdate({_id : id}, {following: updatedInfo})
        }
    })
    await userInfo.findOne({_id: userId})
    .then(async(res) => {
        if(!res.followers.includes(id)) {
            const updatedInfo = res.followers.push(id);
            await userInfo.findByIdAndUpdate({_id:userId}, {followers: res.followers})
        } else {
            const updatedInfo = res.followers.filter((follower) => follower != id);
            await userInfo.findByIdAndUpdate({_id:userId}, {followers: updatedInfo});
        }
    })
}