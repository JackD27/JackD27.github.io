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

portfolioRoutes.get("/portfolioUser/:userId", async (req, res) => {

    const user = await userModel.findOne({ where: { user_id: req.params.userId }});
  
    if(!user){
      return res.status(400).send({ message: "User doesn't exist" });
    }
  
    await portfolioModel.findAll({ where: { userId: req.params.userId }}).then((portfolioItems) => {
        return res.status(200).send(portfolioItems);
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

portfolioRoutes.delete("/deletePortfolioItem", async (req, res) => {
  const { portfolioitem_id } = req.body;

  await portfolioModel.destroy({ where: { portfolioitem_id: portfolioitem_id } }).then((portfolioItem) => {
      if (!portfolioItem) {
        return res.status(404).send({ error: "Stock ticker doesn't exist in user's Portfolio" });
      } else {
        return res.status(200).send({ message: `Portfolio item ID ${portfolioitem_id} was deleted.` });
      }
    }).catch((err) => console.log(err));
});

portfolioRoutes.delete("/deletePortfolioUser", async (req, res) => {
  const { userId } = req.body;

  const user = await userModel.findOne({ where: { user_id: userId } });

  if(!user){
    return res.status(400).send({ message: "User doesn't exist" });
  }

  await portfolioModel.destroy({ where: { userId: userId } }).then((portfolio) => {
      if (!portfolio) {
        return res.status(404).send({ error: "Portfolio don't exist" });
      } else {
        return res.status(200).send({ message: `All Portfolio Items related to the User were deleted.` });
      }
    }).catch((err) => console.log(err));
});

module.exports = portfolioRoutes;