# Blog API Server

This is a RESTful API server for a blog application built with Node.js, Express, Prisma (SQLite), and Redis. The API supports CRUD operations for posts, comments, categories, and user management. It also includes authentication using Firebase, role-based authorization (admin and user roles), and session management using Redis.

## Features

- User authentication with Google Firebase.
- Role-based authorization (Admin and User roles).
- Session management with Redis.
- CSRF protection for secure requests.
- CRUD operations for blog posts, categories, comments, and replies.
- Admin panel with restricted access to certain routes.
- API documentation generated using Swagger.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- Redis (running locally)
- SQLite (used as the database via Prisma)
- Firebase project setup (for Google authentication)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/A1X6/Blog-Express-Server.git
    cd Blog-Express-Server
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Setup Redis:
    - Start Redis server:
      ```bash
      sudo service redis-server start
      ```

4. Setup environment variables:
    - Create a `.env` file in the root of the project and include the following variables:
      ```
      DATABASE_URL="file:./dev.db"
      PORT=5000
      ADMIN_EMAIL="example@gmail.com"
      ```
  
    - Place the Firebase private key in the `config` folder as `privateKey.json` and ensure it is ignored by Git.

5. Run database migrations:
    ```bash
    npx prisma migrate dev
    ```

6. Start the server:
    ```bash
    npm start
    ```

The server will run on `http://localhost:5000`.

### Routes

#### Public Routes
- `GET /health-check`: Returns the server health status.
- `POST /auth/login`: User login using Firebase.
- `GET /auth/csrf-token`: Get the CSRF token for secure requests.

#### Protected Routes (Authenticated Users)
- `POST /auth/logout`: Logs out the user and destroys the session.
- `POST /posts`: Create a new blog post (admin only).
- `PUT /posts/:id`: Update a blog post (admin only).
- `DELETE /posts/:id`: Delete a blog post (admin only).
- `GET /posts`: Get all blog posts.
- `GET /posts/:id`: Get a specific post by ID.

#### Categories (Admin Only)
- `POST /categories`: Create a new category.
- `PUT /categories/:id`: Update a category.
- `DELETE /categories/:id`: Delete a category.
  
#### Users (Admin Only)
- `GET /users`: Get all users.
- `GET /users/:id`: Get a specific user by ID.
- `DELETE /users/:id`: Delete a user.

#### Comments
- `GET /comments/posts/:id`: Get all comments on a specific post.
- `POST /comments/posts/:id`: Add a comment to a specific post.
- `PUT /comments/:id`: Update a comment.
- `DELETE /comments/:id`: Delete a comment.

#### Replies
- `GET /replies/comments/:id`: Get all replies for a specific comment.
- `POST /replies/comments/:id`: Add a reply to a specific comment.
- `PUT /replies/:id`: Update a reply.
- `DELETE /replies/:id`: Delete a reply.

### API Documentation

The project uses Swagger for API documentation. Once the server is running, you can view the API documentation by navigating to: http://localhost:5000/api-docs 


This will display all the available routes, their parameters, and expected responses.

### Environment Variables

- `DATABASE_URL`: Specifies the SQLite database location.
- `PORT`: Defines the port the server will run on (default: `5000`).
- `ADMIN_EMAIL`: The email address with admin privileges.
- `PRIVATE_KEY`: Firebase private key JSON file path stored in `config/privateKey.json`.

### Running Redis

Ensure that Redis is running for session management. You can start Redis using the following command:

```bash
sudo service redis-server start
