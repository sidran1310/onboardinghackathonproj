# API Documentation for Frontend Developers

## Authentication APIs

### Register User
- **Endpoint**: `/api/auth/register`
- **Method**: POST
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "role": "developer",
    "department": "engineering",
    "level": "entry"
  }
  ```
- **Response**:
  ```json
  {
    "success": true
  }
  ```
  or
  ```json
  {
    "error": "Error message"
  }
  ```

### Login User
- **Endpoint**: `/api/auth/login`
- **Method**: POST
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true
  }
  ```
  or
  ```json
  {
    "error": "Error message"
  }
  ```

## Task APIs

### Get Tasks for Current User
- **Endpoint**: `/api/tasks`
- **Method**: GET
- **Authentication**: Required
- **Response**:
  ```json
  {
    "tasks": [
      {
        "id": "task1",
        "title": "Complete HR paperwork",
        "description": "Fill out all required HR forms including tax documents and benefits enrollment.",
        "estimatedTime": "1 hour",
        "category": "administrative"
      },
      ...
    ]
  }
  ```

### Mark Task as Completed
- **Endpoint**: `/api/tasks/complete`
- **Method**: POST
- **Authentication**: Required
- **Body**:
  ```json
  {
    "taskId": "task1"
  }
  ```
- **Response**:
  ```json
  {
    "success": true
  }
  ```
  or
  ```json
  {
    "error": "Error message"
  }
  ```

## Authentication Context

The application provides an AuthContext that can be used in frontend components:

```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { currentUser, userData, login, signup, logout, loading } = useAuth();
  
  // Use these values and functions in your component
}
```

Available properties and methods:
- `currentUser`: The currently logged-in Firebase user object
- `userData`: Additional user data from Firestore (role, department, level)
- `login(email, password)`: Function to log in a user
- `signup(email, password, userDetails)`: Function to register a new user
- `logout()`: Function to log out the current user
- `loading`: Boolean indicating if auth state is being loaded