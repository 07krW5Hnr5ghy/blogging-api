# Personal Blogging Platform API

This project is a simple RESTful API for a personal blogging platform. It allows users to perform CRUD operations (Create, Read, Update, Delete) on blog posts. The API is built using Node.js, Express.js, and MySQL.

## Features

- Create a new blog post
- Retrieve a single blog post
- Retrieve all blog posts
- Update an existing blog post
- Delete a blog post
- Search for blog posts using a search term

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express.js**: Web framework for Node.js.
- **MySQL**: Relational database to store blog posts.
- **Body-parser**: Middleware to parse incoming JSON requests.

## Installation and Setup

### Prerequisites

- Node.js installed on your system
- MySQL database installed and running

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/07krW5Hnr5ghy/blogging-api
   cd blogging-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the database:**

   - Log in to your MySQL server:
     ```bash
     mysql -u root -p
     ```
   - Create the database and table:

     ```sql
     CREATE DATABASE blog;

     USE blog;

     CREATE TABLE posts (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       content TEXT NOT NULL,
       category VARCHAR(100),
       tags JSON,
       createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
       updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
     );
     ```

4. **Configure the database connection:**

   - Edit `config/db.js` and update the database connection details with the following environment variables fron .env file:
     ```javascript
     const db = mysql.createConnection({
       host: MYSQL_HOST,
       user: MYSQL_USER,
       password: MYSQL_PASSWORD,
       database: MYSQL_DATABASE,
     });
     ```

5. **Start the server:**

   ```bash
   npm start
   ```

6. **API is now running on:** `http://localhost:3001`

## API Endpoints

### Create a Blog Post

- **Endpoint:** `POST /posts`
- **Request Body:**
  ```json
  {
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming"]
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming"],
    "createdAt": "2023-01-01T12:00:00Z",
    "updatedAt": "2023-01-01T12:00:00Z"
  }
  ```

### Retrieve a Single Blog Post

- **Endpoint:** `GET /posts/:id`
- **Response:**
  ```json
  {
    "id": 1,
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming"],
    "createdAt": "2023-01-01T12:00:00Z",
    "updatedAt": "2023-01-01T12:00:00Z"
  }
  ```

### Retrieve All Blog Posts

- **Endpoint:** `GET /posts`
- **Query Parameters:**
  - `term` (optional): Search term to filter posts by title, content, or category.
- **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "My First Blog Post",
      "content": "This is the content of my first blog post.",
      "category": "Technology",
      "tags": ["Tech", "Programming"],
      "createdAt": "2023-01-01T12:00:00Z",
      "updatedAt": "2023-01-01T12:00:00Z"
    }
  ]
  ```

### Update a Blog Post

- **Endpoint:** `PUT /posts/:id`
- **Request Body:**
  ```json
  {
    "title": "Updated Blog Post",
    "content": "Updated content here.",
    "category": "Technology",
    "tags": ["Update", "Tech"]
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "title": "Updated Blog Post",
    "content": "Updated content here.",
    "category": "Technology",
    "tags": ["Update", "Tech"],
    "createdAt": "2023-01-01T12:00:00Z",
    "updatedAt": "2023-01-01T14:00:00Z"
  }
  ```

### Delete a Blog Post

- **Endpoint:** `DELETE /posts/:id`
- **Response:**
  - **204 No Content** if successful
  - **404 Not Found** if the post does not exist

## project url

https://roadmap.sh/projects/blogging-platform-api
