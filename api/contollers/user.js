import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';

export const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const userExists = await User.findOne({email});

        if(!userExists) return res.status(404).json('User not found or does not exist');

        const validPassword = await bcrypt.compare(password, userExists?.password);

        if(!validPassword) return res.status(401).json({message: 'Please enter a valid username and password'});
    } catch (error) {
        res.status(500).json(error);
    }
}


export const signup = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json(error);
    }
}

