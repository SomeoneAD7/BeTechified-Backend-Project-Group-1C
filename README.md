# Task Manager API - Group 1C

A RESTful Task Manager API built with Node.js and express.js for creating,retrieving updating, and deleting task.

## Features

- create a new task
- retrieve a single task by ID
- retrieve all tasks
- update an existing task
- partially update an existing task
- delete task

## technologies used

- node.js
- express.js
- javascript
- dotenv
- nodemon
- postman
- git and github

## task structure

each task contains th following
- `id`
- `title`
- `description`
- `status`

git clone https://github.com/SomeoneAD7/BeTechified-Backend-Project-Group-1C.git  
  
## API Endpoints  
  
| Method | Endpoint | Description |  
|---|---|---|  
| GET | `/api/tasks` | Retrieve all tasks |  
| GET | `/api/tasks/:id` | Retrieve a single task by ID |  
| POST | `/api/tasks` | Create a new task |  
| PUT | `/api/tasks/:id` | Update an existing task |  
| PATCH | `/api/tasks/:id` | Partially update an existing task |  
| DELETE | `/api/tasks/:id` | Delete a task |  
  
## API Usage  
  
### 1. Get All Tasks  
  
```http  
GET /api/tasks  
  
## Error Handling  
  
The API returns appropriate HTTP status codes and error messages when a request cannot be completed.  
  
Common responses include:  
  
- `400 Bad Request` — The request contains invalid or missing information.  
- `404 Not Found` — The requested task does not exist.  
- `500 Internal Server Error` — An unexpected server error occurred.  
  
Example error response:  
  
```json  
{  
  "error": "Task not found"  
}  
  
## Testing  
  
The API can be tested using Postman.  
  
A Postman collection is included in this repository and contains requests for the main CRUD operations:  
  
- Create a task  
- Get all tasks  
- Get a single task  
- Update a task  
- Delete a task  
  
### Testing Steps  
  
1. Start the API:  
  
```bash  
npm start  
  
## Project Structure  
  
```text  
BeTechified-Backend-Project-Group-1C/  
│  
├── test/  
├── .gitignore  
├── package.json  
├── package-lock.json  
├── taskManagerAPI.js  
├── BD Project Group 1C.postman_collection.json  
├── Group 1C Task Manager API Detailed Overview.pptx  
└── Task Manager API -Group 1C.pptx  
  
## Available NPM Commands  
  
### Start the API  
  
```bash  
npm start  
  
## Repository  
  
GitHub Repository:  
  
https://github.com/SomeoneAD7/BeTechified-Backend-Project-Group-1C  
  
## Project Information  
  
This project was developed as part of the BeTechified Backend Project.