# Product API (Express + MongoDB)

A robust RESTful API built with **Node.js**, **Express**, and **Mongoose** (MongoDB). This project allows users to perform full CRUD operations on a product catalog, complete with schema validation, query filtering, sorting, and pagination.


## Features

- **Full CRUD Operations**: Create, read, update, and delete products.
- **Advanced Querying**:
  - **Filtering**: Filter products by `category`, `minPrice`, and `maxPrice`.
  - **Sorting**: Sort results by price (`price_asc`, `price_desc`) or creation date.
  - **Pagination**: Navigate through products using `page` and `limit` query parameters.
- **Data Validation**: Strict Mongoose schema validation ensuring required fields, positive price values, and default stock availability.
- **Modular Architecture**: Clean separation of routes, models, and database connection logic.


## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via MongoDB Atlas)
- **ODM**: Mongoose
- **Environment Management**: `dotenv`
- **Development Tool**: `nodemon`


## Project Structure

```text
├── config/
│   └── connection.js    # MongoDB connection setup
├── models/
│   └── Product.js       # Mongoose Schema & Model definition
├── routes/
│   └── productRoutes.js # Express routes and controller logic
├── .env                 # Environment variables (Git-ignored)
├── .gitignore           # Git ignore rules
├── package.json         # Project dependencies and scripts
├── server.js            # Main Express app entry point
└── README.md            # Project documentation
```


## Prerequisites

Before running this project locally, ensure you have:

1. **Node.js** installed.
2. A **MongoDB Atlas** account (or a running local MongoDB instance).


## Local Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/natalymelnichuk/zenith-product-api
   cd zenith-product-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```
   Add the following variables to `.env`:
   ```env
   PORT=3001
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database_name>?appName=Cluster0
   ```
   **Note**: Replace `<username>`, `<password>`, and `<database_name>` with your actual MongoDB Atlas connection details.

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The server will start running at `http://localhost:3001`.


## API Endpoints Summary

### Base URL: `/api/products`


**POST** | `/` | Create a new product 

**GET** | `/` | Get all products (supports filtering, sorting, pagination) 

**GET** | `/:id` | Get a single product by ID 

**PUT** | `/:id` | Update an existing product by ID 

**DELETE** | `/:id` | Delete a product by ID 

## Detailed API Usage & Examples

### 1. Create a Product
- **URL**: `/api/products`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body Example**:
```json
{
  "name": "Wireless Mechanical Keyboard",
  "description": "RGB backlight with tactile switches",
  "price": 89.99,
  "category": "Electronics",
  "inStock": true
}
```

### 2. Get All Products (With Query Parameters)
- **URL**: `/api/products`
- **Method**: `GET`
- **Supported Query Parameters**:
  - `category` (string): Filter by category (e.g., `Electronics`).
  - `minPrice` (number): Minimum product price.
  - `maxPrice` (number): Maximum product price.
  - `sortBy` (string): `price_asc` (low to high) or `price_desc` (high to low).
  - `page` (number): Page number for pagination (Default: `1`).
  - `limit` (number): Number of products per page (Default: `10`).

#### Example Requests:
- **Filter by category & price range**:
  `GET /api/products?category=Electronics&minPrice=50&maxPrice=150`
- **Sort by price (descending)**:
  `GET /api/products?sortBy=price_desc`
- **Pagination**:
  `GET /api/products?page=2&limit=5`


### 3. Get Single Product
- **URL**: `/api/products/:id`
- **Method**: `GET`
- **Response**: Returns the product object or `404 Not Found` if it doesn't exist.


### 4. Update Product
- **URL**: `/api/products/:id`
- **Method**: `PUT`
- **Headers**: `Content-Type: application/json`
- **Body Example**:
```json
{
  "price": 79.99,
  "inStock": false
}
```

### 5. Delete Product
- **URL**: `/api/products/:id`
- **Method**: `DELETE`
- **Response Example**:
```json
{
  "message": "Product deleted successfully!",
  "product": { ... }
}
```