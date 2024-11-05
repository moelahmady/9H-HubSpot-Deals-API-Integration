import { hubspotService } from "../services/hubspotService.js";
import { dealModel } from "../models/dealModel.js";
import { generateRandomDeal } from "../utils/mockData.js";
/**
 * Controller class handling deal-related operations between HubSpot and MongoDB
 */
class DealController {
  /**
   * Creates multiple mock deals in HubSpot for testing purposes
   * Uses pre-defined mock data from utils/mockData.js
   * @returns {Promise<Array>} Array of created deal responses from HubSpot
   * @throws {Error} If deal creation fails
   */
  async createMockDeals(count) {
    try {
      const createdDeals = [];
      const mockDeals = Array.from({ length: count }, (_, index) =>
        generateRandomDeal(index)
      );
      for (const deal of mockDeals) {
        const response = await this.createDeal(deal);
        createdDeals.push(response);
      }
      return createdDeals;
    } catch (error) {
      console.error("Error creating mock deals:", error.message);
      throw new Error(`Error creating mock deals: ${error.message}`);
    }
  }

  /**
   * Retrieves high-priority deals from HubSpot and saves them to MongoDB
   * @returns {Promise<Array>} Array of high-priority deals
   * @throws {Error} If retrieval or saving fails
   */
  async getAndSaveHighPriorityDeals() {
    try {
      const highPriorityDeals = await hubspotService.getHighPriorityDeals();
      console.log("High priority deals:", highPriorityDeals); // Log deals
      await dealModel.saveDeals(highPriorityDeals);
      return highPriorityDeals;
    } catch (error) {
      console.error("Error processing high priority deals:", error.message);
      throw new Error(`Error processing high priority deals: ${error.message}`);
    }
  }

  async createDeal(dealData) {
    try {
      console.log("Creating single deal with data:", dealData);
      const response = await hubspotService.createDeal({
        properties: {
          dealname: dealData.dealname,
          amount: dealData.amount,
          closedate: dealData.closedate,
          pipeline: dealData.pipeline,
          dealstage: dealData.dealstage,
          priority: dealData.priority,
        },
      });
      return response;
    } catch (error) {
      console.error("Error creating deal:", error.message);
      throw new Error(`Error creating deal: ${error.message}`);
    }
  }
}

export const dealController = new DealController();
