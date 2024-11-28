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
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
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
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await postMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await postMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}


export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}
