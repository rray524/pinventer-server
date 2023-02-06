const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { db_CONNECT } = require("./db/connect");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://pinventer.xyz"],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes middleware
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/contact", contactRoute);

// Routes
app.get("/", (req, res) => {
  res.send("home page");
});

// error middleware
app.use(errorHandler);

// CONNECT MONGODB
db_CONNECT();

// server connection
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
