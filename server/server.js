const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');

// Model
const portfolioModel = require("./models/portfolioModel");
const userModel = require("./models/userModel");
const transactionModel = require("./models/transactionModel");
const watchlistModel = require("./models/watchlistModel");

// Database
const db = require("./db/conn");

const port = process.env.PORT;

console.log(path.join(__dirname, '..','client','build'));

app.use(express.static(path.join(__dirname, '..','client','build')));


app.use(cors());
app.use(express.json());

app.use("/", require("./routes/usersRoutes"));
app.use("/", require("./routes/portfolioRoutes"));
app.use("/", require("./routes/transactionRoutes"));
app.use("/", require("./routes/watchlistRoutes"));

// Associations
userModel.hasMany(portfolioModel, {foreignKey: 'userId'});
userModel.hasMany(transactionModel, {foreignKey: 'userId'});
userModel.hasMany(watchlistModel, {foreignKey: 'userId'});

db.sync()
  .then((result) => {
    app.listen(port, (req, res) => {
      console.log(`The Moneypad Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
