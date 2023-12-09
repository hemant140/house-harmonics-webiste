import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import mongoose from 'mongoose';

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

const Port = 9000;

mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Not Connected to MongoDB', error)
    })

const app = express();

app.use(express.json());

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}!!!`);
})


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const Message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        Status: 0,
        Message: Message,
    })
})