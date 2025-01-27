# Bookstore API

Welcome to the **Bookstore API**, a powerful backend service that powers a seamless e-commerce platform for books. This API supports a wide range of features, including user authentication, book management, reviews, cart operations, wishlist functionality, and a secure checkout process with Stripe integration.

---

## Table of Contents

1. [Purpose](#purpose)
2. [Live Demo](#-live-demo)
3. [Features](#-features)
4. [Documentation](#-documentation)
5. [Technologies Used](#%EF%B8%8F-technologies-used)
6. [Project Structure](#-project-structure)
7. [Environment Variables](#%EF%B8%8F-environment-variables)
8. [Getting Started](#-getting-started)
9. [Endpoints](#-endpoints)
10. [Contributing](#-contributing)
11. [License](#%EF%B8%8F-license)
12. [Support](#-support)

---

## Purpose

The main objective of this project was to improve my backend development abilities, with a focus on JavaScript and adopting best practices for API design. Through this hands-on training, I aimed to achieve the following:



- Designing a well-structured, modular architecture that adheres to the principles of layered design, ensuring a clear separation of concerns and enhancing code reusability and maintainability.
- Mastering key principles of RESTful API design.
- Incorporating robust security features, such as authentication, authorization, and encrypting sensitive data.
- Creating and practicing global error handling mechanism.
- Experimenting with dependency injection techniques in a framework like Express, which doesn’t provide native support for it.
- Validating user input thoroughly to maintain data integrity.

---

## 🚀 Live Demo

This API is consumed by a React application developed by an innovative and creative front-end developer.

- **Frontend Developer**: [GitHub Profile](https://github.com/AbdelrahmanNasser00)
- **Frontend Repository**: [Frontend GitHub Repo](https://github.com/AbdelrahmanNasser00/Book-Store)
- **Frontend Live Demo**: [GitbookEG React App](https://gitbookeg.netlify.app/)

---

## 📋 Features

1. **Authentication**

   - Secure JWT-based user authentication.
   - Role-based access control for Admins and Users.

2. **Book Management**

   - Add, update, delete, and retrieve books.
   - Search for books by title.

3. **Reviews**

   - Add, update, retrieve, and delete reviews for books.

4. **Cart Operations**

   - Add, update, and delete items in the cart.
   - Retrieve the user’s cart.

5. **Wishlist Functionality**

   - Add, remove, and view wishlist items.

6. **Order Management**

   - Place orders via cash-on-delivery or Stripe integration for credit card payments.
   - Admin access for managing and updating orders.

---

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: JWT
- **Payment**: Stripe
- **Validation**: Joi

---

## 📂 Project Structure

```
├── config          # Configuration files (e.g., dependency injection, environment variables)
├── controllers     # API controllers handling request logic
├── middlewares     # Middleware for authentication, validation, and more
├── models          # Mongoose schemas and models
├── routes          # API route definitions
├── server.js       # Application entry point
├── services        # Business logic services
├── utils           # Helper utilities (e.g., JWT, encryption)
└── validation      # Joi validation schemas
```

---

## 🖥️ Environment Variables

To run the project, create a `.env` file in the root directory and include the following variables:

```
API_PORT=           # The port number on which the API server will run
TOKEN_KEY=          # Secret key for signing JWT tokens
MONGO_URI=          # MongoDB connection string
STRIPE_KEY=         # Secret key for Stripe payment integration
DOMAIN=             # Domain of your application (e.g., http://localhost:3000)
STRIPE_WEBHOOK_SECRET= # Stripe webhook secret for verifying webhook events
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v14 or higher
- **MongoDB**: A running instance of MongoDB or a cloud MongoDB database.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/bookstore-api.git
   cd bookstore-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file as described above.

4. Start the MongoDB server.

5. Start the API:

   ```bash
   npm start
   ```

6. The server will be running on:

   ```
   http://localhost:<API_PORT>
   ```

---

## 🌟 Documentation

Explore the full API documentation here:
[API Documentation](https://bookstore-api-documentation.readthedocs.io/en/latest/)

The documentation provides a detailed explanation of all API endpoints, including their request and response formats, as well as common error responses.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

1. Fork the project
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request

---

## 🛡️ License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.

---

Happy coding!
