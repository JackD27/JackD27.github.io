const watchlistModel = require("../models/watchlistModel");
const userModel = require("../models/userModel");
const { watchlistValidation } = require('../validations/validators')

const watchlist = async (req, res) => {
    const watchlist = await watchlistModel.findAll()
        return res.status(200).send(watchlist);
}

const getWatchlistByUserId = async (req, res) => {
    const user = await userModel.findOne({ where: { user_id: req.params.userId }});
  
    if(!user){
      return res.status(400).send({ message: "User doesn't exist" });
    }
  
    try{
        const watchlistItems = await watchlistModel.findAll({ where: { userId: req.params.userId }})
        return res.status(200).send(watchlistItems);
    }catch(err){
        return res.status(409).send(err)
    }
}

const addWatchlistItem = async (req, res) => {

    const { error } = watchlistValidation(req.body)
    if (error) return res.status(400).send({ message: error.errors[0].message })

    const { stockTicker, userId } = req.body;

    const user = await userModel.findOne({ where: { user_id: userId } });

    if(!user){
      return res.status(400).send({ message: "User doesn't exist" });
    }

    const stockTickerExists = await watchlistModel.findOne({ where: { userId: userId, stockTicker: stockTicker } });

    if(stockTickerExists){
      return res.status(400).send({ message: "Stock Ticker is already in your watchlist." });
    }

    const createWatchlistItem = new watchlistModel({
      stockTicker: stockTicker.toUpperCase(),
      userId: userId
    });

    try {
      const saveNewWatchlistItem = await createWatchlistItem.save();
      return res.status(200).send(saveNewWatchlistItem);
    } catch (err) {
      return res.status(400).send({ message: "Error creating watchlist item. Enter a valid stock ticker." });
    }
}

const deleteWatchlistItem = async (req, res) => {
    const { watchlistitem_id } = req.body;
  
    try {
      const watchlistItem = await watchlistModel.destroy({ where: { watchlistitem_id: watchlistitem_id }});
      if (!watchlistItem) {
        return res.status(404).send({ message: "Stock ticker doesn't exist in user's watchlist" });
      } else {
        return res.status(200).send({ message: `Watchlist ID ${watchlistitem_id} was deleted.` });
      }
    } catch (err) {
      return res.status(404).send({ message: "Error deleting watchlist item." });
    }
}


const deleteWatchlistUser = async (req, res) => {
    const { userId } = req.body;
  
    const user = await userModel.findOne({ where: { user_id: userId } });
  
    if(!user){
      return res.status(400).send({ message: "User doesn't exist" });
    }
  
    try{
        const watchlist = await watchlistModel.destroy({ where: { userId: userId } })
        if (!watchlist) {
          return res.status(404).send({ message: "Watchlist don't exist" });
        } else {
          return res.status(200).send({ message: `All Watchlist Items related to the User were deleted.` });
        }
    }catch(err){
        return res.status(404).send({ message: "Error occurred trying to delete whole watchlist." });
    }
      
}

module.exports = {
    watchlist,
    getWatchlistByUserId,
    addWatchlistItem,
    deleteWatchlistUser,
    deleteWatchlistItem,
}