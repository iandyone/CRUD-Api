
# CRUD API Documentation

[Assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md) | [Score List](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/score.md)

## Getting Started

### Step 1: Clone the repository and install dependencies

Clone the repository and install the necessary dependencies:

```bash
npm i
```

or with Yarn:

```bash
yarn
```

### Step 2: Create a `.env` file

Create a `.env` file in the root directory and initialize the `PORT` and `HOST` environment variables:

```bash
# .env file
PORT=8080
HOST=localhost
```

### Step 3: Run the tests

To run the tests, use the following command:

```bash
npm run test
```

### Step 4: Start the application

You can start the application in development or production mode:

```bash
npm run start:dev
npm run start:prod
```

or with Yarn:

```bash
yarn start:dev
yarn start:prod
```

---

## API Overview

The application provides a CRUD API to manage users stored in a local database. The users follow the below interface:

```typescript
interface User {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}
```

### Base URL

```
http://localhost:8080/api/users
```

---

## Endpoints

### 1. **GET** `/api/users` – Get all users

Returns an array of all users. By default, returns an empty array if there are no users.

#### Request:

```bash
GET http://localhost:8080/api/users
```

#### Response:

- **Status**: `200 OK`
- **Body**:

```json
[
  {
    "id": "8ff2bde6-8937-4521-9257-5ecc55bd5c44",
    "username": "Mike",
    "age": 10,
    "hobbies": ["soccer", "chess"]
  },
  {
    "id": "97222bcf-d42d-4f42-8903-f72fe91f25f6",
    "username": "Ray",
    "age": 13,
    "hobbies": ["programming", "swimming"]
  }
]
```

---

### 2. **GET** `/api/users/{userId}` – Get user by ID

Returns information about a specific user by their ID.

#### Request:

```bash
GET http://localhost:8080/api/users/8ff2bde6-8937-4521-9257-5ecc55bd5c44
```

#### Response:

- **Status**: `200 OK`
- **Body**:

```json
{
  "id": "8ff2bde6-8937-4521-9257-5ecc55bd5c44",
  "username": "Mike",
  "age": 10,
  "hobbies": ["soccer", "chess"]
}
```

---

### 3. **POST** `/api/users` – Create a new user

Creates a new user. The `username`, `age`, and `hobbies` fields are required in the request body.

#### Request:

```bash
POST http://localhost:8080/api/users
```

**Body**:

```json
{
  "age": 10,
  "username": "Mike",
  "hobbies": ["soccer", "chess"]
}
```

#### Response:

- **Status**: `201 Created`
- **Body**:

```json
{
  "id": "8ff2bde6-8937-4521-9257-5ecc55bd5c44",
  "username": "Mike",
  "age": 10,
  "hobbies": ["soccer", "chess"]
}
```

---

### 4. **PUT** `/api/users/{userId}` – Update an existing user

Updates an existing user's data.

#### Request:

```bash
PUT http://localhost:8080/api/users/8ff2bde6-8937-4521-9257-5ecc55bd5c44
```

**Body**:

```json
{
  "age": 25,
  "username": "John"
}
```

#### Response:

- **Status**: `200 OK`
- **Body**:

```json
{
  "id": "8ff2bde6-8937-4521-9257-5ecc55bd5c44",
  "username": "John",
  "age": 25,
  "hobbies": ["soccer", "chess"]
}
```

---

### 5. **DELETE** `/api/users/{userId}` – Delete user by ID

Deletes a user by their ID.

#### Request:

```bash
DELETE http://localhost:8080/api/users/8ff2bde6-8937-4521-9257-5ecc55bd5c44
```

#### Response:

- **Status**: `204 OK`
