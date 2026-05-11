# School Management API

A simple Node.js + Express.js + MySQL API for managing schools.

This project allows users to:

- Add new schools
- Fetch schools sorted by proximity to a user location

---

# Tech Stack

- Node.js
- Express.js
- MySQL
- Aiven MySQL
- Render Deployment

---

# Features

- Add School API
- List Schools API
- MySQL Database Integration
- Distance-based Sorting
- Input Validation
- RESTful APIs

---

# Project Structure

```bash
.
├── controllers
│   └── schoolController.js
│
├── db
│   └── db.js
│
├── routes
│   └── schoolRoutes.js
│
├── app.js
├── index.js
├── .env
├── package.json
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/SyedJunaidAli1/assignment-for-educase
cd assignment-for-educase
```

---

# Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

DB_HOST=your-host
DB_PORT=your-port
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=defaultdb
```

---

# Run Project

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```


---

# API Endpoints

---

# 1. Add School

## Endpoint

```http
POST /addSchool
```

## Request Body

```json
{
  "name": "ABC School",
  "address": "Delhi",
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

## Success Response

```json
{
  "success": true,
  "message": "School added successfully",
  "schoolId": 1
}
```

---

# 2. List Schools

## Endpoint

```http
GET /listSchools
```

## Query Parameters

| Parameter | Type | Required |
|---|---|---|
| latitude | number | Yes |
| longitude | number | Yes |

## Example

```http
GET /listSchools?latitude=28.6139&longitude=77.2090
```

## Success Response

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "ABC School",
      "address": "Delhi",
      "latitude": 28.6139,
      "longitude": 77.209,
      "distance": 0
    }
  ]
}
```

---

# Distance Calculation

The API uses the Haversine Formula to calculate geographical distance between user coordinates and school locations.

```text
d = 2r * asin(
  sqrt(
    sin²((φ2 - φ1)/2) +
    cos(φ1) * cos(φ2) *
    sin²((λ2 - λ1)/2)
  )
)
```

---

# Testing

Use Postman to test the APIs.

- Add School API
- List Schools API

---

# Deployment

The API can be deployed on:

- Render
- https://assignment-for-educase.onrender.com

---

# Author

Junaid