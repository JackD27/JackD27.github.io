const Sequelize = require("sequelize");
const db = require("../db/conn");

const PortfolioItem = db.define("PortfolioItem", {
  pitemid: {
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
    type: Sequelize.DATE,
    allowNull: false,
  },
  priceWhenBought: {
    type: Sequelize.FLOAT,
    allowNull: false,
    isFloat: true,
    validate: {
      notEmpty: true,
      isNegative(value){
        if(value < 0){
          throw new Error("Can't buy a stock at negative price.")
        }
      }
    },
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = PortfolioItem;
