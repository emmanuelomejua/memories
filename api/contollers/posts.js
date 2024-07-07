import mongoose from "mongoose";
import postMessage from "../models/postMessage.js";


export const getPosts = async (req, res) => {
    try{
        const postMessages =  await postMessage.find()

        res.status(200).json( postMessages)
    } catch(error){
        res.status(404).json({message: error.message})
    }
}


export const createPosts = async (req, res) => {
    const post = req.body
    const newPost = new postMessage(post)
    try{
        await newPost.save()
        res.status(201).json(newPost)
    } catch(error){
        res.status(409).json({message: error.message})
    }
}


export const getPost = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json(error);
    }
}


export const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this Id');

        const updated = await postMessage.findByIdAndUpdate(_id, post, {new: true});

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json(error);
    }
}


export const likePost = async (req, res) => {
    const id = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this Id');

        const post = await postMessage.findById(id);

        const updatedPost = await findByIdAndUpdate(id, { likeCount: post.likeCount });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json(error);
    }
}
