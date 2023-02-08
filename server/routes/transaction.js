const express = require('express');
const transactionRoutes = express.Router();
const transactionModel = require('../models/transactionModel');
const userModel = require("../models/userModel");

// Retrieves a list of all users and their followers.
transactionRoutes.get("/allTransactions", async (req, res) => {
  await transactionModel
    .findAll()
    .then((transactions) => {
      return res.status(200).send(transactions);
    })
    .catch((err) => res.status(409).send(err));
});

transactionRoutes.get("/transaction/:transactionId", async (req, res) => {
  await transactionModel
    .findOne({ where: { transaction_id: req.params.transactionId } })
    .then((transaction) => {
      if (transaction == null) {
        return res.status(409).send({ message: "Transaction doesn't exist." });
      } else {
        return res.status(200).send(transaction);
      }
    })
    .catch((err) => res.status(400).send({ message: "Error Occurred." }));
});


// Finish this
transactionRoutes.post("/createTransaction", async (req, res) => {
    const { name, description, date, price, category, category2, recurring, id } = req.body;

    //creates a new user
    const createTransaction = new transactionModel({
      name: name,
      description: description,
      date: date,
      price: price,
      category: category,
      category2: category2,
      recurring: recurring,
    });

  //   const user = await userModel.findOne({ where: { user_id: id } });
  // // add project and user to the join table with the custom method:
  // createTransaction.addUser(user);

    try {
        const saveNewTransaction = await createTransaction.save();
        return res.status(200).send(saveNewTransaction);
      } catch (err) {
        return res.status(400).send({ message: err.errors[0].message });
      }

});

transactionRoutes.delete("/deleteAllTransactions", async (req, res) => {
  transactionModel.destroy({ where: {} }).then(function () {});
  return res.status(200).send({ message: "All Transactions have been deleted." });
});

transactionRoutes.delete("/deleteTransaction", async (req, res) => {
  const { transactionId } = req.body;

  await transactionModel
    .destroy({ where: { transaction_id: transactionId } })
    .then((transaction) => {
      if (!transaction) {
        return res.status(404).send({ error: "Transaction doesn't exist" });
      } else {
        return res
          .status(200)
          .send({ message: `Transaction ID ${transactionId} was deleted.` });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = transactionRoutes;