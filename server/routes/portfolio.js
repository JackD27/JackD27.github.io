const express = require('express');
const portfolioRoutes = express.Router();
const portfolioModel = require('../models/portfolioModel');
const userModel = require("../models/userModel");

// Retrieves a list of all users and their followers.
portfolioRoutes.get("/portfolio", async (req, res) => {
    await portfolioModel.findAll().then((portfolio) => {
        return res.status(200).send(portfolio);
      }).catch((err) => res.status(409).send(err));
  });

portfolioRoutes.post("/addPortfolioItem", async (req, res) => {
    const { ticker, price, dateBought, shares, userId } = req.body;

    const user = await userModel.findOne({ where: { user_id: userId } });

    if(!user){
      return res.status(400).send({ message: "User doesn't exist" });
    }

    //creates a new user
    const createPortfolioItem = new portfolioModel({
      stockTicker: ticker,
      dateBoughtAt: dateBought,
      priceWhenBought: price,
      shares: shares,
      userId: userId
    });

    try {
      const saveNewPortfolioItem = await createPortfolioItem.save();
      return res.status(200).send(saveNewPortfolioItem);
    } catch (err) {
      return res.status(400).send({ message: err.errors[0].message });
    }
});

module.exports = portfolioRoutes;