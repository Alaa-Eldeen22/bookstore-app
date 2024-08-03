const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || process.env.API_PORT;

// app.use("/", (req, res) => {
//   console.log("request came");
//   res.send("I got a big heart");
// });
app.use("/api/auth", authRoutes);
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
