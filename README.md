# Push Notification Service

A Node.js service for sending push notifications to Android and iOS devices using Firebase Cloud Messaging.

## Features

- Send push notifications to Android and iOS devices
- Register and manage device tokens
- TypeORM integration for database operations
- Fastify framework for high-performance API
- JavaScript implementation

## Getting Started

### Prerequisites

- Node.js (>=16.0.0)
- PostgreSQL database
- Firebase project with Cloud Messaging enabled

### Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure your environment variables in `.env` file
4. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

- `POST /notifications/tokens`: Register a device token
- `DELETE /notifications/tokens/:token`: Remove a specific token
- `DELETE /notifications/users/:userId/tokens`: Remove all tokens for a user
- `POST /notifications/send`: Send a notification

## Environment Variables

See the `.env` file for required environment variables.

## License

MIT
