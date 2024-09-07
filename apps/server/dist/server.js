import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import { connectdb } from './config/database.js';
import { corsOptions } from './config/corsOptions.js';
// import routes
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import tokenRoutes from './routes/token.route.js';
import profileRoutes from './routes/profile.route.js';
// import middleware
import ErrorMiddleware from './middlewares/error.middleware.js';
// dov env
dotenv.config({ path: '.env' });
// express app
const app = express();
// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
// configuration
connectdb();
// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/token", tokenRoutes);
app.use("/api/v1/profile", profileRoutes);
// error middleware
app.use(ErrorMiddleware);
// port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port number ${PORT}`));
