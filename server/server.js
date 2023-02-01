const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Routes
const userRoutes = require("./routes/users");
const portfolioRoutes = require("./routes/portfolio");
const transactionRoutes = require("./routes/transaction");
const watchlistRoutes = require("./routes/watchlist");

// Model
const portfolioModel = require("./models/portfolioModel");
const userModel = require("./models/userModel");
const transactionModel = require("./models/transactionModel");
const watchlistModel = require("./models/watchlistModel");

// Database
const db = require("./db/conn");

const SERVER_PORT = 8085;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/", userRoutes);
app.use("/", portfolioRoutes);
app.use("/", transactionRoutes);
app.use("/", watchlistRoutes);

// Associations
userModel.hasMany(portfolioModel);
userModel.hasMany(transactionModel);
userModel.hasMany(watchlistModel);

portfolioModel.belongsTo(userModel);
transactionModel.belongsTo(userModel);
watchlistModel.belongsTo(userModel);

db.sync()
  .then((result) => {
    app.listen(SERVER_PORT, (req, res) => {
      console.log(`The Moneypad Server is running on port ${SERVER_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
