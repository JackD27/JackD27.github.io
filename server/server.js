const express = require("express");
const app = express();
const cors = require('cors');


// Routes
const users = require('./routes/users');

// Database
const db = require("./db/conn");

const SERVER_PORT = 8085


app.use(cors());
app.use(express.json())

app.use('/', users)

db.sync()
  .then((result) => {
    app.listen(SERVER_PORT, (req, res) => {
      console.log(`The following server is running on port ${SERVER_PORT}`);
    });
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });





