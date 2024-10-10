import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});