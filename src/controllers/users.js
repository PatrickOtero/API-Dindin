const knex = require('../connection')
const bcrypt = require('bcrypt')
const { createUserSchema } = require('../validations/users/createUserSchema')
const { editUserSchema } = require('../validations/users/editUserSchema')

const userCreation = async (req, res) => {
  const { user_name, user_email, user_password } = req.body
  try {
    await createUserSchema.validate(req.body)

    const isRepeatedEmail = await knex('users').where({ user_email }).first()

    if (isRepeatedEmail)
      return res.status(401).json({
        message: 'O e-mail inserido já está sendo usado por outro usuário',
      })

    const encryptedPassword = await bcrypt.hash(user_password, 10)

    const userCreated = await knex('users').insert({
      user_name,
      user_email,
      user_password: encryptedPassword,
    })

    if (userCreated.length)
      return res
        .status(500)
        .json({ message: 'Não foi possível se conectar com o banco de dados.' })

    return res.status(200).json({ message: 'Usuário criado com sucesso.' })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const userEdit = async (req, res) => {
  const { user_name, user_email, user_password } = req.body
  const { id } = req.user
  try {
    await editUserSchema.validate(req.body)

    if (user_password) {
      if (user_password.length < 5)
        return res
          .status(401)
          .json({ message: 'Senha muito curta. Insira ao menos 5 caracteres.' })

      const encryptedPassword = await bcrypt.hash(user_password, 10)

      const userEditedWithPassword = await knex('users')
        .update({
          user_name,
          user_email,
          user_password: encryptedPassword,
        })
        .where('id', id)

      if (userEditedWithPassword.length)
        return res.status(500).json({
          message: 'Não foi possível conectar-se com o banco de dados.',
        })

      return res.status(200).json({ message: 'Usuário editado com sucesso.' })
    }

    const userEdited = await knex('users')
      .update({
        user_name,
        user_email,
      })
      .where('id', id)

    if (userEdited.length)
      return res.status(500).json({
        message: 'Não foi possível conectar-se com o banco de dados.',
      })

    return res.status(200).json({ message: 'Usuário editado com sucesso.' })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const userDeletion = async (req, res) => {
  const { id } = req.user

  const deletedUser = await knex('users').where('id', id).del()

  if (deletedUser.length)
    return res
      .status(500)
      .json({ message: 'Não foi possível conectar-se com o banco de dados' })

  return res
    .status(200)
    .json({ message: 'Sua conta foi removida com sucesso.' })
}

module.exports = { userCreation, userEdit, userDeletion }
