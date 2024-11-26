import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user) return res.status(404).json('User not found or does not exist');

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) return res.status(401).json({message: 'Please enter a valid username and password'});

        const token = jwt.sign({ email: user.email, id: user._id }, 'test', {expiresIn: '30d'});

        res.status(200).json({ data: user, token })
    } catch (error) {
        res.status(500).json(error);
    }
}


export const signup = async (req, res) => {
    const { email, password, firstName, lastName} = req.body;
    try {
        const userExist = await User.findOne({email});

        if(userExist) return res.status(400).json('User already exist');

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName}, ${lastName}`
        })

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', {expiresIn: '30d'});

        res.status(200).json({data: result, token});
    } catch (error) {
        res.status(500).json(error.message);
    }
}

