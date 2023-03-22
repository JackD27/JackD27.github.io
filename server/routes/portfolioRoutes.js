const portfolioRoutes = require('express').Router();
const portfolioController = require('../controllers/portfolioController')

portfolioRoutes.route('/portfolio').get(portfolioController.portfolio)
portfolioRoutes.route('/portfolioUser/:userId').get(portfolioController.getPortfolioByUserId)

portfolioRoutes.route('/addPortfolioItem').post(portfolioController.addPortfolioItem)

portfolioRoutes.route('/deletePortfolioItem').delete(portfolioController.deletePortfolioItem)
portfolioRoutes.route('/deletePortfolioUser').delete(portfolioController.deletePortfolioUser)

module.exports = portfolioRoutes;