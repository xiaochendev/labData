// Imports
import express from "express";
import dotenv from "dotenv";
import log from "./middleware/loggingMiddleware.mjs";
import globalErr from "./middleware/globalErr.mjs";
import gradeRoutes from './routes/gradeRoutes.mjs';
import grades_agg from "./routes/grades_agg.mjs";

// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(log); // Customer Request logging middleware

// Routes
app.use('/api/grades', gradeRoutes);
app.use('/api/grades', grades_agg);

// Err Middleware
app.use(globalErr);

// Listen
app.listen(PORT, () => {
  console.log(`Server Runing on Port: ${PORT}`);
});