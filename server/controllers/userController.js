const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateAccessToken} = require("../utilities/generateToken");
const { userLoginValidation } = require('../validations/validators')

const getAllUsers = async (req, res) => {
    try {
      const users = await userModel.findAll();
      return res.status(200).send(users);
    } catch (err) {
      return res.status(400).send({ message: "Error getting users." });
    }
}

const getUserById = async (req, res) => {
    try {
      const user = await userModel.findOne({where: { user_id: req.params.userId }});
      if (!user) {
        return res.status(409).send({ message: "User doesn't exist." });
      } else {
        return res.status(200).send(user);
      }
    } catch (err) {
      return res.status(400).send({ message: "Error Occurred." });
    }
}



const deleteUserById = async (req, res) => {

    const { userId } = req.body;

    try {
      const user = await userModel.destroy({ where: { user_id: userId } });
      if (!user) {
        return res.status(404).send({ message: "User doesn't exist" });
      } else {
        return res.status(200).send({ message: `User ID ${userId} was deleted.` });
      }
    } catch (err) {
      return res.status(400).send({ message: "Error Occurred." });
    }
}

const deleteAllUsers = async (req, res) => {
    userModel.destroy({ where: {} }).then(function () {});
    return res.status(200).send({ message: "All Users have been deleted." });
}


const editUser = async (req, res) => {
    // store new user information
  const { userId, username, email, password, tradingType, income } = req.body;

  const user = await userModel.findOne({where: { username: username, user_id: {$not: userId} }});
  if(user) return res.status(409).send({ message: "Username already exists." });
  
  const { error } = userLoginValidation(req.body)
  if (error) return res.status(400).send({ message: error.errors[0].message })

  // check if username is available

  // generates the hash
  const generateHash = await bcrypt.genSalt(Number(10));

  // parse the generated hash into the password
  const hashPassword = await bcrypt.hash(password, generateHash);

  // find and update user using stored information
  const newUser = userModel.update({
        user_id: userId,
        username: username,
        email: email,
        password: hashPassword,
        tradingType: tradingType,
        income: income,
      },
      { where: { user_id: userId } }
    ).then((result) => {
      const accessToken = generateAccessToken(newUser)

      res.header('Authorization', accessToken).send({ accessToken: accessToken })
    }).catch((err) => res.status(409).send(err));
}

const updateUserTradingInfo = async (req, res) => {
  // store new user information
const { userId, tradingType } = req.body;

const user = await userModel.findOne({where: { user_id: userId}});
if(!user) return res.status(409).send({ message: "User doesn't exist." });


// find and update user using stored information
const newUser = userModel.update({
      tradingType: tradingType,
    },
    { where: { user_id: userId } }
  ).then((result) => {
    res.status(200).send(result)
  }).catch((err) => res.status(409).send(err));
}

module.exports = {
    getAllUsers,
    getUserById,
    deleteUserById,
    deleteAllUsers,
    editUser,
    updateUserTradingInfo,
}



