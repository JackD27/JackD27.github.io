const express = require('express');
const portfolioRoutes = express.Router();
const portfolioModel = require('../models/portfolioModel');

// Retrieves a list of all users and their followers.
portfolioRoutes.get("/portfolio", async (req, res) => {
    portfolioModel.findAll().then(portfolio =>{
        console.log(portfolio)
        res.sendStatus(200)
    })
    .catch(err => console.log(err));
});

module.exports = portfolioRoutes;