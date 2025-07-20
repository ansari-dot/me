// index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import userRoutes from './routes/user.routes.js';

// Load environment variables
dotenv.config();

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants
const PORT = process.env.PORT || 3000;
const CLIENT_BUILD_PATH = path.join(__dirname, '../client/dist');

const app = express();

// ------------------------
// Middleware
// ------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev')); // ✅ use 'dev' format to avoid deprecation warning
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);

// ------------------------
// Static React Files
// ------------------------
app.use(express.static(CLIENT_BUILD_PATH));

// ------------------------
// API Routes
// ------------------------
app.use('/api', userRoutes);

// ------------------------
// React Catch-all Route
// ------------------------
app.get('/', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
  }
});


// ------------------------
// Database Connection + Start Server
// ------------------------
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });
