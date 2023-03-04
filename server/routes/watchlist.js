const express = require('express');
const watchlistRoutes = express.Router();
const watchlistModel = require('../models/watchlistModel');
const userModel = require("../models/userModel");

// Retrieves a list of all users and their followers.
watchlistRoutes.get("/watchlist", async (req, res) => {
    await watchlistModel.findAll().then((watchlist) => {
        return res.status(200).send(watchlist);
      }).catch((err) => res.status(409).send(err));
  });

watchlistRoutes.get("/watchlistUser/:userId", async (req, res) => {

    const user = await userModel.findOne({ where: { user_id: req.params.userId }});
  
    if(!user){
      return res.status(400).send({ message: "User doesn't exist" });
    }
  
    await watchlistModel.findAll({ where: { userId: req.params.userId }}).then((watchlistItems) => {
        return res.status(200).send(watchlistItems);
      }).catch((err) => res.status(409).send(err));
  });

watchlistRoutes.post("/addWatchlistItem", async (req, res) => {
    const { ticker, userId } = req.body;

    const user = await userModel.findOne({ where: { user_id: userId } });

    if(!user){
      return res.status(400).send({ message: "User doesn't exist" });
    }

    //creates a new user
    const createWatchlistItem = new watchlistModel({
      stockTicker: ticker,
      userId: userId
    });

    try {
      const saveNewWatchlistItem = await createWatchlistItem.save();
      return res.status(200).send(saveNewWatchlistItem);
    } catch (err) {
      return res.status(400).send({ message: err.errors[0].message });
    }
});

watchlistRoutes.delete("/deleteWatchlistItem", async (req, res) => {
    const { watchlistitem_id } = req.body;
  
    await watchlistModel.destroy({ where: { watchlistitem_id: watchlistitem_id } }).then((watchlistItem) => {
        if (!watchlistItem) {
          return res.status(404).send({ error: "Stock ticker doesn't exist in user's watchlist" });
        } else {
          return res.status(200).send({ message: `Watchlist ID ${watchlistitem_id} was deleted.` });
        }
      }).catch((err) => console.log(err));
  });
  
  watchlistRoutes.delete("/deleteWatchlistUser", async (req, res) => {
    const { userId } = req.body;
  
    const user = await userModel.findOne({ where: { user_id: userId } });
  
    if(!user){
      return res.status(400).send({ message: "User doesn't exist" });
    }
  
    await watchlistModel.destroy({ where: { userId: userId } }).then((watchlist) => {
        if (!watchlist) {
          return res.status(404).send({ error: "Watchlist don't exist" });
        } else {
          return res.status(200).send({ message: `All Watchlist Items related to the User were deleted.` });
        }
      }).catch((err) => console.log(err));
  });

module.exports = watchlistRoutes;