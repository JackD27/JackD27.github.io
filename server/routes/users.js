const express = require("express");
const userRoutes = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateAccessToken} = require("../utilities/generateToken");

// Retrieves a list of all users and their followers.
userRoutes.get("/users", async (req, res) => {
  await userModel.findAll().then((users) => {
      return res.status(200).send(users);
    }).catch((err) => res.status(409).send(err));
});

userRoutes.get("/user/:userId", async (req, res) => {
  await userModel.findOne({ where: { user_id: req.params.userId } }).then((user) => {
      if (user == null) {
        return res.status(409).send({ message: "User doesn't exist." });
      } else {
        return res.status(200).send(user);
      }
    }).catch((err) => res.status(400).send({ message: "Error Occurred." }));
});

userRoutes.delete("/deleteUser", async (req, res) => {
  const { userId } = req.body;

  await userModel.destroy({ where: { user_id: userId } }).then((user) => {
      if (!user) {
        return res.status(404).send({ error: "User doesn't exist" });
      } else {
        return res.status(200).send({ message: `User ID ${userId} was deleted.` });
      }
    }).catch((err) => console.log(err));
});

userRoutes.delete("/deleteAll", async (req, res) => {
  userModel.destroy({ where: {} }).then(function () {});
  return res.status(200).send({ message: "All Users have been deleted." });
});

userRoutes.post("/signup", async (req, res) => {
  const { username, email, password, income } = req.body;

  //check if username already exists
  const user = await userModel.findOne({ where: { username: username } });
  if (user)
    return res.status(409).send({ message: "Username is taken, pick another" });

  //check if email already exists
  const emailTaken = await userModel.findOne({ where: { email: email } });

  if (emailTaken)
    return res.status(409).send({ message: "Email is already used." });

  //generates the hash
  const generateHash = await bcrypt.genSalt(Number(10));

  //parse the generated hash into the password
  const hashPassword = await bcrypt.hash(password, generateHash);

  //creates a new user
  const createUser = new userModel({
    username: username,
    email: email,
    password: hashPassword,
    income: income,
  });

  try {
    const saveNewUser = await createUser.save();
    return res.status(200).send(saveNewUser);
  } catch (err) {
    return res.status(400).send({ message: err.errors[0].message });
  }
});

userRoutes.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ where: { username: username } });

  //checks if the user exists
  if (!user){
    return res.status(401).send({ message: "Username or Password does not exist, try again." });
  }

  //check if the password is correct or not
  const checkPasswordValidity = await bcrypt.compare(password, user.password);

  if (!checkPasswordValidity)
    return res.status(401).send({ message: "Username or Password does not exist, try again." });

  //create json web token if authenticated and send it back to client in header where it is stored in localStorage ( might not be best practice )
  const accessToken = generateAccessToken(user)

  res.header('Authorization', accessToken).send({ accessToken: accessToken })
});

userRoutes.put("/editUser", async (req, res) => {
  // store new user information
  const { userId, username, email, password, tradingType, income } = req.body;

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
});

module.exports = userRoutes;
