Postman Link: https://planetary-crescent-492103.postman.co/workspace/Tasks~cfafac11-0028-4d75-bfd8-96da8b6fe325/collection/30449018-f45d1640-ed4a-4ea7-b9f9-c476e1a76b2d?action=share&creator=30449018&active-environment=30449018-d7dac20a-fcdc-4dd0-8c83-fe2aff5621ed
https://blogapp-im1g.onrender.com
# Blog App Backend

This is the backend of a Blog Application built using Node.js and Express. It includes features for user authentication, file uploads, and interaction with a MongoDB database.

## Features

- User authentication with JSON Web Tokens (JWT).
- Secure password hashing with bcryptjs.
- Cloudinary integration for image storage.
- File upload handling using Multer and Multer Cloudinary Storage.
- RESTful API structure.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [MongoDB](https://www.mongodb.com/) database
- Cloudinary account for image hosting

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd blogapp
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
   CLOUDINARY_API_KEY=<your_cloudinary_api_key>
   CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
   ```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

   Nodemon will automatically restart the server on file changes.

2. The API will run at `http://localhost:5000` by default.

## Scripts

- `npm start`: Start the server with Nodemon.
- `npm test`: Run tests (if implemented).

## Dependencies

- **bcryptjs**: For password hashing.
- **cloudinary**: For storing images in the cloud.
- **cors**: To handle Cross-Origin Resource Sharing.
- **dotenv**: For managing environment variables.
- **express**: For creating the server and routing.
- **jsonwebtoken**: For user authentication.
- **mongoose**: For interacting with MongoDB.
- **multer**: For file uploads.
- **multer-storage-cloudinary**: For integrating Multer with Cloudinary.
- **nodemon**: For automatic server restarts during development.

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in a user.

### Blog Posts

- `GET /api/posts`: Get all blog posts.
- `POST /api/posts`: Create a new blog post (authenticated).
- `GET /api/posts/:id`: Get a specific blog post by ID.
- `PUT /api/posts/:id`: Update a blog post (authenticated).
- `DELETE /api/posts/:id`: Delete a blog post (authenticated).

### File Uploads

- `POST /api/uploads`: Upload an image file.

## Routes Configuration

```javascript
router.use("/user", UserRoutes);
router.use("/posts", PostsRoutes);
router.use("/likes", likeRoutes);
router.use("/comment", commentRoutes);
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Author

Your Name
##DeepaShriSG

Happy coding!

