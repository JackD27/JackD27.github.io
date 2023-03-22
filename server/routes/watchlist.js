const watchlistRoutes = require('express').Router();
const watchlistController = require('../controllers/watchlistController')

watchlistRoutes.route('/watchlistUser/:userId').get(watchlistController.getWatchlistByUserId)
watchlistRoutes.route('/watchlist').get(watchlistController.watchlist)

watchlistRoutes.route('/addWatchlistItem').post(watchlistController.addWatchlistItem)

watchlistRoutes.route('/deleteWatchlistItem').delete(watchlistController.deleteWatchlistItem)
watchlistRoutes.route('/deleteWatchlistUser').delete(watchlistController.deleteWatchlistUser)

module.exports = watchlistRoutes;