const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../utilities/generateToken");
const { newUserValidation, userLoginValidation } = require('../validations/validators')


const userSignup = async (req, res) => {

    const { error } = newUserValidation(req.body)
    if (error) return res.status(400).send({ message: error.errors[0].message })

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
    return res.status(400).send({ message: "Error trying to create new user." });
}}

const userLogin = async (req, res) => {

    const { error } = userLoginValidation(req.body)
    if (error) return res.status(400).send({ message: error.errors[0].message })

    const { username, password } = req.body;


  const user = await userModel.findOne({ where: { username: username } });

  //checks if the user exists
  if (!user){
    return res.status(401).send({ message: "Username or Password does not exist, try again."});
  }

  //check if the password is correct or not
  const checkPasswordValidity = await bcrypt.compare(password, user.password);

  if (!checkPasswordValidity)
    return res.status(401).send({ message: "Username or Password does not exist, try again."});

  //create json web token if authenticated and send it back to client in header where it is stored in localStorage ( might not be best practice )
  const accessToken = generateAccessToken(user)

  res.header('Authorization', accessToken).send({ accessToken: accessToken })
}

module.exports = {
    userSignup,
    userLogin,
}
