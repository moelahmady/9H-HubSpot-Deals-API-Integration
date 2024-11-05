import dotenv from "dotenv";

dotenv.config();

const hubspotConfig = {
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
  apiUrl: "https://api.hubspot.com/crm/v3",
  retryAttempts: 3,
  retryDelay: 1000,
};

export default hubspotConfig;
