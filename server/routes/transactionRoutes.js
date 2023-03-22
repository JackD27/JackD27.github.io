const transactionRoutes = require('express').Router();
const transactionController = require('../controllers/transactionController')

transactionRoutes.route('/allTransactions').get(transactionController.allTransactions)
transactionRoutes.route('/transaction/:transactionId').get(transactionController.transactionById)
transactionRoutes.route('/transactionUser/:userId').get(transactionController.transactionByUserId)
transactionRoutes.route('/recurringExpenses/:userId').get(transactionController.recurringExpensesByUserId)

transactionRoutes.route('/createTransaction').post(transactionController.createTransaction)
transactionRoutes.route('/editTransaction').put(transactionController.editTransaction)

transactionRoutes.route('/deleteAllTransactions').delete(transactionController.deleteAllTransactions)
transactionRoutes.route('/deleteTransaction').delete(transactionController.deleteTransactionById)
transactionRoutes.route('/deleteTransactionUser').delete(transactionController.deleteTransactionsByUserId)


module.exports = transactionRoutes;