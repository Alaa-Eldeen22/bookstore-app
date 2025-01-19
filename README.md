# Bookstore API

The **Bookstore API** is a robust backend system for managing an online bookstore. It provides features like user authentication, book and review management, cart and wishlist operations, order processing (credit card and cash-on-delivery), and a powerful search functionality.

---

## Table of Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [Usage](#usage)
6. [API Documentation](#api-documentation)
   
---

## Features

### User Management
- **Authentication:** Supports secure user registration and login via token-based authentication (JWT).
- **Password Encryption:** Passwords are hashed securely using `bcrypt`.

### Book Management
- **CRUD Operations:** Add, update, retrieve, and delete books.
- **Search:** Case-insensitive and partial matching of book titles.

### Review Management
- **CRUD Operations:** Users can add, retrieve, update, and delete reviews for books.
- **User Association:** Reviews are linked to authenticated users.

### Cart and Wishlist Management
- **Cart Operations:** Add, update, retrieve, and delete items in a user-specific cart.
- **Wishlist Operations:** Add and remove items in a user-specific wishlist.

### Order Management
- **Place Orders:** Supports two modes of order placement - Credit Card (via Stripe) and Cash on Delivery.
- **Order Confirmation:** Handles payment status updates and order confirmation (Stripe webhook support).

### Security and Performance
- **Rate Limiting:** Limits API requests to prevent DDoS attacks.
- **IP Blocking:** Blocks abusive IPs for enhanced security.

### Additional Features
- Modular and scalable architecture.
- Built-in logging and error handling.
- MongoDB Atlas for database operations.

---

## Requirements

Before running the project, ensure you have the following installed:
- **Node.js** (v16.x or later)
- **npm** (v8.x or later)
- **MongoDB Atlas** (or a local MongoDB server)
- **Stripe Account** (for payment processing)

---

## Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/Alaa-Eldeen22/bookstore-app.git
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment Variables
Create a `.env` file in the project root and add the following keys:

```plaintext
PORT=5000
MONGO_URI=<Your MongoDB connection string>
TOKEN_KEY=<JWT secret key>
STRIPE_SECRET_KEY=<Your Stripe secret key>
```

### Step 4: Start the Server


```bash
npm start
```

---

## Usage

### Access the API
Use any API client (e.g., Postman, Thunder Client) to interact with the endpoints. Refer to the API Documentation section for details.

---

## API Documentation

### Authentication
| Method | Endpoint           | Description             |
|--------|--------------------|-------------------------|
| POST   | /auth/register     | Register a new user     |
| POST   | /auth/login        | Log in an existing user |

### Books
| Method | Endpoint           | Description                   |
|--------|--------------------|-------------------------------|
| POST   | /books             | Add a new book               |
| GET    | /books             | Retrieve all books           |
| GET    | /books/search      | Search books by title        |
| PATCH  | /books/:id         | Update book details          |
| DELETE | /books/:id         | Delete a book                |

### Reviews
| Method | Endpoint                   | Description         |
|--------|----------------------------|---------------------|
| POST   | /books/:bookId/reviews     | Add a review        |
| GET    | /books/:bookId/reviews     | Retrieve book reviews |
| PATCH  | /reviews/:reviewId         | Update a review     |
| DELETE | /reviews/:reviewId         | Delete a review     |

### Cart
| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| POST   | /cart            | Add items to the cart      |
| GET    | /cart            | Retrieve cart items        |
| PATCH  | /cart/:itemId    | Update cart item quantity  |
| DELETE | /cart/:itemId    | Remove an item from the cart |

### Wishlist
| Method | Endpoint            | Description             |
|--------|---------------------|-------------------------|
| POST   | /wishlist           | Add items to the wishlist |
| GET    | /wishlist           | Retrieve wishlist items |
| DELETE | /wishlist/:itemId   | Remove an item from wishlist |

### Orders
| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| POST   | /orders          | Place an order        |
| GET    | /orders          | Retrieve user orders  |
| PATCH  | /orders/:orderId | Update order status   |
