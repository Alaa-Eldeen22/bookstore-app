const express = require("express");
const session = require("express-session");

const app = express();
console.log("Running...");

// Middleware to parse JSON body from requests
app.use(express.json());

// Initialize session middleware
app.use(
  session({
    secret: "your-secret-key", // Replace with a secure value
    resave: false,
    saveUninitialized: false, // Don't create sessions for every request
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// // Middleware to check if the user is authenticated or not
// const isAuthenticated = (req) => {
//   // Mock authentication check (adjust based on your app)
//   return req.user !== undefined;
// };

// // Route to add item to cart (only for guest users)
// app.post("/cart", (req, res) => {
//   const { itemId, quantity } = req.body;

//   console.log("session:  ", req.session);
//   // If the user is authenticated, do not use sessions for cart
//   if (isAuthenticated(req)) {
//     return res
//       .status(403)
//       .json({ message: "Authenticated users do not use session-based carts" });
//   }

//   // If there's no session.cart, this is the first time the guest is adding to the cart
//   if (!req.session.cart) {
//     console.log("Creating a cart for the guest...");
//     req.session.cart = [];
//   } else {
//     console.log("Guest cart found...");
//   }

//   // Add item to the cart stored in session
//   req.session.cart.push({ itemId, quantity });

//   res.json({
//     message: "Item added to guest cart",
//     cart: req.session.cart,
//   });
// });

// // Route to view the guest's cart
// app.get("/cart", (req, res) => {
//   if (!req.session.cart) {
//     return res.status(404).json({ message: "Cart is empty or no session" });
//   }

//   res.json({
//     message: "Guest cart",
//     cart: req.session.cart,
//   });
// });

app.post("/cart", (req, res) => {
  console.log(req.session);
  res.send("I got a dig bick");
});
// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
