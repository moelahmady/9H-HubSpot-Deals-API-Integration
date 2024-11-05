# HubSpot Deals API Integration

A Node.js application that integrates with HubSpot's API to manage deals and synchronize them with MongoDB. This service provides endpoints for creating deals, managing mock data, and retrieving high-priority deals.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
  - [Using Docker](#using-docker)
  - [Manual Installation](#manual-installation)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [HubSpot Integration Details](#hubspot-integration-details)
- [Error Handling](#error-handling)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

- Create and manage HubSpot deals
- Bulk creation of mock deals for testing
- Filter and retrieve high-priority deals
- MongoDB integration for deal storage
- Docker support for easy deployment

## Prerequisites

- Node.js v20 or higher
- MongoDB
- HubSpot API access token
- Docker and Docker Compose (optional)

## Environment Variables

- `PORT`: Port number for the server (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `HUBSPOT_ACCESS_TOKEN`: HubSpot API access token

## Installation

### Using Docker

1. Clone the repository
2. Configure environment variables in `docker-compose.yml`
3. Run the application:

```bash
docker-compose up -d
```

### Manual Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm start
```

## API Endpoints

### Create Mock Deals

- **POST** `/api/deals/mock/:count`
- Creates specified number of mock deals in HubSpot
- URL Parameters:
  - `count`: Number of mock deals to create (integer)
- Response: Array of created deals
- Example:
  ```bash
  curl -X POST http://localhost:3000/api/deals/mock/5
  ```

### Create Single Deal

- **POST** `/api/deals/create`
- Creates a single deal in HubSpot
- Request Body:

```json
{
  "dealname": "Example Deal",
  "amount": 50000,
  "closedate": "2024-12-31",
  "pipeline": "default",
  "dealstage": "appointmentscheduled",
  "priority": "high"
}
```

### Get High Priority Deals

- **GET** `/api/deals/high-priority`
- Retrieves all high-priority deals and saves them to MongoDB
- Response: Array of high-priority deals

## Data Models

### Deal Object

```javascript
{
  dealname: string,
  amount: number,
  closedate: string,
  pipeline: string,
  dealstage: string,
  priority: "high" | "medium" | "low"
}
```

## HubSpot Integration Details

### Deal Stages

- appointmentscheduled
- qualifiedtobuy
- presentationscheduled
- decisionmakerboughtin
- contractsent
- closedwon
- closedlost

### Pipeline

Currently supports the "default" pipeline only.

## Error Handling

The API implements a retry mechanism for HubSpot API calls:

- Maximum 3 retry attempts
- 1-second delay between retries
- Comprehensive error logging

## Development

The project structure follows a modular pattern:

- `/src/controllers`: Business logic
- `/src/services`: External service integration
- `/src/models`: Data models
- `/src/routes`: API endpoints
- `/src/config`: Configuration files

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Support

For support, please open an issue in the GitHub repository.
