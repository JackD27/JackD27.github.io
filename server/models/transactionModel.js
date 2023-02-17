const Sequelize = require("sequelize");
const db = require("../db/conn");

const Transaction = db.define("Transaction", {
  transaction_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    isFloat: true,
    validate: {
      notEmpty: true,
      isNegative(value){
        if(value < 0){
          throw new Error("Can't enter a negative number.")
        }
      }
    },
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  category2: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  recurring: {
    type: Sequelize.TINYINT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Transaction;
