import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const signUp = async (req, res, next) => {
    console.log(req.body);
    const { fullName, username, email, mobile, password } = req.body;
    const passwordIncrypt = bcryptjs.hashSync(password, 10);
    const newUser = new User({ fullName, username, email, mobile, password: passwordIncrypt });
    try {
        await newUser.save();
        res.json({
            Status: 1,
            Message: "User Created Successfully"
        })

    } catch (error) {
        // next(errorHandler(501, 'Error From Function side'));
        next(error);
    }
}