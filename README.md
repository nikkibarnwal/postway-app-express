# Postway Social Media API

Welcome to the **Postway Social Media API**, a backend service for a modern social media platform. This API supports functionalities such as user management, post management, likes, comments, pagination, bookmarking, and searching posts by caption.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Features](#api-features)
  - [User Management](#user-management)
  - [Post Management](#post-management)
  - [Likes](#likes)
  - [Comments](#comments)
  - [Pagination](#pagination)
  - [Bookmark](#bookmark)
  - [Search by Caption](#search-by-caption)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Management**: User registration, login, jwt authentication, .
- **Post Management**: Create, update, delete, and view posts.
- **Likes**: Like or unlike posts.
- **Comments**: Add, update, or delete comments on posts.
- **Pagination**: Efficiently fetch large datasets with pagination support.
- **Bookmark**: Bookmark posts for future reference.
- **Search by Caption**: Search posts based on their captions.

## Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/nikkibarnwal/postway-app-express.git
   ```
2. Navigate to the project directory:
   ```bash
   cd postway-social-media-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
Create a `.env` file in the root directory and configure the following:
```env
PORT=5000
JWT_SECRET=your_jwt_secret
```

### Start the Server
Run the following command to start the server:
```bash
npm start
```
The API will run on `http://localhost:5000` by default.

## API Features

### User Management
- **Register**: Allows users to sign up.
- **Login**: Authenticate users with JWT.

### Post Management
- **Create Post**: Upload posts with optional captions and media.
- **Update Post**: Edit the content of existing posts.
- **Delete Post**: Remove posts.
- **View Posts**: Retrieve posts with support for pagination.

### Likes
- **Like a Post**: Add a like to a post.
- **Unlike a Post**: Remove a like from a post.

### Comments
- **Add Comment**: Add a comment to a post.
- **Update Comment**: Edit existing comments.
- **Delete Comment**: Remove a comment.

### Pagination
Fetch large datasets (e.g., posts or comments) efficiently with pagination support by specifying `page` and `limit` query parameters.

### Bookmark
- **Add Bookmark**: Save a post to a user's bookmarks.
- **Remove Bookmark**: Remove a post from bookmarks.

### Search by Caption
Search for posts based on keywords in their captions using a query parameter.

## Technologies Used
- **Node.js**: Runtime environment.
- **Express**: Web framework.
- **Multer**: File upload handling.
- **JSON Web Token (JWT)**: Authentication.
- **Express Validator**: Input validation.
- **Winston**: Logging.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests on [GitHub](https://github.com/nikkibarnwal/postway-app-express.git).

## License
This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

