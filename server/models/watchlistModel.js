const Sequelize = require("sequelize");
const db = require("../db/conn");

const WatchlistItem = db.define("WatchlistItem", {
  watchlistitem_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  stockTicker: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = WatchlistItem;
