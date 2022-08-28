const knex = require('../connection')
const jwt = require('jsonwebtoken')
const hashPass = require('../hashPass')

const loginVerification = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) return res.status(401).json({ message: 'Não autorizado' })

  try {
    const token = authorization.replace('Bearer ', '').trim()

    const { id } = jwt.verify(token, hashPass)

    const verifyUser = await knex('users').where({ id })

    const userProfile = verifyUser[0]

    if (!verifyUser.length)
      return res.status(404).json({ message: 'Usuário não encontrado' })

    const { user_password, ...user } = userProfile

    req.user = user

    next()
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

module.exports = { loginVerification }
