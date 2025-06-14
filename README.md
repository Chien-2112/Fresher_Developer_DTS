# PROJECT DOCUMENTATION

Developed the backend RESTful API, handling user management, authentication, authorization. Used Postman for API testing to ensure accuracy and security.

## Key Features
- registerUser: Allows a new user to register.
- loginUser: Allows a user to login and receive an access token.
- getAllUsers: Allows only admins to retrieve the list of all - users.
- getUser: Allows a user or admin ti retrieve details of a single user.
- updateUser: Allows a user to update their own profile information.
- deleteUser: Allows a user or admin to soft-delete a user account.
- validateToken: Middleware to verify JWT token and authorize request(user/admin).

## Running the Application
Supply the following keys in your .env variable:
	PORT=5000
	URL_MONGODB=mongodb://localhost:27017/DB_name

Follow these steps to run the application:
	1. Install the package modules by running the command: npm install
	2. Run the server: npm run start:dev

## 📚 Key Technologies
- ⚙️ NodeJS: JavaScript runtime environment for building fast and scalable server-side applications.
- 🚀 Express.js: A minimal and flexible Node.js web application framework used to create robust APIs easily.
- 🍃 MongoDB & Mongoose: MongoDB as a NoSQL database for storing user data, with Mongoose as an elegant ODM for schema-based modeling.
- 🔐 JWT (JSON Web Tokens): Used for securely transmitting user authentication data between client and server.

NodeJS: v10.8.2,  NPM: 10.8.2