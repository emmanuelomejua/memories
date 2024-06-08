import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:{
        type: String
    },
    message :{
        type: String
    },
    creator:{
        type: String
    },
    tags: [String],
    selectedFile:{
        type: String
    },
    likeCount: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

const postMessage = mongoose.model('postmessage', postSchema)

export default postMessage;
