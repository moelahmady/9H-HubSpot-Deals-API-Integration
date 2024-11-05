import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// MongoDB configuration object
export const mongoConfig = {
  url: process.env.MONGODB_URI || "mongodb://localhost:27017",
  dbName: "hubspot_deals",
  collections: {
    deals: "deals",
  },
};

// Database instance cache
let db = null;

// Initialize database connection
export async function connectDB() {
  try {
    // Create new MongoDB client and connect
    const client = await MongoClient.connect(mongoConfig.url);
    db = client.db(mongoConfig.dbName);
    console.log("Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Get database instance (creates connection if not exists)
export async function getDB() {
  if (!db) {
    await connectDB();
  }
  return db;
}
