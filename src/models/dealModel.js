import { getDB } from "../config/mongodb.js";
import { mongoConfig } from "../config/mongodb.js";

class DealModel {
  async saveDeals(deals) {
    try {
      // Get database instance
      const db = await getDB();
      const collection = db.collection(mongoConfig.collections.deals);

      // Clear existing deals to maintain fresh state
      await collection.deleteMany({});

      // Insert new deals if array is not empty
      if (deals.length > 0) {
        await collection.insertMany(deals);
      }
      return true;
    } catch (error) {
      throw new Error(`Error saving deals to MongoDB: ${error.message}`);
    }
  }

  async getDeals() {
    try {
      // Get database instance
      const db = await getDB();
      const collection = db.collection(mongoConfig.collections.deals);
      // Retrieve all deals from collection
      return await collection.find({}).toArray();
    } catch (error) {
      throw new Error(`Error reading deals from MongoDB: ${error.message}`);
    }
  }
}

// Export singleton instance
export const dealModel = new DealModel();
