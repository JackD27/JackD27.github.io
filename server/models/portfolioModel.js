const Sequelize = require("sequelize");
const db = require("../db/conn");

const PortfolioItem = db.define("PortfolioItem", {
  portfolioitem_id: {
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
  dateBoughtAt: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  priceWhenBought: {
    type: Sequelize.FLOAT,
    allowNull: false,
    isFloat: true,
    validate: {
      notEmpty: true,
      isNegative(value){
        if(value <= 0){
          throw new Error("Can't buy a stock at negative price or stocks at 0")
        }
      }
    },
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isLow(value){
        if(value <= 0){
          throw new Error("Please enter a reasonable number of shares you purchased.")
        }
      }
    },
  },
});

module.exports = PortfolioItem;
