const Sequelize = require("sequelize");
const db = require("../db/conn");

const User = db.define("User", {
  uid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    len: [5,15],
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
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
