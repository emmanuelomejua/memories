import express from 'express'
import { getPosts, createPosts } from '../contollers/posts.js';

import auth from '../middleware/auth.js';

const router = express.Router()

router.get('/', getPosts )
router.post('/', auth, createPosts )

export default router
