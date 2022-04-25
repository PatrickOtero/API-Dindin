const knex = require('../connection')
const {
  dateFormatter,
  arrayPropertyValueFormatter,
  totalAmountObtainer,
  weekDayNumberRemover,
} = require('../functions/formatters')
const {
  createTransactionSchema,
} = require('../validations/transactions/createTransactionSchema')
const {
  editTransactionSchema,
} = require('../validations/transactions/editTransactionSchema')

const listTransactions = async (req, res) => {
  const { id } = req.user
  const allTransactions = await knex('transactions').where('user_id', id)

  const dateDescendent = await knex('transactions')
    .orderBy('registry_date', 'desc')
    .where('user_id', id)
  const dateAscendent = await knex('transactions')
    .orderBy('registry_date', 'asc')
    .where('user_id', id)

  const { totalIncoming, totalOutgoing, balance } = totalAmountObtainer(
    allTransactions,
  )
  dateFormatter(allTransactions)
  arrayPropertyValueFormatter(allTransactions)

  dateFormatter(dateDescendent)
  arrayPropertyValueFormatter(dateDescendent)

  dateFormatter(dateAscendent)
  arrayPropertyValueFormatter(dateAscendent)

  const weekDescendent = await knex('transactions')
    .orderBy('week_day', 'desc')
    .where('user_id', id)
  const weekAscendent = await knex('transactions')
    .orderBy('week_day', 'asc')
    .where('user_id', id)

  weekDayNumberRemover(weekDescendent)
  weekDayNumberRemover(weekAscendent)
  weekDayNumberRemover(dateDescendent)
  weekDayNumberRemover(dateAscendent)
  weekDayNumberRemover(allTransactions)

  dateFormatter(weekDescendent)
  arrayPropertyValueFormatter(weekDescendent)

  dateFormatter(weekAscendent)
  arrayPropertyValueFormatter(weekAscendent)

  return res.status(200).json({
    allTransactions,
    dateDescendent,
    dateAscendent,
    weekDescendent,
    weekAscendent,
    totalIncoming,
    totalOutgoing,
    balance,
  })
}

const detailTransaction = async (req, res) => {
  const { registryId } = req.params
  const { id } = req.user
  const registry = await knex('transactions')
    .where({
      id: registryId,
      user_id: id,
    })
    .first()

  if (!registry)
    return res.status(404).json({ message: 'Transação não encontrada' })

  return res.status(200).json(registry)
}

const createTransaction = async (req, res) => {
  const {
    description,
    registry_value,
    category,
    registry_date,
    registry_type,
  } = req.body

  const { id } = req.user
  try {
    await createTransactionSchema.validate(req.body)

    const weekdays = [
      '1Domingo',
      '2Segunda',
      '3Terça',
      '4Quarta',
      '5Quinta',
      '6Sexta',
      '7Sábado',
    ]
    const date = new Date(registry_date)
    const weekday = date.getDay()

    const createRegistry = await knex('transactions').insert({
      description,
      registry_value,
      category,
      registry_date,
      week_day: weekdays[weekday],
      registry_type,
      user_id: id,
    })

    if (createRegistry.length)
      return res
        .status(400)
        .json({ message: 'Não foi possível conectar ao banco de dados' })

    return res.status(200).json({ message: 'Registro criado com sucesso!' })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const editTransaction = async (req, res) => {
  const {
    description,
    registry_value,
    category,
    registry_date,
    registry_type,
  } = req.body

  const { registryId } = req.params
  const { id } = req.user

  try {
    await editTransactionSchema.validate(req.body)

    const registryExist = await knex('transactions')
      .where({ id: registryId, user_id: id })
      .first()

    if (!registryExist)
      return res
        .status(404)
        .json({ message: 'Transação não encontrada na sua lista.' })

    const editRegistry = await knex('transactions')
      .update({
        description,
        registry_value,
        category,
        registry_type,
        registry_date,
      })
      .where({ id: registryId, user_id: id })

    if (editRegistry.length)
      return res
        .status(500)
        .json({ message: 'Não foi possível conectar ao banco de dados' })

    return res.status(200).json({ message: 'Registro editado com sucesso!' })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const deleteTransaction = async (req, res) => {
  const { registryId } = req.params
  const { id } = req.user

  const registryExist = await knex('transactions')
    .where({
      id: registryId,
      user_id: id,
    })
    .first()

  if (!registryExist)
    return res
      .status(404)
      .json({ message: 'Transação não encontrada na sua lista.' })

  const deletedRegistry = await knex('transactions')
    .where({ id: registryId, user_id: id })
    .del()

  if (deletedRegistry.length)
    return res
      .status(500)
      .json({ message: 'Não foi possível conectar-se com o banco de dados' })

  return res
    .status(200)
    .json({ message: 'A transação foi removida com sucesso.' })
}

module.exports = {
  listTransactions,
  detailTransaction,
  createTransaction,
  editTransaction,
  deleteTransaction,
}


