# Authentication API

This is a Node.js Express application built using TypeScript, MongoDB, and Mongoose. The application is designed to handle user authentication and management with scalability in mind. The project is structured to follow best practices, making it easy to extend and maintain.

## Features

- User Registration and Management
- RESTful API design
- Input validation using Zod
- Error handling middleware
- Environment-based configuration
- Scalable folder structure

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v14 or later)
- **npm** (v6 or later) or **yarn**
- **MongoDB** (You can use a local instance or MongoDB Atlas)

## Project Structure

```plaintext
project-root/
│
├── src/
│   ├── app.ts                # Express application setup
│   ├── server.ts             # Server entry point
│   ├── config/
│   │   └── database.ts       # MongoDB connection configuration
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── controllers/          # Route handlers and business logic
│   └── middleware/           # Custom middleware (e.g., error handling)
│
├── .env                      # Environment variables
├── .gitignore                # Files and directories to be ignored by Git
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation


Getting Started
1. Clone the Repository
git clone https://github.com/sunilgautam904/authentication.git
cd authentication

2. Install Dependencies
Use npm or yarn to install the project dependencies:
npm install
# or
yarn install

3. Set Up Environment Variables
Create a .env file in the root directory and add the following environment variables:

PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<yourDatabaseName>

4. Run the Application
Start the server in development mode:

npm run dev
# or
yarn dev
The server should now be running at http://localhost:3000.

5. API Endpoints
GET /api/users: Fetch all users
GET /api/users/
: Fetch a user by ID
POST /api/users: Add a new user




