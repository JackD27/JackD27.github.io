const userRoutes = require("express").Router();
const userAuthController = require('../controllers/userAuthController')
const userController = require('../controllers/userController')

userRoutes.route('/signup').post(userAuthController.userSignup)
userRoutes.route('/login').post(userAuthController.userLogin)
userRoutes.route('/editUser').post(userController.editUser)
userRoutes.route('/updateUserTradingInfo').post(userController.updateUserTradingInfo)

userRoutes.route('/deleteAll').delete(userController.deleteAllUsers)
userRoutes.route('/deleteUser').delete(userController.deleteUserById)

userRoutes.route('/user/:userId').get(userController.getUserById)
userRoutes.route('/users').get(userController.getAllUsers)

module.exports = userRoutes;
