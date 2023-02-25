import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import hotelRoutes from './routes/hotels.js';
import userRoutes from './routes/users.js';
import roomRoutes from './routes/rooms.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
dotenv.config();

const connectDB = async () => {
    mongoose.set('strictQuery', true)
    try {
        await mongoose.connect("mongodb+srv://vgupta:vg%40_DALL-E@cluster0.khgpbvj.mongodb.net/booking?retryWrites=true&w=majority");
        console.log('Mongodb Connected');
    } catch (error) {
        throw error;
    }
};
mongoose.connection.on('disconnected', () => {
    console.log('MongoDb disconnected');
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/users', userRoutes);


// Error hanler middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
})

app.listen(8800, () => {
    connectDB();
    console.log('Connected to backend!');
});

