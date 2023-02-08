const express = require('express');
const transactionRoutes = express.Router();
const transactionModel = require('../models/transactionModel');

// Retrieves a list of all users and their followers.
transactionRoutes.get("/allTransactions", async (req, res) => {
    transactionModel.findAll().then(transaction =>{
        console.log(transaction)
        res.sendStatus(200)
    })
    .catch(err => console.log(err));
});

transactionRoutes.post("/createTransaction", async (req, res) => {
    const { name, description, date, price, category, category2, recurring } = req.body;

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

    try {
        const saveNewTransaction = await createTransaction.save();
        return res.status(200).send(saveNewTransaction);
      } catch (err) {
        return res.status(400).send({ message: err.errors[0].message });
      }


});

module.exports = transactionRoutes;