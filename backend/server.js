import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import wordRoutes from "./routes/wordRoutes.js";
import connectToMongoDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/words", wordRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectToMongoDB();
});