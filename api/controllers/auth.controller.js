import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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

export const signIn = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const validUser = await User.findOne({ username });
        if (!validUser) return next(errorHandler(404, 'User not found !'));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, ' Wrong Password!'))
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRECT);

        const { password: pass, ...rest } = validUser._doc;

        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);


    } catch (error) {

    }
}