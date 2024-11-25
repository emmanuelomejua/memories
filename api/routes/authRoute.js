import { signin, signup } from '../contollers/auth.js';


import express from 'express';

const router = express.Router();

router.post('/login', signin);

router.post('/signup', signup);


export default router;
