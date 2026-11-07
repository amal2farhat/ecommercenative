
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'

dotenv.config();

const app = express();
await connectDB()
//mongodb+srv://amalfarah222_db_user:RA2RsM8xboRaLGM4@cluster0.6ezgplo.mongodb.net/
// CORS - Allow React Native Web
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req, res) => {
  res.status(200).send('API Server is running!');
});

const PORT = process.env.PORT || 5000;

// Listen on all network interfaces
app.listen(PORT,  () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
