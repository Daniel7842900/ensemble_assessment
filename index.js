// Import Express
const express = require("express");
// Instantiate an Express app
const app = express();
// Set the port to use
const port = 3000;

// Middlewares
let cors = require("cors");

// Cors
app.use(cors());
app.options("*", cors());

// Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a database connection
const db = require("./models/db.js");

// Import routers
const movieRouter = require("./routes/movie.js");

// Load routers
movieRouter.loadRouter(app);

app.get("/", (req, res) => {
  res.send("Hello Ensemble");
});

app.listen(port, () => {
  console.log(`Server is successfully running on port ${port}`);
});
