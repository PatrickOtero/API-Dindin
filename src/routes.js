const { Router } = require('express')
const {
  createTransaction,
  editTransaction,
  listTransactions,
  detailTransaction,
  deleteTransaction,
} = require('./controllers/transactions')
const { login } = require('./controllers/userLogin')
const { userCreation, userEdit, userDeletion } = require('./controllers/users')
const { loginVerification } = require('./middlewares/userValidation')

const routes = Router()

// // Users
routes.get('/user/login', login)
routes.post('/users', userCreation)

// routes that needs authentication
routes.use(loginVerification)
// users
routes.put('/users', userEdit)
routes.delete('/users', userDeletion)

// transactions
routes.get('/transactions', listTransactions)
routes.get('/transactions/:registryId', detailTransaction)
routes.post('/transactions', createTransaction)
routes.put('/transactions/:registryId', editTransaction)
routes.delete('/transactions/:registryId', deleteTransaction)

module.exports = routes
