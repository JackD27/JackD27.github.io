# Moneypad by Jackson Davis - Capstone Project

### Problem Specification

This project will try to help people with their personal finance issues, help 
with receiving recommendations of ways they should invest into stocks based on 
their own style of investing. You can see recent transactions and upcoming bills to 
keep you up to date on any payments you need to do. The user or investor will be 
able to access this app from a website. They will have to create an account and use 
it to log in, to see their dashboard of investments, spending, transactions, 
budgeting, and recommendations from the developer.

When registering an account, the user will be asked their monthly 
income/yearly income. The user will be able to set and see recent transactions to 
keep everything up to date. They can set budgets for the month and see 
recommendations of budgeting from the developer. They can set bills that are to be 
paid every two weeks, monthly, yearly etc. So they can keep up to track on that 
and receive notifications when the date is near of the bill being due. You can also 
see what you’re spending your money on, which is similar to recent transactions. 

The user will be able to see all the stuff to do with investing. The user can 
see the prices of certain stocks that they input. They can set their stock portfolio, so 
they can keep track of it and see how much it has grown since they bought a 
certain stock from awhile ago. They will get recommendations from the developer 
based on their type of stock trading. If they’re conservative, they will get safe 
stocks to invest in. If they’re risk-takers, they will get risky stocks to invest in, but 
can provide a big return. It can also provide a huge loss as well. 

This app is good for anyone to keep track of their finances, to receive 
notifications for upcoming bills and get an insight of what to spend based on your 
income so you don’t have to go into debt. While investors can also get notifications 
from changes in their stock portfolio and keep up to date on changes in the stock 
market. Investors will also get a nice insight from the developer on what to spend 
on stocks and put them into based on the investor’s strategy.

### Running this project

```sh
    git clone https://github.com/JackD27/CapstoneProject.git
```

* Server
    - `cd server` To access Server folder
    - `npm i` install all server dependencies
    - `npm start` Start the server


* Client
    - `cd client` To access Client folder  
    - `npm i` install all client dependencies
    - `npm start` Start the front-end
    
**Disclaimer:** I didn't push the .env file into the server folder. You will have to make your own database. I used PostgreSQL from Heroku.
You will also need a Secret Access Token in the .env as well for JWT.

### Example Pictures
#### Dashboard Page
![DashboardPageCapstone](https://user-images.githubusercontent.com/103354115/235334003-81909ba2-e0b4-46f5-adc2-2ee84c5bd8be.png)

#### Stock Pag
![StockPageCapstone](https://user-images.githubusercontent.com/103354115/235334009-c4b67c9b-6d29-4e63-9912-6a548f5254db.png)
