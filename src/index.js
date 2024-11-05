import express from "express";
import { connectDB } from "./config/mongodb.js";
import dealRoutes from "./routes/dealRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
connectDB().catch(console.error);

// Routes
app.use("/api", dealRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
