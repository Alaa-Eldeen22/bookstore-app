const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const authUser = require("./middleware/authUser");
const authRole = require("./middleware/authRole");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || process.env.API_PORT;

app.use("/api/auth", authRoutes);

app.use("/api/books", bookRoutes);
app.use("/api/protect", authUser, authRole("admin"), (req, res) => {
  console.log(req.user);
  res.status(201).json({ message: "accessed allowed" });
});
// app.use("/api/book");
// app.use
// database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("database connectoin failed");
    console.log(err);
  });

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

// app.use((err, req, res, next) => {
//   if (!err) {
//     return next();
//   }

//   res.status(500);
//   res.send("500: Internal server error");
// });

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Welcome to the Bookstore API",
//     version: "1.0.0",
//     documentation: "http://your-api-docs-url.com",
//   });
// });
