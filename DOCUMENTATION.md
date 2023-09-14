# Simple Person API Documentation

This document provides information about the Simple Person API.

## API Endpoints

### Create a new person

**Endpoint:** `/api/persons`
**Method:** `POST`
**Request Format:**
```json
{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com"
}
{
  "id": 1
}
{
  "error": "Error message here"
}
i###  Retrieve a person by ID
Endpoint: /api/persons/:id
Method: GET
Response Format (Success):

{
  "id": 1,
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com"
}
{
  "error": "Person not found"
}
Update a person by ID
Endpoint: /api/persons/:id
Method: PUT
Request Format:

json

{
  "name": "Updated Name",
  "age": 40,
  "email": "updated@example.com"
}
Response Format (Success):

{
  "message": "Person updated successfully"
}
{
  "message": "Person updated successfully"
}

***Deleting a Person by ID

curl -X DELETE http://localhost:3000/api/persons/1
{
  "message": "Person deleted successfully"
}
Known Limitations and Assumptions
Validation for input data is not implemented in this version.
This API is using SQLite as the database.
Setup and Deployment
Clone this repository.
Install Node.js and npm if not already installed.
Run npm install to install dependencies.
Start the server using npm start.
The API will be accessible at http://localhost:3000.
