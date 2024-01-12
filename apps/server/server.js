import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser';
import { connectdb } from './src/config/database.js';
import { corsOptions } from './src/config/corsOptions.js';

// import middleware
import ErrorMiddleware from './src/middlewares/error.middleware.js';

// import routes
import authRoutes from './src/routes/auth.route.js'
import adminRoutes from './src/routes/admin.route.js'
import tokenRoutes from './src/routes/token.route.js'
import profileRoutes from './src/routes/profile.route.js'
import sessionRoutes from './src/routes/session.route.js'

// dov env
dotenv.config({ path: '.env' });

// express app
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }));

// configuration
connectdb();

// port
const PORT = process.env.PORT || 8000;

// listen
app.listen(PORT, () => console.log(`Listening on port number ${PORT}`));

// routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/token", tokenRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/session", sessionRoutes)



// error middleware
app.use(ErrorMiddleware);