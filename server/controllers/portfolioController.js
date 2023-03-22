const portfolioModel = require('../models/portfolioModel');
const userModel = require("../models/userModel");
const { portfolioValidation } = require('../validations/validators')

const portfolio = async (req, res) => {
    try {
      const portfolio = await portfolioModel.findAll();
      return res.status(200).send(portfolio);
    } catch (err) {
      return res.status(409).send(err);
    }
}

const getPortfolioByUserId = async (req, res) => {
  const user = await userModel.findOne({where: { user_id: req.params.userId }});

  if (!user) {
    return res.status(400).send({ message: "User doesn't exist" });
  }

  try {
    const portfolioItems = await portfolioModel.findAll({where: { userId: req.params.userId }});
    return res.status(200).send(portfolioItems);
  } catch (err) {
    return res.status(409).send(err);
  }}


const addPortfolioItem = async (req, res) => {

    const { error } = portfolioValidation(req.body)
    if (error) return res.status(400).send({ message: error.errors[0].message })

    const { stockTicker, price, dateBoughtAt, shares, userId } = req.body;

    const user = await userModel.findOne({ where: { user_id: userId } });

    if(!user){
      return res.status(400).send({ message: "User doesn't exist" });
    }

    //creates a new user
    const createPortfolioItem = new portfolioModel({
      stockTicker: stockTicker.toUpperCase(),
      dateBoughtAt: dateBoughtAt,
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
}

const deletePortfolioItem = async (req, res) => {
    const { portfolioitem_id } = req.body;

    try {
      const portfolioItem = await portfolioModel.destroy({where: { portfolioitem_id: portfolioitem_id }});
      if (!portfolioItem) {
        return res.status(404).send({ message: "Stock ticker doesn't exist in user's Portfolio" });
      } else {
        return res.status(200).send({message: `Portfolio item ID ${portfolioitem_id} was deleted.`});
      }
    } catch (err) {
      return res.status(400).send({ message: "Error occured getting deleting portfolio item." });
    }
}

const deletePortfolioUser = async (req, res) => {
    const { userId } = req.body;

  const user = await userModel.findOne({ where: { user_id: userId } });

  if(!user){
    return res.status(400).send({ message: "User doesn't exist" });
  }

  try{
    const portfolio = await portfolioModel.destroy({ where: { userId: userId } })
      if (!portfolio) {
        return res.status(404).send({ message: "Portfolio don't exist" });
      } else {
        return res.status(200).send({ message: `All Portfolio Items related to the User were deleted.` });
      }
    }catch(err){
        return res.status(404).send({ message: "Error occurred deleting the portfolio of the user." });
    }
}

module.exports = {
    portfolio,
    getPortfolioByUserId,
    addPortfolioItem, 
    deletePortfolioItem, 
    deletePortfolioUser,
}

