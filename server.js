const express = require("express");
const cors = require("cors");
const ngrok = require("@ngrok/ngrok");

require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const orderRoutes = require("./routes/orderRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || process.env.API_PORT;
const NGROK_AUTHTOKEN = process.env.NGROK_AUTHTOKEN;

app.use("/api/auth", authRoutes);

app.use("/api/books", bookRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.use("/api/orders", orderRoutes);

// database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
      // const listener = await ngrok.connect({
      //   addr: PORT,
      //   authtoken: NGROK_AUTHTOKEN,
      // });
      // console.log(`Ngrok tunnel established at: ${listener.url()}`);
    });
  })
  .catch((err) => {
    console.log("database connectoin failed");
    console.log(err);
  });

// app.use("/", (req, res) => {
//   res.status(200).json({ message: "API is running" });
// });

app.use(errorHandler);
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
