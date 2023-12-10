import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
    console.log(req.body);
    const { fullName, username, email, password } = req.body;
    const passwordIncrypt = bcryptjs.hashSync(password, 10);
    const newUser = new User({ fullName, username, email, password: passwordIncrypt });
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
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
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
        next(error);
    }
}

export const google = async (req, res, next) => {
    const { fullName, email, photo } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT);
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200)
                .json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: fullName.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: email,
                password: hashedPassword,
                fullName: fullName,
                avatar: photo
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRECT);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }

}