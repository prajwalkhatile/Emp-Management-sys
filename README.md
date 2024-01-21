**Step-by-step instructions for setting up and running the Employee Management System application:**

1.	**Clone the Repository:**
git clone https://github.com/prajwalkhatile/Emp-Management-sys.git

2.	**Navigate to the Project Directory:**
cd Employee Management System

3.	**Install Dependencies:**
npm install

4.	**Create a .env File:**
Create a new file named .env in the project root and define your environment variables or you can use these variables also:
MONGO = "mongodb+srv://prajwal:prajwal@mernestate.quxofnm.mongodb.net/mernestate?retryWrites=true&w=majority"
JWT_SECRET= 'prajwalkhatile12345678isthebestcoderintheworld'

5. **Start the Application:******
If nodemon is globally installed on your system, you can conveniently start your Node.js application by running the command:   npm start
Alternatively, you can use the direct node app.js command to start the application.


**Explanation of code structure and any design decisions made**
Code structure

1.	**Models (models/employeeModel.js):**
•	Defines the Mongoose schema for the Employee model.
•	Specifies the attributes of an employee such as firstName, lastName, email, dob, department, and position.

2.	**Routes (routes/employeeRoutes.js)**:
•	Handles the API routes for employee-related operations.
•	Utilizes the employeeController to process requests.

3.	**Controllers (controllers/employeeController.js)**:
•	Implements CRUD operations for employee records.
•	Utilizes Mongoose models for interacting with the MongoDB database.
•	Catches and handles errors gracefully, providing appropriate HTTP status codes and error messages.

4.	**Environment Variables (.env)**:
•	Contains sensitive configuration information like the MongoDB connection string and JWT secret.

5.	**Main Application (app.js):**
•	Entry point for the application.
•	Configures Express, sets up middleware, connects to MongoDB, loads environment variables from the .env file, defines routes, and starts the server.

Design Decisions
Several design decisions were made to ensure the application's functionality, maintainability, and security for the Employee Management System task. Here are the key design decisions:

1.	MVC Architecture:
•	Adopted the Model-View-Controller (MVC) architecture to separate concerns and improve code organization.
•	Models represent the data structure (employee schema), Controllers handle business logic (CRUD operations), and Routes manage API endpoints.

2.	Express.js for API Development:
•	Choose Express.js as the web application framework for building the RESTful API.
•	Express.js simplifies the creation of APIs and provides middleware for handling requests, parsing JSON, etc.

3.	MongoDB and Mongoose:
•	Utilized MongoDB as the database to store employee records.
•	Employed Mongoose, an ODM (Object Data Modeling) library for MongoDB and Node.js, to interact with the database and define the schema.

4.	Error Handling:
•	Incorporated error-handling mechanisms in controllers to catch and handle potential errors gracefully.
•	Respond with appropriate HTTP status codes and informative error messages to enhance the API's reliability.

5.	Environment Variables (.env):
•	Stored sensitive information, such as the MongoDB connection string and JWT secret, in an environment variable file (.env).
•	Improved security by avoiding the exposure of sensitive information in the codebase.

6.	JWT Authentication:
•  Implement JWT authentication to enhance the security of the API.
•   Issued tokens upon authentication help identify and authorize users for subsequent requests.

7.	Pagination, Sorting, Filtering:
•	Implement pagination, sorting, and filtering for a more efficient and user-friendly experience.
•	Allows users to navigate and retrieve specific data subsets based on their needs.
•	Implement pagination using skip and limit in MongoDB queries.
•	Sorting is achieved through the sort option in MongoDB queries, and filtering involves constructing queries based on user-provided criteria.


**Testing the APIs in Postman**

1.	**Obtain JWT Token:**
•	To test the protected API, we generate the JWT token during the employee creation. This token is generated as part of the authentication and can authenticate and authorize subsequent requests to protected endpoints.
•	Extract the token from the response, typically in the form:
{ "token": " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjVhY2M2Mjc0Nzc3NjgxZWZhYWRiY2MwIiwiaWF0IjoxNzA1ODIxNzM1LCJleHAiOjE3MDg0MTM3MzV9.nv1qtWWhzuXDIKKF-R_gZD0CfdWaGld9d3zUOfEY9Jg" }
 
2.	**Include Token in Header for Protected API Requests:**
•	For authorized API requests, include the JWT token in the Authorization header.
•	Header:
•	Key: Authorization
•	Value: <your_token>

3.	**Send Requests to Protected Endpoints:**
•	Use the obtained token in the Authorization header for testing protected API endpoints.
Example Request in Postman:
•	Endpoint: http://localhost:3000/employees/65abe166607fdb50586ac556
•	Headers:
•	Key: Authorization
•	Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjVhY2M2Mjc0Nzc3NjgxZWZhYWRiY2MwIiwiaWF0IjoxNzA1ODIxNzM1LCJleHAiOjE3MDg0MTM3MzV9.nv1qtWWhzuXDIKKF-R_gZD0CfdWaGld9d3zUOfEY9Jg

This method allows you to effectively test protected API endpoints by incorporating the JWT token into the Authorization header.

