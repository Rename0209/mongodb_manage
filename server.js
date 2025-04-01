require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const addressRoutes = require("./routes/addressRoute");

// Kết nối MongoDB
connectDB();

const app = express();

// CORS Configuration
const corsOptions = {
    origin: ['http://localhost:3000', process.env.ALLOWED_ORIGINS],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 // 24 hours
};

app.use(express.json());
app.use(cors(corsOptions));

// Sử dụng routes
app.use("/api", addressRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
