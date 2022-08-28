const knex = require('../connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const hashPass = require('../hashPass')

const login = async (req, res) => {
  const { user_email, user_password } = req.body

  if ((!user_email, !user_password))
    return res.status(400).json({ message: 'Ambos os campos são obrigatórios' })

  try {
    const user = await knex('users').where({ user_email }).first()

    if (!user)
      return res
        .status(400)
        .json({ message: 'Combinação de email e senha incorreta' })

    const validPassword = await bcrypt.compare(
      user_password,
      user.user_password,
    )

    if (!validPassword)
      return res
        .status(400)
        .json({ message: 'Combinação de email e senha incorreta' })

    const token = jwt.sign({ id: user.id }, hashPass, { expiresIn: '4h' })

    const { user_password: _, ...userData } = user

    return res.status(200).json({
      userData,
      token,
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

module.exports = { login }
