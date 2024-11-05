import { Client } from "@hubspot/api-client";
import hubspotConfig from "../config/hubspot.js";

class HubspotService {
  /**
   * Service class for interacting with HubSpot API
   */

  constructor() {
    // Initialize HubSpot client with access token from config
    this.hubspotClient = new Client({ accessToken: hubspotConfig.accessToken });
    this.retryAttempts = hubspotConfig.retryAttempts;
  }

  async createDeal(dealData) {
    let attempts = 0;
    // Implement retry mechanism for API resilience
    while (attempts < this.retryAttempts) {
      try {
        // Transform deal data to HubSpot's expected format
        const properties = {
          dealname: dealData.properties.dealname,
          amount: dealData.properties.amount.toString(), // HubSpot expects string
          closedate: dealData.properties.closedate,
          pipeline: "default",
          dealstage: dealData.properties.dealstage,
          hs_priority: dealData.properties.priority,
        };

        // Make API call to create deal in HubSpot
        const apiResponse = await this.hubspotClient.crm.deals.basicApi.create({
          properties,
        });
        return apiResponse;
      } catch (error) {
        console.error("Error on attempt", attempts + 1, ":", error.message);
        attempts++;
        // If all retries exhausted, throw the error
        if (attempts === this.retryAttempts) throw error;
        // Wait before next retry using configured delay
        await new Promise((resolve) =>
          setTimeout(resolve, hubspotConfig.retryDelay)
        );
      }
    }
  }

  async getHighPriorityDeals() {
    try {
      // Configure search criteria for high priority deals
      const filter = {
        filterGroups: [
          {
            filters: [
              {
                propertyName: "hs_priority",
                operator: "EQ",
                value: "high",
              },
            ],
          },
        ],
        limit: 100, // Fetch up to 100 deals per request
        after: 0, // Start from the first record
      };

      // Execute search with specified properties to return
      const response = await this.hubspotClient.crm.deals.searchApi.doSearch({
        ...filter,
        properties: [
          "dealname",
          "amount",
          "dealstage",
          "hs_priority",
          "closedate",
        ],
      });

      return response.results;
    } catch (error) {
      console.error("Error getting high priority deals:", error.message);
      throw error;
    }
  }
}

// Export singleton instance
export const hubspotService = new HubspotService();
