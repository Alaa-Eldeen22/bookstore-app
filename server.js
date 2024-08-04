const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || process.env.API_PORT;

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Welcome to the Bookstore API",
//     version: "1.0.0",
//     documentation: "http://your-api-docs-url.com",
//   });
// });

app.use("/api/auth", authRoutes);
app.use((err, req, res, next) => {
  if (!err) {
    return next();
  }

  res.status(500);
  res.send("500: Internal server error");
});

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
