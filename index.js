const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const users = require("./routes/users");
const posts = require("./routes/posts");

// Initializing the App
const app = express();

// Setting production middlewares
app.use(compression());
app.use(helmet());
app.use(cors());

// Setting Express Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

// Route Middleware
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/posts", posts);

// Mongo URI
const mongoURI = "mongodb://localhost/blog";

// Connecting to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection successful to MongoDB...");
  })
  .catch((err) => {
    console.log("Connection failed to MongoDB", err);
  });

// Creating a port
const port = process.env.PORT || 4000;

// Starting a server with the port
app.listen(port, () => {
  console.log(`Server started at port ${port}...`);
});
