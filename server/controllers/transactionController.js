const transactionModel = require('../models/transactionModel');
const userModel = require("../models/userModel");
const Sequelize = require("sequelize");
const { transactionValidation } = require('../validations/validators')

const allTransactions = async (req, res) => {
    try{
        const transactions = await transactionModel.findAll()
        return res.status(200).send(transactions);
    }catch(err){
       return res.status(409).send({message: "Error getting all transactions."});
    }
}

const transactionById = async (req, res) => {
    try {
      const transaction = await transactionModel.findOne({ where: { transaction_id: req.params.transactionId }});
      if (!transaction) {
        return res.status(409).send({ message: "Transaction doesn't exist." });
      } else {
        return res.status(200).send(transaction);
      }
    } catch (err) {
      return res.status(400).send({ message: "Error Occurred getting transaction by Id." });
    }
}

const transactionByUserId = async (req, res) => {
    const user = await userModel.findOne({ where: { user_id: req.params.userId }});

  if(!user){
    return res.status(400).send({ message: "User doesn't exist" });
  }

  try {
    const transactions = await transactionModel.findAll({where: { userId: req.params.userId },order: [["date", "DESC"]]});
    return res.status(200).send(transactions);
  } catch (err) {
    return res.status(400).send({ message: "Error Occurred getting transaction by UserId." });s
  }
}

const recurringExpensesByUserId = async (req, res) => {
    const user = await userModel.findOne({ where: { user_id: req.params.userId } });

  if(!user){
    return res.status(400).send({ message: "User doesn't exist" });
  }

  try {
    const transactions = await transactionModel.findAll({where: { userId: req.params.userId, recurring: 1 }, order: [["date", "DESC"]]});
    return res.status(200).send(transactions);
  } catch (err) {
    return res.status(400).send({message: "Error Occurred getting reccurring experses by UserId."});
  }
}

const getCurrentYearTotals = async (req, res) => {
  const currYear = new Date().getFullYear()
  const user = await userModel.findOne({ where: { user_id: req.params.userId } });

if(!user){
  return res.status(400).send({ message: "User doesn't exist" });
}

try {
  
  // Recurring Function Querying, does not need current year, since it's a monthly subscription.
  const transactionsRecurring = await transactionModel.findAll({where: {userId: req.params.userId, recurring: 1, category: {[Sequelize.Op.not]: "Savings"}}, 
    attributes: [[Sequelize.fn('ROUND', Sequelize.fn('sum', Sequelize.col('price')),2), 'totalDebitsRecurring']]});

  const needTransactions = await transactionModel.findAll({where: { userId: req.params.userId, recurring: 1, category: "Needs" }, 
    attributes: [[Sequelize.fn('ROUND', Sequelize.fn('sum', Sequelize.col('price')),2), 'totalNeedsRecurring']]});
    
  const wantTransactions = await transactionModel.findAll({where: { userId: req.params.userId, recurring: 1, category: "Wants" }, 
    attributes: [[Sequelize.fn('ROUND', Sequelize.fn('sum', Sequelize.col('price')),2), 'totalWantsRecurring']]});


  // Non Recurring Querying from Current Year
  const transactions = await transactionModel.findAll({where: {userId: req.params.userId, recurring: 0, category: {[Sequelize.Op.not]: "Savings"},
    [Sequelize.Op.and]:Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), currYear)}, 
    attributes: [[Sequelize.fn('ROUND', Sequelize.fn('sum', Sequelize.col('price')),2), 'totalDebits']]});

  const needTransactionsNonRecurring = await transactionModel.findAll({where: { userId: req.params.userId, recurring: 0, category: "Needs", 
    [Sequelize.Op.and]:Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), currYear)}, 
    attributes: [[Sequelize.fn('ROUND', Sequelize.fn('sum', Sequelize.col('price')),2), 'totalNonRecurringNeeds']]});
    
  const wantTransactionsNonRecurring = await transactionModel.findAll({where: { userId: req.params.userId, recurring: 0, category: "Wants",
    [Sequelize.Op.and]:Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), currYear) }, 
    attributes: [[Sequelize.fn('ROUND', Sequelize.fn('sum', Sequelize.col('price')),2), 'totalNonRecurringWants']]});

    
  const total = {
    debitRecurring: transactionsRecurring[0],
    needRecurring: needTransactions[0],
    wantRecurring: wantTransactions[0],
    debitNonRecurring: transactions[0],
    needNonRecurring: needTransactionsNonRecurring[0],
    wantNonRecurring: wantTransactionsNonRecurring[0],
  }; 
 

  return res.status(200).send(total);
} catch (err) {
  return res.status(400).send({message: "Error Occurred getting current year totals" + err});
}
}

const createTransaction = async (req, res) => {

    const { error } = transactionValidation(req.body)
    if (error) return res.status(400).send({ message: error.errors[0].message })

    const { name, description, date, price, category, category2, recurring, userId } = req.body;

    const user = await userModel.findOne({ where: { user_id: userId } });

    if(!user){
      return res.status(400).send({ message: "User doesn't exist" });
    }

    //creates a new user
    const createTransaction = new transactionModel({
      name: name,
      description: description,
      date: date,
      price: price,
      category: category,
      category2: category2,
      recurring: recurring,
      userId: userId
    });

    try {
      const saveNewTransaction = await createTransaction.save();
      return res.status(200).send(saveNewTransaction);
    } catch (err) {
      return res.status(400).send({ message: err.errors[0].message });
    }
}

const editTransaction = async (req, res) => {
    // store new user information
  const { name, description, date, price, category, category2, recurring, userId, transactionId } = req.body;

  const user = await userModel.findOne({ where: { user_id: userId } });

  if(!user){
    return res.status(400).send({ message: "User doesn't exist" });
  }


  // find and update user using stored information
  const newTransaction = transactionModel.update({
    name: name,
    description: description,
    date: date,
    price: price,
    category: category,
    category2: category2,
    recurring: recurring,
    transactionId: transactionId
      },
      { where: { transaction_id: transactionId } }
    ).then((result) => {

      res.status(200).send({message: "Successfully Edited Transaction"});
    }).catch((err) => res.status(409).send(err));
}

const deleteAllTransactions = async (req, res) => {
    transactionModel.destroy({ where: {} }).then(function () {});
    return res.status(200).send({ message: "All Transactions have been deleted." });
}

const deleteTransactionById = async (req, res) => {
    const { transactionId } = req.body;

    try {
      const transaction = await transactionModel.destroy({where: { transaction_id: transactionId }});
      if (!transaction) {
        return res.status(404).send({ message: "Transaction doesn't exist" });
      } else {
        return res.status(200).send({ message: `Transaction ID ${transactionId} was deleted.` });
      }
    } catch (err) {
      return res.status(404).send({ message: "Error Occurred deleting transaction by Id." });
    }
}

const deleteTransactionsByUserId = async (req, res) => {
    const { userId } = req.body;

  const user = await userModel.findOne({ where: { user_id: userId } });

  if(!user){
    return res.status(400).send({ message: "User doesn't exist" });
  }

  try{
  const transactions = await transactionModel.destroy({ where: { userId: userId } })
      if (!transactions) {
        return res.status(404).send({ message: "Transactions don't exist" });
      } else {
        return res.status(200).send({ message: `All Transactions related to the User were deleted.` });
      }}catch(err){
        return res.status(404).send({ message: "Error Occurred deleting transactions by UserId." });
    }
}

module.exports = {
    allTransactions,
    deleteAllTransactions,
    deleteTransactionById,
    deleteTransactionsByUserId,
    editTransaction,
    recurringExpensesByUserId,
    createTransaction,
    transactionById,
    transactionByUserId,
    getCurrentYearTotals,
}