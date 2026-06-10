# PetFinder API Documentation

## Overview

PetFinder is a REST API that allows users to:

* Register and authenticate accounts
* Create and manage lost/found pet reports
* Search reports near a location
* Report pet sightings
* Manage user profiles

Authentication is performed using JWT Bearer tokens.

---

# Base URL

```txt
http://localhost:3000/api
```

Production:

```txt
https://pf-endpoints.vercel.app/api
```

---

# Authentication

Protected endpoints require a JWT token.

Example:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# Auth Endpoints

## Register User

Creates a new user account.

### Endpoint

```http
POST /auth
```

### Request Body

```json
{
  "email": "adrian@example.com",
  "password": "123456",
  "fullName": "Adrian Leiva",
  "location": {
    "latitude": -27.367,
    "longitude": -55.896,
    "address": "Puerto Rico, Misiones"
  }
}
```

### Response

```json
{
  "user": {},
  "auth": {}
}
```

---

## Change Password

Updates the user's password.

### Endpoint

```http
PATCH /auth
```

### Request Body

```json
{
  "email": "adrian@example.com",
  "newPassword": "newPassword123"
}
```

### Response

```json
{
  "id": 1,
  "email": "adrian@example.com"
}
```

---

## Login

Generates a JWT token.

### Endpoint

```http
POST /auth/token
```

### Request Body

```json
{
  "email": "adrian@example.com",
  "password": "123456"
}
```

### Response

```json
{
  "token": "JWT_TOKEN"
}
```

---

# User Endpoints

## Get Current User

Returns the authenticated user's profile.

### Endpoint

```http
GET /me
```

### Headers

```http
Authorization: Bearer JWT_TOKEN
```

### Response

```json
{
  "id": 1,
  "fullName": "Adrian Leiva",
  "email": "adrian@example.com",
  "location": {
    "latitude": -27.367,
    "longitude": -55.896,
    "address": "Puerto Rico, Misiones"
  }
}
```

---

## Update Current User

Updates user information.

### Endpoint

```http
PATCH /me
```

### Headers

```http
Authorization: Bearer JWT_TOKEN
```

### Request Body

```json
{
  "fullName": "Adrian Leiva",
  "location": {
    "latitude": -27.367,
    "longitude": -55.896,
    "address": "Puerto Rico, Misiones"
  }
}
```

---

# Report Endpoints

## Create Report

Creates a lost or found pet report.

### Endpoint

```http
POST /reports
```

### Headers

```http
Authorization: Bearer JWT_TOKEN
```

### Request Body

```json
{
  "name": "Luna",
  "species": "Dog",
  "breed": "Golden Retriever",
  "status": "lost",
  "imageUrl": "https://image-url.com/luna.jpg",
  "location": {
    "latitude": -27.367,
    "longitude": -55.896,
    "address": "Puerto Rico, Misiones"
  }
}
```

### Response

```json
{
  "id": 1,
  "ownerId": 1,
  "name": "Luna",
  "species": "Dog",
  "breed": "Golden Retriever",
  "status": "lost"
}
```

---

## Get Nearby Reports

Returns reports within a configurable radius.

### Endpoint

```http
GET /reports?latitude=-27.367&longitude=-55.896&radius=10
```

### Query Parameters

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| latitude  | number | Latitude                    |
| longitude | number | Longitude                   |
| radius    | number | Search radius in kilometers |

### Example

```http
GET /reports?lat=-27.367&longitude=-55.896&radius=20
```

---

## Get My Reports

Returns reports created by the authenticated user.

### Endpoint

```http
GET /me/reports
```

### Headers

```http
Authorization: Bearer JWT_TOKEN
```

---

## Get Report By ID

Returns a single report.

### Endpoint

```http
GET /me/reports/:repId
```

### Example

```http
GET /me/reports/15
```

---

## Update Report

Updates a report.

### Endpoint

```http
PATCH /me/reports/:repId
```

### Headers

```http
Authorization: Bearer JWT_TOKEN
```

### Request Body

```json
{
  "name": "Luna",
  "species": "Dog",
  "breed": "Golden Retriever",
  "color":"Yellow",
  "status": "found",
  "imageUrl": "https://image-url.com/luna.jpg",
  "location": {
    "lat": -27.367,
    "longitude": -55.896,
    "address": "Puerto Rico, Misiones"
  }
}
```

---

## Delete Report

Deletes a report.

### Endpoint

```http
DELETE /me/reports/:repId
```

### Example

```http
DELETE /me/reports/15
```

### Response

```json
{
  "success": true
}
```

---

# Sighting Endpoints

A sighting represents a report from someone who saw a lost pet.

---

## Create Sighting

### Endpoint

```http
POST /sightings
```

### Request Body

```json
{
  "reportId": 1,
  "description": "I saw the dog near the park entrance.",
  "location": {
    "lat": -27.365,
    "longitude": -55.892,
    "address": "Main Park"
  }
}
```

### Response

```json
{
  "id": 1,
  "reportId": 1
}
```

---

## Get Sightings For Report

### Endpoint

```http
GET /sightings?reportId=1
```

### Response

```json
[
  {
    "id": 1,
    "description": "I saw the dog near the park entrance."
  }
]
```

---

## Get Sighting By ID

### Endpoint

```http
GET /sightings/:id
```

### Example

```http
GET /sightings/5
```

---

## Delete Sighting

### Endpoint

```http
DELETE /sightings/:id
```

### Example

```http
DELETE /sightings/5
```

### Response

```json
{
  "success": true
}
```

---

# Data Models

## User

```ts
{
  id: number;
  fullName: string;
  email: string;

  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
}
```

---

## Report

```ts
{
  id: number;
  ownerId: number;

  name: string;
  species: string;
  breed: string;

  status: "lost" | "found";

  imageUrl: string;

  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
}
```

---

## Sighting

```ts
{
  id: number;

  reportId: number;

  description: string;

  location: {
    latitude: number;
    longitude: number;
    address: string;
  };

  createdAt: Date;
}
```

---

# Relationships

```txt
User
 └── Reports

Report
 └── Sightings
```

```txt
Users.id
  └── Reports.ownerId

Reports.id
  └── Sightings.reportId
```
