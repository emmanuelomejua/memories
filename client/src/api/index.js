import axios from 'axios';



const SERVER = axios.create({
    baseURL: 'http://localhost:3550/'
})


export const fetchPosts = () => SERVER.get('posts');
export const createPost = (newPost) => SERVER.post('posts', newPost);
export const likePost = (id) => SERVER.patch(`posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => SERVER.patch(`posts${id}`, updatedPost);
export const deletePost = (id) => SERVER.delete(`posts/${id}`);


export const siginIn = (userDetails) => SERVER.post('auth/login', userDetails);
export const siginUp = (userDetails) => SERVER.post('auth/sign', userDetails)

export default SERVER;
