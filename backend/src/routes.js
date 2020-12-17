const express = require('express')
const authMiddleware = require('./utils/auth')

const UserController = require('./controllers//UserController')
const LoginController = require('./controllers/LoginController')
const DebtController = require('./controllers/DebtController')
const HomeController = require('./controllers/HomeController')

const routes = express.Router()

routes.post('/login', LoginController.create)

routes.post('/user', UserController.create)

routes.use(authMiddleware);

routes.get('/home', HomeController.index)

routes.post('/debt', DebtController.create)
routes.delete('/debt/:id_debt', DebtController.destroy)
routes.delete('/debt/client/:id_client', DebtController.destroyAll)
routes.get('/debt/client/:id_client', DebtController.index)
routes.get('/debt/:id_debt', DebtController.read)
routes.put('/debt/:id_debt', DebtController.update)

module.exports = routes