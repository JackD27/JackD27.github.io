const zod = require('zod')

// validates when new user creates an account
const newUserValidation = (data) => {
    const registerValidationSchema = zod.object({
        username: zod.string().min(5, 'Username is too short.').max(15, "Username is too long."),
        email: zod.string().email('Please Input a valid email'),
        password: zod.string().min(5, 'Password must be 5 or more characters').trim(),
        //tradingType: zod.number().int().gte(0).lte(1).optional(),
        //income: zod.number("Enter a valid income.").int("Must be a whole number.").nonnegative("Hopefully you don't have a negative income.")
    })

    return registerValidationSchema.safeParse(data)
}

// validate user request when logging in
const userLoginValidation = (data) => {
    const loginValidationSchema = zod.object({
        username: zod.string().min(5, 'Username is too short.').max(15, "Username is too long."),
        password: zod.string().min(5, 'Password must be 5 or more characters').trim(),
    })
    return loginValidationSchema.safeParse(data)
}

const watchlistValidation = (data) => {
    const watchlistValidationSchema = zod.object({
        stockTicker: zod.string({ required_error: "Stock ticker is required."}).trim(),
    })
    return watchlistValidationSchema.safeParse(data)
}

const portfolioValidation = (data) => {
    const portfolioValidationSchema = zod.object({
        stockTicker: zod.string({ required_error: "Stock ticker is required."}).trim(),
        dateBoughtAt: zod.string().optional(),
    })
    return portfolioValidationSchema.safeParse(data)
}

const transactionValidation = (data) => {
    const transactionValidationSchema = zod.object({
        name: zod.string().min(1, "Enter a name for the transaction."),
        description: zod.string(),
        date: zod.string(),
        price: zod.string(1, "Enter a valid number."),
        category: zod.string().min(1, "Pick a something for main category."),
        category2: zod.string().min(1, "Pick something for second category."),
    })
    return transactionValidationSchema.safeParse(data)
}

module.exports = {
    newUserValidation,
    userLoginValidation,
    watchlistValidation,
    portfolioValidation,
    transactionValidation,
}
