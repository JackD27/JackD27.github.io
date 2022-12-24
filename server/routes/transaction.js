const express = require('express');
const transactionRoutes = express.Router();
const transactionModel = require('../models/transactionModel');

// Retrieves a list of all users and their followers.
transactionRoutes.get("/transaction", async (req, res) => {
    transactionModel.findAll().then(transaction =>{
        console.log(transaction)
        res.sendStatus(200)
    })
    .catch(err => console.log(err));
});

module.exports = transactionRoutes;