require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const addressRoutes = require("./routes/addressRoute");

// Kết nối MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Sử dụng routes
app.use("/api", addressRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
