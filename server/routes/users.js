const express = require('express');
const userRoutes = express.Router();
const userModel = require('../models/userModel');

// Retrieves a list of all users and their followers.
userRoutes.get("/users", async (req, res) => {
    userModel.findAll().then(users =>{
        console.log(users)
        res.sendStatus(200)
    })
    .catch(err => console.log(err));
});

module.exports = userRoutes;