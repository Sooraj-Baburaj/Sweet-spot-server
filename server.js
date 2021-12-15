import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js'

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({limit: '30mb',extended : true}));

app.use('/posts', postRoutes);
app.use('/users',userRoutes);


const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`server running on Port:${PORT}`));
