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
    try{
        const newPost = new postMessage({...post, creator: req.userId, createdAt: new Date().toISOString()})
        await newPost.save()
        res.status(201).json(newPost)
    } catch(error){
        res.status(409).json({message: error.message})
    }
}


export const getPost = async (req, res) => {
    try {
        const posts = await postMessage.find();

        res.status(200).json(posts);
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

        if(!req.userId) return res.status({ message: 'Unauthenticated user' })
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this Id');

        const post = await postMessage.findById(id);

        const index = await post.likes.findIndex((id) => id === String(req.userId));

        if(index === -1){
            post.likes.push(userId)
        } else {
            post.likes = post.lokes.filter((id) => id !== String(req.userId))
        }

        const updatedPost = await findByIdAndUpdate(id, post, { new: true });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json(error);
    }
}
