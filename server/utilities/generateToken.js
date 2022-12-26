const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

const createTokens = (user) => {
  const accessToken = sign({
    user_id: user.user_id,
    username: user.username,
    email: user.email,
    password: user.password,
    tradingType: user.tradingType,
    income: user.income,
  }, process.env.ACCESS_TOKEN_SECRET);

  return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.status(400).json({error: "User not Authenticated."});
    }

    try{
        const validToken = verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        if (validToken) {
            req.authenticated = true
            return next();
        }
    }
    catch(err){
        return res.status(400).json({error: err});
    }
  };

module.exports = { createTokens, validateToken }
