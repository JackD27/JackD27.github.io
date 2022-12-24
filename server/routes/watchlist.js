const express = require('express');
const watchlistRoutes = express.Router();
const watchlistModel = require('../models/watchlistModel');

// Retrieves a list of all users and their followers.
watchlistRoutes.get("/watchlist", async (req, res) => {
    watchlistModel.findAll().then(watchlist =>{
        console.log(watchlist)
        res.sendStatus(200)
    })
    .catch(err => console.log(err));
});

module.exports = watchlistRoutes;