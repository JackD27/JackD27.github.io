const jwt = require('jsonwebtoken')
require("dotenv").config();


const generateAccessToken = (user) => {
  return jwt.sign(
    {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      password: user.password,
      tradingType: user.tradingType,
      income: user.income,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1m",
    }
  );
};

module.exports.generateAccessToken = generateAccessToken


