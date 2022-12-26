const Sequelize = require("sequelize");
const db = require("../db/conn");

const User = db.define("User", {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: {
        args: [5, 15],
        msg: 'Username is too short or either too long.'
      }
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        args: true,
        msg: 'Please use a correct email.'
      },
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  tradingType: {
    type: Sequelize.TINYINT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true,
      isTrader(value){
        if(value > 2 || value < 0){
          throw new Error("Error picking type of trading.")
        }
      }
    },
  },
  income: {
    type: Sequelize.FLOAT,
    allowNull: false,
    isFloat: true,
    validate: {
      notEmpty: true,
      isNegative(value){
        if(value < 0){
          throw new Error("Hopefully you don't have a negative income.")
        }
      }
    },
  },
});

module.exports = User;
